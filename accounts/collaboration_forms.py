from django import forms
from django.template.loader import render_to_string

from .forms import SubmissionForm, clean_private_image
from .models import Collaboration


class CollaborationRequestForm(forms.ModelForm):
    title = forms.CharField(max_length=255)
    language = forms.ChoiceField(choices=[('en', 'English'), ('de', 'German')])
    content_warning = forms.CharField(max_length=500, required=False, widget=forms.Textarea(attrs={'rows': 2}))
    draft_text = forms.CharField(max_length=50000, required=False, widget=forms.Textarea(attrs={'rows': 6}), label='Optional draft text', help_text='Visible in the preview to signed-in prospective collaborators while your request is open. Do not include identifying details if anonymous.')
    anonymous = forms.BooleanField(required=False, label='Credit me anonymously')

    class Meta:
        model = Collaboration
        fields = ['title', 'need', 'brief', 'language', 'content_warning', 'anonymous', 'draft_text', 'draft_reference', 'reference_image', 'image_rights', 'source_url', 'licence', 'source_credit']
        widgets = {'brief': forms.Textarea(attrs={'rows': 4}), 'draft_reference': forms.Textarea(attrs={'rows': 4})}
        labels = {'need': 'Looking for', 'draft_reference': 'Optional draft or reference links', 'reference_image': 'Optional reference image'}
        help_texts = {'brief': 'Describe the piece and the help you need. Keep identifying details out if anonymous.', 'reference_image': 'Use your own or openly licensed reference. PNG, JPEG or WebP, up to 5 MB.'}

    def clean_reference_image(self):
        return clean_private_image(self.cleaned_data.get('reference_image'))

    def clean(self):
        data = super().clean()
        if data.get('image_rights') == 'licensed' and not all(data.get(field) for field in ('source_url', 'licence', 'source_credit')):
            raise forms.ValidationError('Openly licensed references need a source link, licence and credit.')
        return data


class CollaborationImageInput(forms.ClearableFileInput):
    def render(self, name, value, attrs=None, renderer=None):
        return render_to_string('accounts/collaboration-file.html', self.get_context(name, value, attrs))


class CollaborationEditForm(SubmissionForm):
    illustration_meaning = forms.CharField(max_length=2000, required=False, widget=forms.Textarea(attrs={'rows': 3}))
    image_rights = forms.ChoiceField(choices=Collaboration._meta.get_field('image_rights').choices)
    source_url = forms.URLField(required=False, label='Openly licensed source link')
    licence = forms.CharField(max_length=120, required=False, label='Source licence')
    source_credit = forms.CharField(max_length=300, required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in ('featured_image', 'image_2', 'image_3', 'image_4', 'image_5'):
            self.fields[field].widget = CollaborationImageInput()


class NoteForm(forms.Form):
    body = forms.CharField(max_length=1500, label='Note or proposed change', widget=forms.Textarea(attrs={'rows': 3, 'placeholder': 'Talk about the piece. Avoid personal details if you are anonymous.'}))


class ConfirmForm(forms.Form):
    consent = forms.BooleanField(label='I agree to submit this version and consent to publishing our contribution under MindState’s terms. Our work is original; licensed references have a source, licence and credit. Art is human-drawn; AI only digitises it without drastic changes. Any narration reads the published human text unchanged; translation is manual by editorial.')


class CollaborationReviewForm(forms.Form):
    decision = forms.ChoiceField(choices=[('start', 'Start review'), ('changes', 'Request changes'), ('approve', 'Approve'), ('publish', 'Publish approved piece')])
    note = forms.CharField(max_length=1000, required=False, widget=forms.Textarea(attrs={'rows': 3}))

    def clean(self):
        data = super().clean()
        if data.get('decision') == 'changes' and not data.get('note', '').strip():
            self.add_error('note', 'Explain the changes the co-authors need to make.')
        return data
