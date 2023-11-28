import process from 'node:process'
import { Counter, Gauge } from 'prom-client'

export const PromCounterRoute = new Counter({
  name: 'http_requests_total',
  help: 'Counter for requests to the API',
  labelNames: ['route'],
})

export const PromCounterBrowser = new Counter({
  name: 'browser',
  help: 'Counter for browser type from request',
  labelNames: ['browser'],
})

export const PromCounterLocation = new Counter({
  name: 'location',
  help: 'Counter for location from request',
  labelNames: ['location'],
})

const PromGaugeNodeVersion = new Gauge({
  name: 'node_version_info',
  help: 'The current version of node running',
  labelNames: ['version'],
})
PromGaugeNodeVersion.set({ version: process.version }, 1)
