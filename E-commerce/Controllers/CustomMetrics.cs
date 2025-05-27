using App.Metrics.Counter;
using App.Metrics.Histogram;
using App.Metrics.Timer;
using App.Metrics;

namespace E_commerce.Controllers
{
    public static class CustomMetrics
    {
        public static CounterOptions RequestCounter => new CounterOptions
        {
            Name = "HTTP Requests",
            MeasurementUnit = Unit.Calls
        };

        public static HistogramOptions ResponseSizeHistogram => new HistogramOptions
        {
            Name = "Response Size",
            MeasurementUnit = Unit.Bytes
        };

        public static TimerOptions RequestTimer => new TimerOptions
        {
            Name = "Request Duration",
            MeasurementUnit = Unit.Requests
        };
    }

}
