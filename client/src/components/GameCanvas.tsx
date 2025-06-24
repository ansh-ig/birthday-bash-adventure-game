
import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameCanvasProps {
  scene: 'cake' | 'room';
  onComplete: () => void;
}

interface Balloon {
  x: number;
  y: number;
  radius: number;
  color: string;
  id: number;
}

interface Firework {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

const GameCanvas = ({ scene, onComplete }: GameCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [cakeCut, setCakeCut] = useState(false);
  const [showHappyBirthday, setShowHappyBirthday] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    // Initialize on first user interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Create balloon pop sound
  const playBalloonPop = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Pop sound: quick frequency drop
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  // Create happy birthday melody
  const playHappyBirthday = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const notes = [
      // Happy Birthday melody frequencies
      { freq: 261.63, duration: 0.5 }, // C4 - Hap-
      { freq: 261.63, duration: 0.5 }, // C4 - py
      { freq: 293.66, duration: 1.0 }, // D4 - Birth-
      { freq: 261.63, duration: 1.0 }, // C4 - day
      { freq: 349.23, duration: 1.0 }, // F4 - to
      { freq: 329.63, duration: 2.0 }, // E4 - you
      
      { freq: 261.63, duration: 0.5 }, // C4 - Hap-
      { freq: 261.63, duration: 0.5 }, // C4 - py
      { freq: 293.66, duration: 1.0 }, // D4 - Birth-
      { freq: 261.63, duration: 1.0 }, // C4 - day
      { freq: 392.00, duration: 1.0 }, // G4 - to
      { freq: 349.23, duration: 2.0 }, // F4 - you
    ];
    
    let currentTime = ctx.currentTime;
    
    notes.forEach(note => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(note.freq, currentTime);
      gainNode.gain.setValueAtTime(0.1, currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
      
      oscillator.start(currentTime);
      oscillator.stop(currentTime + note.duration);
      
      currentTime += note.duration;
    });
  };

  // Initialize balloons for room scene
  useEffect(() => {
    if (scene === 'room') {
      const newBalloons: Balloon[] = [];
      for (let i = 0; i < 8; i++) {
        newBalloons.push({
          x: Math.random() * 700 + 50,
          y: Math.random() * 400 + 50,
          radius: 25 + Math.random() * 15,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          id: i
        });
      }
      setBalloons(newBalloons);
    }
  }, [scene]);

  // Animation loop for fireworks
  useEffect(() => {
    if (fireworks.length > 0) {
      const interval = setInterval(() => {
        setFireworks(prev => prev.map(f => ({
          ...f,
          size: f.size + 0.5,
          opacity: f.opacity - 0.02
        })).filter(f => f.opacity > 0));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [fireworks]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (scene === 'cake') {
      drawCakeScene(ctx);
    } else if (scene === 'room') {
      drawRoomScene(ctx);
    }
  }, [scene, cakeCut, fireworks, balloons, showHappyBirthday]);

  const drawCakeScene = (ctx: CanvasRenderingContext2D) => {
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#ffeaa7');
    gradient.addColorStop(1, '#fab1a0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 400);

    // Draw table
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(250, 300, 300, 60);
    
    // Draw table legs
    ctx.fillRect(270, 360, 20, 40);
    ctx.fillRect(510, 360, 20, 40);

    // Draw cake
    if (!cakeCut) {
      // Whole cake
      ctx.fillStyle = '#ff69b4';
      ctx.fillRect(350, 250, 100, 50);
      
      // Cake layers
      ctx.fillStyle = '#ff1493';
      ctx.fillRect(350, 270, 100, 3);
      ctx.fillRect(350, 285, 100, 3);
      
      // Candles
      ctx.fillStyle = '#ffff00';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(370 + i * 20, 240, 4, 10);
        // Flames
        ctx.fillStyle = '#ff4500';
        ctx.beginPath();
        ctx.arc(372 + i * 20, 238, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffff00';
      }
      
      // Instruction
      ctx.fillStyle = '#333';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Click the cake to cut it!', 400, 150);
    } else {
      // Cut cake
      ctx.fillStyle = '#ff69b4';
      ctx.fillRect(350, 250, 45, 50);
      ctx.fillRect(405, 250, 45, 50);
      
      // Cake slice (separate piece)
      ctx.fillStyle = '#ff1493';
      ctx.fillRect(480, 280, 40, 20);
      
      // Show "Happy Birthday" text
      if (showHappyBirthday) {
        ctx.fillStyle = '#ff0080';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 Happy Birthday! 🎉', 400, 100);
      }
    }

    // Draw fireworks
    fireworks.forEach(firework => {
      ctx.globalAlpha = firework.opacity;
      ctx.fillStyle = firework.color;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Sparkles around firework
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const sparkleX = firework.x + Math.cos(angle) * firework.size * 1.5;
        const sparkleY = firework.y + Math.sin(angle) * firework.size * 1.5;
        ctx.beginPath();
        ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
  };

  const drawRoomScene = (ctx: CanvasRenderingContext2D) => {
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#a8e6cf');
    gradient.addColorStop(1, '#dcedc1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 400);

    // Draw floor
    ctx.fillStyle = '#8fbc8f';
    ctx.fillRect(0, 380, 800, 20);

    // Draw decorations on walls
    ctx.fillStyle = '#ff69b4';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎊 PARTY TIME 🎊', 400, 50);

    // Draw balloons
    balloons.forEach(balloon => {
      // Balloon
      ctx.fillStyle = balloon.color;
      ctx.beginPath();
      ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Balloon string
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(balloon.x, balloon.y + balloon.radius);
      ctx.lineTo(balloon.x, balloon.y + balloon.radius + 30);
      ctx.stroke();
      
      // Balloon highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(balloon.x - 8, balloon.y - 8, balloon.radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Instructions
    ctx.fillStyle = '#333';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Click the balloons to pop them! 🎯', 400, 100);
    ctx.fillText(`Balloons left: ${balloons.length}`, 400, 130);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (scene === 'cake' && !cakeCut) {
      // Check if clicked on cake
      if (clickX >= 350 && clickX <= 450 && clickY >= 250 && clickY <= 300) {
        setCakeCut(true);
        setShowHappyBirthday(true);
        
        // Play celebration sound
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRvIEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoFAACBhYmFa1lzbjSxlKKOoZGfka6QqpGnkKuVr5yonaievaDApL2nrLavqLqrpr2sr7O0qbu4q7++tLq6tb7AtL27tbvAtLu9s7u9tLu9s7q9tLu9s7q9tLy9s7u9s7u9');
          audio.volume = 0.5;
          audio.play().catch(() => {});
        } catch (e) {
          // Ignore audio errors
        }
        
        // Create fireworks
        const newFireworks: Firework[] = [];
        for (let i = 0; i < 10; i++) {
          newFireworks.push({
            x: Math.random() * 800,
            y: Math.random() * 200 + 50,
            size: 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            opacity: 1
          });
        }
        setFireworks(newFireworks);

        // Play birthday song
        setIsPlaying(true);
        playHappyBirthday();
        setTimeout(() => {
          setIsPlaying(false);
        }, 6000);
      }
    } else if (scene === 'room') {
      // Check if clicked on any balloon
      let balloonPopped = false;
      setBalloons(prev => prev.filter(balloon => {
        const distance = Math.sqrt(
          Math.pow(clickX - balloon.x, 2) + Math.pow(clickY - balloon.y, 2)
        );
        if (distance <= balloon.radius) {
          balloonPopped = true;
          return false; // Remove this balloon
        }
        return true; // Keep this balloon
      }));
      
      // Play pop sound if a balloon was clicked
      if (balloonPopped) {
        playBalloonPop();
      }
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-purple-600">
            {scene === 'cake' ? '🍰 Birthday Cake Time!' : '🎈 Balloon Party!'}
          </h3>
          {isPlaying && (
            <p className="text-lg text-green-600 mt-2 animate-pulse">
              🎵 Playing Happy Birthday Song! 🎵
            </p>
          )}
          {scene === 'room' && (
            <p className="text-sm text-gray-600 mt-1">
              Click on balloons to hear them pop!
            </p>
          )}
        </div>
        
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            onClick={handleCanvasClick}
            className="border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={onComplete}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3"
          >
            ✨ Continue Adventure
          </Button>
          {scene === 'cake' && cakeCut && (
            <p className="text-green-600 mt-2 font-semibold">
              🎉 Cake cut successfully! Enjoy your special day!
            </p>
          )}
          {scene === 'room' && balloons.length === 0 && (
            <p className="text-green-600 mt-2 font-semibold">
              🎉 All balloons popped! Great job!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCanvas;
