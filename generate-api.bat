@echo off
setlocal enabledelayedexpansion

set services=auth marketing timetable services print converter userdata achievement rating dating rental

echo Starting API generation for services...
echo.

set success_count=0
set error_count=0

for %%s in (%services%) do (
    echo [INFO] Generating API for service: %%s
    bunx openapi-ts --input "https://api.test.profcomff.com/%%s/openapi.json" --output "src/shared/api/%%s" --plugins "@hey-api/client-fetch" --plugins "@tanstack/react-query"
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to generate API for service: %%s
        set /a error_count+=1
    ) else (
        echo [SUCCESS] API for service %%s generated successfully
        echo [INFO] Updating baseUrl in client.gen.ts for service: %%s
        powershell -Command "(Get-Content 'src/shared/api/%%s/client.gen.ts') -replace 'baseUrl: ''/%%s''', 'baseUrl: ''https://api.test.profcomff.com/%%s''' | Set-Content 'src/shared/api/%%s/client.gen.ts'"
        set /a success_count+=1
    )
    echo ----------------------------------------
)

echo.
if %error_count% equ 0 (
    echo [SUCCESS] All APIs generated successfully! ^(%success_count%/%services%^)
) else (
    echo [ERROR] Generation completed with errors. Success: %success_count%, Errors: %error_count%
)

pause
