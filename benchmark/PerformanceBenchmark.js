const { HttpMetricsCollector } = require('./collectors/HttpMetricsCollector');
const { BundleAnalyzer } = require('./analyzers/BundleAnalyzer');
const { LoadTimeMeasurer } = require('./analyzers/LoadTimeMeasurer');
const { MemoryAnalyzer } = require('./analyzers/MemoryAnalyzer');
const { ReportGenerator } = require('./reports/ReportGenerator');
const { BenchmarkOrchestrator } = require('./orchestrators/BenchmarkOrchestrator');

class PerformanceBenchmark {
  constructor() {
    this.httpCollector = new HttpMetricsCollector();
    this.bundleAnalyzer = new BundleAnalyzer(this.httpCollector);
    this.loadMeasurer = new LoadTimeMeasurer(this.httpCollector);
    this.memoryAnalyzer = new MemoryAnalyzer();
    this.reportGenerator = new ReportGenerator();
    this.orchestrator = new BenchmarkOrchestrator(
      this.httpCollector,
      this.bundleAnalyzer,
      this.loadMeasurer,
      this.memoryAnalyzer,
      this.reportGenerator
    );
  }
  
  async run() {
    return this.orchestrator.run();
  }
}

module.exports = { PerformanceBenchmark };
