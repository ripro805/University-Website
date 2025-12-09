import { useState } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! How can I help you today?', sender: 'bot', time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');

  const mockResponses = {
    'hello': 'Hi there! Welcome to the University Portal.',
    'help': 'I can assist you with profile, courses, routine, payments, and more. What would you like help with?',
    'profile': 'You can update your profile information by going to the Profile section.',
    'course': 'Check the Courses section to view and manage your enrolled courses.',
    'payment': 'Visit the Payments page to pay dues or view payment history.',
    'routine': 'Your class routine is available in the Class Routine section.',
    'cgpa': 'Check your CGPA and semester GPA in the CGPA Calculator section.',
    'document': 'Upload important documents in the Documents section.',
    'default': 'I\'m here to help! Can you please provide more details about your question?'
  };

  function getResponse(userMsg) {
    const msg = userMsg.toLowerCase();
    for (const [key, response] of Object.entries(mockResponses)) {
      if (msg.includes(key)) return response;
    }
    return mockResponses.default;
  }

  function handleSend() {
    if (!input.trim()) return;

    const userMsg = { id: messages.length + 1, text: input, sender: 'user', time: new Date().toLocaleTimeString() };
    setMessages([...messages, userMsg]);

    setTimeout(() => {
      const botMsg = { id: messages.length + 2, text: getResponse(input), sender: 'bot', time: new Date().toLocaleTimeString() };
      setMessages(prev => [...prev, botMsg]);
    }, 500);

    setInput('');
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 z-40"
        title="Open Chat"
      >
        <FaComments size={24} />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-40 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">University Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 max-h-96 bg-gray-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-300 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
