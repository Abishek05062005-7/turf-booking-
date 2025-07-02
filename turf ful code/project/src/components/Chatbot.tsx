import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, MapPin, Clock, Star } from 'lucide-react';
import { turfs } from '../data/turfs';
import { Turf } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  turfData?: Turf;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your TurfBook assistant. I can help you find turfs, check availability, and answer questions about our facilities. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Show me available turfs",
        "What are the prices?",
        "Check slot availability",
        "Find turfs near me"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Turf search queries
    if (lowerMessage.includes('show') && (lowerMessage.includes('turf') || lowerMessage.includes('available'))) {
      const featuredTurfs = turfs.slice(0, 3);
      return {
        id: Date.now().toString(),
        text: `Here are some of our popular turfs:

${featuredTurfs.map(turf => 
  `🏟️ **${turf.name}**
📍 ${turf.location}
💰 ₹${turf.price}/hour
⭐ ${turf.rating} (${turf.reviews} reviews)`
).join('\n\n')}

Would you like to see more details about any of these?`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Tell me about Premier Sports Arena",
          "Show slot availability",
          "What amenities are available?",
          "Show all turfs"
        ]
      };
    }

    // Price queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return {
        id: Date.now().toString(),
        text: `Our turf prices vary based on location and facilities:

💰 **Price Ranges:**
• Budget: ₹400 - ₹800/hour
• Mid-range: ₹800 - ₹1,200/hour  
• Premium: ₹1,200 - ₹1,800/hour

Prices may vary based on:
• Time of day (peak/off-peak)
• Day of the week
• Seasonal demand
• Special facilities

Would you like to see specific pricing for any turf?`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Show budget turfs",
          "Premium facilities",
          "Weekend pricing",
          "Book a slot"
        ]
      };
    }

    // Slot availability queries
    if (lowerMessage.includes('slot') || lowerMessage.includes('availability') || lowerMessage.includes('time')) {
      return {
        id: Date.now().toString(),
        text: `⏰ **Slot Availability:**

Most turfs offer slots from:
• Early Morning: 6:00 AM - 10:00 AM
• Afternoon: 2:00 PM - 6:00 PM  
• Evening: 6:00 PM - 10:00 PM

🔥 **Peak Hours:** 6:00 PM - 9:00 PM (Higher rates)
💡 **Off-Peak:** 6:00 AM - 9:00 AM (Lower rates)

To check real-time availability, please specify:
1. Which turf you're interested in
2. Your preferred date
3. Time preference`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Check Premier Sports Arena",
          "Morning slots",
          "Evening availability",
          "Weekend slots"
        ]
      };
    }

    // Location/nearby queries
    if (lowerMessage.includes('near') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return {
        id: Date.now().toString(),
        text: `📍 **Our Turf Locations:**

🏙️ **City Center:**
• Premier Sports Arena - Downtown
• City Center Turf - CBD

🌳 **Suburban Areas:**
• Green Valley Sports Club - Sector 21
• Riverside Sports Ground - Riverside Park

🏘️ **Residential Areas:**
• Champions Academy Ground - Sports Complex
• Community Sports Hub - Block-C

Which area would you prefer? I can show you detailed directions and nearby amenities.`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Downtown turfs",
          "Suburban locations",
          "Nearest to me",
          "Show on map"
        ]
      };
    }

    // Amenities queries
    if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities') || lowerMessage.includes('features')) {
      return {
        id: Date.now().toString(),
        text: `🏟️ **Available Amenities:**

⚡ **Basic Facilities:**
• Floodlights for night games
• Parking space
• Changing rooms
• Equipment storage

🌟 **Premium Features:**
• Air conditioning
• Professional equipment rental
• Refreshment areas/cafeteria
• Valet parking

🎯 **Special Services:**
• Professional coaching
• Video analysis
• Tournament hosting
• Corporate events

Which specific amenities are important to you?`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Parking availability",
          "Coaching services",
          "Equipment rental",
          "Food facilities"
        ]
      };
    }

    // Booking queries
    if (lowerMessage.includes('book') || lowerMessage.includes('reserve') || lowerMessage.includes('booking')) {
      return {
        id: Date.now().toString(),
        text: `📅 **How to Book:**

1️⃣ **Browse Turfs:** Check our available facilities
2️⃣ **Select Date & Time:** Choose your preferred slot
3️⃣ **Confirm Details:** Review booking information
4️⃣ **Make Payment:** Secure online payment
5️⃣ **Get Confirmation:** Instant booking confirmation

💳 **Payment Options:**
• Credit/Debit Cards
• UPI/Digital Wallets
• Net Banking

🔄 **Cancellation Policy:**
• Free cancellation up to 2 hours before
• 50% refund for same-day cancellation

Ready to book? I can guide you through the process!`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Start booking process",
          "Payment methods",
          "Cancellation policy",
          "View my bookings"
        ]
      };
    }

    // Specific turf queries
    const turfNames = turfs.map(t => t.name.toLowerCase());
    const mentionedTurf = turfNames.find(name => lowerMessage.includes(name.split(' ')[0]));
    
    if (mentionedTurf) {
      const turf = turfs.find(t => t.name.toLowerCase() === mentionedTurf);
      if (turf) {
        return {
          id: Date.now().toString(),
          text: `🏟️ **${turf.name}**

📍 **Location:** ${turf.location}
💰 **Price:** ₹${turf.price}/hour
⭐ **Rating:** ${turf.rating}/5 (${turf.reviews} reviews)
🌱 **Surface:** ${turf.surface}
📏 **Size:** ${turf.size}

🎯 **Amenities:**
${turf.amenities.map(amenity => `• ${amenity}`).join('\n')}

📝 **Description:**
${turf.description}

Would you like to check availability or book this turf?`,
          sender: 'bot',
          timestamp: new Date(),
          turfData: turf,
          suggestions: [
            "Check availability",
            "Book this turf",
            "View more details",
            "Compare with others"
          ]
        };
      }
    }

    // Default responses for unrecognized queries
    const defaultResponses = [
      {
        text: `I'd be happy to help! Here are some things I can assist you with:

🏟️ **Turf Information:** Details about our facilities
⏰ **Slot Availability:** Real-time booking status  
💰 **Pricing:** Rates and packages
📍 **Locations:** Find turfs near you
🎯 **Amenities:** Available facilities and services
📅 **Booking Help:** Guide you through the process

What would you like to know more about?`,
        suggestions: [
          "Show available turfs",
          "Check pricing",
          "Find locations",
          "Booking help"
        ]
      },
      {
        text: `I'm here to help you find the perfect turf! You can ask me about:

• Turf availability and pricing
• Location and directions
• Amenities and facilities  
• Booking process and policies
• Slot timings and schedules

What specific information do you need?`,
        suggestions: [
          "Available turfs",
          "Pricing details",
          "Amenities list",
          "How to book"
        ]
      }
    ];

    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    
    return {
      id: Date.now().toString(),
      text: randomResponse.text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: randomResponse.suggestions
    };
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-green-600 hover:bg-green-700'
        } text-white flex items-center justify-center`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">TurfBook Assistant</h3>
                <p className="text-green-100 text-sm">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-green-600' : 'bg-gray-200'
                    }`}>
                      {message.sender === 'user' ? 
                        <User className="w-4 h-4 text-white" /> : 
                        <Bot className="w-4 h-4 text-gray-600" />
                      }
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Ask about turfs, slots, pricing..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;