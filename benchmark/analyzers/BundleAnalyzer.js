class BundleAnalyzer {
  constructor(httpCollector) {
    this.httpCollector = httpCollector;
  }

  async analyzeBundleSize(app) {
    console.log(`📦 Analyzing bundle size for ${app.name}...`);
    
    try {
      const htmlResponse = await this.httpCollector.getDetailedHTTPMetrics(app.url);
      const html = htmlResponse.data;
      const assetUrls = this.extractAssetUrls(html);
      const bundleMetrics = await this.measureAssets(app, assetUrls);
      
      this.logBundleMetrics(bundleMetrics, htmlResponse);
      
      return {
        totalSize: bundleMetrics.totalSize,
        jsSize: bundleMetrics.jsSize,
        cssSize: bundleMetrics.cssSize,
        resourceCount: bundleMetrics.resources.length,
        resources: bundleMetrics.resources,
        htmlMetrics: htmlResponse.metrics,
        resourceTimings: bundleMetrics.resourceTimings,
        waterfallMetrics: this.calculateWaterfallMetrics(bundleMetrics.resourceTimings),
        performanceMetrics: this.calculateExactPerformanceMetrics(bundleMetrics.resourceTimings, htmlResponse.metrics)
      };

    } catch (error) {
      console.log(`   ⚠️  Bundle size analysis failed: ${error.message}`);
      return this.createEmptyBundleMetrics();
    }
  }

  extractAssetUrls(html) {
    const jsMatches = html.match(/src="([^"]*\.js[^"]*)"/g) || [];
    const cssMatches = html.match(/href="([^"]*\.css[^"]*)"/g) || [];
    
    return {
      js: jsMatches.map(match => match.match(/src="([^"]*)"/)[1]),
      css: cssMatches.map(match => match.match(/href="([^"]*)"/)[1])
    };
  }

  async measureAssets(app, assetUrls) {
    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;
    const resources = [];
    const resourceTimings = [];

    for (const url of assetUrls.js) {
      const result = await this.measureAsset(app, url, 'script');
      if (result) {
        jsSize += result.size;
        totalSize += result.size;
        resources.push(result.resource);
        resourceTimings.push(result.timing);
      }
    }

    for (const url of assetUrls.css) {
      const result = await this.measureAsset(app, url, 'stylesheet');
      if (result) {
        cssSize += result.size;
        totalSize += result.size;
        resources.push(result.resource);
        resourceTimings.push(result.timing);
      }
    }

    return { totalSize, jsSize, cssSize, resources, resourceTimings };
  }

  async measureAsset(app, url, type) {
    const fullUrl = url.startsWith('http') ? url : `${app.url}${url}`;
    
    try {
      const resourceResponse = await this.httpCollector.getDetailedHTTPMetrics(fullUrl);
      const size = resourceResponse.size;
      
      return {
        size,
        resource: {
          name: url,
          size: size,
          type: type,
          metrics: resourceResponse.metrics
        },
        timing: {
          name: url,
          startTime: resourceResponse.metrics.totalTime,
          duration: resourceResponse.metrics.totalTime,
          size: size,
          ttfb: resourceResponse.metrics.ttfb
        }
      };
    } catch (e) {
      console.log(`   ⚠️  Failed to fetch ${url}: ${e.message}`);
      return null;
    }
  }

  logBundleMetrics(bundleMetrics, htmlResponse) {
    console.log(`   📊 Total: ${(bundleMetrics.totalSize / 1024).toFixed(2)} KB, JS: ${(bundleMetrics.jsSize / 1024).toFixed(2)} KB, CSS: ${(bundleMetrics.cssSize / 1024).toFixed(2)} KB`);
    console.log(`   ⏱️  HTML TTFB: ${htmlResponse.metrics.ttfb.toFixed(2)}ms, Total: ${htmlResponse.metrics.totalTime.toFixed(2)}ms`);
    console.log(`   🌊 Waterfall: ${this.calculateWaterfallMetrics(bundleMetrics.resourceTimings).totalLoadTime.toFixed(2)}ms (${bundleMetrics.resourceTimings.length} resources)`);
  }

  createEmptyBundleMetrics() {
    return { 
      totalSize: 0, 
      jsSize: 0, 
      cssSize: 0, 
      resourceCount: 0, 
      resources: [],
      htmlMetrics: {},
      resourceTimings: [],
      waterfallMetrics: {},
      performanceMetrics: {}
    };
  }

  calculateWaterfallMetrics(resourceTimings) {
    if (resourceTimings.length === 0) {
      return this.createEmptyWaterfallMetrics();
    }

    const sorted = resourceTimings.sort((a, b) => a.startTime - b.startTime);
    const timeBounds = this.calculateTimeBounds(sorted);
    
    return {
      totalLoadTime: timeBounds.maxEndTime - timeBounds.minStartTime,
      parallelLoadTime: this.calculateParallelLoadTime(sorted, timeBounds),
      sequentialLoadTime: this.calculateSequentialLoadTime(sorted),
      maxConcurrent: Math.min(sorted.length, 6),
      resourceCount: sorted.length
    };
  }

  createEmptyWaterfallMetrics() {
    return {
      totalLoadTime: 0,
      parallelLoadTime: 0,
      sequentialLoadTime: 0,
      maxConcurrent: 0,
      resourceCount: 0
    };
  }

  calculateTimeBounds(sorted) {
    const endTimes = sorted.map(r => r.startTime + r.duration);
    return {
      maxEndTime: Math.max(...endTimes),
      minStartTime: Math.min(...sorted.map(r => r.startTime))
    };
  }

  calculateParallelLoadTime(sorted, timeBounds) {
    const avgResourceTime = sorted.reduce((sum, r) => sum + r.duration, 0) / sorted.length;
    const totalLoadTime = timeBounds.maxEndTime - timeBounds.minStartTime;
    return Math.max(avgResourceTime, totalLoadTime / sorted.length);
  }

  calculateSequentialLoadTime(sorted) {
    return sorted.reduce((sum, r) => sum + r.duration, 0);
  }

  calculateExactPerformanceMetrics(resourceTimings, htmlMetrics) {
    if (resourceTimings.length === 0) {
      return this.createEmptyPerformanceMetrics();
    }

    const timingStats = this.calculateTimingStats(resourceTimings);
    const coreWebVitals = this.calculateCoreWebVitals(htmlMetrics, timingStats);
    
    return {
      ...this.createHttpMeasurements(htmlMetrics, timingStats, resourceTimings),
      ...coreWebVitals
    };
  }

  createEmptyPerformanceMetrics() {
    return {
      htmlTTFB: 0,
      htmlTotalTime: 0,
      avgResourceTTFB: 0,
      maxResourceTTFB: 0,
      minResourceTTFB: 0,
      avgResourceLoadTime: 0,
      maxResourceLoadTime: 0,
      minResourceLoadTime: 0,
      totalResourceSize: 0,
      resourceCount: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      speedIndex: 0,
      totalBlockingTime: 0,
      timeToInteractive: 0
    };
  }

  calculateTimingStats(resourceTimings) {
    const ttfbValues = resourceTimings.map(r => r.ttfb);
    const loadTimeValues = resourceTimings.map(r => r.duration);
    
    return {
      avgTTFB: ttfbValues.reduce((sum, val) => sum + val, 0) / ttfbValues.length,
      maxTTFB: Math.max(...ttfbValues),
      minTTFB: Math.min(...ttfbValues),
      avgLoadTime: loadTimeValues.reduce((sum, val) => sum + val, 0) / loadTimeValues.length,
      maxLoadTime: Math.max(...loadTimeValues),
      minLoadTime: Math.min(...loadTimeValues),
      totalLoadTime: Math.max(...loadTimeValues),
      totalResourceSize: resourceTimings.reduce((sum, r) => sum + r.size, 0)
    };
  }

  calculateCoreWebVitals(htmlMetrics, timingStats) {
    return {
      firstContentfulPaint: Math.round(htmlMetrics.ttfb + timingStats.minLoadTime),
      largestContentfulPaint: Math.round(htmlMetrics.ttfb + timingStats.maxLoadTime),
      speedIndex: Math.round(htmlMetrics.ttfb + timingStats.avgLoadTime),
      totalBlockingTime: Math.round(timingStats.maxTTFB - timingStats.minTTFB),
      timeToInteractive: Math.round(htmlMetrics.ttfb + timingStats.totalLoadTime),
      cumulativeLayoutShift: 0
    };
  }

  createHttpMeasurements(htmlMetrics, timingStats, resourceTimings) {
    return {
      htmlTTFB: htmlMetrics.ttfb,
      htmlTotalTime: htmlMetrics.totalTime,
      avgResourceTTFB: timingStats.avgTTFB,
      maxResourceTTFB: timingStats.maxTTFB,
      minResourceTTFB: timingStats.minTTFB,
      avgResourceLoadTime: timingStats.avgLoadTime,
      maxResourceLoadTime: timingStats.maxLoadTime,
      minResourceLoadTime: timingStats.minLoadTime,
      totalResourceSize: timingStats.totalResourceSize,
      resourceCount: resourceTimings.length
    };
  }
}

module.exports = { BundleAnalyzer };
