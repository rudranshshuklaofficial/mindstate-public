from django.db import migrations


def limit_core_role(apps, schema_editor):
    Group = apps.get_model('auth', 'Group')
    group = Group.objects.filter(name='core_team_admin').first()
    if group:
        excess = list(group.permissions.exclude(content_type__app_label='accounts', codename__in=('change_other_profiles', 'access_team_workspace')))
        group.permissions.remove(*excess)


class Migration(migrations.Migration):
    dependencies = [('accounts', '0006_alter_profile_options')]
    operations = [migrations.RunPython(limit_core_role, migrations.RunPython.noop)]
