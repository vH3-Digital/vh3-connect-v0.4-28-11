import React, { useState } from 'react';
import { Mail, Phone, MoreVertical, Mic } from 'lucide-react';
import { AgentChat } from './AgentChat';
import { VoiceChat } from './VoiceChat';

interface AgentCardProps {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  color: string;
  onChat: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ 
  name, 
  email, 
  phone, 
  avatar, 
  color
}) => {
  const [showChat, setShowChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  return (
    <>
      <div 
        className="card group hover:bg-gray-800/50 transition-all cursor-pointer h-full"
      >
        <div className="flex justify-between items-start mb-4">
          <img 
            src={avatar} 
            alt={name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowVoiceChat(true)}
              className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">{name}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm truncate">{email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <Phone className="w-4 h-4" />
            <span className="text-sm truncate">{phone}</span>
          </div>
        </div>
      </div>

      <AgentChat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        agent={{
          name,
          email,
          phone,
          avatar
        }}
      />

      <VoiceChat 
        isOpen={showVoiceChat}
        onClose={() => setShowVoiceChat(false)}
        agent={{
          id: '89851696-c04f-41ee-a87d-cc307f0bd303', // Replace with actual agent ID
          name,
          avatar
        }}
      />
    </>
  );
};