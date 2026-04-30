import { useState, useEffect } from "react";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Snake from "../components/games/Snake";
import Ludo from "../components/games/Ludo";

export default function Play() {
  const { gameId } = useParams();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const isLudo = gameId === "ludo";
  const gameKey = isLudo ? "ludoHighScore" : "snakeHighScore";
  const title = isLudo ? "Ludo Board Game" : "Snake Game";
  const desc = isLudo ? "Roll the dice, race your friends!" : "Eat the cubes to grow!";

  useEffect(() => {
    // Reset score when changing games
    setScore(0);
    setGameOver(false);
    const savedHighScore = localStorage.getItem(gameKey);
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    } else {
      setHighScore(0);
    }
  }, [gameKey]);

  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(gameKey, score.toString());
      }
    }
  }, [gameOver, score, highScore, gameKey]);

  return (
    <div className="pb-24 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/menu" className="inline-flex items-center text-zinc-400 hover:text-cyan-400 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
        </Link>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white capitalize">{title}</h1>
            <p className="text-zinc-400 text-sm mt-1">{desc}</p>
          </div>
          
          <div className="flex gap-6 items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
            <div className="text-center">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Score</p>
              <p className="text-2xl font-display font-bold text-cyan-400">{score}</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold flex items-center gap-1 justify-center">
                <Trophy className="w-3 h-3" /> Best
              </p>
              <p className="text-2xl font-display font-bold text-fuchsia-400">{highScore}</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(192,38,211,0.1)]">
          {isLudo ? (
             <Ludo />
          ) : (
             <Snake score={score} setScore={setScore} setGameOverTotal={setGameOver} />
          )}
        </div>
      </div>
    </div>
  );
}
