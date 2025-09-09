import { Link } from 'wouter-preact';

export default function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <header className="header">
          <h1 className="title">Welcome to Preact App</h1>
          <p className="subtitle">A lightweight React alternative</p>
        </header>
        
        <nav className="navigation">
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/profile" className="nav-link">Profile</Link>
          <Link href="/settings" className="nav-link">Settings</Link>
        </nav>

        <main className="main-content">
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Fast Performance</h3>
              <p>Preact is only 3KB gzipped, making it incredibly fast to load and run.</p>
            </div>
            <div className="feature-card">
              <h3>React Compatible</h3>
              <p>Drop-in replacement for React with the same API and ecosystem.</p>
            </div>
            <div className="feature-card">
              <h3>Modern Features</h3>
              <p>Supports hooks, context, and all modern React patterns.</p>
            </div>
            <div className="feature-card">
              <h3>Small Bundle Size</h3>
              <p>Minimal footprint with maximum functionality and performance.</p>
            </div>
            <div className="feature-card">
              <h3>Developer Experience</h3>
              <p>Excellent tooling and debugging capabilities for modern development.</p>
            </div>
            <div className="feature-card">
              <h3>Community Support</h3>
              <p>Active community and extensive documentation for all skill levels.</p>
            </div>
            <div className="feature-card">
              <h3>Production Ready</h3>
              <p>Battle-tested in production environments with proven reliability.</p>
            </div>
            <div className="feature-card">
              <h3>Easy Migration</h3>
              <p>Simple migration path from React with minimal code changes required.</p>
            </div>
            <div className="feature-card">
              <h3>TypeScript Support</h3>
              <p>Full TypeScript support with excellent type definitions and tooling.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
