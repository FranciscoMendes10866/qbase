import client from 'prom-client'

const Prometheus = client

const counter = new Prometheus.Counter({
  name: 'fastify_requests_total',
  help: 'The total number of processed requests'
})

const histogram = new Prometheus.Histogram({
  name: 'fastify_requests_duration',
  help: 'Histogram for the duration in seconds.',
  buckets: [1, 2, 5, 6, 10]
})

/**
 * Start the timer for the start of code execution.
 * @returns Timestamp
 */
function metricsInit () {
  counter.inc()
  return new Date()
}

/**
 * Acquires the final timestamp of code execution.
 * @param init It is the metricInit timestamp
 * @returns The duration of the total execution time of the code already converted to seconds
 */
function metricsEnd (init: any) {
  const time: any = new Date()
  histogram.observe((time - init) / 1000)
}

export {
  Prometheus,
  metricsInit,
  metricsEnd
}
