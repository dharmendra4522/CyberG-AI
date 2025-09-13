// Temporary Mock Backend for Testing
import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Mock AI Chart Generation Endpoint
app.post('/api/ai/generate-chart', upload.single('file'), (req, res) => {
  console.log('📁 File received:', req.file?.originalname);
  console.log('💬 Prompt received:', req.body.prompt);
  
  // Simulate AI processing delay
  setTimeout(() => {
    // Determine chart type from request or prompt
    const requestedType = (req.body?.type || req.query?.type || "").toString().toLowerCase();
    const promptText = (req.body?.prompt || "").toString().toLowerCase();
    const chartType = requestedType || (promptText.includes("pie") ? "pie" : "bar");

    const barSpec = {
      type: "bar",
      data: {
        labels: [
          "Andhra Pradesh",
          "Bihar",
          "Chhattisgarh",
          "Delhi",
          "Goa",
          "Gujarat",
          "Haryana",
          "Jammu and Kashmir",
          "Jharkhand",
          "Karnataka",
          "Madhya Pradesh",
          "Maharashtra",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Tamil Nadu",
          "Telangana",
          "Uttar Pradesh",
          "Uttaranchal",
          "West Bengal"
        ],
        datasets: [{
          label: "Plant",
          data: [
            45490.0,
            249070.0,
            222882.0,
            1395605.0,
            167705.0,
            285712.0,
            1557504.0,
            84708.0,
            470281.0,
            341541.0,
            709604.0,
            1832727.0,
            58992.0,
            317329.0,
            966172.0,
            429293.0,
            235522.0,
            6440028.0,
            221062.0,
            1152487.0
          ],
          backgroundColor: "rgba(54, 162, 235, 0.7)"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Total Plant per Region"
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Region"
            }
          },
          y: {
            title: {
              display: true,
              text: "Plant"
            },
            beginAtZero: true
          }
        }
      }
    };

    const pieSpec = {
      type: "pie",
      data: {
        labels: [
          "Uttar Pradesh",
          "Maharashtra",
          "Haryana",
          "Delhi",
          "West Bengal",
          "Rajasthan",
          "Madhya Pradesh",
          "Jharkhand",
          "Tamil Nadu",
          "Karnataka",
          "Punjab",
          "Gujarat",
          "Bihar",
          "Telangana",
          "Chhaattisgarh",
          "Uttaranchal",
          "Goa",
          "Jammu and Kashmir",
          "Odisha",
          "Andhra Pradesh"
        ],
        datasets: [
          {
            data: [
              6440028.0,
              1832727.0,
              1557504.0,
              1395605.0,
              1152487.0,
              966172.0,
              709604.0,
              470281.0,
              429293.0,
              341541.0,
              317329.0,
              285712.0,
              249070.0,
              235522.0,
              222882.0,
              221062.0,
              167705.0,
              84708.0,
              58992.0,
              45490.0
            ],
            backgroundColor: [
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 205, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 205, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 205, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 99, 132, 0.7)"
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Total Plant per Region"
          },
          legend: {
            display: true,
            position: "top"
          }
        }
      }
    };

    const selectedChartSpec = chartType === "pie" ? pieSpec : barSpec;
    const mockResponse = {
      response: {
        type: "chart",
        chart_spec: selectedChartSpec
      }
    };
    
    console.log('✅ Sending mock response');
    res.json(mockResponse);
  }, 2000); // 2 second delay to simulate AI processing
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock backend is running!' });
});

app.listen(port, () => {
  console.log(`🚀 Mock Backend running at http://localhost:${port}`);
  console.log(`📊 Chart generation endpoint: http://localhost:${port}/api/ai/generate-chart`);
  console.log(`❤️  Health check: http://localhost:${port}/api/health`);
});
