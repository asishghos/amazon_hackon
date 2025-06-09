import { useState, useEffect, useRef } from 'react';
import { Clock, Search, ChevronLeft, ChevronRight, Play, Settings, Star, Pause, Share2 } from 'lucide-react';

const MXPlayerUI = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [isHeroPlaying, setIsHeroPlaying] = useState(true);
    const [ratings, setRatings] = useState({});
    const heroRef = useRef(null);

    const moods = [
        { id: 'happy', label: '😊 Happy', color: 'bg-yellow-500' },
        { id: 'fear', label: '😨 Fear', color: 'bg-purple-600' },
        { id: 'anger', label: '😡 Anger', color: 'bg-red-600' },
        { id: 'sad', label: '😢 Sad', color: 'bg-blue-600' },
        { id: 'love', label: '❤️ Love', color: 'bg-pink-600' },
        { id: 'surprise', label: '😮 Surprise', color: 'bg-orange-500' },
        { id: 'disgust', label: '🤢 Disgust', color: 'bg-green-600' },
        { id: 'neutral', label: '😐 Neutral', color: 'bg-gray-600' }
    ];

    const languages = [
        { id: 'all', label: 'All Languages' },
        { id: 'hindi', label: 'Hindi' },
        { id: 'kannada', label: 'Kannada' }
    ];

    const heroContent = [
        {
            title: 'KILLदिल',
            subtitle: 'THE HEARTBREAK CLUB',
            image: '/api/placeholder/400/300',
            genre: 'Drama',
            tag: 'NEW SERIES'
        },
        {
            title: 'SHADOWS',
            subtitle: 'A MYSTERY THRILLER',
            image: '/api/placeholder/400/300',
            genre: 'Thriller',
            tag: 'TRENDING NOW'
        },
        {
            title: 'LOVE LOOP',
            subtitle: 'A ROMANTIC JOURNEY',
            image: '/api/placeholder/400/300',
            genre: 'Romance',
            tag: 'POPULAR'
        }
    ];

    const trendingShows = [
        { id: 't1', title: 'PLAYGROUND', image: '/api/placeholder/300/200', genre: 'Drama', language: 'Hindi' },
        { id: 't2', title: 'OUR SECRET', image: '/api/placeholder/300/200', genre: 'Romance', language: 'Telugu' },
        { id: 't3', title: 'Girlfriend', image: '/api/placeholder/300/200', genre: 'Romance', language: 'Hindi' },
        { id: 't4', title: 'IP2', image: '/api/placeholder/300/200', genre: 'Thriller', language: 'Tamil' },
        { id: 't5', title: 'Geon', image: '/api/placeholder/300/200', genre: 'Action', language: 'Kannada' }
    ];

    const webSeries = [
        { id: 'w1', title: 'Heartbeats', image: '/api/placeholder/300/200', genre: 'Medical Drama', language: 'Hindi' },
        { id: 'w2', title: 'AMBER GIRLS SCHOOL', image: '/api/placeholder/300/200', genre: 'Teen Drama', language: 'Telugu' },
        { id: 'w3', title: 'LAAKHON MEIN EK', image: '/api/placeholder/300/200', genre: 'Comedy Drama', language: 'Hindi' },
        { id: 'w4', title: 'SCHOOL FRIENDS', image: '/api/placeholder/300/200', genre: 'Comedy', language: 'Tamil' },
        { id: 'w5', title: 'Family Series', image: '/api/placeholder/300/200', genre: 'Family', language: 'Malayalam' }
    ];

    const recentlyWatched = [
        { id: 'r1', title: 'The Last Stand', image: '/api/placeholder/300/200', genre: 'Action', language: 'Hindi' },
        { id: 'r2', title: 'Comedy Nights', image: '/api/placeholder/300/200', genre: 'Comedy', language: 'Telugu' },
        { id: 'r3', title: 'Mystery Manor', image: '/api/placeholder/300/200', genre: 'Thriller', language: 'Tamil' }
    ];

    useEffect(() => {
        let interval;
        if (isHeroPlaying) {
            interval = setInterval(() => {
                setCurrentHeroIndex(prev => (prev + 1) % heroContent.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isHeroPlaying, heroContent.length]);

    const handleNextHero = () => {
        setCurrentHeroIndex(prev => (prev + 1) % heroContent.length);
        setIsHeroPlaying(false);
    };

    const handlePrevHero = () => {
        setCurrentHeroIndex(prev => (prev - 1 + heroContent.length) % heroContent.length);
        setIsHeroPlaying(false);
    };

    const toggleHeroPlay = () => {
        setIsHeroPlaying(prev => !prev);
    };

    const handleRating = (showId, rating) => {
        setRatings(prev => ({ ...prev, [showId]: rating }));
    };

    const shareShow = (title) => {
        const shareUrl = `${window.location.origin}/show/${title.toLowerCase().replace(/\s/g, '-')}`;
        navigator.clipboard.writeText(shareUrl);
        alert(`Link to ${title} copied to clipboard!`);
    };

    const filteredTrendingShows = trendingShows.filter(show =>
        (selectedLanguage === 'all' || !selectedLanguage || show.language === selectedLanguage) &&
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredWebSeries = webSeries.filter(series =>
        (selectedLanguage === 'all' || !selectedLanguage || series.language === selectedLanguage) &&
        series.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredRecentlyWatched = recentlyWatched.filter(show =>
        (selectedLanguage === 'all' || !selectedLanguage || show.language === selectedLanguage) &&
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [currentTime, setCurrentTime] = useState(new Date());
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
            className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 ${size === 'large' ? 'w-80 h-48' : size === 'small' ? 'w-32 h-48' : 'w-48 h-72'
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
            {/* Header */}
            <header className="bg-black border-b border-gray-800">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center space-x-8">
                        {/* <div className="flex items-center space-x-2">
                            <span className="text-white font-bold text-xl">amazon</span>
                            <div className="flex items-center bg-blue-600 rounded px-2 py-1">
                                <Play className="w-4 h-4 text-white mr-1" />
                                <span className="text-white font-semibold text-sm">MXPLAYER</span>
                            </div>
                        </div> */}

                        <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Main navigation">
                            <a href="#" className="text-blue-400 hover:text-blue-300" aria-current="page">Home</a>
                            <a href="#" className="text-gray-300 hover:text-white">New & Hot</a>
                            <a href="#" className="text-gray-300 hover:text-white">Web Series</a>
                            <a href="#" className="text-gray-300 hover:text-white">Movies</a>
                            <a href="#" className="text-gray-300 hover:text-white">Romance</a>
                            <a href="#" className="text-gray-300 hover:text-white">Comedy</a>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="/aiFeatures"
                            className="bg-gradient-to-r from-amber-100 to-orange-200 text-black px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg"
                            aria-label="Go to Prime Watch Party"
                        >
                            <span>Dashboard</span>
                        </a>
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search for movies, shows, and more..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-900 text-white pl-10 pr-4 py-3 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                                aria-label="Search for movies and shows"
                            />
                        </div>
                        <a
                            href="/watchParty"
                            className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:from-amber-500 hover:to-orange-600 transition-all shadow-lg"
                            aria-label="Go to Prime Watch Party"
                        >
                            <Play className="w-5 h-5" />
                            <span>Join Watch Party</span>
                        </a>
                        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center" aria-label="User profile">
                            <span className="text-white font-bold text-sm">a</span>
                        </div>
                        <Settings className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" aria-label="Settings" />
                    </div>
                </div>

                {/* Filters */}
                <div className="px-6 py-4 border-b border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold mb-3">Filter videos by your mood:</h3>
                            <div className="flex flex-wrap gap-3">
                                {moods.map((mood) => (
                                    <button
                                        key={mood.id}
                                        onClick={() => setSelectedMood(mood.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedMood === mood.id
                                            ? `${mood.color} text-white shadow-lg transform scale-105`
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                        aria-pressed={selectedMood === mood.id}
                                        aria-label={`Filter by ${mood.label} mood`}
                                    >
                                        {mood.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Filter by language:</h3>
                            <div className="flex flex-wrap gap-3">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => setSelectedLanguage(lang.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedLanguage === lang.id
                                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                        aria-pressed={selectedLanguage === lang.id}
                                        aria-label={`Filter by ${lang.label}`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative" ref={heroRef} role="region" aria-label="Featured content">
                <div className="relative h-96 bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 flex items-center">
                    <button
                        onClick={handlePrevHero}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Previous featured content"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <div className="flex items-center justify-between w-full px-16">
                        <div className="flex items-center space-x-8">
                            <img src={heroContent[currentHeroIndex].image} alt={heroContent[currentHeroIndex].title} className="rounded-lg shadow-2xl w-64" />
                            <div>
                                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                                    {heroContent[currentHeroIndex].tag}
                                </div>
                                <div className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
                                    {heroContent[currentHeroIndex].title}
                                </div>
                                <div className="text-xl text-gray-300 mb-6">{heroContent[currentHeroIndex].subtitle}</div>
                                <div className="flex space-x-4">
                                    <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <Play className="w-5 h-5" />
                                        <span>Watch for FREE</span>
                                    </button>
                                    <button
                                        onClick={() => shareShow(heroContent[currentHeroIndex].title)}
                                        className="bg-gray-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Share ${heroContent[currentHeroIndex].title}`}
                                    >
                                        <Share2 className="w-5 h-5" />
                                        <span>Share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleNextHero}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Next featured content"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        onClick={toggleHeroPlay}
                        className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={isHeroPlaying ? 'Pause carousel' : 'Play carousel'}
                    >
                        {isHeroPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    {heroContent.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setCurrentHeroIndex(i); setIsHeroPlaying(false); }}
                            className={`w-2 h-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${i === currentHeroIndex ? 'bg-white' : 'bg-gray-600'}`}
                            aria-label={`Go to featured content ${i + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Content Sections */}
            <main className="px-6 py-8" role="main">
                {/* Recently Watched */}
                {filteredRecentlyWatched.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Recently Watched</h2>
                        <div className="flex space-x-4 overflow-x-auto pb-4">
                            {filteredRecentlyWatched.map((show) => (
                                <div key={show.id} className="flex-shrink-0 w-64 group cursor-pointer" role="article" aria-label={`Recently watched: ${show.title}`}>
                                    <div className="relative">
                                        <img
                                            src={show.image}
                                            alt={show.title}
                                            className="w-full h-36 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center">
                                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mt-2">{show.title}</h3>
                                    <p className="text-gray-400 text-sm">{show.genre} • {show.language}</p>
                                    <div className="flex items-center space-x-1 mt-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                onClick={() => handleRating(show.id, star)}
                                                className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${ratings[show.id] >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                                                aria-label={`Rate ${show.title} ${star} stars`}
                                            >
                                                <Star className="w-4 h-4 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => shareShow(show.title)}
                                        className="mt-2 text-gray-400 hover:text-white flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Share ${show.title}`}
                                    >
                                        <Share2 className="w-4 h-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Trending Top 10 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Trending Top 10</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {filteredTrendingShows.length > 0 ? (
                            filteredTrendingShows.map((show) => (
                                <div key={show.id} className="flex-shrink-0 w-64 group cursor-pointer" role="article" aria-label={`Trending: ${show.title}`}>
                                    <div className="relative">
                                        <img
                                            src={show.image}
                                            alt={show.title}
                                            className="w-full h-36 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center">
                                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mt-2">{show.title}</h3>
                                    <p className="text-gray-400 text-sm">{show.genre} • {show.language}</p>
                                    <div className="flex items-center space-x-1 mt-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                onClick={() => handleRating(show.id, star)}
                                                className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${ratings[show.id] >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                                                aria-label={`Rate ${show.title} ${star} stars`}
                                            >
                                                <Star className="w-4 h-4 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => shareShow(show.title)}
                                        className="mt-2 text-gray-400 hover:text-white flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Share ${show.title}`}
                                    >
                                        <Share2 className="w-4 h-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No shows match your search or language filter.</p>
                        )}
                    </div>
                </section>

                {/* Popular Web Series */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Popular Web Series</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {filteredWebSeries.length > 0 ? (
                            filteredWebSeries.map((series) => (
                                <div key={series.id} className="flex-shrink-0 w-64 group cursor-pointer" role="article" aria-label={`Web series: ${series.title}`}>
                                    <div className="relative">
                                        <img
                                            src={series.image}
                                            alt={series.title}
                                            className="w-full h-36 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center">
                                            <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mt-2">{series.title}</h3>
                                    <p className="text-gray-400 text-sm">{series.genre} • {series.language}</p>
                                    <div className="flex items-center space-x-1 mt-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                onClick={() => handleRating(series.id, star)}
                                                className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${ratings[series.id] >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                                                aria-label={`Rate ${series.title} ${star} stars`}
                                            >
                                                <Star className="w-4 h-4 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => shareShow(series.title)}
                                        className="mt-2 text-gray-400 hover:text-white flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        aria-label={`Share ${series.title}`}
                                    >
                                        <Share2 className="w-4 h-4" />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No web series match your search or language filter.</p>
                        )}
                    </div>

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
                    </div>
                    {selectedContent && (
                        <ContentModal
                            content={selectedContent}
                            onClose={() => setSelectedContent(null)}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default MXPlayerUI;