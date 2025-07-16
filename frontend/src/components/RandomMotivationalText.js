import React, { useState, useEffect } from 'react';

const messages = [
  'Small steps lead to big accomplishments',
  "Breathe. You've got this!",
  'Productivity grows from restful soil',
  'One task at a time',
  'Progress, not perfection',
  'Your focus determines your reality',
  'The present moment is your power',
  'Clarity comes with calmness',
];

const RandomMotivationalText = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // After fade out completes, change message and fade in
      setTimeout(() => {
        setCurrentMessage(
          messages[Math.floor(Math.random() * messages.length)]
        );
        setIsVisible(true);
      }, 500);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-6 overflow-hidden">
      <p
        className={`text-center text-sm italic transition-opacity duration-500 ${
          isVisible ? 'opacity-70' : 'opacity-0'
        } ${
          messages.indexOf(currentMessage) % 2 === 0
            ? 'text-blue-500 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {currentMessage}
      </p>
    </div>
  );
};

export default RandomMotivationalText;
