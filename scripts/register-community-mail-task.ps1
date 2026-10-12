param([switch]$EnableDelivery)
$ErrorActionPreference='Stop'
$taskRoot=(Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$taskRunner=Join-Path $PSScriptRoot 'run-community-mail.ps1'
if (-not (Test-Path -LiteralPath $taskRunner)) { throw 'Community mail runner is missing.' }
$taskArgs='-NoProfile -NonInteractive -WindowStyle Hidden -File "'+$taskRunner+'"'+$(if ($EnableDelivery) {' -Deliver'} else {''})
$existingTask=Get-ScheduledTask -TaskName 'MindState community mail' -ErrorAction SilentlyContinue
if ($existingTask -and ($existingTask.Actions.Arguments -notcontains $taskArgs)) { throw 'An existing MindState mail task has different arguments. Review it before replacing it; no task was changed.' }
$taskAction=New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $taskArgs -WorkingDirectory $taskRoot
$taskTrigger=New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(5) -RepetitionInterval (New-TimeSpan -Hours 1)
$taskSettings=New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 45)
Register-ScheduledTask -TaskName 'MindState community mail' -Action $taskAction -Trigger $taskTrigger -Settings $taskSettings -Description 'Prepare due MindState editions. Delivery only with explicit EnableDelivery and enabled admin schedules.' -Force | Out-Null
Write-Host 'Hourly task saved for the current Windows user. SMTP credentials remain Windows encrypted.'
