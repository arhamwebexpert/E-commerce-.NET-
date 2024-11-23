using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prometheus;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private static readonly Counter RequestCounter = Metrics.CreateCounter(
           "total_requests",
           "Total number of requests received by the API"
       );

        // Gauge: Tracks the number of active users
        private static readonly Gauge ActiveUsersGauge = Metrics.CreateGauge(
            "active_users",
            "Number of active users in the system"
        );

        // Histogram: Tracks the duration of requests
        private static readonly Histogram RequestDurationHistogram = Metrics.CreateHistogram(
            "request_duration_seconds",
            "Histogram of request durations in seconds"
        );

        // Summary: Tracks response times with quantiles
        private static readonly Summary RequestResponseSummary = Metrics.CreateSummary(
            "response_time_seconds",
            "Summary of response times in seconds",
            new SummaryConfiguration
            {
                Objectives = new[]
                {
                    new QuantileEpsilonPair(0.5, 0.05), // Median
                    new QuantileEpsilonPair(0.9, 0.01), // 90th percentile
                    new QuantileEpsilonPair(0.99, 0.001) // 99th percentile
                }
            }
        );

        [HttpGet("process")]
        public IActionResult ProcessRequest()
        {
            // Increment counter
            RequestCounter.Inc();

            // Simulate active user adjustment
            ActiveUsersGauge.Inc(); // Simulate user login
            Task.Delay(100).Wait(); // Simulate some processing
            ActiveUsersGauge.Dec(); // Simulate user logout

            return Ok("Request processed!");
        }

        [HttpGet("duration")]
        public IActionResult TrackDuration()
        {
            // Use Histogram to measure request duration
            using (RequestDurationHistogram.NewTimer())
            {
                Task.Delay(300).Wait(); // Simulate work
                return Ok("Request duration tracked!");
            }
        }

       
    }
}
