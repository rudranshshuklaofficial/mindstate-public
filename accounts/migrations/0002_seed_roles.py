from django.db import migrations


def seed(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    Permission = apps.get_model('auth', 'Permission')
    ContentType = apps.get_model('contenttypes', 'ContentType')
    User = apps.get_model('auth', 'User')
    Profile = apps.get_model('accounts', 'Profile')
    roles = {name: Group.objects.get_or_create(name=name)[0] for name in ('admin', 'identity_admin', 'moderator', 'editorial', 'tech')}
    grants = (
        ('membershipapplication', 'review_applications', 'Review membership applications', ('admin', 'identity_admin')),
        ('auditlog', 'manage_roles', 'Manage team roles', ('admin', 'identity_admin')),
        ('auditlog', 'view_auditlog', 'View audit log', ('admin', 'identity_admin')),
        ('auditlog', 'view_identity', 'Access identity workspace', ('identity_admin',)),
        ('profile', 'access_team_workspace', 'Access team workspace', tuple(roles)),
    )
    for model, code, label, names in grants:
        content_type, _ = ContentType.objects.get_or_create(app_label='accounts', model=model)
        permission, _ = Permission.objects.get_or_create(content_type=content_type, codename=code, defaults={'name': label})
        for name in names:
            roles[name].permissions.add(permission)
    for user in User.objects.iterator():
        Profile.objects.get_or_create(user_id=user.pk)
        if user.is_superuser:
            user.groups.add(roles['admin'])


class Migration(migrations.Migration):
    dependencies = [('accounts', '0001_initial'), ('auth', '0012_alter_user_first_name_max_length')]
    operations = [migrations.RunPython(seed, migrations.RunPython.noop)]
