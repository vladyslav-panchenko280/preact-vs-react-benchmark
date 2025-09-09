class MemoryAnalyzer {
  calculateMemoryUsage(resources) {
    const memoryStats = this.calculateMemoryStats(resources);
    
    return {
      ...memoryStats,
      averageMemoryDelta: memoryStats.totalMemoryDelta / resources.length,
      maxMemoryDelta: Math.max(...resources.map(r => r.metrics.memoryDelta.heapUsed)),
      minMemoryDelta: Math.min(...resources.map(r => r.metrics.memoryDelta.heapUsed)),
      measurements: this.createMemoryMeasurements(resources)
    };
  }

  calculateMemoryStats(resources) {
    let totalMemoryDelta = 0;
    let jsMemoryDelta = 0;
    let cssMemoryDelta = 0;
    
    resources.forEach(resource => {
      const memoryDelta = resource.metrics.memoryDelta.heapUsed;
      totalMemoryDelta += memoryDelta;
      
      if (resource.type === 'script') {
        jsMemoryDelta += memoryDelta;
      } else if (resource.type === 'stylesheet') {
        cssMemoryDelta += memoryDelta;
      }
    });
    
    return { totalMemoryDelta, jsMemoryDelta, cssMemoryDelta };
  }

  createMemoryMeasurements(resources) {
    return resources.map(r => ({
      name: r.name,
      type: r.type,
      memoryDelta: r.metrics.memoryDelta.heapUsed
    }));
  }
}

module.exports = { MemoryAnalyzer };
