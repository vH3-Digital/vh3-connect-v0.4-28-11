import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AgentCard } from './components/AgentCard';
import { EngineerCard } from './components/EngineerCard';
import { MessageCard } from './components/MessageCard';
import { ChatPanel } from './components/ChatPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BulletinsPanel } from './components/BulletinsPanel';
import { LoadingScreen } from './components/LoadingScreen';
import { CallLog } from './components/CallLog';
import { Workflows } from './components/Workflows';
import { Chats } from './components/Chats';
import { Integrations } from './components/Integrations';
import { agents, engineers, messages } from './data';

export function App() {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = React.useState('dashboard');

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'bulletins':
        return <BulletinsPanel />;
      case 'engineers':
        return (
          <div className="grid grid-cols-1 gap-4">
            {engineers.map((engineer) => (
              <EngineerCard key={engineer.id} {...engineer} />
            ))}
          </div>
        );
      case 'agents':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.email}
                {...agent}
                color="from-purple-400 to-blue-500"
                onChat={() => {}}
              />
            ))}
          </div>
        );
      case 'messages':
        return (
          <div className="grid grid-cols-1 gap-4">
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                name={message.sender}
                message={message.preview}
                category={message.category}
                status={message.status}
                imageUrl={message.avatar}
                onClick={() => {}}
              />
            ))}
          </div>
        );
      case 'chats':
        return <Chats />;
      case 'calls':
        return <CallLog />;
      case 'workflows':
        return <Workflows />;
      case 'integrations':
        return <Integrations />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar onNavigate={setActiveView} activeView={activeView} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
            <div className="mb-8">
              <img 
                src="https://cdn.prod.website-files.com/66f62ac0b4dbc96bb348eb73/66f646494a2921204a349922_vh3-connect-logo-p-500.png"
                alt="VH3 CONNECT"
                className="h-8"
              />
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}