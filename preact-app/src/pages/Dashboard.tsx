import { Link } from 'wouter-preact';

export default function Dashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%' },
    { label: 'Revenue', value: '$45,678', change: '+8%' },
    { label: 'Orders', value: '567', change: '+15%' },
    { label: 'Conversion', value: '3.2%', change: '+2%' }
  ];

  const activities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago' },
    { id: 2, action: 'Order #1234 completed', time: '5 minutes ago' },
    { id: 3, action: 'Payment received', time: '10 minutes ago' },
    { id: 4, action: 'User profile updated', time: '15 minutes ago' }
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <Link href="/" className="back-link">← Back to Home</Link>
        </header>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {activities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn primary">Add User</button>
              <button className="action-btn secondary">View Reports</button>
              <button className="action-btn secondary">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
