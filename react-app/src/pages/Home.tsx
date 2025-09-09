import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <header className="header">
          <h1 className="title">Welcome to React App</h1>
          <p className="subtitle">A powerful JavaScript library for building user interfaces</p>
        </header>
        
        <nav className="navigation">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </nav>

        <main className="main-content">
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Rich Ecosystem</h3>
              <p>React has a vast ecosystem of libraries, tools, and community support.</p>
            </div>
            <div className="feature-card">
              <h3>Concurrent Features</h3>
              <p>React 18+ includes concurrent rendering and automatic batching for better performance.</p>
            </div>
            <div className="feature-card">
              <h3>Developer Tools</h3>
              <p>Excellent debugging tools and development experience with React DevTools.</p>
            </div>
            <div className="feature-card">
              <h3>Component Architecture</h3>
              <p>Reusable components make development faster and code more maintainable.</p>
            </div>
            <div className="feature-card">
              <h3>Virtual DOM</h3>
              <p>Efficient rendering through virtual DOM diffing for optimal performance.</p>
            </div>
            <div className="feature-card">
              <h3>Hooks System</h3>
              <p>Modern state management and side effects with React Hooks.</p>
            </div>
            <div className="feature-card">
              <h3>Server Components</h3>
              <p>Next.js 13+ introduces server components for better performance and SEO.</p>
            </div>
            <div className="feature-card">
              <h3>TypeScript Integration</h3>
              <p>Excellent TypeScript support with comprehensive type definitions.</p>
            </div>
            <div className="feature-card">
              <h3>Testing Support</h3>
              <p>Comprehensive testing ecosystem with Jest, React Testing Library, and more.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
