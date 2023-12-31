# React Native Custom Modal

[CustomSwipeModal.webm](https://github.com/Hritik-Arora/ReactNativeCustomModal/assets/41345450/a46a5bca-8f8b-4cda-a31b-2cfef671b5e0)

A custom React Native Modal implementation. The Modal supports the following functionalities:-

a) Support sliding from all directions (i.e. Top, Bottom, Left and Right).

b) Support child components.

c  Opening and Closing of Modal should be animated.

d) Support closing on backdrop press. This should be configurable using prop.

e) Support closing on sliding in the direction of opening - i.e. if modal is opened from top it should close back to top only.

The Modal has been made just with the React Native APIs, and no library and Native side code has been used.


Video for reference:- https://drive.google.com/file/d/1hLXKu945_85hsIjJq9JpzF-hNXPlhOjZ/view?usp=drivesdk

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
