const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class BenchmarkOrchestrator {
  constructor(httpCollector, bundleAnalyzer, loadMeasurer, memoryAnalyzer, reportGenerator) {
    this.httpCollector = httpCollector;
    this.bundleAnalyzer = bundleAnalyzer;
    this.loadMeasurer = loadMeasurer;
    this.memoryAnalyzer = memoryAnalyzer;
    this.reportGenerator = reportGenerator;
    
    this.baseUrl = 'http://localhost';
    this.apps = {
      react: { name: 'React', url: `${this.baseUrl}/react` },
      preact: { name: 'Preact', url: `${this.baseUrl}/preact` }
    };
    this.results = this.initializeResults();
  }

  initializeResults() {
    return {
      react: {},
      preact: {},
      timestamp: new Date().toISOString(),
      summary: {}
    };
  }

  async run() {
    console.log('🚀 Starting Performance Benchmark...\n');

    try {
      this.checkApplications();
      await this.clearCacheAndWarmUp();
      await this.benchmarkReactApp();
      await this.benchmarkPreactApp();
      this.saveResults();
      this.reportGenerator.generateReport(this.results);

    } catch (error) {
      console.error('❌ Benchmark failed:', error.message);
      process.exit(1);
    }
  }

  checkApplications() {
    console.log('🔍 Checking application accessibility...');
    
    for (const [key, app] of Object.entries(this.apps)) {
      this.verifyAppAccessibility(app);
    }
  }

  verifyAppAccessibility(app) {
    try {
      execSync(`curl -s -f "${app.url}" > /dev/null`, { encoding: 'utf8' });
      console.log(`   ✅ ${app.name} is accessible`);
    } catch (error) {
      throw new Error(`${app.name} is not accessible at ${app.url}`);
    }
  }

  async clearCacheAndWarmUp() {
    console.log('🧹 Clearing cache and warming up applications...');
    
    for (const [key, app] of Object.entries(this.apps)) {
      await this.warmUpApp(app);
    }
    
    await this.delay(1000);
  }

  async warmUpApp(app) {
    try {
      await this.httpCollector.getDetailedHTTPMetrics(app.url);
      console.log(`   🔥 ${app.name} warmed up`);
    } catch (error) {
      console.log(`   ⚠️  Failed to warm up ${app.name}: ${error.message}`);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async benchmarkReactApp() {
    console.log('\n=== React App Benchmarks ===');
    this.results.react.bundleSize = await this.bundleAnalyzer.analyzeBundleSize(this.apps.react);
    this.results.react.loadTimes = await this.loadMeasurer.measureLoadTimes(this.apps.react);
    this.results.react.memory = this.memoryAnalyzer.calculateMemoryUsage(this.results.react.bundleSize.resources);
  }

  async benchmarkPreactApp() {
    console.log('\n=== Preact App Benchmarks ===');
    this.results.preact.bundleSize = await this.bundleAnalyzer.analyzeBundleSize(this.apps.preact);
    this.results.preact.loadTimes = await this.loadMeasurer.measureLoadTimes(this.apps.preact);
    this.results.preact.memory = this.memoryAnalyzer.calculateMemoryUsage(this.results.preact.bundleSize.resources);
  }

  saveResults() {
    const resultsPath = path.join(__dirname, '..', 'performance-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
    console.log(`💾 Results saved to ${resultsPath}`);
  }
}

module.exports = { BenchmarkOrchestrator };
