class ReportGenerator {
  generateReport(results) {
    this.printReportHeader();
    this.printBundleSizeComparison(results);
    this.printLoadTimeComparison(results);
    this.printPerformanceMetricsComparison(results);
    this.printMemoryComparison(results);
    this.printWaterfallAnalysis(results);
    this.printReportFooter();
  }

  printReportHeader() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 PERFORMANCE BENCHMARK RESULTS');
    console.log('='.repeat(80));
  }

  printBundleSizeComparison(results) {
    console.log('\n📦 BUNDLE SIZE COMPARISON:');
    const reactBundle = results.react.bundleSize;
    const preactBundle = results.preact.bundleSize;
    
    console.log(`React Total Size: ${(reactBundle.totalSize / 1024).toFixed(2)} KB`);
    console.log(`Preact Total Size: ${(preactBundle.totalSize / 1024).toFixed(2)} KB`);
    console.log(`React JS Size: ${(reactBundle.jsSize / 1024).toFixed(2)} KB`);
    console.log(`Preact JS Size: ${(preactBundle.jsSize / 1024).toFixed(2)} KB`);
    console.log(`Size Difference: ${this.calculatePercentageDifference(reactBundle.totalSize, preactBundle.totalSize)}%`);
    console.log(`Winner: ${reactBundle.totalSize < preactBundle.totalSize ? 'React' : 'Preact'}`);
  }

  printLoadTimeComparison(results) {
    console.log('\n⏱️  LOAD TIME COMPARISON:');
    const reactLoad = results.react.loadTimes;
    const preactLoad = results.preact.loadTimes;
    
    console.log(`React Average: ${reactLoad.averageLoadTime.toFixed(2)} ms (TTFB: ${reactLoad.averageTTFB.toFixed(2)}ms)`);
    console.log(`Preact Average: ${preactLoad.averageLoadTime.toFixed(2)} ms (TTFB: ${preactLoad.averageTTFB.toFixed(2)}ms)`);
    console.log(`Speed Difference: ${this.calculatePercentageDifference(reactLoad.averageLoadTime, preactLoad.averageLoadTime)}%`);
    console.log(`Winner: ${reactLoad.averageLoadTime < preactLoad.averageLoadTime ? 'React' : 'Preact'}`);
  }

  printPerformanceMetricsComparison(results) {
    console.log('\n🔍 EXACT PERFORMANCE METRICS COMPARISON:');
    const reactPerf = results.react.bundleSize.performanceMetrics;
    const preactPerf = results.preact.bundleSize.performanceMetrics;
    
    console.log(`React HTML TTFB: ${reactPerf.htmlTTFB.toFixed(2)}ms`);
    console.log(`Preact HTML TTFB: ${preactPerf.htmlTTFB.toFixed(2)}ms`);
    console.log(`React Avg Resource TTFB: ${reactPerf.avgResourceTTFB.toFixed(2)}ms`);
    console.log(`Preact Avg Resource TTFB: ${preactPerf.avgResourceTTFB.toFixed(2)}ms`);
    console.log(`React FCP: ${reactPerf.firstContentfulPaint}ms`);
    console.log(`Preact FCP: ${preactPerf.firstContentfulPaint}ms`);
    console.log(`React LCP: ${reactPerf.largestContentfulPaint}ms`);
    console.log(`Preact LCP: ${preactPerf.largestContentfulPaint}ms`);
    console.log(`React TTI: ${reactPerf.timeToInteractive}ms`);
    console.log(`Preact TTI: ${preactPerf.timeToInteractive}ms`);
    console.log(`Winner: ${reactPerf.firstContentfulPaint < preactPerf.firstContentfulPaint ? 'React' : 'Preact'}`);
  }

  printMemoryComparison(results) {
    console.log('\n🧠 MEMORY USAGE COMPARISON:');
    const reactMem = results.react.memory;
    const preactMem = results.preact.memory;
    
    console.log(`React Total Memory Delta: ${(reactMem.totalMemoryDelta / 1024).toFixed(2)} KB`);
    console.log(`Preact Total Memory Delta: ${(preactMem.totalMemoryDelta / 1024).toFixed(2)} KB`);
    console.log(`React JS Memory Delta: ${(reactMem.jsMemoryDelta / 1024).toFixed(2)} KB`);
    console.log(`Preact JS Memory Delta: ${(preactMem.jsMemoryDelta / 1024).toFixed(2)} KB`);
    
    const memoryDifference = this.calculateMemoryDifference(reactMem, preactMem);
    const memoryWinner = reactMem.totalMemoryDelta < preactMem.totalMemoryDelta ? 'React' : 'Preact';
    
    console.log(`Memory Difference: ${Math.abs(memoryDifference).toFixed(1)}% (${memoryDifference > 0 ? 'Preact uses more' : 'React uses more'})`);
    console.log(`Winner: ${memoryWinner} (uses less memory)`);
  }

  printWaterfallAnalysis(results) {
    console.log('\n🌊 WATERFALL ANALYSIS:');
    const reactWaterfall = results.react.bundleSize.waterfallMetrics;
    const preactWaterfall = results.preact.bundleSize.waterfallMetrics;
    
    console.log(`React Total Load Time: ${reactWaterfall.totalLoadTime.toFixed(2)}ms`);
    console.log(`Preact Total Load Time: ${preactWaterfall.totalLoadTime.toFixed(2)}ms`);
    console.log(`React Parallel Efficiency: ${this.calculateParallelEfficiency(reactWaterfall)}%`);
    console.log(`Preact Parallel Efficiency: ${this.calculateParallelEfficiency(preactWaterfall)}%`);
    console.log(`Winner: ${reactWaterfall.totalLoadTime < preactWaterfall.totalLoadTime ? 'React' : 'Preact'}`);
  }

  printReportFooter() {
    console.log('\n' + '='.repeat(80));
  }

  calculatePercentageDifference(reactValue, preactValue) {
    return ((reactValue - preactValue) / reactValue * 100).toFixed(1);
  }

  calculateMemoryDifference(reactMem, preactMem) {
    return ((preactMem.totalMemoryDelta - reactMem.totalMemoryDelta) / reactMem.totalMemoryDelta * 100);
  }

  calculateParallelEfficiency(waterfall) {
    return (waterfall.parallelLoadTime / waterfall.sequentialLoadTime * 100).toFixed(1);
  }
}

module.exports = { ReportGenerator };
