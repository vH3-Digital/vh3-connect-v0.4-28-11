import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Modal } from './Modal';
import { BlandWebClient } from 'bland-client-js-sdk';

// Hardcoded test values
const TEST_AGENT_ID = '035b10ce-5a98-4cfc-b578-b98d701d3ccc';
const TEST_SESSION_TOKEN = '0dcaa6a7-b60b-4611-9004-cbdd4a49e70c';

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const VoiceChat: React.FC<VoiceChatProps> = ({
  isOpen,
  onClose,
  agent
}) => {
  const [client, setClient] = useState<BlandWebClient | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize client when modal opens
  useEffect(() => {
    let blandClient: BlandWebClient | null = null;

    const initClient = async () => {
      try {
        // Use test values for now
        blandClient = new BlandWebClient(TEST_AGENT_ID, TEST_SESSION_TOKEN);
        
        // Add event listener for call termination
        blandClient.on('conversationEnded', () => {
          setIsCallActive(false);
          setClient(null);
        });
        
        setClient(blandClient);
      } catch (err) {
        console.error('Failed to initialize client:', err);
        setError('Failed to initialize voice chat');
      }
    };

    if (isOpen) {
      initClient();
    }

    // Cleanup function
    return () => {
      const cleanup = async () => {
        if (blandClient) {
          try {
            await blandClient.stopConversation();
            console.log('Conversation stopped successfully');
          } catch (err) {
            console.error('Error stopping conversation:', err);
          } finally {
            setClient(null);
            setIsCallActive(false);
          }
        }
      };

      cleanup();
    };
  }, [isOpen]);

  const startCall = useCallback(async () => {
    if (!client) {
      setError('Voice chat not initialized');
      return;
    }

    try {
      setError(null);
      await client.initConversation({ 
        sampleRate: 44000, 
        bufferSize: 4096 
      });
      setIsCallActive(true);
      console.log('Call started successfully');
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setError(err.message || 'Failed to start call');
      setIsCallActive(false);
    }
  }, [client]);

  const endCall = useCallback(async () => {
    if (!client) return;

    try {
      await client.stopConversation();
      setIsCallActive(false);
      console.log('Call ended successfully');
    } catch (err: any) {
      console.error('Failed to end call:', err);
      setError(err.message || 'Failed to end call');
    } finally {
      setIsCallActive(false);
    }
  }, [client]);

  // Handle modal close
  useEffect(() => {
    if (!isOpen && isCallActive) {
      endCall().catch(err => {
        console.error('Error ending call during modal close:', err);
      });
    }
  }, [isOpen, isCallActive, endCall]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Voice Chat" size="md">
      <div className="space-y-6">
        {/* Agent Info */}
        <div className="flex items-center gap-4">
          <img 
            src={agent.avatar} 
            alt={agent.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium">{agent.name}</h3>
            <p className="text-sm text-cyan-400">
              {isCallActive ? 'In Call' : 'Available'}
            </p>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex justify-center gap-4">
          {isCallActive ? (
            <button
              onClick={() => endCall()}
              className="p-4 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => startCall()}
              className="p-4 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors"
            >
              <Phone className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Status & Error Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {isCallActive && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>Voice Chat Active</span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};