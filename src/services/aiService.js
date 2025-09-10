// AI Service for chart generation
import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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
  try {
    // Create FormData to send file and prompt
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('prompt', userPrompt);
    formData.append('query', userPrompt); // Alternative key name

    // Make API call to AI service
    const response = await apiClient.post('/ai/generate-chart', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    } else {
      // Other error
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
};

// Alternative function if you want to send JSON instead of FormData
export const generateChartFromDataJSON = async (userPrompt, fileData) => {
  try {
    const response = await apiClient.post('/ai/generate-chart', {
      prompt: userPrompt,
      query: userPrompt,
      fileData: fileData, // Base64 encoded file data
      fileName: fileData.name,
      fileType: fileData.type,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    
    if (error.response) {
      return {
        success: false,
        error: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    } else {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
      };
    }
  }
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
