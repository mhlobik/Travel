import appSettings from './appSettings';

export function getServiceEndpoint() {
    return `http://localhost:${appSettings.currentSettings.port}`;
}
