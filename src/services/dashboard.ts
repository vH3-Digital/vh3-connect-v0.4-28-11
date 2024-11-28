import axios from 'axios';

export interface DashboardStats {
  total_calls: number;
  tokens: number;
  customer_feedback_calls: number;
  knowledge_base_items: string;
  agent_call_time: number;
  reschedules_handled: number;
}

const api = axios.create({
  baseURL: 'https://api.vh3connect.io',
  headers: {
    'Accept': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      details: error.response?.data
    });
    throw error;
  }
);

export const dashboardService = {
  getStats: async (dashboardId: string): Promise<DashboardStats> => {
    try {
      const { data } = await api.get<DashboardStats>(
        `/api:KD8DhY1m/dashboards/${dashboardId}`
      );
      return data;
    } catch (error: any) {
      console.error('Failed to fetch dashboard stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
};