import { useEffect, useRef } from "react";
import { useAppStore } from "../store/game-store";
import icon from "../assets/images/icon.svg";
import { Footer } from "./Footer";

export function Game() {
  const { cards, flipCard, moves, matches, gridSize, gameMode, resetGame, backToMenu, flippedCards, matchFeedback } = useAppStore();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const updateOverflow = () => {
      const root = rootRef.current;
      if (!root) {
        document.body.style.overflow = previousOverflow || "";
        return;
      }

      const needsScroll = root.scrollHeight > window.innerHeight + 1;
      document.body.style.overflow = needsScroll ? "auto" : "hidden";
    };

    updateOverflow();
    window.addEventListener("resize", updateOverflow);

    return () => {
      window.removeEventListener("resize", updateOverflow);
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  
  const gridCols = gridSize === 4 ? 2 : gridSize === 16 ? 4 : 6;
  const totalPairs = (gridSize ?? 0) / 2;
  const isGameWon = matches === totalPairs;
  
  const getFontSize = () => {
    if (gameMode === 'emoji') {
      return gridSize === 4 ? '3rem' : gridSize === 16 ? '2rem' : '1.5rem';
    } else if (gameMode === 'words') {
      return gridSize === 4 ? '1.2rem' : gridSize === 16 ? '0.9rem' : '0.7rem';
    } else {
      return gridSize === 4 ? '2.5rem' : gridSize === 16 ? '1.8rem' : '1.3rem';
    }
  };
  
  const getCardBackground = (card: typeof cards[0]) => {
    if (card.isMatched) return '#4CAF50';
    if (!card.isFlipped) return '#2196F3';
    
    // Card is flipped, check for match feedback
    if (flippedCards.includes(card.id) && flippedCards.length === 2) {
      if (matchFeedback === 'correct') return '#4CAF50';
      if (matchFeedback === 'incorrect') return '#f44336';
    }
    
    return '#FF9800'; // Default flipped color
  };
  
  const getCardAnimation = (card: typeof cards[0]) => {
    if (flippedCards.includes(card.id) && flippedCards.length === 2 && matchFeedback === 'incorrect') {
      return 'shake 0.5s';
    }
    return 'none';
  };

  return (
    <div className="game-root" ref={rootRef}>
      <style>
        {`
          .game-root {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: clamp(16px, 4vw, 32px);
            font-family: "Inter", "SF Pro Display", system-ui, -apple-system, sans-serif;
            background: radial-gradient(circle at top left, rgba(95, 99, 255, 0.2), transparent 45%),
              radial-gradient(circle at bottom right, rgba(0, 207, 255, 0.18), transparent 45%),
              linear-gradient(135deg, #0b1026 0%, #101a34 45%, #141d3a 100%);
            color: #f4f6ff;
            overflow: hidden;
          }

          .game-orb {
            position: absolute;
            width: clamp(160px, 30vw, 300px);
            height: clamp(160px, 30vw, 300px);
            border-radius: 999px;
            filter: blur(28px);
            opacity: 0.45;
            animation: float 12s ease-in-out infinite;
          }

          .game-orb.orb-left {
            top: -12%;
            left: -8%;
            background: radial-gradient(circle, rgba(255, 146, 126, 0.85), transparent 70%);
          }

          .game-orb.orb-right {
            bottom: -10%;
            right: -6%;
            background: radial-gradient(circle, rgba(98, 255, 205, 0.8), transparent 70%);
            animation-delay: -4s;
          }

          .game-panel {
            position: relative;
            z-index: 1;
            width: min(920px, 100%);
            padding: clamp(16px, 4vw, 32px);
            border-radius: clamp(18px, 3vw, 28px);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
            box-shadow: 0 30px 70px rgba(6, 12, 34, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(18px);
            display: flex;
            flex-direction: column;
            gap: clamp(12px, 2.5vw, 24px);
          }

          .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: clamp(10px, 2vw, 16px);
            flex-wrap: wrap;
          }

          .game-title {
            display: flex;
            align-items: center;
            gap: clamp(0.4rem, 1.4vw, 0.6rem);
          }

          .game-title img {
            width: clamp(34px, 8vw, 44px);
            height: clamp(34px, 8vw, 44px);
            filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35));
          }

          .game-title h1 {
            margin: 0;
            font-size: clamp(1.1rem, 4vw, 1.6rem);
            letter-spacing: -0.02em;
            background: linear-gradient(120deg, #ffffff 0%, #8de1ff 50%, #ffe2a6 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .game-actions {
            display: flex;
            gap: clamp(8px, 2vw, 12px);
          }

          .game-action-button {
            padding: clamp(8px, 2vw, 12px) clamp(14px, 4vw, 22px);
            font-size: clamp(0.9rem, 2.4vw, 1rem);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(10, 16, 34, 0.7);
            color: #f5f7ff;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
            touch-action: manipulation;
          }

          .game-action-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.35);
          }

          .game-stats {
            display: flex;
            gap: clamp(12px, 4vw, 26px);
            font-size: clamp(1rem, 3vw, 1.15rem);
            color: rgba(245, 247, 255, 0.85);
            flex-wrap: wrap;
          }

          .game-stat-card {
            padding: 10px 14px;
            border-radius: 12px;
            background: rgba(10, 16, 34, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .game-win {
            background: linear-gradient(120deg, rgba(98, 255, 205, 0.95), rgba(141, 225, 255, 0.9));
            color: #09131f;
            padding: clamp(14px, 4vw, 20px) clamp(20px, 6vw, 40px);
            border-radius: 16px;
            font-size: clamp(1.1rem, 4vw, 1.5rem);
            font-weight: 700;
            text-align: center;
            box-shadow: 0 16px 30px rgba(0, 0, 0, 0.35);
          }

          .game-grid {
            display: grid;
            gap: clamp(6px, 2vw, 12px);
            width: 100%;
          }

          .game-card {
            position: relative;
            aspect-ratio: 1;
            border-radius: clamp(8px, 1.6vw, 14px);
            cursor: pointer;
            user-select: none;
            perspective: 800px;
          }

          .game-card.is-matched {
            cursor: default;
            opacity: 0.65;
          }

          .game-card-inner {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: rgba(9, 14, 30, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #ffffff;
            box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
            transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
            transform-style: preserve-3d;
          }

          .game-card.is-flipped .game-card-inner {
            background: linear-gradient(140deg, rgba(98, 255, 205, 0.3), rgba(141, 225, 255, 0.3));
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45);
            transform: rotateY(0deg) scale(1.02);
          }

          .game-card.is-unflipped .game-card-inner {
            transform: rotateY(0deg) scale(1);
          }

          .game-card.is-wrong .game-card-inner {
            background: linear-gradient(140deg, rgba(255, 120, 120, 0.35), rgba(255, 168, 120, 0.35));
            animation: shake 0.5s;
          }

          .game-card-content {
            transform: translateZ(1px);
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(18px); }
          }
        `}
      </style>

      <div className="game-orb orb-left" />
      <div className="game-orb orb-right" />

      <div className="game-panel">
        <div className="game-header">
          <div className="game-title">
            <img src={icon} alt="MemoryFlounder" />
            <h1>MemoryFlounder</h1>
          </div>
          <div className="game-actions">
            <button onClick={resetGame} className="game-action-button">
              Reset
            </button>
            <button onClick={backToMenu} className="game-action-button">
              Menu
            </button>
          </div>
        </div>

        <div className="game-stats">
          <div className="game-stat-card">Moves: <strong>{moves}</strong></div>
          <div className="game-stat-card">Matches: <strong>{matches}/{totalPairs}</strong></div>
        </div>

        {isGameWon && (
          <div className="game-win">
            🎉 You Won in {moves} moves! 🎉
          </div>
        )}

        <div
          className="game-grid"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            maxWidth: gridSize === 4 ? 'min(300px, 90vw)' : gridSize === 16 ? 'min(420px, 92vw)' : 'min(640px, 95vw)'
          }}
        >
          {cards.map(card => {
            const isFlipped = card.isFlipped || card.isMatched;
            const isWrong = flippedCards.includes(card.id) && flippedCards.length === 2 && matchFeedback === 'incorrect';

            return (
              <div
                key={card.id}
                onClick={() => flipCard(card.id)}
                className={`game-card ${card.isMatched ? 'is-matched' : ''} ${isFlipped ? 'is-flipped' : 'is-unflipped'} ${isWrong ? 'is-wrong' : ''}`}
                style={{
                  fontSize: getFontSize()
                }}
              >
                <div className="game-card-inner">
                  <span className="game-card-content">
                    {isFlipped ? card.content : '?'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
}
