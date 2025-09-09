#!/usr/bin/env node

const { PerformanceBenchmark } = require('./PerformanceBenchmark');

async function main() {
  const benchmark = new PerformanceBenchmark();
  await benchmark.run();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
