param([int]$Port = 3000, [switch]$NoReload)
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
    try { & (Join-Path $mindstateRoot '.venv\Scripts\python.exe') manage.py runserver "127.0.0.1:$Port" $(if ($NoReload) { "--noreload" }) } finally { Pop-Location }
} finally { $env:EMAIL_HOST_PASSWORD = $mindstateOldPassword; $mindstateCredential = $null }
