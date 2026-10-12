from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.core.files.base import ContentFile

from .models import MembershipApplication, Profile, ProfileChange, Submission
from .policy import TEAM_ROLES


class ApplicationForm(forms.Form):
    email = forms.EmailField()
    display_name = forms.CharField(max_length=80, label='Preferred display name')
    interests = forms.MultipleChoiceField(choices=[(x, x.title()) for x in ('writing', 'art', 'translation', 'tech', 'reading')], widget=forms.CheckboxSelectMultiple)
    introduction = forms.CharField(max_length=1000, label='A short introduction', widget=forms.Textarea(attrs={'rows': 4}), help_text='Avoid legal names, birthdates or sensitive details.')
    is_under_16 = forms.ChoiceField(label='Age declaration', choices=[('', 'Choose an option'), ('no', 'I am 16 or older'), ('yes', 'I am under 16')])

    def clean_email(self):
        return self.cleaned_data['email'].strip().lower()

    def clean_is_under_16(self):
        return self.cleaned_data['is_under_16'] == 'yes'

    def save(self):
        return MembershipApplication.objects.create(**self.cleaned_data)


class InviteAcceptForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = ('username',)


class OpenSignUpForm(UserCreationForm):
    email = forms.EmailField(label='Email address')
    display_name = forms.CharField(max_length=80, label='Display name')
    age_confirmation = forms.BooleanField(label='I am 16 or older', required=False)

    class Meta(UserCreationForm.Meta):
        model = get_user_model()
        fields = ('username', 'email', 'display_name', 'password1', 'password2', 'age_confirmation')

    def clean_username(self):
        username = super().clean_username()
        if get_user_model().objects.filter(username__iexact=username).exists():
            raise forms.ValidationError('Choose another username.')
        return username

    def clean_email(self):
        address = self.cleaned_data['email'].strip().lower()
        if get_user_model().objects.filter(email__iexact=address).exists():
            raise forms.ValidationError('An account already uses this email. Try signing in or contact the team.')
        return address

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            user.profile.email_verification_required = True
            user.profile.display_name = 'MindState member'
            ProfileChange.objects.create(profile=user.profile, requested_by=user, display_name=self.cleaned_data['display_name'])
            user.profile.save(update_fields=['display_name', 'email_verification_required'])
        return user


class Under16AccountForm(OpenSignUpForm):
    age_confirmation = None

    class Meta(OpenSignUpForm.Meta):
        fields = ('username', 'email', 'display_name', 'password1', 'password2')


class ConsentUploadForm(forms.Form):
    consent_document = forms.FileField(label='Signed guardian form', help_text='PDF, JPEG or PNG, up to 5 MB. Only the review team can access it.')

    def clean_consent_document(self):
        return GuardianSignUpForm.clean_consent_document(self)


class GuardianSignUpForm(forms.Form):
    requested_username = forms.CharField(max_length=150, label='Preferred username')
    email = forms.EmailField(label='Email address')
    display_name = forms.CharField(max_length=80, label='Display name')
    consent_document = forms.FileField(label='Signed guardian form', help_text='Upload a signed PDF, JPEG or PNG, up to 5 MB.')

    def clean_requested_username(self):
        name = self.cleaned_data['requested_username'].strip()
        get_user_model()._meta.get_field('username').run_validators(name)
        if get_user_model().objects.filter(username__iexact=name).exists():
            raise forms.ValidationError('Choose another username.')
        return name

    def clean_email(self):
        return self.cleaned_data['email'].strip().lower()

    def clean_consent_document(self):
        upload = self.cleaned_data['consent_document']
        if not settings.PRIVATE_MEDIA_READY:
            raise forms.ValidationError('Guardian uploads are unavailable until private storage is configured.')
        if upload.size > 5 * 1024 * 1024:
            raise forms.ValidationError('Choose a file smaller than 5 MB.')
        upload.seek(0)
        prefix = upload.read(12)
        upload.seek(0)
        import io, uuid
        if prefix.startswith(b'%PDF-'):
            from pypdf import PdfReader
            data = upload.read()
            try:
                reader = PdfReader(io.BytesIO(data), strict=True)
                if reader.is_encrypted or not 1 <= len(reader.pages) <= 20:
                    raise ValueError()
                seen = set()
                def inspect(obj):
                    obj = obj.get_object() if hasattr(obj, 'get_object') else obj
                    if id(obj) in seen:
                        return
                    seen.add(id(obj))
                    if len(seen) > 10000:
                        raise ValueError()
                    if isinstance(obj, dict):
                        if any(key in obj for key in ('/OpenAction', '/AA', '/JS', '/JavaScript', '/EmbeddedFiles', '/Launch', '/RichMedia', '/XFA')):
                            raise ValueError()
                        for child in obj.values(): inspect(child)
                    elif isinstance(obj, (list, tuple)):
                        for child in obj: inspect(child)
                inspect(reader.trailer)
            except Exception:
                raise forms.ValidationError('Choose a valid, unencrypted PDF of up to 20 pages without scripts or attached files.')
            return ContentFile(data, name=uuid.uuid4().hex + '.pdf')
        from PIL import Image, ImageOps
        try:
            with Image.open(upload) as picture:
                if picture.format not in ('JPEG', 'PNG') or picture.width * picture.height > 20000000:
                    raise ValueError()
                picture = ImageOps.exif_transpose(picture).convert('RGB')
                output = io.BytesIO()
                picture.save(output, 'JPEG', quality=88)
            return ContentFile(output.getvalue(), name=uuid.uuid4().hex + '.jpg')
        except Exception:
            raise forms.ValidationError('Choose a valid PDF, JPEG or PNG file.')


def clean_private_image(image, *, max_bytes=5 * 1024 * 1024, size=(1600, 1200)):
    from django.db.models.fields.files import FieldFile
    if not image or isinstance(image, FieldFile):
        return image
    if not settings.PRIVATE_MEDIA_READY:
        raise forms.ValidationError('Image uploads are waiting for private storage configuration.')
    if image.size > max_bytes:
        raise forms.ValidationError('Choose an image smaller than 5 MB.')
    import io, uuid
    from PIL import Image, ImageOps
    try:
        image.seek(0)
        with Image.open(image) as picture:
            if picture.format not in ('PNG', 'JPEG', 'WEBP') or picture.width * picture.height > 20000000:
                raise ValueError()
            picture = ImageOps.exif_transpose(picture).convert('RGB')
            picture.thumbnail(size)
            output = io.BytesIO()
            picture.save(output, 'JPEG', quality=86)
        return ContentFile(output.getvalue(), name=uuid.uuid4().hex + '.jpg')
    except Exception:
        raise forms.ValidationError('Choose a valid PNG, JPEG or WebP image.')


class SubmissionForm(forms.ModelForm):
    body = forms.CharField(max_length=50000, widget=forms.Textarea(attrs={'rows': 14}), help_text='Up to 50,000 characters. Headings, emphasis, lists and quotes are supported.')
    class Meta:
        model = Submission
        fields = ['section', 'title', 'summary', 'language', 'tags', 'content_warning', 'reading_font', 'reading_size', 'body', 'featured_image', 'image_2', 'image_3', 'image_4', 'image_5', 'image_credit']
        widgets = {'body': forms.Textarea(attrs={'rows': 14, 'placeholder': 'Write in paragraphs. Leave a blank line between sections.'}), 'summary': forms.Textarea(attrs={'rows': 3}), 'content_warning': forms.Textarea(attrs={'rows': 2})}
        labels = {'featured_image': 'Featured image', 'image_2': 'Reading image 1', 'image_3': 'Reading image 2', 'image_4': 'Reading image 3', 'image_5': 'Reading image 4'}

    def __init__(self, *args, **kwargs):
        self.is_draft = kwargs.pop('draft', False)
        super().__init__(*args, **kwargs)
        for name in ('reading_font', 'reading_size'):
            self.fields[name].required = False
        if self.is_draft:
            for name in ('title', 'summary', 'body'):
                self.fields[name].required = False
        if not self.instance.pk and not self.is_draft:
            self.fields['featured_image'].required = True
        for name in ('featured_image', 'image_2', 'image_3', 'image_4', 'image_5'):
            self.fields[name].help_text = 'PNG, JPEG or WebP. Up to 5 MB.'
        self.fields['image_credit'].help_text = 'Credit photographers or sources, or say the images are your own.'

    def clean(self):
        cleaned = super().clean()
        cleaned['reading_font'] = cleaned.get('reading_font') or 'sans'
        cleaned['reading_size'] = cleaned.get('reading_size') or 'standard'
        if not self.is_draft and not cleaned.get('featured_image'):
            self.add_error('featured_image', 'A featured image is needed before review.')
        if self.is_draft and not cleaned.get('title'):
            cleaned['title'] = 'Untitled draft'
        return cleaned

    def _clean_image(self, name):
        return clean_private_image(self.cleaned_data.get(name))

    def clean_featured_image(self): return self._clean_image('featured_image')
    def clean_image_2(self): return self._clean_image('image_2')
    def clean_image_3(self): return self._clean_image('image_3')
    def clean_image_4(self): return self._clean_image('image_4')
    def clean_image_5(self): return self._clean_image('image_5')


class SubmissionReviewForm(forms.Form):
    decision = forms.ChoiceField(choices=[('approve', 'Approve and publish'), ('decline', 'Request changes')])
    note = forms.CharField(max_length=1000, widget=forms.Textarea(attrs={'rows': 4}), label='Note to the creator')


class DecisionForm(forms.Form):
    decision = forms.ChoiceField(choices=[('approve', 'Approve consent and unlock access'), ('decline', 'Decline')])
    note = forms.CharField(max_length=1000, widget=forms.Textarea(attrs={'rows': 3}))
    consent_method = forms.CharField(max_length=200, required=False, label='Externally recorded parental-consent method')


class RolesForm(forms.Form):
    roles = forms.MultipleChoiceField(choices=[(x, x.replace('_', ' ').title()) for x in TEAM_ROLES], required=False, widget=forms.CheckboxSelectMultiple)


class TokenForm(forms.Form):
    token = forms.CharField(label='Authenticator code or recovery code', max_length=40, widget=forms.TextInput(attrs={'autocomplete': 'one-time-code'}))


class OnboardingForm(forms.Form):
    supervised_review = forms.BooleanField(label='I confirm a supervised first review has been completed')
    supervisor = forms.ModelChoiceField(queryset=get_user_model().objects.none(), label='Experienced moderator or admin')

    def __init__(self, *args, **kwargs):
        from django.db.models import Q
        super().__init__(*args, **kwargs)
        self.fields['supervisor'].queryset = get_user_model().objects.filter(is_active=True).filter(Q(is_superuser=True) | Q(groups__name__in=['admin', 'identity_admin']) | Q(groups__name='moderator', moderatoronboarding__approved_at__isnull=False, moderatoronboarding__guidelines_version_read=settings.APPROVED_GUIDELINES_VERSION)).distinct()


class ProfileChangeForm(forms.ModelForm):
    class Meta:
        model = ProfileChange
        fields = ['display_name', 'bio', 'photo_caption', 'detail_caption', 'closing_caption', 'handwritten_note', 'scrapbook_note', 'margin_note', 'sticker_text', 'avatar', 'banner', 'folio_image', 'remove_avatar', 'remove_banner', 'remove_folio_image']
        widgets = {'bio': forms.Textarea(attrs={'rows': 4}), 'theme': forms.RadioSelect, 'avatar': forms.FileInput, 'banner': forms.FileInput}
        labels = {'folio_image': 'Closing scrapbook image', 'remove_avatar': 'Use the default profile picture', 'remove_banner': 'Use the default banner', 'remove_folio_image': 'Remove the closing scrapbook image'}

    def clean_avatar(self):
        return clean_private_image(self.cleaned_data.get('avatar'), max_bytes=2*1024*1024, size=(512,512))

    def clean_folio_image(self):
        return clean_private_image(self.cleaned_data.get('folio_image'), size=(1600,1000))

    def clean_banner(self):
        return clean_private_image(self.cleaned_data.get('banner'), size=(1600,600))

