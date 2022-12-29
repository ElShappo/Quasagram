# Quasagram

## Lite version of Instagram
Quasagram is simple web app that tends to be similar to the well-known Instagram app. For now it is NOT hosted on the web, however this is planned in the nearest future.

## Under the hood
Quasagram uses Firebase for storing posts which user sends. The frontend is written on Quasar framework running on Vue3.

## How to run the project
The steps below will guide you on how to run the project on your local machine.

### Modify index.js inside /backend folder
You should have your own SDK admin key in order to start using Firebase API.
As soon as you have generated the JSON config file storing your credentials,
you may now replace the existing path with your own:
```
const serviceAccount = require("./quasagram-6b4de-8e066134a44f.json"); // original string
const serviceAccount = require(<path_to_your_config>); // modified string
```
A few reading on how to generate your own SDK admin key and JSON config file with credentials can be found
here: https://firebase.google.com/docs/admin/setup?hl=en&authuser=0

### Install the dependencies (should be done twice: inside project root folder and /backend folder)
```bash
yarn
# or
npm install
```

### Run the server
Inside /backend folder run the following script (you may need to install nodemon npm package first):
```
npm start
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).

