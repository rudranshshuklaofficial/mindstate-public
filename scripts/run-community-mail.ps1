param([switch]$Deliver, [switch]$Test, [switch]$DemoRudransh)
$ErrorActionPreference = 'Stop'
$mindstateRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$mindstateSecretPath = Join-Path $mindstateRoot 'work\secrets\workspace-mail.xml'
if (-not (Test-Path -LiteralPath $mindstateSecretPath)) { throw 'Run scripts\configure-local-smtp.ps1 first.' }
$mindstateCredential = Import-Clixml -LiteralPath $mindstateSecretPath
$mindstateOldPassword = $env:EMAIL_HOST_PASSWORD
try {
    $env:EMAIL_HOST_PASSWORD = $mindstateCredential.GetNetworkCredential().Password.Replace(' ', '')
    $env:EMAIL_HOST = 'smtp.gmail.com'
    $env:EMAIL_HOST_USER = 'team@mindstate.space'
    $env:EMAIL_PORT = '587'
    $env:EMAIL_USE_TLS = 'true'
    $env:EMAIL_USE_SSL = 'false'
    $env:DEFAULT_FROM_EMAIL = 'MindState <team@mindstate.space>'
    Push-Location -LiteralPath $mindstateRoot
    try { & (Join-Path $mindstateRoot '.venv\Scripts\python.exe') manage.py $(if ($Test) { "test_community_mail" } else { "run_community_mail" }) $(if ($Deliver -and -not $Test) { "--deliver" }) $(if ($Test -and $DemoRudransh) { "--demo-rudransh" }) } finally { Pop-Location }
} finally { $env:EMAIL_HOST_PASSWORD = $mindstateOldPassword; $mindstateCredential = $null }
