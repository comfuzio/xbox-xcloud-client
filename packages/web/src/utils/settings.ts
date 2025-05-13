import { getLocalStorage, setLocalStorage } from "./localstorage";

export interface DefaultSettings {
  ui: {
    tile_size: number;
  };
}

export default class SettingsUtil {
  settings: DefaultSettings;

  constructor() {
    const localSettings = getLocalStorage("settings");

    if (localSettings !== null) {
      this.settings = JSON.parse(localSettings);
    } else {
      this.settings = this.getDefaultSettings();
    }
  }

  getDefaultSettings(): DefaultSettings {
    return {
      ui: {
        tile_size: 250,
      },
    };
  }

  updateSettings(newSettings: DefaultSettings) {
    this.settings = newSettings;
    setLocalStorage("settings", JSON.stringify(this.settings));
  }
}
