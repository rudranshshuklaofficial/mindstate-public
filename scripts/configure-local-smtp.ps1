$ErrorActionPreference = 'Stop'
$mindstateRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$mindstatePython = Join-Path $mindstateRoot '.venv\Scripts\python.exe'
if (-not (Test-Path -LiteralPath $mindstatePython)) { throw 'The project Python environment is missing.' }
$mindstateSecrets = Join-Path $mindstateRoot 'work\secrets'
New-Item -ItemType Directory -Path $mindstateSecrets -Force | Out-Null
$mindstatePassword = Read-Host 'Google Workspace app password for team@mindstate.space (hidden)' -AsSecureString
if ($mindstatePassword.Length -eq 0) { throw 'No password was entered.' }
$mindstateCredential = [PSCredential]::new('team@mindstate.space', $mindstatePassword)
$mindstateCredential | Export-Clixml -LiteralPath (Join-Path $mindstateSecrets 'workspace-mail.xml')
Write-Host 'Credential saved using Windows encryption for this Windows user. No password was printed or added to source.'
$mindstateOldPassword = $env:EMAIL_HOST_PASSWORD
$mindstateTest = @'
import os, sys
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
try:
    import django
    django.setup()
    from django.conf import settings
    from django.core.mail import send_mail
    if not settings.EMAIL_HOST_PASSWORD:
        raise RuntimeError('Missing credential')
    sent = send_mail('[DELIVERY TEST] MindState local SMTP setup', 'This is the requested delivery test for MindState local development. No member emails were sent.', 'MindState <team@mindstate.space>', ['team@mindstate.space'], fail_silently=False)
    if sent != 1:
        raise RuntimeError('SMTP did not accept the message')
except Exception:
    print('Delivery test failed. Check the Google Workspace app password, SMTP access and network connection. Re-run this script to retry. The credential was not printed.', file=sys.stderr)
    sys.exit(1)
print('SMTP accepted one labelled delivery-test email to team@mindstate.space. Check that mailbox to confirm arrival.')
'@
try {
    $env:EMAIL_HOST_PASSWORD = $mindstateCredential.GetNetworkCredential().Password.Replace(' ', '')
    $env:EMAIL_HOST = 'smtp.gmail.com'
    $env:EMAIL_HOST_USER = 'team@mindstate.space'
    $env:EMAIL_PORT = '587'
    $env:EMAIL_USE_TLS = 'true'
    $env:EMAIL_USE_SSL = 'false'
    $env:DEFAULT_FROM_EMAIL = 'MindState <team@mindstate.space>'
    Push-Location -LiteralPath $mindstateRoot
    try {
        & $mindstatePython -c $mindstateTest
        if ($LASTEXITCODE -ne 0) { throw 'SMTP verification failed. The encrypted credential is saved; correct it by running this script again.' }
    } finally { Pop-Location }
} finally {
    $env:EMAIL_HOST_PASSWORD = $mindstateOldPassword
    $mindstateCredential = $null
    $mindstatePassword = $null
}
Write-Host 'Mail setup complete. Start this checkout with scripts\start-local.ps1 to load the encrypted credential.'
