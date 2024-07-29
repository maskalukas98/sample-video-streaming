import * as Prometheus from "prom-client"
import  {Express} from "express";

const register = new Prometheus.Registry();

const memoryUsageGauge = new Prometheus.Gauge({
    name: 'nodejs_memory_usage_bytes',
    help: 'Memory usage of the Node.js process',
    labelNames: ['type'],
    registers: [register]
});

const cpuUsageGauge = new Prometheus.Gauge({
    name: 'nodejs_cpu_usage_seconds_total',
    help: 'CPU usage of the Node.js process in seconds',
    registers: [register]
});

const gcStats = new Prometheus.Gauge({
    name: 'nodejs_gc_collection_total',
    help: 'Garbage collection statistics',
    labelNames: ['type'],
    registers: [register]
});

const requestCounter = new Prometheus.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'handler'],
    registers: [register]
});

const responseDurationHistogram = new Prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Histogram of HTTP request durations',
    labelNames: ['method', 'handler'],
    registers: [register]
});

const updateMetrics = () => {
    const memoryUsage = process.memoryUsage();
    memoryUsageGauge.set({ type: 'rss' }, memoryUsage.rss);
    memoryUsageGauge.set({ type: 'heapTotal' }, memoryUsage.heapTotal);
    memoryUsageGauge.set({ type: 'heapUsed' }, memoryUsage.heapUsed);

    const cpuUsage = process.cpuUsage();
    cpuUsageGauge.set(cpuUsage.user / 1e6 + cpuUsage.system / 1e6);

    const gcStatsInfo = process.memoryUsage();
    gcStats.set({ type: 'total' }, gcStatsInfo.heapTotal);
};

updateMetrics()
setInterval(updateMetrics, 4000);

export const prometheusRoute = (app: Express): void => {
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });
}