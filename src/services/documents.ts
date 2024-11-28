import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.vh3connect.io',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add auth token to all requests
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export interface Document {
  id: string;
  created_at: number;
  name: string;
  category: string;
  description: string;
  key_points: string;
  user_id: number;
  company_id: string | null;
  doc_id: string;
  encoded_file: string;
}

export const documentsApi = {
  upload: async (file: File) => {
    if (!file) {
      throw new Error('No file provided');
    }

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      // Add user context to upload
      const { data } = await api.post('/api:kPLLaYE-/files/upload_kb', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Upload response:', data);
      return data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to upload document');
    }
  },

  getDocument: async (documentId: string): Promise<Document> => {
    try {
      console.log('Fetching document:', documentId);
      
      // Pass doc_id as query parameter
      const { data } = await api.get(`/api:kPLLaYE-/document`, {
        params: {
          doc_id: documentId
        }
      });
      
      console.log('Document response:', data);
      return data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch document');
    }
  },

  listDocuments: async (): Promise<Document[]> => {
    try {
      console.log('Fetching documents list');
      
      // Get all documents for current user
      const { data } = await api.get('/api:kPLLaYE-/all_documents');
      console.log('Documents list response:', data);
      return data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
  }
};