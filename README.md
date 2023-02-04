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

then enter `CONNECTIONSTRING` and `PORT` and `PROXYPORT` like this :

```
CONNECTIONSTRING="mongodb+srv://<username>:password@cluster0.e5hobwe.mongodb.net/<DataBaseName>?retryWrites=true&w=majority"
PORT=4000
PROXYPORT=3000
```

## step #6

run the server app :

```
npm run watch
```

## step #7

Then change directory to `./public/` folder and open it as a live server or just run it on chrome.

# Pictures

there is some pictures of DB, pages wich user will interact with:

## Data Base

![db-user](https://user-images.githubusercontent.com/99330644/213690015-c2588ff6-9424-41bd-a4da-f88481e469cf.png)

## Home Guest

![home-guest](https://user-images.githubusercontent.com/99330644/213690021-66ae0f99-0fea-4c95-8ee4-8c6e8aced374.png)

## Register

![register](https://user-images.githubusercontent.com/99330644/213690028-55c77238-f925-4fbd-8394-1a2429d0f875.png)

## Home User

![user-home](https://user-images.githubusercontent.com/99330644/216758308-24073724-42b9-4f59-894b-22bafef0ac30.png)

## Invalid Register

![invalid-register](https://user-images.githubusercontent.com/99330644/213690022-b86ca5c5-b5cf-4879-9f4b-25cf4c56c354.png)
