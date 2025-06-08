import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Users, Send, Share2, Plus, X, Clock, Star, Settings, Monitor, Vote } from 'lucide-react';

const WatchPartyPlatform = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Yeah that guy', message: 'deserves no dates', time: '24:12', avatar: '👤', reactions: {} },
    { id: 2, user: 'Luis adam', message: '', time: '24:12', avatar: '👤', reactions: {} },
    { id: 3, user: 'Musni Dhaifina', message: 'One thousand percent', time: '24:30', avatar: '👤', reactions: {} },
    { id: 4, user: 'Antonius JPG', message: '😂😂😂', time: '26:11', avatar: '👤', reactions: {} },
    { id: 5, user: 'Nobel Winardi', message: 'She is giving off way too much "I\'m a cool Boy Energy 🤮"', time: '29:53', avatar: '👤', reactions: {} },
    { id: 6, user: 'Angela Yonara', message: 'She\'s talking to a man vs her regular voice when alone makes me want to slap her', time: '30:27', avatar: '👤', reactions: {} }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Yeah that guy', avatar: '👤', isHost: false },
    { id: 2, name: 'Luis adam', avatar: '👤', isHost: false },
    { id: 3, name: 'Musni Dhaifina', avatar: '👤', isHost: false },
    { id: 4, name: 'Antonius JPG', avatar: '👤', isHost: false },
    { id: 5, name: 'Nobel Winardi', avatar: '👤', isHost: true },
    { id: 6, name: 'Angela Yonara', avatar: '👤', isHost: false }
  ]);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [partyLink, setPartyLink] = useState('');
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState([
    { id: 1, title: 'The Matrix (1999)', votes: 0, voters: [] },
    { id: 2, title: 'Inception (2010)', votes: 0, voters: [] },
    { id: 3, title: 'Interstellar (2014)', votes: 0, voters: [] }
  ]);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    title: 'The Last Anjay The Movie (2021)',
    thumbnail: '',
    url: ''
  });
  const [userName, setUserName] = useState('You');
  const [videoQueue, setVideoQueue] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [newPollTitle, setNewPollTitle] = useState('');
  const [newPollOption, setNewPollOption] = useState('');
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const videoRef = useRef(null);
  const chatRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setPartyLink(`${window.location.origin}/party/${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      const isScrolledToBottom = chatRef.current.scrollHeight - chatRef.current.scrollTop <= chatRef.current.clientHeight + 10;
      if (isScrolledToBottom) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        setUnreadMessages(0);
      } else {
        setUnreadMessages(prev => prev + 1);
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    if (currentTime >= duration && duration > 0 && isPlaying) {
      setIsPlaying(false);
      if (videoQueue.length > 0) {
        const nextVideo = videoQueue[0];
        setCurrentVideo(nextVideo);
        setVideoQueue(prev => prev.slice(1));
        setCurrentTime(0);
        setDuration(3599);
      } else {
        setShowPoll(true);
      }
    }
  }, [currentTime, duration, isPlaying, videoQueue]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e) => {
    const progress = e.target.value;
    setCurrentTime((progress / 100) * duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        user: userName,
        message: newMessage,
        time: formatTime(currentTime),
        avatar: '👤',
        reactions: {}
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const addReaction = (messageId, emoji) => {
    setChatMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: { ...msg.reactions, [emoji]: (msg.reactions[emoji] || 0) + 1 } }
        : msg
    ));
  };

  const copyPartyLink = () => {
    navigator.clipboard.writeText(partyLink);
    alert('Party link copied to clipboard!');
  };

  const addVideo = () => {
    if (newVideoUrl.trim()) {
      const newVideo = {
        title: 'New Video',
        thumbnail: '',
        url: newVideoUrl
      };
      setVideoQueue([...videoQueue, newVideo]);
      setNewVideoUrl('');
      setShowAddVideo(false);
    }
  };

  const vote = (optionId) => {
    if (!hasVoted) {
      setPollOptions(prev => prev.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1, voters: [...option.voters, userName] }
          : option
      ));
      setHasVoted(true);
    }
  };

  const selectWinningVideo = () => {
    const winner = pollOptions.reduce((prev, current) => 
      prev.votes > current.votes ? prev : current
    );
    setCurrentVideo({
      title: winner.title,
      thumbnail: '',
      url: ''
    });
    setShowPoll(false);
    setHasVoted(false);
    setPollOptions(prev => prev.map(option => ({ ...option, votes: 0, voters: [] })));
    setCurrentTime(0);
    setDuration(3599);
  };

  const createPoll = () => {
    if (newPollTitle && newPollOption) {
      setPollOptions(prev => [
        ...prev,
        { id: prev.length + 1, title: newPollOption, votes: 0, voters: [] }
      ]);
      setNewPollOption('');
      setShowCreatePoll(false);
      setShowPoll(true);
    }
  };

  const jumpToTimestamp = (time) => {
    const [mins, secs] = time.split(':').map(Number);
    const seconds = mins * 60 + secs;
    setCurrentTime(seconds);
  };

  const startScreenShare = () => {
    alert('Screen sharing initiated! (Demo placeholder)');
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    setDuration(3599);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Prime Watch Party</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{participants.length} Participants</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddVideo(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Video</span>
          </button>
          <button
            onClick={startScreenShare}
            className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors shadow-md"
          >
            <Monitor className="w-4 h-4" />
            <span>Screen Share</span>
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={copyPartyLink}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-4 py-2 rounded-md flex items-center space-x-2 transition-all shadow-md font-medium"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Party</span>
          </button>
          <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-slate-400 bg-slate-700' : 'text-gray-600 bg-gray-200'} px-3 py-2 rounded-md`}>
            <Users className="w-5 h-5" />
            <span>{participants.length}</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 p-6">
          <div className={`rounded-lg overflow-hidden shadow-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="relative aspect-video bg-slate-900">
              <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-gray-100 via-blue-200 to-gray-100'}`}>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                    {isPlaying ? <Pause className="w-12 h-12 text-slate-900" /> : <Play className="w-12 h-12 text-slate-900 ml-1" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{currentVideo.title}</h3>
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Click to {isPlaying ? 'pause' : 'play'}</p>
                </div>
              </div>
              <button
                onClick={togglePlay}
                className={`absolute inset-0 flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-black/0 hover:bg-black/30' : 'bg-black/0 hover:bg-black/10'}`}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-sm ${theme === 'dark' ? 'bg-black/60' : 'bg-black/20'}`}>
                  {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
                </div>
              </button>
            </div>
            <div className={`p-4 border-t ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center space-x-4">
                <button onClick={togglePlay} className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className="flex-1 flex items-center space-x-2">
                  <span className={`text-sm font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                    {formatTime(currentTime)}
                  </span>
                  <div className={`flex-1 rounded-full h-1.5 relative ${theme === 'dark' ? 'bg-slate-600' : 'bg-gray-300'}`}>
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full transition-all duration-300 shadow-sm"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={(currentTime / duration) * 100 || 0}
                      onChange={handleProgressChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className={`text-sm font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                    {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={toggleMute} className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-20 accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Video Queue */}
          <div className={`mt-6 rounded-lg p-4 shadow-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Play className="w-5 h-5 mr-2 text-amber-400" />
              Video Queue ({videoQueue.length})
            </h3>
            {videoQueue.length > 0 ? (
              <div className="space-y-3">
                {videoQueue.map((video, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600 hover:border-slate-500' : 'bg-gray-100 border-gray-200 hover:border-gray-300'} transition-colors flex items-center justify-between`}>
                    <span className="text-sm font-medium truncate">{video.title}</span>
                    <button
                      onClick={() => setVideoQueue(prev => prev.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>No videos in queue</p>
            )}
          </div>

          {/* Participants List */}
          <div className={`mt-6 rounded-lg p-4 shadow-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-amber-400" />
              Watch Party Members ({participants.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {participants.map(participant => (
                <div key={participant.id} className={`flex items-center space-x-2 p-3 rounded-lg border ${theme === 'dark' ? 'bg-slate-700 border-slate-600 hover:border-slate-500' : 'bg-gray-100 border-gray-200 hover:border-gray-300'} transition-colors`}>
                  <span className="text-2xl">{participant.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{participant.name}</p>
                    {participant.isHost && (
                      <span className="inline-flex items-center text-xs text-amber-400 font-medium">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Host
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className={`w-80 border-l flex flex-col shadow-2xl ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
          <div className={`p-4 border-b ${theme === 'dark' ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-700' : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Live Chat</h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Join the conversation</p>
              </div>
              {unreadMessages > 0 && (
                <div className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {unreadMessages} new
                </div>
              )}
            </div>
          </div>
          
          <div ref={chatRef} className={`flex-1 overflow-y-auto p-4 space-y-3 ${theme === 'dark' ? 'bg-slate-850' : 'bg-gray-50'}`}>
            {chatMessages.map(message => (
              <div key={message.id} className={`flex space-x-3 p-2 rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-slate-700/30' : 'hover:bg-gray-100'}`}>
                <span className="text-2xl flex-shrink-0">{message.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-blue-400">{message.user}</span>
                    <button
                      onClick={() => jumpToTimestamp(message.time)}
                      className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {message.time}
                    </button>
                  </div>
                  {message.message && (
                    <p className={`text-sm mt-1 break-words leading-relaxed ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>{message.message}</p>
                  )}
                  <div className="flex space-x-2 mt-1">
                    {['👍', '😂', '❤️'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => addReaction(message.id, emoji)}
                        className={`text-sm ${theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
                      >
                        {emoji} {message.reactions[emoji] > 0 ? message.reactions[emoji] : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`p-4 border-t ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className={`flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600 focus:border-blue-500' : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'}`}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-2 rounded-md transition-all shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Video Modal */}
      {showAddVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md border shadow-2xl ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Video</h3>
              <button
                onClick={() => setShowAddVideo(false)}
                className={`p-1 rounded transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Video URL</label>
                <input
                  type="url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600 focus:border-blue-500' : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'}`}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddVideo(false)}
                  className={`flex-1 py-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-slate-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={addVideo}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-2 rounded-md transition-all shadow-md text-white font-medium"
                >
                  Add to Queue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md border shadow-2xl ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className={`p-1 rounded transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Display Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600 focus:border-blue-500' : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600 focus:border-blue-500' : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'}`}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className={`flex-1 py-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-slate-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Poll Modal */}
      {showCreatePoll && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md border shadow-2xl ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create New Poll</h3>
              <button
                onClick={() => setShowCreatePoll(false)}
                className={`p-1 rounded transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Poll Question</label>
                <input
                  type="text"
                  value={newPollTitle}
                  onChange={(e) => setNewPollTitle(e.target.value)}
                  placeholder="What should we watch next?"
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600 focus:border-blue-500' : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Add Option</label>
                <input
                  type="text"
                  value={newPollOption}
                  onChange={(e) => setNewPollOption(e.target.value)}
                  placeholder="Enter movie title"
                  className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all ${theme === 'dark' ? 'bg-slate-700 text-white border-slate-600 focus:border-blue-500' : 'bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500'}`}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreatePoll(false)}
                  className={`flex-1 py-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-slate-600 hover:bg-slate-700 text-slate-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={createPoll}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-2 rounded-md transition-all shadow-md text-white font-medium"
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poll Modal */}
      {showPoll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">🎬 {newPollTitle || 'What should we watch next?'}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Vote for the next movie!</p>
            </div>
            <div className="space-y-3 mb-6">
              {pollOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => vote(option.id)}
                  disabled={hasVoted}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${hasVoted ? 'border-gray-600 cursor-not-allowed' : `border-gray-600 hover:border-blue-500 hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.title}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{option.votes} votes</span>
                      {option.votes > 0 && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  {option.votes > 0 && (
                    <div className={`mt-2 rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(option.votes / Math.max(...pollOptions.map(o => o.votes), 1)) * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
            {hasVoted && (
              <button
                onClick={selectWinningVideo}
                className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Watching Winner! 🏆
              </button>
            )}
            {participants.find(p => p.name === userName && p.isHost) && (
              <button
                onClick={() => setShowCreatePoll(true)}
                className="w-full mt-3 bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition-colors"
              >
                Create New Poll
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPartyPlatform;