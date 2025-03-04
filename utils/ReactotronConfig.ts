import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking,
} from "reactotron-react-native"; // eslint-disable-line
// eslint-disable-line

if (__DEV__) {
  // eslint-disable-line
  Reactotron.configure({
    name: "Finity",
  }) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    // .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    // .use(asyncStorage())
    .use(networking())
    .connect(); // let's connect

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;
} else {
  console.tron = console;
}
