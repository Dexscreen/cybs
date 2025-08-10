import React, { useState, useEffect } from 'react';
import { Share2, Instagram, Twitter, Facebook, TrendingUp, Users, Eye, Plus, Search } from 'lucide-react';

const SocialMediaMonitor: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [newTarget, setNewTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [activityData, setActivityData] = useState({
    posts: 0,
    followers: 0,
    engagement: 0
  });

  const platforms = [
    { id: 'all', name: 'ALL PLATFORMS', icon: Share2, color: 'green' },
    { id: 'instagram', name: 'INSTAGRAM', icon: Instagram, color: 'pink' },
    { id: 'twitter', name: 'TWITTER', icon: Twitter, color: 'blue' },
    { id: 'facebook', name: 'FACEBOOK', icon: Facebook, color: 'blue' }
  ];

  const [monitoredAccounts, setMonitoredAccounts] = useState([
    { 
      id: 1, 
      username: '@target_user_01', 
      platform: 'instagram', 
      followers: 15420, 
      status: 'ACTIVE',
      lastPost: '2 hours ago'
    },
    { 
      id: 2, 
      username: '@suspicious_account', 
      platform: 'twitter', 
      followers: 8932, 
      status: 'MONITORING',
      lastPost: '45 minutes ago'
    },
    { 
      id: 3, 
      username: 'John.Doe.Profile', 
      platform: 'facebook', 
      followers: 2341, 
      status: 'BREACHED',
      lastPost: '1 hour ago'
    }
  ]);

  const [interceptedPosts, setInterceptedPosts] = useState([
    {
      id: 1,
      username: '@target_user_01',
      platform: 'instagram',
      content: 'Just finished an amazing workout! 💪 #fitness #motivation',
      timestamp: '2 hours ago',
      likes: 234,
      comments: 45,
      location: 'Downtown Gym, NYC'
    },
    {
      id: 2,
      username: '@suspicious_account',
      platform: 'twitter',
      content: 'Meeting postponed to tomorrow. Will update everyone soon.',
      timestamp: '45 minutes ago',
      likes: 12,
      comments: 3,
      location: null
    },
    {
      id: 3,
      username: 'John.Doe.Profile',
      platform: 'facebook',
      content: 'Family dinner tonight! Can\'t wait to see everyone.',
      timestamp: '1 hour ago',
      likes: 67,
      comments: 23,
      location: 'Home'
    }
  ]);

  const sentimentData = [
    { emotion: 'POSITIVE', percentage: 45, color: 'green' },
    { emotion: 'NEUTRAL', percentage: 35, color: 'yellow' },
    { emotion: 'NEGATIVE', percentage: 20, color: 'red' }
  ];

  const addNewTarget = () => {
    if (!newTarget.trim()) return;
    
    setIsScanning(true);
    setTimeout(() => {
      const platforms = ['instagram', 'twitter', 'facebook'];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const newAccount = {
        id: Date.now(),
        username: newTarget.startsWith('@') ? newTarget : `@${newTarget}`,
        platform: randomPlatform,
        followers: Math.floor(Math.random() * 50000) + 1000,
        status: ['ACTIVE', 'MONITORING', 'SCANNING'][Math.floor(Math.random() * 3)],
        lastPost: `${Math.floor(Math.random() * 60)} minutes ago`
      };
      
      setMonitoredAccounts(prev => [...prev, newAccount]);
      
      // Add a fake intercepted post
      const fakePost = {
        id: Date.now(),
        username: newAccount.username,
        platform: randomPlatform,
        content: [
          'Just posted a new update!',
          'Having a great day today!',
          'Working on something exciting...',
          'Can\'t wait for the weekend!',
          'New project coming soon!'
        ][Math.floor(Math.random() * 5)],
        timestamp: 'Just now',
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
        location: Math.random() > 0.5 ? 'Unknown Location' : null
      };
      
      setInterceptedPosts(prev => [fakePost, ...prev.slice(0, 4)]);
      setNewTarget('');
      setIsScanning(false);
    }, 2500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityData({
        posts: Math.floor(Math.random() * 50) + 100,
        followers: Math.floor(Math.random() * 1000) + 5000,
        engagement: Math.floor(Math.random() * 100)
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'facebook': return Facebook;
      default: return Share2;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Share2 className="w-6 h-6 mr-3" />
        <h2 className="text-2xl font-bold">SOCIAL MEDIA MONITORING</h2>
      </div>

      {/* Platform Selection */}
      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">PLATFORM FILTER</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-3 text-center transition-all duration-200 ${
                  selectedPlatform === platform.id
                    ? 'bg-green-900 border border-green-400'
                    : 'bg-gray-800 border border-gray-600 hover:border-green-400'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">{platform.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">MONITORED POSTS</p>
              <p className="text-2xl font-bold">{activityData.posts}</p>
            </div>
            <Eye className="w-8 h-8 text-green-300" />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">TOTAL FOLLOWERS</p>
              <p className="text-2xl font-bold">{activityData.followers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-green-300" />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">ENGAGEMENT RATE</p>
              <p className="text-2xl font-bold">{activityData.engagement}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-300" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitored Accounts */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4">MONITORED ACCOUNTS</h3>
          
          {/* Add New Target */}
          <div className="mb-4 p-3 bg-gray-800 border border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Enter username or profile name..."
                className="flex-1 bg-gray-700 border border-green-400 p-2 text-green-400 text-sm focus:outline-none focus:border-green-300"
                disabled={isScanning}
              />
              <button
                onClick={addNewTarget}
                disabled={isScanning || !newTarget.trim()}
                className="px-4 py-2 bg-green-900 hover:bg-green-800 disabled:bg-gray-700 border border-green-400 text-sm flex items-center"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full mr-2"></div>
                    SCANNING...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    MONITOR
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {monitoredAccounts.map((account) => {
              const Icon = getPlatformIcon(account.platform);
              return (
                <div key={account.id} className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3 text-blue-400" />
                    <div>
                      <p className="font-bold">{account.username}</p>
                      <p className="text-xs text-green-300">{account.followers.toLocaleString()} followers</p>
                      <p className="text-xs text-gray-400">Last post: {account.lastPost}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 border ${
                    account.status === 'ACTIVE' ? 'border-green-400 text-green-400' :
                    account.status === 'BREACHED' ? 'border-red-400 text-red-400' : 'border-yellow-400 text-yellow-400'
                  }`}>
                    {account.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4">SENTIMENT ANALYSIS</h3>
          <div className="space-y-4">
            {sentimentData.map((sentiment) => (
              <div key={sentiment.emotion} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">{sentiment.emotion}</span>
                  <span className="text-sm">{sentiment.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 h-2">
                  <div 
                    className={`h-2 transition-all duration-1000 ${
                      sentiment.color === 'green' ? 'bg-green-400' :
                      sentiment.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${sentiment.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-800 border border-green-400">
            <p className="text-sm font-bold mb-2">THREAT ASSESSMENT</p>
            <p className="text-xs text-green-300">Overall sentiment indicates normal behavior patterns. No immediate security concerns detected.</p>
          </div>
        </div>
      </div>

      {/* Intercepted Posts */}
      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">INTERCEPTED POSTS</h3>
        <div className="space-y-4">
          {interceptedPosts.map((post) => {
            const Icon = getPlatformIcon(post.platform);
            return (
              <div key={post.id} className="p-4 bg-gray-800 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-2 text-blue-400" />
                    <span className="font-bold">{post.username}</span>
                  </div>
                  <span className="text-xs text-gray-400">{post.timestamp}</span>
                </div>
                
                <p className="text-sm mb-3">{post.content}</p>
                
                <div className="flex items-center justify-between text-xs text-green-300">
                  <div className="flex space-x-4">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                  {post.location && (
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.location}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMonitor;