import React, { useState, useEffect, useCallback, useRef } from "react";

// --- Game State (JSX uyumlu) ---
const GameState = {
  IDLE: "IDLE",
  PLAYING: "PLAYING",
  GAME_OVER: "GAME_OVER",
};

// --- Icons ---
const HeartIcon = ({ className, filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? "0" : "2.5"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const TrophyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.719c-.18.055-.367.097-.557.124a6.707 6.707 0 01-1.24.05h-.058a6.731 6.731 0 002.742-1.346 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744z"
      clipRule="evenodd"
    />
  </svg>
);

const TimerIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
  </svg>
);

const RefreshIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

// --- Game Config ---
const GRID_SIZE = 16;
const INITIAL_TIME = 10;
const MAX_TIME = 15;
const MAX_LIVES = 3;

export default function NeonReflexGame() {
  const [gameState, setGameState] = useState(GameState.IDLE);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [lives, setLives] = useState(MAX_LIVES);
  const [activeTile, setActiveTile] = useState(null);
  const [wrongTile, setWrongTile] = useState(null);
  const [gameOverReason, setGameOverReason] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("neon_reflex_highscore");
    if (saved) setHighScore(Number(saved));
  }, []);

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 0.1) {
            endGame("time");
            return 0;
          }
          return t - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const spawnTile = () => {
    let idx;
    do {
      idx = Math.floor(Math.random() * GRID_SIZE);
    } while (idx === activeTile);
    setActiveTile(idx);
  };

  const startGame = useCallback(() => {
    setScore(0);
    setLives(MAX_LIVES);
    setTimeLeft(INITIAL_TIME);
    setGameOverReason(null);
    setWrongTile(null);
    setGameState(GameState.PLAYING);
    spawnTile();
  }, []);

  const endGame = (reason) => {
    setGameState(GameState.GAME_OVER);
    setGameOverReason(reason);
    setHighScore((h) => {
      const nh = Math.max(h, score);
      localStorage.setItem("neon_reflex_highscore", nh);
      return nh;
    });
  };

  const handleClick = (i) => {
    if (gameState !== GameState.PLAYING) return;

    if (i === activeTile) {
      const bonus = Math.max(0.2, 0.5 - score * 0.01);
      setScore((s) => s + 1);
      setTimeLeft((t) => Math.min(MAX_TIME, t + bonus));
      spawnTile();
      setWrongTile(null);
    } else {
      setWrongTile(i);
      setLives((l) => {
        if (l - 1 <= 0) {
          endGame("lives");
          return 0;
        }
        setTimeout(() => setWrongTile(null), 300);
        return l - 1;
      });
    }
  };

  const progress = Math.min(100, (timeLeft / INITIAL_TIME) * 100);

  return (
    <div className="w-full max-w-[340px] bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 select-none">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400">Skor</p>
          <p className="text-3xl font-black text-white">{score}</p>
        </div>

        {gameState !== GameState.IDLE && (
          <div className="flex gap-1">
            {[...Array(MAX_LIVES)].map((_, i) => (
              <HeartIcon
                key={i}
                filled={i < lives}
                className={`w-5 h-5 ${
                  i < lives ? "text-red-500" : "text-slate-700"
                }`}
              />
            ))}
          </div>
        )}

        <div className="text-right">
          {gameState === GameState.PLAYING ? (
            <div>
              <div className="flex items-center gap-1 text-xs text-slate-300">
                <TimerIcon className="w-3 h-3" /> {timeLeft.toFixed(1)}
              </div>
              <div className="w-20 h-1 bg-slate-800 rounded overflow-hidden mt-1">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                <TrophyIcon className="w-3 h-3 text-yellow-500" /> En İyi
              </p>
              <p className="text-xl font-bold text-yellow-500">{highScore}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 relative">
        {Array.from({ length: GRID_SIZE }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`aspect-square rounded-lg cursor-pointer transition-all
              ${
                i === activeTile
                  ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-105"
                  : "bg-slate-800 hover:bg-slate-700"
              }
              ${i === wrongTile ? "bg-red-500" : ""}`}
          />
        ))}

        {gameState === GameState.IDLE && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <h2 className="text-xl font-bold text-white mb-3">Refleks Testi</h2>
            <button
              onClick={startGame}
              className="bg-emerald-500 px-6 py-2 rounded-full font-bold flex items-center gap-2"
            >
              <PlayIcon className="w-5 h-5" /> Başla
            </button>
          </div>
        )}

        {gameState === GameState.GAME_OVER && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center rounded-lg">
            <p className="text-red-400 text-xs mb-1">
              {gameOverReason === "lives" ? "Canlar Bitti" : "Süre Doldu"}
            </p>
            <p className="text-4xl font-black text-white">{score}</p>
            <button
              onClick={startGame}
              className="mt-4 bg-white text-black px-5 py-2 rounded-full flex items-center gap-2"
            >
              <RefreshIcon className="w-4 h-4" /> Tekrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
