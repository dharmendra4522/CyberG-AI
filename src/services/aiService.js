// // AI Service for chart generation
// import axios from 'axios';

// // Base URL for your backend API
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// // Create axios instance with default config
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 30000, // 30 seconds timeout for AI processing
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // AI Service function to generate chart from user query and file
// export const generateChartFromData = async (userPrompt, uploadedFile) => {
//   try {
//     // Create FormData to send file and prompt
//     const formData = new FormData();
//     formData.append('file', uploadedFile);
//     formData.append('prompt', userPrompt);
//     formData.append('query', userPrompt); // Alternative key name

//     // Make API call to AI service
//     const response = await apiClient.post('/ai/generate-chart', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error) {
//     console.error('AI Service Error:', error);
    
//     // Handle different types of errors
//     if (error.response) {
//       // Server responded with error status
//       return {
//         success: false,
//         error: error.response.data?.message || 'Server error occurred',
//         status: error.response.status,
//       };
//     } else if (error.request) {
//       // Network error
//       return {
//         success: false,
//         error: 'Network error. Please check your connection.',
//       };
//     } else {
//       // Other error
//       return {
//         success: false,
//         error: error.message || 'An unexpected error occurred',
//       };
//     }
//   }
// };

// // Alternative function if you want to send JSON instead of FormData
// export const generateChartFromDataJSON = async (userPrompt, fileData) => {
//   try {
//     const response = await apiClient.post('/ai/generate-chart', {
//       prompt: userPrompt,
//       query: userPrompt,
//       fileData: fileData, // Base64 encoded file data
//       fileName: fileData.name,
//       fileType: fileData.type,
//     });

//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error) {
//     console.error('AI Service Error:', error);
    
//     if (error.response) {
//       return {
//         success: false,
//         error: error.response.data?.message || 'Server error occurred',
//         status: error.response.status,
//       };
//     } else if (error.request) {
//       return {
//         success: false,
//         error: 'Network error. Please check your connection.',
//       };
//     } else {
//       return {
//         success: false,
//         error: error.message || 'An unexpected error occurred',
//       };
//     }
//   }
// };

// // Utility function to convert file to base64
// export const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// };

// export default {
//   generateChartFromData,
//   generateChartFromDataJSON,
//   fileToBase64,
// };



// AI Service for chart generation
import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// This is the sample JSON response you provided for mocking.
const MOCK_API_RESPONSE = {
    response: {
        type: "chart",
        chart_spec: { 
            type: "line",
            data: {
                labels: [
                    "Uttar Pradesh", "Maharashtra", "Haryana", "Delhi", "West Bengal",
                    "Rajasthan", "Madhya Pradesh", "Jharkhand", "Tamil Nadu",
                    "Karnataka", "Punjab", "Gujarat", "Bihar", "Telangana",
                    "Chhaattisgarh", "Uttaranchal", "Goa", "Jammu and Kashmir",
                    "Odisha", "Andhra Pradesh"
                ],
                datasets: [{
                    data: [
                        6440028.0, 1832727.0, 1557504.0, 1395605.0, 1152487.0,
                        966172.0, 709604.0, 470281.0, 429293.0, 341541.0, 317329.0,
                        285712.0, 249070.0, 235522.0, 222882.0, 221062.0, 167705.0,
                        84708.0, 58992.0, 45490.0
                    ],
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.7)", "rgba(255, 99, 132, 0.7)",
                        "rgba(255, 205, 86, 0.7)", "rgba(75, 192, 192, 0.7)",
                        "rgba(153, 102, 255, 0.7)", "rgba(255, 159, 64, 0.7)",
                        "rgba(255, 99, 71, 0.7)", "rgba(60, 179, 113, 0.7)",
                        "rgba(255, 105, 180, 0.7)", "rgba(138, 43, 226, 0.7)",
                        "rgba(255, 215, 0, 0.7)", "rgba(0, 255, 255, 0.7)",
                        "rgba(218, 112, 214, 0.7)", "rgba(127, 255, 0, 0.7)",
                        "rgba(255, 69, 0, 0.7)", "rgba(72, 61, 139, 0.7)",
                        "rgba(0, 128, 128, 0.7)", "rgba(100, 149, 237, 0.7)",
                        "rgba(210, 105, 30, 0.7)", "rgba(173, 255, 47, 0.7)"
                    ]
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
                        display: true,
                        position: "top"
                    }
                }
            }
        }
    }
};


// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 30 seconds timeout for AI processing
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// AI Service function to generate chart from user query and file
export const generateChartFromData = async (userPrompt, uploadedFile) => {
    console.log("--- MOCKING API CALL: generateChartFromData ---");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return the hardcoded mock data
    return {
        success: true,
        data: MOCK_API_RESPONSE,
    };

    /* // --- REAL API CALL (Uncomment when backend is ready) ---
    try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('prompt', userPrompt);
        formData.append('query', userPrompt);

        const response = await apiClient.post('/ai/generate-chart', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error('AI Service Error:', error);
        if (error.response) {
            return { success: false, error: error.response.data?.message || 'Server error occurred', status: error.response.status };
        } else if (error.request) {
            return { success: false, error: 'Network error. Please check your connection.' };
        } else {
            return { success: false, error: error.message || 'An unexpected error occurred' };
        }
    }
    */
};

// Alternative function if you want to send JSON instead of FormData
export const generateChartFromDataJSON = async (userPrompt, fileData) => {
    console.log("--- MOCKING API CALL: generateChartFromDataJSON ---");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return the hardcoded mock data
    return {
        success: true,
        data: MOCK_API_RESPONSE,
    };

    /*
    // --- REAL API CALL (Uncomment when backend is ready) ---
    try {
        const response = await apiClient.post('/ai/generate-chart', {
            prompt: userPrompt,
            query: userPrompt,
            fileData: fileData,
            fileName: fileData.name,
            fileType: fileData.type,
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error('AI Service Error:', error);
        if (error.response) {
            return { success: false, error: error.response.data?.message || 'Server error occurred', status: error.response.status };
        } else if (error.request) {
            return { success: false, error: 'Network error. Please check your connection.' };
        } else {
            return { success: false, error: error.message || 'An unexpected error occurred' };
        }
    }
    */
};

// Utility function to convert file to base64
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

export default {
    generateChartFromData,
    generateChartFromDataJSON,
    fileToBase64,
};