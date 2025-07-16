// components/Celebration.js
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const quotes = [
  "Great job! You're crushing it! 💪",
  'Task conquered! 🎉',
  'Productivity level: Expert! 🚀',
  'Another one bites the dust! ✔️',
  "You're on fire! 🔥",
];

export default function Celebration() {
    const {setCeleberate} = useAuth();
  const [show, setShow] = useState(true); // Changed to true to show immediately
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  useEffect(() => {
    const timer = setTimeout(() => {setShow(false)
        setCeleberate(false);
    }, 6000); // Auto-hide after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md pointer-events-auto"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Task Completed!
        </h2>
        <p className="text-lg">{quote}</p>
      </motion.div>
    </div>
  );
}
