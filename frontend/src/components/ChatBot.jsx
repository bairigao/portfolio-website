import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm Si Li's AI assistant. Ask me anything about Si's experience, skills, or projects!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response using Chatbase API
  const getBotResponse = async (userMessage) => {
    setIsTyping(true);
    
    try {
      // Call Chatbase API
      const response = await fetch('https://www.chatbase.co/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY_HERE' // You'll need to add your Chatbase API key
        },
        body: JSON.stringify({
          chatbotId: 'hA9g_K0FRfZjFvrfFodKC',
          messages: [
            {
              content: userMessage,
              role: 'user'
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      setIsTyping(false);
      return data.text || "I'm having trouble responding right now. Could you try rephrasing your question?";
      
    } catch (error) {
      console.error('Chatbase API Error:', error);
      setIsTyping(false);
      
      // Fallback to keyword matching if API fails
      const message = userMessage.toLowerCase();
      let response = "I'm not sure about that. Could you ask about Si's skills, experience, or projects?";
      
      if (message.includes('skill') || message.includes('technology')) {
        response = "Si Li specializes in Cloud Computing (AWS certified), AI & Productivity tools, Automation & DevOps, and has programming experience in Python, PowerShell, C#, and JavaScript. Would you like to know more about any specific area?";
      } else if (message.includes('experience') || message.includes('work')) {
        response = "Si has experience as an IT Support Officer at Brisbane Catholic Education, where he led cloud migration projects and developed automation solutions. He's also worked on various projects including ML systems and full-stack applications.";
      } else if (message.includes('project')) {
        response = "Si's notable projects include: 1) Cloud Migration Lab with AWS deployment, 2) Geo-Intelligence ML System for OreFox, and 3) Java App with GitHub Actions integration. Which project interests you?";
      } else if (message.includes('education') || message.includes('study')) {
        response = "Si Li is studying Computer Science at Queensland University of Technology with a GPA of 6.5/7, graduating in 2024. He has strong skills in full-stack development and cloud technologies.";
      } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
        response = "You can reach Si Li at lis09296313@gmail.com or connect on LinkedIn and GitHub. Feel free to download his resume from the button at the top!";
      } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        response = "Hello! 👋 I'm here to help you learn more about Si Li. You can ask me about his skills, experience, projects, or education!";
      }
      
      return response;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Get bot response
    const botResponse = await getBotResponse(inputMessage);
    
    const botMsg = {
      type: 'bot',
      text: botResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMsg]);
  };

  const quickQuestions = [
    "What are Si's skills?",
    "Tell me about experience",
    "Show me projects",
    "How to contact?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center space-x-2"
          aria-label="Open chat"
        >
          <FaRobot size={24} />
          <span className="hidden sm:inline text-sm font-medium">Ask AI about Si</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 rounded-lg shadow-2xl border-2 border-purple-500 flex flex-col z-50 animate-slideUp">
          {/* Header */}
          <div className="bg-purple-600 p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaRobot size={24} />
              <div>
                <h3 className="font-bold text-white">Si Li's AI Assistant</h3>
                <p className="text-xs text-purple-100">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-200 transition-colors"
              aria-label="Close chat"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 p-3 rounded-lg rounded-bl-none border border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-700 hover:bg-purple-600 text-gray-200 px-3 py-1 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 rounded-b-lg border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Si's experience, skills..."
                className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 text-sm"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
                aria-label="Send message"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;

