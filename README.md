# Decription

A react-native application to keep track of scores during board games.


# Running localy

## Step 1: Start Metro


```sh
npm start
```

## Step 2: Build and run your app


### Android

```sh
npm run android
```

### Troubleshooting

Some debug logs in terminal

```sh
npx react-native log-android
```

It's not working. Why ?

```sh
npm run react-native-doctor
```


# Installing on local device

```sh
cd android
./gradlew assembleRelease
adb install app/build/outputs/apk/release/app-release.apk
cd ..
```
