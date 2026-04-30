import { useState, useEffect, useCallback, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Gamepad2 } from "lucide-react";
import { Button } from "../ui/Button";

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    isOccupied = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
  }
  return newFood!;
};

interface SnakeProps {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  setGameOverTotal: Dispatch<SetStateAction<boolean>>;
}

export default function Snake({ score, setScore, setGameOverTotal }: SnakeProps) {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const directionRef = useRef(direction);
  const hasStartedRef = useRef(hasStarted);

  useEffect(() => {
    directionRef.current = direction;
    hasStartedRef.current = hasStarted;
  }, [direction, hasStarted]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter" && !hasStartedRef.current && !gameOver) {
      e.preventDefault();
      setHasStarted(true);
      return;
    }

    if (!hasStartedRef.current) return;

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }

    const { x, y } = directionRef.current;
    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        if (y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
      case "s":
      case "S":
        if (y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        if (x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
      case "d":
      case "D":
        if (x !== -1) setDirection({ x: 1, y: 0 });
        break;
    }
  }, [gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const moveSnake = useCallback(() => {
    if (gameOver || !hasStarted) return;

    setSnake((prev) => {
      const head = prev[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      };

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setGameOverTotal(true);
        return prev;
      }

      // Check collision with self
      if (prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setGameOverTotal(true);
        return prev;
      }

      const newSnake = [newHead, ...prev];

      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, gameOver, hasStarted, setScore, setGameOverTotal]);

  useEffect(() => {
    const speed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [moveSnake, score]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: -1 });
    setFood(generateFood([{ x: 10, y: 10 }]));
    setScore(0);
    setGameOver(false);
    setGameOverTotal(false);
    setHasStarted(false);
  };

  const handleMobileControl = (newDir: Point) => {
    if (!hasStarted && !gameOver) return;
    const { x, y } = directionRef.current;
    if (newDir.x !== 0 && x === -newDir.x) return;
    if (newDir.y !== 0 && y === -newDir.y) return;
    setDirection(newDir);
  };

  return (
    <>
      <div className="aspect-square max-w-[500px] mx-auto bg-zinc-950 rounded-xl relative border border-white/5 shadow-inner overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
               backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
             }}>
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-sm z-10 box-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            style={{
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              backgroundColor: index === 0 ? "#22d3ee" : "#0891b2", // Cyan
              border: "1px solid rgba(0,0,0,0.2)",
              transform: index === 0 ? "scale(1.1)" : "scale(0.9)",
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-fuchsia-500 rounded-full z-10"
          style={{
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            boxShadow: "0 0 15px rgba(217, 70, 239, 0.8)",
            transform: "scale(0.8)",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-50 rounded-full animate-ping"></div>
        </div>

        {/* Overlays */}
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm rounded-xl">
            <Gamepad2 className="w-16 h-16 text-cyan-400 mb-4 animate-bounce" />
            <h3 className="text-2xl font-display font-bold text-white mb-2">Ready to Play?</h3>
            <p className="text-zinc-400 mb-6 text-center px-4">Press <kbd className="bg-zinc-800 px-2 py-1 flex-inline rounded text-white mx-1 text-xs">ENTER</kbd> to start moving.</p>
            <Button onClick={() => setHasStarted(true)} size="sm" className="md:hidden">Start</Button>
          </div>
        )}

        {gameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-sm rounded-xl"
          >
            <h3 className="text-4xl font-display font-bold text-fuchsia-500 mb-2 neon-text-purple">Game Over!</h3>
            <p className="text-zinc-300 mb-6 text-lg">Final Score: <span className="text-cyan-400 font-bold">{score}</span></p>
            <Button onClick={resetGame} size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <RotateCcw className="w-5 h-5 mr-2" /> Play Again
            </Button>
            <p className="text-zinc-500 text-sm mt-4">Or press Enter to restart</p>
          </motion.div>
        )}
        {
          /* Listen for enter to restart */
          gameOver && (
             <EnterRestart onRestart={resetGame} />
          )
        }
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden mt-8 max-w-[200px] mx-auto grid grid-cols-3 gap-2">
        <div />
        <Button variant="outline" className="h-12 bg-white/5 border-white/10" onClick={() => handleMobileControl({ x: 0, y: -1 })}>↑</Button>
        <div />
        <Button variant="outline" className="h-12 bg-white/5 border-white/10" onClick={() => handleMobileControl({ x: -1, y: 0 })}>←</Button>
        <Button variant="outline" className="h-12 bg-white/5 border-white/10" onClick={() => handleMobileControl({ x: 0, y: 1 })}>↓</Button>
        <Button variant="outline" className="h-12 bg-white/5 border-white/10" onClick={() => handleMobileControl({ x: 1, y: 0 })}>→</Button>
      </div>
    </>
  );
}

function EnterRestart({ onRestart }: { onRestart: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
         onRestart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onRestart]);
  return null;
}
