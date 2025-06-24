
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GameCanvas from '@/components/GameCanvas';
import CharacterDialogue from '@/components/CharacterDialogue';

type Scene = 'intro' | 'choices' | 'cake' | 'room' | 'navigation';

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>('intro');
  const [showCanvas, setShowCanvas] = useState(false);
  const [cakeVisited, setCakeVisited] = useState(false);
  const [roomVisited, setRoomVisited] = useState(false);

  const introDialogue = `Well lets put that navratri moment as an our first memory, wo moment still mere lie kaafi special h, i mean when i saw you everything around me stopped at very moment. like nothing mattered kch b nai , just you it was like ki jaise time ruk gya hei, world is paused just so i could only see you.
And the that shy little glance you gave me.
When you looked at me and said "Kya hai?" with that tiny gesture, trying to hide that cute smile of yours 
God, that smilee. wo moment still goes through my mind everyday . pyari smilee wo Kya Hei? moment h yr
That was the moment you unknowingly stole a piece of me forever`;

  const handleSceneComplete = (scene: Scene) => {
    if (scene === 'cake') {
      setCakeVisited(true);
    } else if (scene === 'room') {
      setRoomVisited(true);
    }
    setCurrentScene('navigation');
    setShowCanvas(false);
  };

  const goToScene = (scene: Scene) => {
    setCurrentScene(scene);
    if (scene === 'cake' || scene === 'room') {
      setShowCanvas(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Background decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-10 h-10 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-10 right-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-32 left-1/4 w-5 h-5 bg-green-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-32 right-1/4 w-7 h-7 bg-red-400 rounded-full animate-spin delay-700"></div>
        </div>

        {currentScene === 'intro' && (
          <CharacterDialogue 
            dialogue={introDialogue}
            onComplete={() => setCurrentScene('choices')}
          />
        )}

        {currentScene === 'choices' && (
          <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">
                🎉 Happy Birthday! 🎉
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                What would you like to do on your special day?
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => goToScene('cake')}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg"
                  size="lg"
                >
                  🍰 Go to the Birthday Table
                </Button>
                <Button 
                  onClick={() => goToScene('room')}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg"
                  size="lg"
                >
                  🎈 Explore the Party Room
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentScene === 'navigation' && (
          <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-purple-600 mb-6">
                What's next?
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                {!cakeVisited && (
                  <Button 
                    onClick={() => goToScene('cake')}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3"
                  >
                    🍰 Cut the Birthday Cake
                  </Button>
                )}
                {!roomVisited && (
                  <Button 
                    onClick={() => goToScene('room')}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
                  >
                    🎈 Pop Some Balloons
                  </Button>
                )}
                {cakeVisited && (
                  <Button 
                    onClick={() => goToScene('cake')}
                    variant="outline"
                    className="border-pink-500 text-pink-600 hover:bg-pink-50 px-6 py-3"
                  >
                    🍰 Visit Cake Again
                  </Button>
                )}
                {roomVisited && (
                  <Button 
                    onClick={() => goToScene('room')}
                    variant="outline"
                    className="border-purple-500 text-purple-600 hover:bg-purple-50 px-6 py-3"
                  >
                    🎈 Play with Balloons Again
                  </Button>
                )}
              </div>
              {cakeVisited && roomVisited && (
                <div className="mt-6">
                  <p className="text-lg text-green-600 font-semibold">
                    🎉 You've experienced everything! Happy Birthday! 🎉
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {showCanvas && (
          <div className="mt-8">
            <GameCanvas 
              scene={currentScene as 'cake' | 'room'}
              onComplete={() => handleSceneComplete(currentScene)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
