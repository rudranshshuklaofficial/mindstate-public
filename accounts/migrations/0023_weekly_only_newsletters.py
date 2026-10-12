from django.db import migrations,models

def stop_monthly(apps,schema_editor):
    apps.get_model('accounts','NewsletterSchedule').objects.filter(kind__in=['monthly','writer_monthly']).update(enabled=False)
    apps.get_model('accounts','NewsletterSubscription').objects.update(monthly=False)

class Migration(migrations.Migration):
    dependencies=[('accounts','0022_communitynotice_sending_until')]
    operations=[
        migrations.AlterField(model_name='newslettersubscription',name='monthly',field=models.BooleanField(default=False)),
        migrations.AlterField(model_name='newsletterschedule',name='kind',field=models.CharField(max_length=24,unique=True,choices=[('weekly','Weekly catchup'),('writer_weekly','Weekly writer report')])),
        migrations.RunPython(stop_monthly,migrations.RunPython.noop),
    ]
