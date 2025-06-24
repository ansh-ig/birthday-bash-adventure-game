
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CharacterDialogueProps {
  dialogue: string;
  onComplete: () => void;
}

const CharacterDialogue = ({ dialogue, onComplete }: CharacterDialogueProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < dialogue.length) {
      const timer = setTimeout(() => {
        setDisplayedText(dialogue.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Typing speed
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, dialogue]);

  const skipToEnd = () => {
    setDisplayedText(dialogue);
    setCurrentIndex(dialogue.length);
    setIsComplete(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Male character */}
      <div className="mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-6xl">
          👨
        </div>
        <p className="text-center mt-2 text-blue-600 font-semibold">Your Friend</p>
      </div>

      <Card className="max-w-3xl bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8">
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line min-h-[300px]">
            {displayedText}
            {!isComplete && <span className="animate-pulse">|</span>}
          </div>
          
          <div className="mt-6 flex gap-4 justify-center">
            {!isComplete && (
              <Button 
                onClick={skipToEnd}
                variant="outline"
                className="border-gray-400 text-gray-600"
              >
                Skip Animation
              </Button>
            )}
            {isComplete && (
              <Button 
                onClick={onComplete}
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg"
                size="lg"
              >
                Continue to Birthday Celebration 🎉
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Female character (player) */}
      <div className="mt-8">
        <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-6xl">
          👩
        </div>
        <p className="text-center mt-2 text-pink-600 font-semibold">You (Birthday Girl)</p>
      </div>
    </div>
  );
};

export default CharacterDialogue;
