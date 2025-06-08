import React, { useState, useEffect } from 'react';
import { Play, Star, Clock, Users, Mic, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const FireTVDemo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState('relaxed');
  const [currentUser, setCurrentUser] = useState('John');
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  };

  const moods = [
    { id: 'happy', label: '😊 Happy', color: 'bg-yellow-500' },
    { id: 'relaxed', label: '😌 Relaxed', color: 'bg-blue-500' },
    { id: 'excited', label: '🤩 Excited', color: 'bg-red-500' },
    { id: 'sad', label: '😢 Sad', color: 'bg-gray-500' },
    { id: 'tired', label: '😴 Tired', color: 'bg-purple-500' }
  ];

  const users = ['John', 'Sarah', 'Kids', 'Family'];

  const contentData = {
    morning: {
      happy: [
        { title: 'Morning Show', genre: 'Talk Show', rating: 4.8, duration: '45 min', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=450&fit=crop' },
        { title: 'Good News Today', genre: 'News', rating: 4.5, duration: '30 min', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=450&fit=crop' },
        { title: 'Breakfast with Champions', genre: 'Sports', rating: 4.7, duration: '60 min', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=450&fit=crop' }
      ],
      relaxed: [
        { title: 'Nature\'s Beauty', genre: 'Documentary', rating: 4.9, duration: '50 min', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=450&fit=crop' },
        { title: 'Meditation Morning', genre: 'Wellness', rating: 4.6, duration: '20 min', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop' },
        { title: 'Slow TV: Train Journey', genre: 'Ambient', rating: 4.4, duration: '120 min', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=450&fit=crop' }
      ]
    },
    evening: {
      excited: [
        { title: 'Action Hero Returns', genre: 'Action', rating: 4.7, duration: '135 min', image: 'https://images.unsplash.com/photo-1489599263080-5ba6d2edc31e?w=300&h=450&fit=crop' },
        { title: 'Space Adventure', genre: 'Sci-Fi', rating: 4.8, duration: '145 min', image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop' },
        { title: 'Racing Legends', genre: 'Sports Drama', rating: 4.6, duration: '128 min', image: 'https://images.unsplash.com/photo-1552249111-f6d8a5b93351?w=300&h=450&fit=crop' }
      ],
      relaxed: [
        { title: 'Cozy Mysteries', genre: 'Mystery', rating: 4.7, duration: '95 min', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop' },
        { title: 'Garden Stories', genre: 'Drama', rating: 4.5, duration: '110 min', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=450&fit=crop' },
        { title: 'Peaceful Cooking', genre: 'Lifestyle', rating: 4.8, duration: '35 min', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=450&fit=crop' }
      ]
    }
  };

  const getCurrentContent = () => {
    const timeOfDay = getTimeOfDay();
    const fallbackTime = timeOfDay in contentData ? timeOfDay : 'evening';
    const fallbackMood = selectedMood in contentData[fallbackTime] ? selectedMood : 'relaxed';
    return contentData[fallbackTime][fallbackMood] || contentData.evening.relaxed;
  };

  const ContentCard = ({ content, size = 'normal' }) => (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 ${
        size === 'large' ? 'w-80 h-48' : size === 'small' ? 'w-32 h-48' : 'w-48 h-72'
      }`}
      onClick={() => setSelectedContent(content)}
    >
      <img 
        src={content.image} 
        alt={content.title}
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <h3 className="font-bold text-sm mb-1 truncate">{content.title}</h3>
        <p className="text-xs text-gray-300 mb-2">{content.genre}</p>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{content.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{content.duration}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>
    </div>
  );

  const ContentModal = ({ content, onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img src={content.image} alt={content.title} className="w-full h-64 object-cover rounded-t-xl" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/70"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
            <p className="text-gray-300">{content.genre}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white">{content.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">{content.duration}</span>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Perfect for your current mood and time of day. Recommended based on your viewing history and preferences.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-black" />
              Play Now
            </button>
            <button className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors">
              + My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Featured Content */}
      <div className="p-6">

        {/* Mood-Based Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Because You're Feeling {moods.find(m => m.id === selectedMood)?.label}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {getCurrentContent().slice(0, 6).map((content, index) => (
              <ContentCard key={index} content={content} />
            ))}
          </div>
        </div>

        {/* Smart Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            AI Smart Picks for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Recommended Based on Your Mood',
                description: `Perfect ${selectedMood} content for ${getTimeOfDay()} viewing`,
                content: getCurrentContent()[0],
                reason: 'Mood Match'
              },
              {
                title: 'Similar to What You Loved',
                description: 'Because you enjoyed "The Crown" and similar dramas',
                content: { title: 'Royal Chronicles', genre: 'Historical Drama', rating: 4.7, duration: '115 min', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=450&fit=crop' },
                reason: 'Viewing History'
              },
              {
                title: 'Perfect for This Time',
                description: `Great ${getTimeOfDay()} entertainment based on your schedule`,
                content: { title: 'Quick Bites', genre: 'Short Films', rating: 4.4, duration: '25 min', image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=450&fit=crop' },
                reason: 'Time Context'
              }
            ].map((suggestion, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-orange-500 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-orange-500">{suggestion.reason}</span>
                </div>
                <h3 className="font-bold mb-1">{suggestion.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{suggestion.description}</p>
                <ContentCard content={suggestion.content} size="small" />
              </div>
            ))}
          </div>
        </div>

        {/* Voice Control Demo */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-blue-400" />
            Voice Control Demo
          </h2>
          <p className="text-gray-300 mb-4">Try saying: "Show me something funny" or "I want to watch something relaxing"</p>
          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              🎤 "Something funny"
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
              🎤 "Relaxing content"
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors">
              🎤 "Action movies"
            </button>
          </div>
        </div>

        {/* Analytics Dashboard Preview */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4 text-orange-500">Your Viewing Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">87%</div>
              <div className="text-sm text-gray-400">Recommendation Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2.3x</div>
              <div className="text-sm text-gray-400">Faster Content Discovery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
              <div className="text-sm text-gray-400">Hours Saved This Month</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Top Mood</div>
              <div className="font-semibold">😌 Relaxed (45%)</div>
            </div>
            <div>
              <div className="text-gray-400">Favorite Time</div>
              <div className="font-semibold">Evening (60%)</div>
            </div>
            <div>
              <div className="text-gray-400">Top Genre</div>
              <div className="font-semibold">Drama (35%)</div>
            </div>
            <div>
              <div className="text-gray-400">Avg Session</div>
              <div className="font-semibold">2.5 hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Modal */}
      {selectedContent && (
        <ContentModal 
          content={selectedContent} 
          onClose={() => setSelectedContent(null)} 
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 p-6 mt-8">
        <div className="text-center text-gray-400">
          <p className="mb-2">Enhanced Fire TV Experience - Personalized Content Recommendation Engine</p>
          <p className="text-sm">Powered by AI • Mood Detection • Behavioral Analysis • Time Context Awareness</p>
        </div>
      </footer>
    </div>
  );
};

export default FireTVDemo;