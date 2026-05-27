import { useState } from 'react';
import { Bell, Moon, Shield, Zap } from 'lucide-react';
import { Card } from '../components/shared/Card';

const Toggle = ({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    id={id}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-[#2D7A3A]' : 'bg-gray-200'}`}
    role="switch"
    aria-checked={checked}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

export function Settings() {
  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    appointmentReminders: true,
    paymentAlerts: true,
    weeklyReports: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [latency, setLatency] = useState(0);

  const SettingRow = ({ label, description, id, checked, onChange }: {
    label: string; description: string; id: string; checked: boolean; onChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <Toggle id={id} checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in max-w-3xl">

      <Card>
        <h3 className="font-semibold text-gray-900 mb-5">Admin Profile</h3>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2D7A3A, #3B8C47)' }}>
            A
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { label: 'Full Name', value: 'Admin User', id: 'input-admin-name' },
              { label: 'Email', value: 'admin@jivahealth.in', id: 'input-admin-email' },
              { label: 'Role', value: 'Super Admin', id: 'input-admin-role' },
              { label: 'Phone', value: '+91 98000 00000', id: 'input-admin-phone' },
            ].map(({ label, value, id }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                <input
                  id={id}
                  defaultValue={value}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D7A3A]/20 focus:border-[#2D7A3A]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button id="btn-save-admin-profile" className="px-5 py-2 text-sm font-semibold text-white bg-[#111827] rounded-xl hover:bg-gray-800 transition-colors">
            Save Profile
          </button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2.5 mb-1">
          <Bell className="w-5 h-5 text-[#2D7A3A]" />
          <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">Control which notifications you receive</p>
        <SettingRow id="toggle-email-alerts" label="Email Alerts" description="Receive email updates for critical platform events" checked={notifs.emailAlerts} onChange={(v) => setNotifs({ ...notifs, emailAlerts: v })} />
        <SettingRow id="toggle-appt-reminders" label="Appointment Reminders" description="Get reminded 24 hours before scheduled appointments" checked={notifs.appointmentReminders} onChange={(v) => setNotifs({ ...notifs, appointmentReminders: v })} />
        <SettingRow id="toggle-payment-alerts" label="Payment Alerts" description="Receive alerts for successful and failed payments" checked={notifs.paymentAlerts} onChange={(v) => setNotifs({ ...notifs, paymentAlerts: v })} />
        <SettingRow id="toggle-weekly-reports" label="Weekly Reports" description="Receive weekly summary reports every Monday" checked={notifs.weeklyReports} onChange={(v) => setNotifs({ ...notifs, weeklyReports: v })} />
      </Card>

      <Card>
        <div className="flex items-center gap-2.5 mb-5">
          <Moon className="w-5 h-5 text-[#2D7A3A]" />
          <h3 className="font-semibold text-gray-900">Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Dark Mode</p>
            <p className="text-xs text-gray-400 mt-0.5">Toggle dark mode for the dashboard (preview only)</p>
          </div>
          <Toggle id="toggle-dark-mode" checked={darkMode} onChange={setDarkMode} />
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2.5 mb-5">
          <Zap className="w-5 h-5 text-[#2D7A3A]" />
          <h3 className="font-semibold text-gray-900">Developer Tools</h3>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Mock API Latency Simulator</p>
              <p className="text-xs text-gray-400 mt-0.5">Simulate API response delays for testing (current: {latency}ms)</p>
            </div>
            <span className="text-sm font-mono font-bold text-[#2D7A3A]">{latency}ms</span>
          </div>
          <input
            id="input-api-latency"
            type="range"
            min={0}
            max={2000}
            step={100}
            value={latency}
            onChange={(e) => setLatency(Number(e.target.value))}
            className="w-full accent-[#2D7A3A]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0ms (instant)</span>
            <span>2000ms (slow)</span>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2.5 mb-5">
          <Shield className="w-5 h-5 text-[#2D7A3A]" />
          <h3 className="font-semibold text-gray-900">Security</h3>
        </div>
        <div className="space-y-3">
          <button id="btn-change-password" className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-gray-900">Change Password</p>
            <p className="text-xs text-gray-400 mt-0.5">Update your admin login credentials</p>
          </button>
          <button id="btn-2fa" className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
            <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
            <p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
