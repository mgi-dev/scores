# Decription

A react-native application to keep track of scores during board games.

It ain't pretty but it's workin' !


<div style="display: flex; gap: 30px;">

<img src="./screenshots/screenshotMenu.png" alt="Menu overview" width="200" />

<img src="./screenshots/screenshotScores.png" alt="Score overview" width="200" />

</div>

<br/>
<br/>

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
