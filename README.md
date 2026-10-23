# What's the platform?

MindState is a youth led platform, magazine and community, and in this repo I've included the details and code about the website I've been building for it. The website is a place where people can read articles, see artworks and even post their own work, and/or collaborate to work with other writers/artists.

I've built the platform mostly using Django with some react components to make the platform attractive and interactive. And for the design, I used figma to design every screen and component, I wanted to make a platform which doesn't feel like a normal modern site, so I made it cream paper themed alongside using forest green colors and a magazine like theme. I've used the "Google Sans Flex" font and "Instrument Serif" fonts which are open source.

## Cutting to the chase

So, there's alot to cover in the platform, but I'll be quick 

Articles and Art : So as I mentioned it's a magazine platform, so we have a place for articles to be displaced, alongside a dedicated place for reviewing Arts aswell.

Submissions and Review : So we didn't want to be in any trouble of displaying some bad stuff on the site, so this led to me creating a moderation system, which isn't using AI but manual human review, and I think that's better (especially if you have people in your team to do the job). So anyone can create an account on the platform and post whatever they want, the team will review everything on the admin dashboard and will either approve/disapprove it accordingly. Pretty simple stuff.

Collaboration : So this took a while for me to build, because I ruined it a few times, but it now fully done so y'all don't need to worry. Uh so this part is basically for two people to work on a single post altogether. Quite simply a collaboration space as you must've understood by now. For example me (Rudransh) and you (Let's name you "Star") are two individuals, I wanna make a post on anything, like for example I proposed the title to be "the teen life" and you (Star) are interested in the topic as I'm, you can post a request to start working on the post alongside me, the work can be divided like me writing the whole article and you making drawings which are relevant to the post.

Security : So email code verification, 2FA using auth code (example - Microsoft Authenticator), and password reset is available. You can setup email SMTP for it to work.

Profiles : So any member can customize their profiles with 3 main themes, several images and a scrapbook like design. The platform automatically uses their posts and takes out best part of their articles/art posts and puts them on their profiles.

## running it up

So for trying the platform yourself LOCALLY, you'll need to install oython 3.12 OR higher. And if you're gonna rebuild the reacct components or change the platform's UI, you'll need node.js. 

So for running it, first, clone it and set everything up:

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
Once you've done that, open https://localhost:3000/ and boom, you're now gonna be able to access the site.
Also, the local version includes a few articles so it's not completely empty for when you're looking.

## Frontend

So as mentioned earlier, I've used Django's normal templates for the development alongside react for some interactive and cool stuff, so if you're planning to change some of the things, you can install the dependencies and rebuild them, using :ebuild them using:

```powershell
npm ci --prefix frontend
npm run check --prefix frontend
npm run build --prefix frontend
```
Everything will be built into `static/enhanced/`, which will directly be served by django, so you don't need a separate react server running.

## emails and private files
Emails won't work because by default they're disabled. 
If you want to setup email locally on Windows, use these commands :

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\configure-local-smtp.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-local.ps1 -Port 3000
```
The first script will ask for your SMTP passcode, so enter it safely.
The second script will load these credentials while starting the server.
!!!Don't put passwords directly into the code or commit the local info, it's really not worth leaking them lol.entally leaking them lol.

So in default the email setup uses Google Workspace SMTP, port 587.

## Testing

So I've added some automated tests for several parts of the platform (just so you don't have to work hard on them), and for running them, use these :

```powershell
python manage.py check
python manage.py test accounts alpha --noinput
npm run check --prefix frontend
npm run build --prefix frontend
```
The tests would use their own temporary databases and fake inboxes.
And ofcourse automated tests won't be able to catch everything, some still would be needed to be checked manually.

## Deploying it

One of the last parts, deploying, the moment when the developer gets those butterfly effects, haha.
But before deploying your own version of MindState (or whatever you name it) you'll need to do a few things first :

You'll need a new `DJANGO_SECRET_KEY`, with a proper host and csrf settings. Storage for private files, a production db and an email setup as guided above.

## Credits 

I have used a few existing libraries and components during the development of MindState, so i wanted to make sure the people behind them get proper credit.

Some components are adapted from arc UI (https://uiarc.dev), by "Elia Kuratli", under MIT Licence.

Credits for the articles and Artwork are already included in the content packs and the reading templates.

Also, even though the code is public, it simply doesn't mean everything on the site is free to reuse, like the MindState name is a registered non - profit in Germany (MindState e.V.), it's branding, articles, logo, illustrations (designed by members of MindState) and all the work submitted on the site belongs to their respective owners/creators, so please respect the permissions attached to them, along with the licenses of all the libraries used.

## That's pretty much it

I started working on MindState because I wanted to help create a space where young people could share what they think and write, and what matters to them, and also making art without everything feeling overly formal or complicated.

Since then the platform has grown quite a bit, but I'm still working on improving it.

I decided to make the code public so anyone can explore it, learn using the code and maybe even contribute something

If you find a bug or notice anything that can be improved, feel free to open an issue or reach out to me (contact@rudransh.me)

Thanks for checking it out pookie!
