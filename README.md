# MindState

MindState is the website behind our youth-led magazine. It's where people read articles, browse art, work on pieces together, and put together scrapbook-style member profiles. It's built with Django, and a few small React bits sit on top of the server-rendered pages. The look is cream paper and forest green, set in Google Sans Flex and Instrument Serif.

## What's in it

- An article library and a scrolling art gallery, with reader controls, tags, search, and a homepage that loads more as you scroll.
- Submissions and profile edits go through review first. Owners can preview their work privately, and reviewers can mark things up visually.
- Collaboration requests, where you choose who can preview your essay or art, plus shared workspaces.
- Email verification, password resets, backup codes and two-factor login. Members under 16 need consent before their account is active.
- Admin tools for reviews, restricting members, appeals, support chats and the weekly newsletter.
- Member cards and profile themes you can customise, image uploads, and controls that work with a keyboard and screen readers.

## Running it locally

You'll need Python 3.12 or newer. Node.js is only needed if you want to rebuild the React controls, since the built files are already in the repo.

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

Then open http://localhost:3000/. You'll have to sign in even locally, and the usual rules still apply: account permissions, email verification, consent and reviewer login.

The fixtures only contain our editorial library (articles and art), with no member accounts or private uploads. Load them into a fresh database, and don't reload them on top of content you've already edited, or you'll overwrite your changes.

## Frontend

```powershell
npm ci --prefix frontend
npm run check --prefix frontend
npm run build --prefix frontend
```

The build goes into `static/enhanced/`, and Django serves it from there, so you don't need a separate React dev server. The components keep Django's own form fields and validation, work with a keyboard, and respect reduced-motion settings. There's more in [frontend/README.md](frontend/README.md), and once you're signed in, the `/contribute/design-system/` page shows how everything is used and who it's credited to.

## Email and private files

Email stays off until you set up credentials. On Windows, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\configure-local-smtp.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-local.ps1 -Port 3000
```

The first script asks for your SMTP password without showing it on screen. It saves it encrypted with Windows DPAPI in `work/secrets/`, which git ignores. The second script loads those saved credentials when the server starts. Please never put passwords in the code or commit that file. By default, mail goes out as `MindState <team@mindstate.space>` through Google Workspace SMTP on port 587 with STARTTLS.

Some things are deliberately left out of this public repo: databases, member uploads, consent records, reset codes, local credentials, backups and internal handoff notes. A fresh clone makes its own database and secret key. The weekly newsletter only runs if you set it up yourself, so cloning the repo won't email anyone.

## Testing

```powershell
python manage.py check
python manage.py test accounts alpha --noinput
npm run check --prefix frontend
npm run build --prefix frontend
```

Tests run on their own throwaway databases and fake inboxes. Don't send real test emails to members unless you have explicit permission. Some things can only be checked by hand on a real browser or device, like how emails look in Gmail on an iPhone.

## Deploying

Pushing to this repo doesn't deploy anything, because it's just the source code. To run MindState in production, you'll need a new `DJANGO_SECRET_KEY`, the right host and CSRF settings, persistent private storage, a production email setup and a supported production database. Look through `web/settings.py` and Django's deployment checks before you host it. There's no database or saved email login included.

## Credits

Some components are adapted from [Arc UI / UIArc](https://uiarc.dev/) by Elia Kuratli. Its MIT license is kept in `frontend/src/components/arc/LICENSE` and `static/enhanced/UIARC-LICENSE.txt`. The notices for React, Radix UI, Motion and Lucide are in `static/enhanced/THIRD-PARTY-NOTICES.txt`, and any other upstream notices sit next to the code they cover.

Credits for the articles and artwork are kept in the content packs and the reading templates. Just because the code is public doesn't mean you can reuse the MindState name and branding, our writing, the artwork or anything members have contributed. Please follow each work's own permissions and the licenses of the dependencies.
