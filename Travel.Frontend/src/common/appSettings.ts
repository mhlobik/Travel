import * as _ from 'lodash';

declare const __DEV__: boolean; // from webpack

const _PORT: string = '44231';
const _APP_VERSION: string = '1.0.0';

class AppSettings {
  public port: string;
  public appVersion: string;
  public hostName: string;

  constructor() {
    this.port = _PORT;
    this.appVersion = _APP_VERSION;
    this.hostName = '';
  }
}

class AppSettingsProvider {
  public currentSettings: AppSettings;

  public isDiagnosticsEnabled: boolean;
  public initialRoute: string;

  constructor() {
    this.currentSettings = new AppSettings();
    const windowCheck = <any>window;
    this.initialRoute = '/home';
    this.refreshAppSettings();
  }

  public refreshAppSettings() {
    try {
      this.currentSettings.port = _PORT;
      this.currentSettings.appVersion = _APP_VERSION;
      this.currentSettings.hostName = 'browser';
    } catch (e) {
      console.error(e);
      this.currentSettings = new AppSettings();
    }
  }

  public saveSettings() {
    try {
      localStorage.setItem('port', this.currentSettings.port);
    } catch (e) {
      console.error(e);
    }
  }

  public isFullLoggingEnabled() {
    return __DEV__ || this.isDiagnosticsEnabled;
  }

  public getInitialRoute(): string {
    return this.initialRoute;
  }
}

const provider = new AppSettingsProvider();
export default provider as AppSettingsProvider;
