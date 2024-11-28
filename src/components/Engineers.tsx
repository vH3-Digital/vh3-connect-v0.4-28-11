import React, { useState, useEffect } from 'react';
import { EngineerCard } from './EngineerCard';
import { LoadingScreen } from './LoadingScreen';
import { Search } from 'lucide-react';

interface Engineer {
  id: number;
  engineerJWID: number;
  Name: string;
  type: string;
  Mobile_Number: string;
  Location: string;
  Email: string;
  ResourceGroupId: number;
  Gas_Safe_Licence_Number: string;
  Branch_Code: string;
  Branch_Name: string;
  branch_JWID: number;
  company: string;
}

export const Engineers: React.FC = () => {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('authToken');
        console.log('🔑 Using auth token:', token);

        if (!token) {
          throw new Error('Authentication required');
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        };

        console.log('📤 Making API request to engineers/list with headers:', headers);

        const response = await fetch('https://api.vh3connect.io/api:_bvbfpgN/engineers/list', {
          headers
        });

        console.log('📥 Received response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
          console.error('❌ Response not OK:', {
            status: response.status,
            statusText: response.statusText
          });
          throw new Error(`Failed to fetch engineers: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📊 Parsed response data:', data);
        
        if (!Array.isArray(data)) {
          console.error('❌ Invalid response format:', data);
          throw new Error('Invalid response format');
        }

        console.log('✅ Successfully loaded', data.length, 'engineers');
        setEngineers(data);
      } catch (err: any) {
        console.error('❌ Error fetching engineers:', {
          message: err.message,
          stack: err.stack,
          response: err.response
        });
        setError(err.message || 'Failed to load engineers');
      } finally {
        setLoading(false);
      }
    };

    fetchEngineers();
  }, []);

  const filteredEngineers = engineers.filter(engineer => {
    if (!searchQuery) return true;
    
    const searchTerm = searchQuery.toLowerCase();
    return (
      engineer.Name?.toLowerCase().includes(searchTerm) ||
      engineer.type?.toLowerCase().includes(searchTerm) ||
      engineer.Location?.toLowerCase().includes(searchTerm) ||
      engineer.Branch_Name?.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-400">Engineers</h2>
          <p className="text-gray-400">
            {engineers.length} engineers found
          </p>
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search engineers..."
            className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
          {error}
        </div>
      ) : filteredEngineers.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          {searchQuery ? 'No engineers match your search' : 'No engineers found'}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEngineers.map((engineer) => (
            engineer && engineer.id ? (
              <EngineerCard 
                key={engineer.id} 
                engineer={engineer} 
              />
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};