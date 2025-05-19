import { ConfigContext, ExpoConfig } from "expo/config";
const { version, versionCode, buildNumber } = require("./info.json");

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = "af5d0018-6e7c-49c0-94f5-111e69948c77";
const PROJECT_SLUG = "finity-rewards";
const OWNER = "finity-rewards";

// App production config
const APP_NAME = "Finity Rewards";
const BUNDLE_IDENTIFIER = "co.finity.reward.uk";
const PACKAGE_NAME = "co.finity.reward.uk";
const ICON = "./assets/images/appstore.png";
const ADAPTIVE_ICON = "./assets/images/playstore.png";
const SCHEME = "finity-rewards";

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV);
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as "development" | "preview" | "production") ||
        "development"
    );

  return {
    ...config,
    name: name,
    version,
    slug: PROJECT_SLUG,
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    splash: {
      image: "./assets/images/splash-default.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    ios: {
      buildNumber,
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      versionCode,
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff"
      },
      package: packageName
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: ["expo-router", "expo-localization"],
    experiments: {
      typedRoutes: true
    },
    owner: OWNER
  };
};

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: "./assets/images/appstore-prev.png",
      adaptiveIcon: "./assets/images/appstore-prev.png",
      scheme: `${SCHEME}-prev`
    };
  }

  return {
    name: APP_NAME,
    bundleIdentifier: BUNDLE_IDENTIFIER,
    packageName: PACKAGE_NAME,
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    scheme: SCHEME
  };
};
