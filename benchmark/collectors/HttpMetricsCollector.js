const http = require('http');
const https = require('https');
const { performance } = require('perf_hooks');

class HttpMetricsCollector {
  async getDetailedHTTPMetrics(url) {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const startMemory = process.memoryUsage();
      const urlWithCacheBuster = this.addCacheBuster(url);
      const client = this.getHttpClient(urlWithCacheBuster);
      const options = this.createHttpOptions();
      
      const req = client.get(urlWithCacheBuster, options, (res) => {
        this.handleHttpResponse(res, startTime, startMemory, resolve);
      });
      
      this.setupRequestErrorHandling(req, reject);
    });
  }

  addCacheBuster(url) {
    const cacheBuster = `_cb=${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${cacheBuster}`;
  }

  getHttpClient(url) {
    return url.startsWith('https') ? https : http;
  }

  createHttpOptions() {
    return {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'User-Agent': 'Performance-Benchmark/1.0',
        'Accept': '*/*',
        'Accept-Encoding': 'identity'
      }
    };
  }

  handleHttpResponse(res, startTime, startMemory, resolve) {
    const firstByteTime = performance.now();
    const endMemory = process.memoryUsage();
    let data = '';
    let totalSize = 0;
    
    res.on('data', (chunk) => {
      data += chunk;
      totalSize += chunk.length;
    });
    
    res.on('end', () => {
      const finalTime = performance.now();
      const metrics = this.calculateHttpMetrics(startTime, firstByteTime, finalTime, startMemory, endMemory, res, totalSize);
      
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        data: data,
        size: totalSize,
        metrics
      });
    });
  }

  calculateHttpMetrics(startTime, firstByteTime, finalTime, startMemory, endMemory, res, totalSize) {
    return {
      ttfb: firstByteTime - startTime,
      totalTime: finalTime - startTime,
      downloadTime: finalTime - firstByteTime,
      responseTime: firstByteTime - startTime,
      contentLength: parseInt(res.headers['content-length']) || totalSize,
      transferSize: totalSize,
      compressionRatio: this.calculateCompressionRatio(res, totalSize),
      server: res.headers['server'],
      connection: res.headers['connection'],
      keepAlive: res.headers['connection'] === 'keep-alive',
      httpVersion: res.httpVersion,
      memoryDelta: this.calculateMemoryDelta(startMemory, endMemory)
    };
  }

  calculateCompressionRatio(res, totalSize) {
    return res.headers['content-encoding'] ? 
      (parseInt(res.headers['content-length']) || totalSize) / totalSize : 1;
  }

  calculateMemoryDelta(startMemory, endMemory) {
    return {
      rss: endMemory.rss - startMemory.rss,
      heapUsed: endMemory.heapUsed - startMemory.heapUsed,
      heapTotal: endMemory.heapTotal - startMemory.heapTotal,
      external: endMemory.external - startMemory.external
    };
  }

  setupRequestErrorHandling(req, reject) {
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  }
}

module.exports = { HttpMetricsCollector };
