# Preact vs React Performance Benchmark

A comprehensive performance comparison between **Preact** and **React** frameworks, measuring actual performance metrics across identical applications.

## 🎯 Project Overview

This benchmark compares two identical applications built with:
- **4 identical pages**: Home, Dashboard, Profile, Settings
- **Modern routing**: React Router for React, Wouter for Preact
- **Custom CSS**: No external UI libraries for fair comparison
- **TypeScript**: Type safety in both applications
- **Vite**: Fast build tooling for both apps

## 🏗️ Architecture

```
preact-vs-react-benchmark/
├── react-app/                 # React application
│   ├── src/
│   │   ├── pages/            # 4 main pages
│   │   ├── components/       # UI components
│   │   └── styles.css        # Custom CSS
│   ├── Dockerfile
│   └── package.json
├── preact-app/               # Preact application
│   ├── src/
│   │   ├── pages/           # 4 main pages
│   │   ├── components/      # UI components
│   │   └── styles.css       # Custom CSS
│   ├── Dockerfile
│   └── package.json
├── benchmark/               # Modular performance testing framework
│   ├── main.js             # Entry point
│   ├── PerformanceBenchmark.js  # Main coordinator
│   ├── collectors/         # Data collection layer
│   │   └── HttpMetricsCollector.js  # HTTP requests & metrics
│   ├── analyzers/          # Analysis layer
│   │   ├── BundleAnalyzer.js       # Bundle size analysis
│   │   ├── LoadTimeMeasurer.js     # Load time measurements
│   │   └── MemoryAnalyzer.js       # Memory usage analysis
│   ├── reports/            # Reporting layer
│   │   └── ReportGenerator.js      # Report generation
│   └── orchestrators/      # Orchestration layer
│       └── BenchmarkOrchestrator.js # Process coordination
├── docker-compose.yml       # Container orchestration
├── nginx.conf              # Load balancer config
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Running the Applications

1. **Clone and setup**:
   ```bash
   git clone https://github.com/vladyslav-panchenko280/preact-vs-react-benchmark.git
   cd preact-vs-react-benchmark
   npm install
   ```

2. **Start with Docker**:
   ```bash
   npm run docker:up
   ```

3. **Access the applications**:
   - React App: http://localhost/react
   - Preact App: http://localhost/preact
   - Direct access: http://localhost:3000 (React) and http://localhost:3001 (Preact)

### Development Mode

```bash
# React app
npm run dev:react

# Preact app  
npm run dev:preact
```

## 📊 Performance Metrics

Our benchmark measures the following key performance indicators:

### 1. Bundle Size Analysis
- **Total Bundle Size**: Combined JavaScript and CSS file sizes
- **JavaScript Size**: Core framework and application code
- **CSS Size**: Stylesheet file size
- **File Count**: Number of assets loaded

### 2. Load Time Performance
- **Average Load Time**: Mean time across all pages
- **Maximum Load Time**: Slowest page load time
- **Minimum Load Time**: Fastest page load time
- **Per-page Measurements**: Individual page load times

### 3. Core Web Vitals (Lighthouse)
- **Performance Score**: Overall Lighthouse performance rating (0-100)
- **First Contentful Paint (FCP)**: When first content appears
- **Largest Contentful Paint (LCP)**: When main content loads
- **Speed Index**: How quickly content is visually displayed
- **Total Blocking Time (TBT)**: Time when page is blocked from responding
- **Cumulative Layout Shift (CLS)**: Visual stability measure
- **Time to Interactive (TTI)**: When page becomes fully interactive

### 4. Memory Usage
- **Average JS Heap Size**: Mean JavaScript memory consumption
- **Maximum JS Heap Size**: Peak memory usage
- **Per-page Memory**: Memory usage for each page

## 🔍 Key Differences

### React App
- **Framework**: React 19 with concurrent features
- **Router**: React Router v7
- **Bundle**: Larger initial bundle (~230KB)
- **Features**: Full React ecosystem compatibility

### Preact App
- **Framework**: Preact 10 (React-compatible, smaller)
- **Router**: Wouter (lightweight router)
- **Bundle**: Smaller initial bundle (~7KB)
- **Features**: React-compatible API with smaller footprint

## 🧪 Running Benchmarks

### Complete Performance Benchmark

```bash
# Start the applications first
npm run docker:up

# Run comprehensive performance tests
npm run benchmark
# or directly:
node benchmark/main.js
```

### Benchmark Output

The modular benchmark framework generates:
- **Console Report**: Real-time performance metrics with detailed comparisons
- **JSON Results**: Comprehensive data saved to `benchmark/performance-results.json`
- **Comparative Analysis**: Side-by-side framework comparison with winners
- **Modular Processing**: Each analysis layer processes data independently

## 📈 Expected Results

Based on typical performance characteristics:

### Preact Advantages
- ✅ **Smaller bundle size** (~7KB vs ~230KB for React)
- ✅ **Faster initial load** due to smaller bundle
- ✅ **Lower memory usage** in most scenarios
- ✅ **Better performance** on low-end devices
- ✅ **Reduced bandwidth** consumption

### React Advantages
- ✅ **Better ecosystem** and third-party library support
- ✅ **More mature tooling** and debugging tools
- ✅ **Concurrent features** (React 19+)
- ✅ **Better long-term support** and community
- ✅ **Faster load times** on fast connections (due to optimization)

## 📋 Pages Implemented

### 1. Home Page
- Welcome message and feature overview
- Navigation to other pages
- Card-based layout showcasing capabilities

### 2. Dashboard Page
- Statistics cards with mock data
- Recent activity feed
- Quick action buttons
- Responsive grid layout

### 3. Profile Page
- User information form
- Profile picture placeholder
- Account statistics
- Form validation and state management

### 4. Settings Page
- Theme selection (light/dark/system)
- Notification preferences
- Security settings
- Application preferences

## 🎨 UI Components

Both applications use identical custom CSS components:
- **Button** - Various variants and sizes
- **Card** - Content containers
- **Input** - Form inputs
- **Label** - Form labels
- **Navigation Menu** - Site navigation

## 🔧 Development Scripts

```bash
# Development
npm run dev:react          # Start React dev server
npm run dev:preact         # Start Preact dev server

# Building
npm run build:react        # Build React app
npm run build:preact       # Build Preact app

# Docker
npm run docker:build       # Build Docker images
npm run docker:up          # Start all services
npm run docker:down        # Stop all services

# Benchmarking
npm run benchmark          # Run performance tests (via main.js)
node benchmark/main.js     # Direct benchmark execution
```

## 🛠️ Technical Implementation

### Build Configuration
Both apps use:
- **Vite** for fast development and optimized builds
- **TypeScript** for type safety
- **Custom CSS** for styling (no external frameworks)
- **Docker** for containerized deployment

### Docker Setup
- **Multi-stage builds** for optimized production images
- **Nginx** for load balancing and serving
- **Alpine Linux** for minimal image size

### Measurement Methodology
Our benchmark uses **exact HTTP measurements** rather than browser-based tools:

**Load Time Metrics:**
- **TTFB (Time to First Byte)**: Measured from HTTP request start to first response byte
- **Total Load Time**: Complete HTTP request duration
- **Bundle Size**: Actual file sizes from Content-Length headers

**Memory Metrics:**
- **Memory Delta**: Difference in `process.memoryUsage().heapUsed` before/after HTTP requests
- **Positive values**: Memory allocated during request processing
- **Sensitive to timing**: Results may vary due to Node.js garbage collection

**Core Web Vitals Approximation:**
- **FCP**: HTML TTFB + fastest resource load time
- **LCP**: HTML TTFB + slowest resource load time  
- **TTI**: HTML TTFB + maximum resource load time
- **Note**: These are network-based approximations, not true browser measurements

## 📊 Benchmark Results

### Performance Comparison
| Metric | React | Preact | Winner |
|--------|-------|--------|--------|
| **Bundle Size** | 231.74 KB | 35.01 KB | 🏆 **Preact** |
| **JavaScript Size** | 224.96 KB | 28.23 KB | 🏆 **Preact** |
| **CSS Size** | 6.78 KB | 6.78 KB | 🤝 **Tie** |
| **Load Time (Avg)** | 1.66 ms | 1.51 ms | 🏆 **Preact** |
| **TTFB (Avg)** | 1.59 ms | 1.44 ms | 🏆 **Preact** |
| **FCP** | 10 ms | 5 ms | 🏆 **Preact** |
| **LCP** | 17 ms | 6 ms | 🏆 **Preact** |
| **TTI** | 17 ms | 6 ms | 🏆 **Preact** |
| **Memory Usage** | 47.28 KB | 51.30 KB | 🏆 **React** |

### Key Findings

**Preact Advantages:**
- 🎯 **84.9% smaller bundle size** (35.01 KB vs 231.74 KB)
- 🚀 **8.0x smaller JavaScript** (28.23 KB vs 224.96 KB)
- ⚡ **9.4% faster load times** (1.51ms vs 1.66ms average)
- 🎯 **9.4% faster TTFB** (1.44ms vs 1.59ms)
- 📊 **Better Core Web Vitals** across all metrics (FCP: 5ms vs 10ms, LCP: 6ms vs 17ms, TTI: 6ms vs 17ms)
- 💾 **Significant bandwidth savings**
- 📱 **Better for mobile/low-bandwidth scenarios**
- 🌊 **Better waterfall performance** (4.18ms vs 17.87ms total load time)

**React Advantages:**
- 🧠 **8.5% less memory usage** (47.28 KB vs 51.30 KB)
- 🔧 **More mature ecosystem** and tooling
- 📚 **Better long-term support** and community
- 🏢 **Enterprise-grade features** and stability
- ⚡ **Better parallel efficiency** (62.7% vs 50.0%)

## 🎯 When to Choose Each Framework

### Choose Preact When:
- **Bundle size matters** (mobile apps, embedded systems) - 84.9% smaller
- **Performance is critical** (real-time applications, gaming) - 9.4% faster load times
- **Bandwidth is limited** (developing countries, slow connections) - 8.0x smaller JS
- **Fast load times** are essential (e-commerce, content sites) - Better Core Web Vitals
- **Quick prototyping** (faster development cycles)
- **Waterfall performance** is important (4.18ms vs 17.87ms total load time)

### Choose React When:
- **Large applications** with complex state management
- **Enterprise applications** requiring extensive ecosystem
- **Applications** needing React 19+ concurrent features
- **Teams** already invested in React ecosystem
- **Long-term maintenance** is a priority
- **Memory optimization** is critical (React uses 8.5% less memory: 47.28 KB vs 51.30 KB)
- **Complex UI interactions** requiring mature tooling
- **Parallel efficiency** is important (62.7% vs 50.0% efficiency)

## 🔮 Future Enhancements

### Framework Enhancements
- [ ] Add server-side rendering comparison
- [ ] Include mobile performance testing
- [ ] Add accessibility benchmarking
- [ ] Implement realistic usage patterns simulation
- [ ] Add bundle analysis with webpack-bundle-analyzer
- [ ] Include runtime performance metrics

### Architecture Improvements
- [ ] Add unit tests for each module
- [ ] Implement dependency injection container
- [ ] Add configuration management system
- [ ] Create CLI interface with options
- [ ] Add logging framework
- [ ] Implement plugin system for custom analyzers
- [ ] Add database persistence for historical data
- [ ] Create web dashboard for results visualization

## 📚 Documentation & Resources

### Framework Documentation
- [Preact Documentation](https://preactjs.com/) - Official Preact docs and guides
- [Preact GitHub Repository](https://github.com/preactjs/preact) - Source code and issues
- [Preact Guide](https://preactjs.com/guide/) - Getting started and best practices
- [Preact API Reference](https://preactjs.com/guide/api-reference) - Complete API documentation
- [React Documentation](https://react.dev/) - Official React docs and tutorials
- [React GitHub Repository](https://github.com/facebook/react) - Source code and issues
- [React Learn](https://react.dev/learn) - Interactive React tutorial
- [React API Reference](https://react.dev/reference/react) - Complete API documentatio

## 📄 License

MIT License - see LICENSE file for details.

---

*This benchmark is designed to provide objective performance comparisons between Preact and React. Results may vary based on specific use cases, device capabilities, and network conditions.*
