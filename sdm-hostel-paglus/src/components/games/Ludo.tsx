import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

// Ludo Game Logic Constants
const PATH = [
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
  [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
  [7, 0], [8, 0],
  [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
  [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
  [14, 7], [14, 8],
  [13, 8], [12, 8], [11, 8], [10, 8], [9, 8],
  [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14],
  [7, 14], [6, 14],
  [6, 13], [6, 12], [6, 11], [6, 10], [6, 9],
  [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  [0, 7]
];

const SAFE_SPOTS = new Set([1, 9, 14, 22, 27, 35, 40, 48]);

const BASES = [
  [[2, 2], [2, 3], [3, 2], [3, 3]],       // Red
  [[11, 2], [11, 3], [12, 2], [12, 3]],   // Green
  [[11, 11], [11, 12], [12, 11], [12, 12]], // Yellow
  [[2, 11], [2, 12], [3, 11], [3, 12]]    // Blue
];

const PLAYERS = [
  { color: 'red', name: 'Red Player', startIdx: 1, homePath: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7]], baseColor: 'bg-red-500', homeColor: 'bg-red-500/40' },
  { color: 'green', name: 'Green Player', startIdx: 14, homePath: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5]], baseColor: 'bg-green-500', homeColor: 'bg-green-500/40' },
  { color: 'yellow', name: 'Yellow Player', startIdx: 27, homePath: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7]], baseColor: 'bg-yellow-500', homeColor: 'bg-yellow-500/40' },
  { color: 'blue', name: 'Blue Player', startIdx: 40, homePath: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9]], baseColor: 'bg-blue-500', homeColor: 'bg-blue-500/40' },
];

interface Piece {
  player: number;
  id: number;
  progress: number;
}

export default function Ludo() {
  const [pieces, setPieces] = useState<Piece[]>(() => {
    let initial: Piece[] = [];
    for (let p = 0; p < 4; p++) {
      for (let i = 0; i < 4; i++) initial.push({ player: p, id: i, progress: -1 });
    }
    return initial;
  });

  const [turn, setTurn] = useState<number>(0);
  const [dice, setDice] = useState<number>(1);
  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const rollDice = () => {
    if (hasRolled || rolling) return;
    setRolling(true);
    
    // Animate dice
    let count = 0;
    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDice(finalRoll);
        setRolling(false);
        setHasRolled(true);
        postRollCheck(finalRoll);
      }
    }, 50);
  };

  const isValidMove = (p: Piece, roll: number) => {
    if (p.progress === -1) return roll === 6;
    if (p.progress + roll <= 56) return true;
    return false;
  };

  const postRollCheck = (roll: number) => {
    const validMoves = pieces.filter(p => p.player === turn && isValidMove(p, roll));
    if (validMoves.length === 0) {
      setTimeout(() => {
        setHasRolled(false);
        setTurn(t => (t + 1) % 4);
      }, 1000);
    }
  };

  const handlePieceClick = (piece: Piece) => {
    if (piece.player !== turn || !hasRolled || !isValidMove(piece, dice)) return;

    let newPieces = [...pieces];
    let targetIdx = newPieces.findIndex(p => p.player === piece.player && p.id === piece.id);
    let target = { ...newPieces[targetIdx] };

    if (target.progress === -1) {
      target.progress = 0;
    } else {
      target.progress += dice;
    }

    newPieces[targetIdx] = target;

    // Capture logic
    if (target.progress >= 0 && target.progress <= 50) {
      const currentMainIdx = (PLAYERS[target.player].startIdx + target.progress) % 52;
      if (!SAFE_SPOTS.has(currentMainIdx)) {
        newPieces = newPieces.map(p => {
          if (p.player !== target.player && p.progress >= 0 && p.progress <= 50) {
            const oppMainIdx = (PLAYERS[p.player].startIdx + p.progress) % 52;
            if (oppMainIdx === currentMainIdx) {
              return { ...p, progress: -1 }; // Captured
            }
          }
          return p;
        });
      }
    }

    setPieces(newPieces);
    setHasRolled(false);

    if (dice !== 6) {
      setTurn(t => (t + 1) % 4);
    }
  };

  const getPieceCoords = (piece: Piece) => {
    if (piece.progress === -1) return BASES[piece.player][piece.id];
    if (piece.progress <= 50) {
      const mainIdx = (PLAYERS[piece.player].startIdx + piece.progress) % 52;
      return PATH[mainIdx];
    }
    if (piece.progress <= 55) return PLAYERS[piece.player].homePath[piece.progress - 51];
    return [7, 7];
  };

  const DiceIcon = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6][dice - 1];

  return (
    <div className="flex flex-col items-center">
      {/* HUD */}
      <div className="flex items-center justify-between w-full max-w-lg mb-6">
        <div className="flex gap-2">
          {PLAYERS.map((p, i) => (
            <div key={p.color} className={`w-8 h-8 rounded-full border-2 ${turn === i ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'border-transparent opacity-40'} ${p.baseColor}`} />
          ))}
        </div>
        
        <button 
          onClick={rollDice}
          disabled={hasRolled || rolling}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-bold text-lg transition-all ${
            hasRolled ? 'bg-zinc-800 text-zinc-500' : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer'
          }`}
        >
          {rolling && <DiceIcon className="w-6 h-6 animate-spin" />}
          {!rolling && <DiceIcon className="w-6 h-6" />}
          {hasRolled ? `Rolled ${dice}` : "Roll Dice"}
        </button>
      </div>

      {/* Board */}
      <div className="relative w-full max-w-[500px] aspect-square bg-zinc-900 border border-white/20 rounded-lg p-2 shadow-2xl">
        <div className="absolute inset-2 grid grid-cols-[repeat(15,_minmax(0,_1fr))] grid-rows-[repeat(15,_minmax(0,_1fr))] border border-white/10 bg-zinc-950">
          
          {/* Render 225 cells */}
          {Array.from({ length: 225 }).map((_, i) => {
            const x = i % 15;
            const y = Math.floor(i / 15);
            let bgClass = "border border-white/5";
            
            // Bases
            if (x < 6 && y < 6) bgClass += " bg-red-900/20";
            else if (x > 8 && y < 6) bgClass += " bg-green-900/20";
            else if (x > 8 && y > 8) bgClass += " bg-yellow-900/20";
            else if (x < 6 && y > 8) bgClass += " bg-blue-900/20";
            
            // Center
            else if (x >= 6 && x <= 8 && y >= 6 && y <= 8) bgClass += " bg-zinc-800/80";
            
            // Paths
            else {
               const pathIdx = PATH.findIndex(p => p[0] === x && p[1] === y);
               if (pathIdx !== -1) {
                  bgClass += " bg-zinc-800/50";
                  if (SAFE_SPOTS.has(pathIdx)) bgClass += " bg-zinc-700/80";
                  if (pathIdx === 1) bgClass = "border border-white/5 bg-red-500/40";
                  if (pathIdx === 14) bgClass = "border border-white/5 bg-green-500/40";
                  if (pathIdx === 27) bgClass = "border border-white/5 bg-yellow-500/40";
                  if (pathIdx === 40) bgClass = "border border-white/5 bg-blue-500/40";
               } else {
                  for (let p=0; p<4; p++) {
                     if (PLAYERS[p].homePath.some(pos => pos[0] === x && pos[1] === y)) {
                        bgClass = `border border-white/5 ${PLAYERS[p].homeColor}`;
                     }
                  }
               }
            }

            return <div key={i} className={bgClass} />
          })}
        </div>

        {/* Pieces Overlay */}
        <div className="absolute inset-2 pointer-events-none">
          {pieces.map((piece) => {
            const [x, y] = getPieceCoords(piece);
            
            const piecesAtSame = pieces.filter(p => {
              const [px, py] = getPieceCoords(p);
              return px === x && py === y && p.progress !== 56;
            });
            const myIdx = piecesAtSame.findIndex(p => p.player === piece.player && p.id === piece.id);
            
            const offsetX = piecesAtSame.length > 1 ? (myIdx % 2 === 0 ? -12 : 12) : 0;
            const offsetY = piecesAtSame.length > 2 ? (myIdx < 2 ? -12 : 12) : 0;

            const isValid = piece.player === turn && hasRolled && isValidMove(piece, dice);

            if (piece.progress === 56) return null;

            return (
              <motion.div 
                key={`${piece.player}-${piece.id}`}
                layout
                className={`absolute w-[18px] h-[18px] sm:w-6 sm:h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-lg z-10 transition-transform ${PLAYERS[piece.player].baseColor} ${isValid ? 'cursor-pointer pointer-events-auto border-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse' : 'border-black/50 pointer-events-none'}`}
                style={{ 
                  left: `calc(${(x + 0.5) * (100 / 15)}% + ${offsetX}px)`,
                  top: `calc(${(y + 0.5) * (100 / 15)}% + ${offsetY}px)`,
                }}
                onClick={() => handlePieceClick(piece)}
              />
            )
          })}
        </div>
      </div>
      
      {/* Player statuses */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-lg mt-6">
        {PLAYERS.map((p, i) => {
           const finished = pieces.filter(piece => piece.player === i && piece.progress === 56).length;
           return (
              <div key={p.color} className={`text-center bg-zinc-900/50 rounded-xl p-2 border ${turn === i ? 'border-white/20' : 'border-transparent'}`}>
                 <span className={`block w-3 h-3 rounded-full mx-auto mb-1 ${p.baseColor}`} />
                 <p className="text-xs text-zinc-400 font-medium">Won: {finished}</p>
              </div>
           );
        })}
      </div>
    </div>
  );
}
