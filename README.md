# How to run

Here is afew steps you'll need to test my code

## step #1

install node (if you don't have it yet)
here is where you can find it: [nodejs.org](https://nodejs.org/en/download/)

## step #2

clone my repo ( using [git](https://git-scm.com/downloads) ) :

```
git clone https://github.com/AlirezaBalaei/signal-alert.git
```

## step #3

open cloned repo in `cmd` or `terminal` or `gitbash` :

```
cd signal-alert
```

## step #4

install node modules :

```
npm install
```

## step #5

create a `.env` file for API connection :

```
touch .env
```

then enter your `PUBLIC_KEY` and `API_SECRET_KEY` like this :

```
PUBLIC_KEY="your public key"
API_SECRET_KEY="your api secret key"
```

## step #6

run the proxy server :

```
npm run watch
```

## step #7

Then change directory to `./public/` folder and open it as a live server or just run it on chrome.
