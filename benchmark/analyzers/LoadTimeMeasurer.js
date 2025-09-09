class LoadTimeMeasurer {
  constructor(httpCollector) {
    this.httpCollector = httpCollector;
    this.pages = ['/', '/dashboard', '/profile', '/settings'];
  }

  async measureLoadTimes(app) {
    console.log(`⏱️  Measuring load times for ${app.name}...`);
    
    const loadTimes = await this.measureAllPages(app);
    const result = this.calculateLoadTimeStats(loadTimes);
    
    this.logLoadTimeResults(result);
    return result;
  }

  async measureAllPages(app) {
    const loadTimes = [];
    
    for (const pagePath of this.pages) {
      const measurement = await this.measurePage(app, pagePath);
      if (measurement) {
        loadTimes.push(measurement);
      }
    }
    
    return loadTimes;
  }

  async measurePage(app, pagePath) {
    try {
      const response = await this.httpCollector.getDetailedHTTPMetrics(`${app.url}${pagePath}`);
      const measurement = this.createPageMeasurement(pagePath, response);
      
      console.log(`   ${pagePath}: ${response.metrics.totalTime.toFixed(2)}ms (TTFB: ${response.metrics.ttfb.toFixed(2)}ms, ${(response.size / 1024).toFixed(2)} KB)`);
      return measurement;
    } catch (error) {
      console.log(`   ⚠️  Failed to load ${pagePath}: ${error.message}`);
      return null;
    }
  }

  createPageMeasurement(pagePath, response) {
    return { 
      page: pagePath, 
      loadTime: response.metrics.totalTime,
      ttfb: response.metrics.ttfb,
      size: response.size,
      statusCode: response.statusCode,
      metrics: response.metrics
    };
  }

  calculateLoadTimeStats(loadTimes) {
    return {
      averageLoadTime: this.calculateAverage(loadTimes, 'loadTime'),
      averageTTFB: this.calculateAverage(loadTimes, 'ttfb'),
      maxLoadTime: Math.max(...loadTimes.map(lt => lt.loadTime)),
      minLoadTime: Math.min(...loadTimes.map(lt => lt.loadTime)),
      maxTTFB: Math.max(...loadTimes.map(lt => lt.ttfb)),
      minTTFB: Math.min(...loadTimes.map(lt => lt.ttfb)),
      totalSize: loadTimes.reduce((sum, lt) => sum + lt.size, 0),
      measurements: loadTimes
    };
  }

  calculateAverage(loadTimes, property) {
    return loadTimes.reduce((sum, lt) => sum + lt[property], 0) / loadTimes.length;
  }

  logLoadTimeResults(result) {
    console.log(`   📊 Average: ${result.averageLoadTime.toFixed(2)}ms, TTFB: ${result.averageTTFB.toFixed(2)}ms, Total size: ${(result.totalSize / 1024).toFixed(2)} KB`);
  }
}

module.exports = { LoadTimeMeasurer };
