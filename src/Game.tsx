import { useAppStore } from "./store";
import icon from "./assets/images/icon.svg";
import { Footer } from "./Footer";

export function Game() {
  const { cards, flipCard, moves, matches, gridSize, gameMode, resetGame, backToMenu, flippedCards, matchFeedback } = useAppStore();
  
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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 'clamp(10px, 3vw, 20px)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      minHeight: '100vh'
    }}>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-1px); }
            20%, 40%, 60%, 80% { transform: translateX(1px); }
          }
        `}
      </style>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        marginBottom: 'clamp(10px, 3vw, 20px)',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.3rem, 1.5vw, 0.5rem)' }}>
          <img src={icon} alt="MemoryFlounder" style={{ width: 'clamp(30px, 8vw, 40px)', height: 'clamp(30px, 8vw, 40px)' }} />
          <h1 style={{ margin: 0, fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>MemoryFlounder</h1>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(5px, 2vw, 10px)' }}>
          <button 
            onClick={resetGame}
            style={{
              padding: 'clamp(8px, 2vw, 10px) clamp(12px, 4vw, 20px)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              borderRadius: '8px',
              border: 'none',
              background: '#FF9800',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              touchAction: 'manipulation'
            }}
          >
            Reset
          </button>
          <button 
            onClick={backToMenu}
            style={{
              padding: 'clamp(8px, 2vw, 10px) clamp(12px, 4vw, 20px)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              borderRadius: '8px',
              border: 'none',
              background: '#607D8B',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              touchAction: 'manipulation'
            }}
          >
            Menu
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: 'clamp(15px, 5vw, 30px)', 
        marginBottom: 'clamp(15px, 5vw, 30px)',
        fontSize: 'clamp(1rem, 3vw, 1.2rem)'
      }}>
        <div>Moves: <strong>{moves}</strong></div>
        <div>Matches: <strong>{matches}/{totalPairs}</strong></div>
      </div>

      {isGameWon && (
        <div style={{
          background: '#4CAF50',
          color: 'white',
          padding: 'clamp(15px, 4vw, 20px) clamp(20px, 6vw, 40px)',
          borderRadius: '8px',
          marginBottom: 'clamp(15px, 4vw, 20px)',
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          🎉 You Won in {moves} moves! 🎉
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gap: 'clamp(5px, 2vw, 10px)',
        width: '100%',
        maxWidth: gridSize === 4 ? 'min(300px, 90vw)' : gridSize === 16 ? 'min(400px, 90vw)' : 'min(600px, 95vw)'
      }}>
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => flipCard(card.id)}
            style={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: getCardBackground(card),
              color: 'white',
              fontSize: getFontSize(),
              fontWeight: 'bold',
              borderRadius: 'clamp(4px, 1.5vw, 8px)',
              cursor: card.isMatched ? 'default' : 'pointer',
              userSelect: 'none',
              transition: 'background 0.3s',
              animation: getCardAnimation(card),
              opacity: card.isMatched ? 0.6 : 1,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              touchAction: 'manipulation'
            }}
          >
            {card.isFlipped || card.isMatched ? card.content : '?'}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
