cd android
./gradlew assembleDebug
adb install app/build/outputs/apk/release/app-debug.apk
cd ..