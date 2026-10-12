# MindState

MindState is a Django platform for articles, visual art, creative collaboration, and scrapbook-style member profiles. The interface uses cream paper, forest green, Google Sans Flex, and Instrument Serif, with small React enhancements over server-rendered pages.

## Features

- Article library, scrolling art gallery, reader controls, tags, search, and incremental homepage loading.
- Reviewed submissions and profile revisions, private owner previews, and visual review markers.
- Collaboration requests with permission-controlled essay/art previews and shared workspaces.
- Email verification, password recovery, backup codes, two-factor authentication, and consent-gated accounts for members under 16.
- Administration for reviews, member restrictions, appeals, support conversations, and weekly newsletters.
- Customizable member cards, profile themes, image uploads, and accessible enhanced controls.

## Local setup

Requires Python 3.12 or newer. Node.js is needed only to rebuild the enhanced controls; the compiled assets are included.

```powershell
git clone https://github.com/rudranshshuklaofficial/mindstate-public.git
cd mindstate-public
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata content/articles.fixture.json content/art-posts.fixture.json
python manage.py createsuperuser
python manage.py runserver 3000
```

Open http://localhost:3000/. Local browsing requires sign-in. Account permissions, email verification, consent, and reviewer authentication requirements still apply. The fixtures contain the bundled editorial library, not member accounts or private uploads. Load them into a fresh development database; avoid reloading fixtures over edited content.

## Frontend

```powershell
npm ci --prefix frontend
npm run check --prefix frontend
npm run build --prefix frontend
```

The build writes to `static/enhanced/`. Django serves the result; a separate React development server is not required. Components preserve native Django fields and validation, keyboard access, and reduced-motion behavior. See [frontend/README.md](frontend/README.md) and the signed-in `/contribute/design-system/` page for usage and credits.

## Email and private files

Email is disabled by default unless credentials are configured. For local Windows development, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\configure-local-smtp.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-local.ps1 -Port 3000
```

The SMTP setup prompts invisibly and stores Windows DPAPI-encrypted credentials under ignored `work/secrets/`. Never place passwords in source code or commit the credential file. The default sender is `MindState <team@mindstate.space>` using Google Workspace SMTP on port 587 with STARTTLS. The startup script loads saved local credentials into the process environment.

Databases, member uploads, consent evidence, reset codes, local credentials, backups, and development handoffs are excluded from this public source repository. A fresh checkout creates its own database and local secret. Weekly mail schedules require explicit configuration; cloning the repository does not send newsletters.

## Verification

```powershell
python manage.py check
python manage.py test accounts alpha --noinput
npm run check --prefix frontend
npm run build --prefix frontend
```

Tests use isolated databases and in-memory mailboxes. Do not run real delivery tests against members without explicit authorization. Browser-only and device-specific checks, including iPhone Gmail rendering, need separate verification.

## Deployment

This repository publishes source code; pushing it does not deploy MindState. Production requires a new `DJANGO_SECRET_KEY`, appropriate host/CSRF settings, persistent private storage, production email configuration, and a supported production database setup. Review `web/settings.py` and the deployment checks before hosting. No local database or encrypted SMTP credential is provided.

## Components and credits

Selected components are adapted from [Arc UI / UIArc](https://uiarc.dev/) by Elia Kuratli. Its MIT notice is retained in `frontend/src/components/arc/LICENSE` and `static/enhanced/UIARC-LICENSE.txt`. React, Radix UI, Motion, and Lucide notices are retained in `static/enhanced/THIRD-PARTY-NOTICES.txt`; remaining upstream source notices are kept alongside their code.

Article and artwork source credits are preserved in the content packs and reading templates. Public source availability does not grant blanket reuse rights to MindState branding, editorial writing, supplied artwork, or member contributions. Follow each work's stated permissions and the applicable dependency licenses.
