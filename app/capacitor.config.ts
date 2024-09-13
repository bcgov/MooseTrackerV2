import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ca.bc.gov.fw.WildlifeTracker",
  appName: "MooseTracker",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
