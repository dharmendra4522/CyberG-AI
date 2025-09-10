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
    // Mock response based on your example
    const mockResponse = {
      response: {
        type: "chart",
        chart_spec: {
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
        }
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
