import { Link } from 'wouter-preact';
import { useState } from 'preact/hooks';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'system',
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showLocation: true
    },
    language: 'en'
  });

  const handleThemeChange = (theme: string) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handlePrivacyChange = (type: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value
      }
    }));
  };

  return (
    <div className="settings-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Settings</h1>
          <Link href="/" className="back-link">← Back to Home</Link>
        </header>

        <div className="settings-content">
          <div className="settings-section">
            <h2 className="section-title">Appearance</h2>
            <div className="setting-group">
              <label className="setting-label">Theme</label>
              <div className="theme-options">
                <button
                  className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </button>
                <button
                  className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </button>
                <button
                  className={`theme-btn ${settings.theme === 'system' ? 'active' : ''}`}
                  onClick={() => handleThemeChange('system')}
                >
                  System
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Notifications</h2>
            <div className="setting-group">
              <label className="setting-label">Email Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleNotificationChange('email', (e.target as HTMLInputElement).checked)}
                className="setting-checkbox"
              />
            </div>
            <div className="setting-group">
              <label className="setting-label">Push Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) => handleNotificationChange('push', (e.target as HTMLInputElement).checked)}
                className="setting-checkbox"
              />
            </div>
            <div className="setting-group">
              <label className="setting-label">SMS Notifications</label>
              <input
                type="checkbox"
                checked={settings.notifications.sms}
                onChange={(e) => handleNotificationChange('sms', (e.target as HTMLInputElement).checked)}
                className="setting-checkbox"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Privacy</h2>
            <div className="setting-group">
              <label className="setting-label">Public Profile</label>
              <input
                type="checkbox"
                checked={settings.privacy.profilePublic}
                onChange={(e) => handlePrivacyChange('profilePublic', (e.target as HTMLInputElement).checked)}
                className="setting-checkbox"
              />
            </div>
            <div className="setting-group">
              <label className="setting-label">Show Email</label>
              <input
                type="checkbox"
                checked={settings.privacy.showEmail}
                onChange={(e) => handlePrivacyChange('showEmail', (e.target as HTMLInputElement).checked)}
                className="setting-checkbox"
              />
            </div>
            <div className="setting-group">
              <label className="setting-label">Show Location</label>
              <input
                type="checkbox"
                checked={settings.privacy.showLocation}
                onChange={(e) => handlePrivacyChange('showLocation', (e.target as HTMLInputElement).checked)}
                className="setting-checkbox"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Language</h2>
            <div className="setting-group">
              <label className="setting-label">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: (e.target as HTMLSelectElement).value }))}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>

          <div className="settings-actions">
            <button className="btn primary">Save Settings</button>
            <button className="btn secondary">Reset to Defaults</button>
          </div>
        </div>
      </div>
    </div>
  );
}
