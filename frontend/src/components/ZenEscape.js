
// src/components/ZenEscape.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Zap, X, Heart, Smile, Coffee, Feather, 
  Leaf, Music, Sparkles, Waves 
} from 'lucide-react';

const ZenEscape = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [message, setMessage] = useState(getRandomMessage());

  // Motivational messages
  function getRandomMessage() {
    const messages = [
      "You're doing great! Take a mindful moment.",
      "Breathe in courage, exhale doubt.",
      "Small breaks lead to big breakthroughs!",
      "Your mind is a garden—tend to it gently.",
      "Productivity grows from restful soil.",
      "This moment is just for you. Enjoy it."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Hover callouts for the spark button
  const callouts = [
    "Need a boost?",
    "Quick escape here!",
    "Brain feeling tired?",
    "Tap to refresh!",
    "Your mental oasis",
    "Pssst... over here!"
  ];

  // Rotate messages periodically
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setMessage(getRandomMessage());
    }, 8000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Game modes
  const modes = {
    bubble: <BubbleMode />,
    koi: <KoiPond />,
    sound: <SoundBath />,
    haiku: <HaikuGenerator />
  };

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${isOpen ? 'w-80' : 'w-14'}`}>
      {/* Closed State - Animated Spark Button */}
      {!isOpen ? (
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            setIsOpen(true);
            setMessage(getRandomMessage());
          }}
          className={`relative p-3 rounded-full shadow-lg transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white' 
              : 'bg-gradient-to-br from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-white'
          } ${hovered ? 'scale-110' : ''}`}
          aria-label="Open Zen Escape"
        >
          {/* Main icon */}
          <Zap 
            size={20} 
            className={`transition-transform ${hovered ? 'rotate-12 scale-125' : ''}`} 
          />
          
          {/* Animated callout bubble */}
          
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-md text-xs whitespace-nowrap animate-float">
              {callouts[Math.floor(Math.random() * callouts.length)]}
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white dark:bg-gray-800 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
            </div>
        
          
          {/* Subtle particles on hover */}
          {hovered && (
            <>
              <div className="absolute top-0 left-0 w-1 h-1 rounded-full bg-yellow-300 animate-float" style={{ animationDelay: '0.1s' }}></div>
              <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-pink-300 animate-float" style={{ animationDelay: '0.3s' }}></div>
            </>
          )}
        </button>
      ) : (
        /* Open State - Main Panel */
        <div className={`relative rounded-xl p-5 shadow-xl backdrop-blur-sm border ${
          theme === 'dark' 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}>
          {/* Floating decorative elements */}
          <Sparkles className="absolute top-2 right-2 text-yellow-400 animate-float" size={16} />
          <Feather className="absolute bottom-2 left-3 text-blue-400 animate-float-delay" size={14} />
          
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-lg font-bold flex items-center gap-2 ${
                theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'
              }`}>
                <Leaf size={18} /> Zen Escape
              </h3>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {message}
              </p>
            </div>
            <button 
              onClick={() => {
                setActiveMode(null);
                setIsOpen(false);
              }}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Close Zen Escape"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content Area */}
          {!activeMode ? (
            <div className="space-y-3">
              <ModeButton 
                icon={<Waves size={18} />}
                title="Breathing Bubble"
                description="Follow the rhythm"
                onClick={() => setActiveMode('bubble')}
                theme={theme}
                color="blue"
              />
              <ModeButton 
                icon={<Coffee size={18} />} 
                title="Koi Pond"
                description="Feed the digital fish"
                onClick={() => setActiveMode('koi')}
                theme={theme}
                color="purple"
              />
              <ModeButton 
                icon={<Music size={18} />}
                title="Sound Bath"
                description="Tune your mind"
                onClick={() => setActiveMode('sound')}
                theme={theme}
                color="green"
              />
              <ModeButton 
                icon={<Feather size={18} />}
                title="Haiku Generator"
                description="Poetic inspiration"
                onClick={() => setActiveMode('haiku')}
                theme={theme}
                color="amber"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -top-6 right-0">
                <button
                  onClick={() => setActiveMode(null)}
                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <X size={12} /> Back
                </button>
              </div>
              {modes[activeMode]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Sub-Components
function ModeButton({ icon, title, description, onClick, theme, color }) {
  const colorClasses = {
    blue: theme === 'dark' ? 'from-blue-800/50 to-blue-600/50' : 'from-blue-100 to-blue-200',
    purple: theme === 'dark' ? 'from-purple-800/50 to-purple-600/50' : 'from-purple-100 to-purple-200',
    green: theme === 'dark' ? 'from-green-800/50 to-green-600/50' : 'from-green-100 to-green-200',
    amber: theme === 'dark' ? 'from-amber-800/50 to-amber-600/50' : 'from-amber-100 to-amber-200'
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} transition-all hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          theme === 'dark' ? 'bg-black/20' : 'bg-white/70'
        }`}>
          {icon}
        </div>
        <div>
          <h4 className={`font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            {title}
          </h4>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

function BubbleMode() {
  const [phase, setPhase] = useState('inhale');
  const [size, setSize] = useState(80);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(prev => {
        if (prev === 'inhale') {
          setSize(s => Math.min(s + 5, 120));
          return size === 120 ? 'hold' : 'inhale';
        } else if (prev === 'hold') {
          return 'exhale';
        } else {
          setSize(s => Math.max(s - 5, 80));
          if (size === 80) {
            setCount(c => c + 1);
            return count >= 3 ? 'complete' : 'inhale';
          }
          return 'exhale';
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, [size, count]);

  const phaseText = {
    inhale: "Breathe In... 🌬️",
    hold: "Hold... ✨",
    exhale: "Release... 🍃",
    complete: "Well done! 🎉"
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative mb-6">
        <div 
          className={`rounded-full flex items-center justify-center mx-auto transition-all duration-600 ease-in-out ${
            phase === 'inhale' ? 'bg-cyan-400/70' : 
            phase === 'hold' ? 'bg-purple-400/70' : 
            'bg-pink-400/70'
          }`}
          style={{ 
            width: `${size}px`, 
            height: `${size}px`,
            boxShadow: `0 0 20px ${phase === 'inhale' ? '#22d3ee' : phase === 'hold' ? '#a78bfa' : '#f472b6'}40`
          }}
        >
          <span className="text-lg">
            {phase === 'inhale' ? '⬆️' : 
             phase === 'hold' ? '⏸️' : '⬇️'}
          </span>
        </div>
        <div className="absolute -bottom-6 left-0 right-0 text-center text-sm">
          Cycle: {count}/4
        </div>
      </div>
      <p className="text-center text-lg mb-2">
        {phaseText[phase] || phaseText.complete}
      </p>
      <p className="text-center text-sm opacity-80 max-w-xs">
        {phase === 'complete' 
          ? "You've completed your breathing exercise! Feel refreshed?"
          : "Follow the bubble's rhythm to center yourself"}
      </p>
    </div>
  );
}

function KoiPond() {
  const [fish, setFish] = useState([
    { id: 1, x: 20, y: 40, direction: 1, speed: 2 },
    { id: 2, x: 70, y: 60, direction: -1, speed: 1.5 }
  ]);
  const [food, setFood] = useState([]);
  const [message, setMessage] = useState("Click to feed the koi");

  useEffect(() => {
    const moveFish = setInterval(() => {
      setFish(prev => prev.map(f => ({
        ...f,
        x: (f.x + f.speed * f.direction + 100) % 100
      })));
    }, 100);

    return () => clearInterval(moveFish);
  }, []);

  const handleFeed = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setFood(prev => [...prev, { x, y, id: Date.now() }]);
    setFish(prev => prev.map(f => ({
      ...f,
      speed: Math.min(f.speed + 0.2, 4),
      direction: x > f.x ? 1 : -1
    })));
    
    setMessage([
      "The koi appreciate you!",
      "Swimming with gratitude",
      "In Japan, koi represent perseverance",
      "Watch them dance!",
      "Each fish has unique personality"
    ][Math.floor(Math.random() * 5)]);
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={handleFeed}
        className="relative w-full h-40 bg-blue-400/20 rounded-lg overflow-hidden cursor-pointer"
      >
        {/* Water surface */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-300/30 animate-wave"></div>
        
        {/* Food */}
        {food.map(f => (
          <div 
            key={f.id}
            className="absolute w-2 h-2 rounded-full bg-yellow-300 animate-float"
            style={{ left: `${f.x}%`, top: `${f.y}%` }}
          />
        ))}
        
        {/* Fish */}
        {fish.map(f => (
          <div
            key={f.id}
            className="absolute text-2xl"
            style={{ 
              left: `${f.x}%`, 
              top: `${f.y}%`,
              transform: `scaleX(${f.direction})`
            }}
          >
            {f.direction > 0 ? '🐟' : '🐠'}
          </div>
        ))}
      </div>
      <p className="text-center text-sm italic">
        {message}
      </p>
    </div>
  );
}

// function SoundBath() {
//   const [activeSound, setActiveSound] = useState(null);
//   const sounds = [
//     { name: "Rain", emoji: "🌧️", color: "blue" },
//     { name: "Forest", emoji: "🌲", color: "green" },
//     { name: "Singing Bowls", emoji: "🎶", color: "purple" },
//     { name: "Ocean", emoji: "🌊", color: "teal" }
//   ];

//   return (
//     <div className="space-y-4">
//       <p className="text-center text-sm mb-4">
//         Select a sound to immerse yourself in
//       </p>
//       <div className="grid grid-cols-2 gap-3">
//         {sounds.map(sound => (
//           <button
//             key={sound.name}
//             onClick={() => setActiveSound(sound.name)}
//             className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
//               activeSound === sound.name
//                 ? `bg-${sound.color}-500 text-white scale-105`
//                 : `bg-${sound.color}-100/50 dark:bg-${sound.color}-900/20 hover:bg-${sound.color}-200 dark:hover:bg-${sound.color}-800/30`
//             }`}
//           >
//             <span className="text-2xl mb-1">{sound.emoji}</span>
//             <span className="text-xs">{sound.name}</span>
//           </button>
//         ))}
//       </div>
//       {activeSound && (
//         <p className="text-center text-xs mt-3 italic">
//           Imagine yourself surrounded by {activeSound.toLowerCase()}...
//         </p>
//       )}
//     </div>
//   );
// }



function SoundBath() {
  const [activeSound, setActiveSound] = useState(null);
  const [audio, setAudio] = useState(null);

  // Sound files - you'll need to add these to your public folder
  const sounds = [
    {
      name: 'Rain',
      emoji: '🌧️',
      color: 'blue',
      file: '/sounds/rain.mp3',
    },
    {
      name: 'Forest',
      emoji: '🌲',
      color: 'green',
      file: '/sounds/forest.mp3',
    },
    {
      name: 'Singing Bowls',
      emoji: '🎶',
      color: 'purple',
      file: '/sounds/singing bowl.mp3',
    },
    {
      name: 'Ocean',
      emoji: '🌊',
      color: 'teal',
      file: '/sounds/ocean.mp3',
    },
  ];

  const handleSoundSelect = (sound) => {
    // Stop any currently playing audio
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Create new audio instance
    const newAudio = new Audio(sound.file);
    newAudio.loop = true;
    newAudio
      .play()
      .then(() => {
        setAudio(newAudio);
        setActiveSound(sound.name);
      })
      .catch((error) => {
        console.error('Audio playback failed:', error);
      });
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setActiveSound(null);
  };

  useEffect(() => {
    // Clean up audio on component unmount
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  return (
    <div className="space-y-4">
      <p className="text-center text-sm mb-4">
        {activeSound
          ? `Now playing: ${activeSound}`
          : 'Select a sound to immerse yourself in'}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {sounds.map((sound) => (
          <button
            key={sound.name}
            onClick={() =>
              activeSound === sound.name
                ? stopSound()
                : handleSoundSelect(sound)
            }
            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
              activeSound === sound.name
                ? `bg-${sound.color}-500 text-white scale-105`
                : `bg-${sound.color}-100/50 dark:bg-${sound.color}-900/20 hover:bg-${sound.color}-200 dark:hover:bg-${sound.color}-800/30`
            }`}
          >
            <span className="text-2xl mb-1">{sound.emoji}</span>
            <span className="text-xs">{sound.name}</span>
          </button>
        ))}
      </div>

      {activeSound && (
        <div className="flex justify-center mt-3">
          <button
            onClick={stopSound}
            className="text-xs px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
          >
            Stop Sound
          </button>
        </div>
      )}
    </div>
  );
}


function HaikuGenerator() {
  const haikus = [
    `Screen glow fades softly\nMind like still water reflects\nNew ideas form`,
    `Code flows like rivers\nEach bug a stepping stone\nTo understanding`,
    `Tasks wait patiently\nBreathe in this quiet moment\nClarity returns`,
    `Digital gardens\nGrow with patient tending\nRest is water`,
    `Circuits and moonlight\nBoth need moments of pause\nTo shine brightest`
  ];

  const [haiku, setHaiku] = useState(haikus[0]);
  const [visible, setVisible] = useState(false);

  const generateHaiku = () => {
    setVisible(false);
    setTimeout(() => {
      setHaiku(haikus[Math.floor(Math.random() * haikus.length)]);
      setVisible(true);
    }, 300);
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="space-y-4">
      <div 
        className={`bg-white/20 dark:bg-black/20 p-4 rounded-lg min-h-24 transition-opacity ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {haiku.split('\n').map((line, i) => (
          <p key={i} className="text-center italic">
            {line}
          </p>
        ))}
      </div>
      <button
        onClick={generateHaiku}
        className="w-full py-2 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 hover:bg-amber-200 dark:hover:bg-amber-800/30 text-sm"
      >
        Generate New Haiku
      </button>
      <p className="text-center text-xs opacity-70">
        Japanese poetry for your digital break
      </p>
    </div>
  );
}

export default ZenEscape;