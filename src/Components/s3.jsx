import { useState, useEffect } from 'react';
import { Play, Star, Clock,  Mic} from 'lucide-react';

const FireTVDemo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState('relaxed');
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
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