# mindstate

mindstate is a youth led magazine and community, and this is the website i've been building for it. it's a place where people can read articles, explore artwork, share their own work, collaborate with others, and have their own little space on the platform.

i've built most of it using django, with some react components for the more interactive parts. for the design, i wanted something that didn't feel like a typical modern website, so i went with cream paper backgrounds, forest green colours, scrapbook style elements, and fonts like google sans flex and instrument serif. it's supposed to feel a bit like flipping through an actual magazine.

## what's inside

there's quite a lot in here now, so i'll try to keep it simple.

* **articles and art:** there's an article library and a scrolling art gallery where you can explore different pieces, search for things, browse tags, and adjust reading settings. the homepage also loads more content as you scroll.

* **submissions and reviews:** people can submit their writing or artwork, but it goes through a review process before being published. i've also added private previews so creators can see how their work will look, and reviewers can leave feedback directly on it.

* **collaboration:** members can invite other people to work on essays, artwork, or other pieces together. you can decide who gets to preview your work, and there are shared workspaces for working on things together.

* **accounts and security:** email verification, password resets, backup codes, and two factor authentication are included. members under 16 need consent before their accounts can be activated.

* **moderation:** there are tools for reviewing submissions, managing member restrictions, handling appeals, replying to support messages, and managing the weekly newsletter.

* **profiles:** members can customise their profiles with themes, images, and scrapbook style cards. i've also tried to make things accessible, with keyboard navigation, screen reader support, and reduced motion settings where needed.

## running it locally

if you wanna try the website yourself, you'll need python 3.12 or newer. you only need node.js if you're planning to rebuild the react components, since the compiled files are already included in the repo.

first, clone it and set everything up:

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

once that's done, open http://localhost:3000/ and you should be able to access the site.

you'll still have to sign in, even when running it locally. i haven't disabled the account permissions, verification, consent requirements, or reviewer access rules just for local use.

i've included the articles and artwork as fixtures so you don't end up with a completely empty website. there's no actual member data, private uploads, or personal information in them.

just make sure you're loading the fixtures into a fresh database. if you've already made changes to the content locally and load them again, you might overwrite your work.

## frontend

most of the website uses django's normal templates, but i've used react for some of the interactive stuff.

if you're planning to change those components, you can install the dependencies and rebuild them using:

```powershell
npm ci --prefix frontend
npm run check --prefix frontend
npm run build --prefix frontend
```

everything gets built into `static/enhanced/`, which django serves directly. so you don't need to keep a separate react server running.

the components still use django's own form fields and validation. i've also tried to keep them usable with a keyboard and make sure animations respect reduced motion preferences.

there's some more information in [frontend/README.md](frontend/README.md), and you can also check out `/contribute/design-system/` once you're signed in. that page shows the components, how they're used, and their credits.

## emails and private files

email is disabled by default, so cloning the repo won't suddenly start sending emails to anyone.

if you want to set up email locally on windows, you can use these scripts:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\configure-local-smtp.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-local.ps1 -Port 3000
```

the first script will ask for your smtp password without showing it on the screen. it'll then save the credentials encrypted using windows dpapi inside `work/secrets/`, which git ignores.

the second script loads those credentials when starting the server.

please don't put passwords directly into the code or commit your local credentials. it's really not worth accidentally leaking them lol.

the default email setup uses google workspace smtp on port 587 with starttls, and emails are sent as `MindState <team@mindstate.space>`.

i've also kept a bunch of things out of the public repository on purpose. this includes the actual database, member uploads, consent records, password reset codes, credentials, backups, and internal documents.

a fresh clone creates its own database and secret key, so you're not working with anything from the actual platform.

the weekly newsletter won't run unless you configure it yourself either, so there's no risk of accidentally emailing mindstate members just by running the project locally.

## testing

i've added automated tests for parts of the platform, and you can run them using:

```powershell
python manage.py check
python manage.py test accounts alpha --noinput
npm run check --prefix frontend
npm run build --prefix frontend
```

the tests use their own temporary databases and fake inboxes, so they won't touch real member information.

of course, automated tests can't catch absolutely everything. some things still need to be checked manually, especially how the site behaves on different devices and browsers, or how emails actually look in something like gmail on an iphone.

also, please don't send test emails to real members unless they've given you permission.

## deploying it

just to clarify, this is the source code repository, not the actual hosting setup for mindstate. pushing something here won't automatically update the live website.

if you want to deploy your own instance, you'll need to configure a few things first.

you'll need a new `DJANGO_SECRET_KEY`, proper host and csrf settings, persistent storage for private files, a production database, and an email setup that works for your deployment.

most of the relevant settings are in `web/settings.py`, and i'd suggest going through django's deployment checks before putting anything online.

there's no production database or saved email login included in the repo, so you'll have to configure those yourself.

## credits

i've used a few existing libraries and components while building mindstate, and i want to make sure the people behind them get proper credit.

some of the components are adapted from [arc ui / uiarc](https://uiarc.dev/) by elia kuratli. the original mit license is included in `frontend/src/components/arc/LICENSE` and `static/enhanced/UIARC-LICENSE.txt`.

the notices for react, radix ui, motion, and lucide are included in `static/enhanced/THIRD-PARTY-NOTICES.txt`. other notices are kept alongside the relevant code.

credits for the articles and artwork are included in the content packs and reading templates.

also, even though the code is public, that doesn't mean everything on the website is free to reuse. the mindstate name, branding, articles, illustrations, and work submitted by members still belong to their respective owners or creators. please respect the permissions attached to them, along with the licenses of the libraries used.

## that's pretty much it

i started working on mindstate because i wanted to help create a space where young people could share what they think, write about things that matter to them, and make art without everything feeling overly formal or complicated.

the website has grown quite a bit since then, and i'm still working on improving it. there's definitely stuff that could be better, and probably a few things i've overlooked too.

i decided to make the code public so other people can explore it, learn from it, and maybe even contribute something. i'm still learning things myself, and building this has taught me a lot more than i expected.

if you find a bug, notice something that could be improved, or just wanna explore how something works, feel free to open an issue or reach out.

thanks for checking it out!
