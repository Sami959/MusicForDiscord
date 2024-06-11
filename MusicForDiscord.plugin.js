/**
 * @name YouTubeMusicPlugin
 * @description A plugin for BetterDiscord that allows listening to YouTube Music
 * @version 1.0.1
 */

module.exports = class YouTubeMusicPlugin {
    constructor() {
        this.initialized = false;
        this.clientId = '1060794671855-4cs2d2f1br333lb1lr7aq2i9oetca2pj.apps.googleusercontent.com';
        this.redirectUri = 'http://localhost:3000/oauth2callbac';  // Убедитесь, что этот URI совпадает с настройками в Google Developer Console
    }

    load() {
        // Called when the plugin is loaded in BetterDiscord
    }

    start() {
        // Called when the plugin is started
        if (!this.initialized) {
            this.initialized = true;
            this.injectUI();
        }
    }

    stop() {
        // Called when the plugin is stopped
        BdApi.alert("YouTubeMusicPlugin stopped", "The YouTube Music Plugin has been stopped.");
    }

    injectUI() {
        // Creating a settings button in the user settings
        const settingsButton = document.createElement("button");
        settingsButton.innerText = "YouTube Music Settings";
        settingsButton.style = "position: fixed; bottom: 10px; right: 10px; z-index: 1000;";
        settingsButton.onclick = () => {
            BdApi.showConfirmationModal("YouTube Music Settings", this.getSettingsPanel(), {
                confirmText: "Close",
                cancelText: null,
                onCancel: null,
                onConfirm: () => {}
            });
        };
        document.body.appendChild(settingsButton);
    }

    syncAccounts() {
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly`;
        window.open(authUrl, '_blank');
        BdApi.alert("Sync Accounts", "Please authorize the application in the opened window.");
    }

    getSettingsPanel() {
        // Called when the user opens the plugin settings
        const panel = document.createElement("div");
        panel.innerHTML = `
            <h2>YouTube Music Settings</h2>
            <div id="ytmusic-player" style="margin-bottom: 20px;">
                <iframe src="https://music.youtube.com" width="300" height="150"></iframe>
            </div>
            <button id="sync-accounts">Sync Discord and YouTube Accounts</button>
        `;

        panel.querySelector("#sync-accounts").addEventListener("click", this.syncAccounts.bind(this));

        return panel;
    }
};
