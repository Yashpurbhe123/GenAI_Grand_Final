import { useState, useEffect } from 'react';
import { LayoutDashboard, Key, BarChart3, Settings, LogOut, Copy, Check, Trash2, Plus, X, User, Shield, CreditCard, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
}

interface UserSettings {
  email: string;
  notifications: boolean;
  plan: string;
  fullName?: string;
  companyName?: string;
  twoFactor?: boolean;
  billingAddress?: string;
  webhookUrl?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  
  // State
  const [stats, setStats] = useState<any[]>([]);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [settings, setSettings] = useState<UserSettings>({ 
    email: '', 
    notifications: false, 
    plan: 'Enterprise Plan',
    fullName: '',
    companyName: '',
    twoFactor: false,
    billingAddress: '',
    webhookUrl: ''
  });
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'overview') {
      fetch('/api/dashboard-stats')
        .then(res => res.json())
        .then(data => setStats(data));
    } else if (activeTab === 'keys') {
      fetch('/api/keys')
        .then(res => res.json())
        .then(data => setKeys(data));
    } else if (activeTab === 'usage') {
      fetch('/api/analytics')
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => {
          console.log('Analytics data received:', data);
          setAnalytics(data);
        })
        .catch(err => console.error('Error fetching analytics:', err));
    } else if (activeTab === 'settings') {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => setSettings(data));
    }
  }, [activeTab]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const createKey = async () => {
    if (!newKeyName.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/keys', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName })
      });
      const newKey = await res.json();
      setKeys([...keys, newKey]);
      // Refresh stats to show the new key immediately
      if (activeTab === 'overview') {
        fetch('/api/dashboard-stats')
          .then(res => res.json())
          .then(data => setStats(data));
      }
      setIsCreateModalOpen(false);
      setNewKeyName('');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;
    await fetch(`/api/keys/${id}`, { method: 'DELETE' });
    setKeys(keys.filter(k => k.id !== id));
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RealityCheck AI
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enterprise Dashboard</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'keys', icon: Key, label: 'API Keys' },
            { id: 'usage', icon: BarChart3, label: 'Usage Analytics' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">Real-time Data</div>
            </div>

            {stats.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No API keys active. Create a key to see stats.</p>
                <button 
                  onClick={() => setActiveTab('keys')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Go to API Keys &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {stats.map((stat) => (
                  <div key={stat.keyId} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      {stat.keyName}
                      <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {stat.keyId}
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatCard title="Total Requests" value={stat.requests.toLocaleString()} />
                      <StatCard title="Avg. Latency" value={stat.latency} />
                      <StatCard title="Error Rate" value={`${stat.errors}%`} />
                      <StatCard title="Current Cost" value={stat.cost} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-between">
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  {`curl -X POST https://api.realitycheck.ai/analyze-text -d '{"text": "Sample..."}'`}
                </code>
                <button 
                  onClick={() => handleCopy(`curl -X POST https://api.realitycheck.ai/analyze-text -d '{"text": "Sample..."}'`, 'curl')}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  {copiedKeyId === 'curl' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">API Keys</h2>
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Key
              </button>
            </div>

            <div className="space-y-4">
              {keys.map(key => (
                <div key={key.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{key.name}</div>
                      <div className="font-mono text-sm text-gray-500">{key.key}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCopy(key.key, key.id)}
                      className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copiedKeyId === key.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => deleteKey(key.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Usage Analytics</h2>
              <div className="flex gap-2">
                <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
            </div>

            {analytics ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Requests Chart */}
                <AnalyticsCard 
                  title="Total Requests" 
                  value={analytics.requests.total} 
                  change={analytics.requests.change} 
                  isPositive={analytics.requests.isPositive}
                  data={analytics.requests.data}
                  type="bar"
                  color="blue"
                />

                {/* Avg. Latency Chart */}
                <AnalyticsCard 
                  title="Avg. Latency" 
                  value={analytics.latency.avg} 
                  change={analytics.latency.change} 
                  isPositive={analytics.latency.isPositive}
                  data={analytics.latency.data}
                  type="line"
                  color="purple"
                  suffix="ms"
                />

                {/* Error Rate Chart */}
                <AnalyticsCard 
                  title="Error Rate" 
                  value={analytics.errors.rate} 
                  change={analytics.errors.change} 
                  isPositive={analytics.errors.isPositive}
                  data={analytics.errors.data}
                  type="area"
                  color="red"
                  suffix="%"
                />

                {/* Current Cost Chart */}
                <AnalyticsCard 
                  title="Current Cost" 
                  value={analytics.cost.total} 
                  change={analytics.cost.change} 
                  isPositive={analytics.cost.isPositive}
                  data={analytics.cost.data}
                  type="bar"
                  color="green"
                  prefix="$" // The value from backend already has $, but prefix is good for tooltip
                />
              </div>
            ) : (
              <div className="text-center py-12">Loading analytics...</div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Settings Sidebar */}
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <nav className="flex flex-col p-2 space-y-1">
                    {[
                      { id: 'profile', icon: User, label: 'Profile' },
                      { id: 'security', icon: Shield, label: 'Security' },
                      { id: 'billing', icon: CreditCard, label: 'Billing' },
                      { id: 'notifications', icon: Bell, label: 'Notifications' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSettingsTab(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          activeSettingsTab === item.id 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                {/* Profile Section */}
                {activeSettingsTab === 'profile' && (
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                    <div className="space-y-6 max-w-2xl">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {settings.fullName ? settings.fullName.charAt(0) : 'U'}
                        </div>
                        <div>
                          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                            Change Avatar
                          </button>
                          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                          <input 
                            type="text" 
                            value={settings.fullName || ''}
                            onChange={e => setSettings({...settings, fullName: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            placeholder="Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                          <input 
                            type="email" 
                            value={settings.email}
                            onChange={e => setSettings({...settings, email: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            placeholder="user@example.com"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                          <input 
                            type="text" 
                            value={settings.companyName || ''}
                            onChange={e => setSettings({...settings, companyName: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                            placeholder="Acme Inc."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Section */}
                {activeSettingsTab === 'security' && (
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <h3 className="text-xl font-bold mb-6">Security Settings</h3>
                    <div className="space-y-6 max-w-2xl">
                      <div className="flex items-center justify-between p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                        <div className="space-y-1">
                          <div className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</div>
                          <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.twoFactor || false}
                            onChange={e => setSettings({...settings, twoFactor: e.target.checked})}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Password</h4>
                        <button className="text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 px-4 py-2.5 rounded-lg transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Section */}
                {activeSettingsTab === 'billing' && (
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <h3 className="text-xl font-bold mb-6">Billing & Plans</h3>
                    <div className="space-y-8 max-w-2xl">
                      <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Current Plan</span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-md uppercase tracking-wide">Active</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{settings.plan || 'Enterprise Plan'}</div>
                          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Upgrade Plan</button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Payment Method</h4>
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
                              <div className="text-xs text-gray-500">Expires 12/39</div>
                            </div>
                          </div>
                          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Edit</button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Billing Address</label>
                        <input 
                          type="text" 
                          value={settings.billingAddress || ''}
                          onChange={e => setSettings({...settings, billingAddress: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          placeholder="123 Business St, Suite 100"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Section */}
                {activeSettingsTab === 'notifications' && (
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 animate-fade-in">
                    <h3 className="text-xl font-bold mb-6">Notifications</h3>
                    <div className="space-y-6 max-w-2xl">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center h-5">
                            <input 
                              type="checkbox" 
                              id="notifications"
                              checked={settings.notifications}
                              onChange={e => setSettings({...settings, notifications: e.target.checked})}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="notifications" className="font-medium text-gray-900 dark:text-white">Email Notifications</label>
                            <p className="text-sm text-gray-500">Receive emails about your usage, alerts, and product updates.</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Webhooks</h4>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Endpoint URL</label>
                          <input 
                            type="url" 
                            value={settings.webhookUrl || ''}
                            onChange={e => setSettings({...settings, webhookUrl: e.target.value})}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-mono text-sm"
                            placeholder="https://api.yourcompany.com/webhooks"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button (Floating or Fixed) */}
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={saveSettings}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create Key Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create New API Key</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key Name
                </label>
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production App, Test Key"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={createKey}
                  disabled={!newKeyName.trim() || isLoading}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating...' : 'Create Key'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, change, isPositive }: { title: string, value: string, change?: string, isPositive?: boolean }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        {change && (
          <div className={`text-sm font-bold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyticsCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  data, 
  type, 
  color,
  prefix = '',
  suffix = ''
}: { 
  title: string, 
  value: string, 
  change: string, 
  isPositive: boolean, 
  data: number[], 
  type: 'bar' | 'line' | 'area',
  color: 'blue' | 'purple' | 'red' | 'green',
  prefix?: string,
  suffix?: string
}) {
  const [timeRange, setTimeRange] = useState('24h');

  const getColorClass = (c: string) => {
    switch(c) {
      case 'blue': return 'text-blue-600 dark:text-blue-400 bg-blue-500';
      case 'purple': return 'text-purple-600 dark:text-purple-400 bg-purple-500';
      case 'red': return 'text-red-600 dark:text-red-400 bg-red-500';
      case 'green': return 'text-green-600 dark:text-green-400 bg-green-500';
      default: return 'text-blue-600 dark:text-blue-400 bg-blue-500';
    }
  };

  const max = Math.max(...data);


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
            <div className={`text-sm font-bold mb-1 ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {change}
            </div>
          </div>
        </div>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="24h">24h</option>
          <option value="7d">7d</option>
          <option value="30d">30d</option>
        </select>
      </div>

      <div className="h-48 flex items-end gap-1 relative">
        {type === 'bar' && data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
            <div 
              className={`w-full rounded-t-sm opacity-80 hover:opacity-100 transition-all ${getColorClass(color).split(' ')[2]}`}
              style={{ height: `${((d / max) * 100)}%` }}
            ></div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {prefix}{d}{suffix}
            </div>
          </div>
        ))}

        {type === 'line' && (
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={getColorClass(color).split(' ')[0]}
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - ((d / max) * 100);
                return `${x}%,${y}%`;
              }).join(' ')}
            />
            {data.map((d, i) => (
              <circle
                key={i}
                cx={`${(i / (data.length - 1)) * 100}%`}
                cy={`${100 - ((d / max) * 100)}%`}
                r="3"
                className={`${getColorClass(color).split(' ')[0]} fill-current`}
              />
            ))}
          </svg>
        )}

        {type === 'area' && (
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
             <defs>
              <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className={getColorClass(color).split(' ')[0]} />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={getColorClass(color).split(' ')[0]} />
              </linearGradient>
            </defs>
            <polygon
              fill={`url(#gradient-${color})`}
              points={`0,100 ${data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - ((d / max) * 100);
                return `${x}%,${y}%`;
              }).join(' ')} 100,100`}
            />
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={getColorClass(color).split(' ')[0]}
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - ((d / max) * 100);
                return `${x}%,${y}%`;
              }).join(' ')}
            />
          </svg>
        )}
      </div>
    </div>
  );
}
