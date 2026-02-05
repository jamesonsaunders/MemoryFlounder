import icon from "./assets/images/icon.svg";
import { Footer } from "./Footer";
import { useAppStore } from "./store";

export function Menu() {
  const { gameMode, gridSize, setGameMode, setGridSize, startGame } = useAppStore();

  const handleStartGame = () => {
    if (gameMode && gridSize) {
      startGame();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: 'clamp(10px, 5vw, 20px)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', marginBottom: 'clamp(1rem, 4vw, 2rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <img src={icon} alt="MemoryFlounder" style={{ width: 'clamp(40px, 10vw, 60px)', height: 'clamp(40px, 10vw, 60px)' }} />
        <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 3rem)', margin: 0, textAlign: 'center' }}>MemoryFlounder</h1>
      </div>
      
      <div style={{ marginBottom: 'clamp(1rem, 4vw, 2rem)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: 'clamp(0.5rem, 2vw, 1rem)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>Choose Game Mode</h2>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <button
            onClick={() => setGameMode('emoji')}
            style={{
              padding: 'clamp(10px, 3vw, 15px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              border: gameMode === 'emoji' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: gameMode === 'emoji' ? '#e8f5e9' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}
          >
            🎯 Emoji Mode
          </button>
          <button
            onClick={() => setGameMode('words')}
            style={{
              padding: 'clamp(10px, 3vw, 15px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              border: gameMode === 'words' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: gameMode === 'words' ? '#e8f5e9' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}
          >
            📝 Word Mode
          </button>
          <button
            onClick={() => setGameMode('letters')}
            style={{
              padding: 'clamp(10px, 3vw, 15px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              border: gameMode === 'letters' ? '3px solid #4CAF50' : '2px solid #ddd',
              background: gameMode === 'letters' ? '#e8f5e9' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}
          >
            🔤 Letter Mode
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 'clamp(1rem, 4vw, 2rem)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: 'clamp(0.5rem, 2vw, 1rem)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>Choose Grid Size</h2>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <button
            onClick={() => setGridSize(4)}
            style={{
              padding: 'clamp(10px, 3vw, 15px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              border: gridSize === 4 ? '3px solid #2196F3' : '2px solid #ddd',
              background: gridSize === 4 ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}
          >
            2x2 (Easy)
          </button>
          <button
            onClick={() => setGridSize(16)}
            style={{
              padding: 'clamp(10px, 3vw, 15px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              border: gridSize === 16 ? '3px solid #2196F3' : '2px solid #ddd',
              background: gridSize === 16 ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}
          >
            4x4 (Medium)
          </button>
          <button
            onClick={() => setGridSize(36)}
            style={{
              padding: 'clamp(10px, 3vw, 15px)',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              borderRadius: '8px',
              border: gridSize === 36 ? '3px solid #2196F3' : '2px solid #ddd',
              background: gridSize === 36 ? '#e3f2fd' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              touchAction: 'manipulation'
            }}
          >
            6x6 (Hard)
          </button>
        </div>
      </div>

      <button
        onClick={handleStartGame}
        disabled={!gameMode || !gridSize}
        style={{
          padding: 'clamp(15px, 4vw, 20px) clamp(30px, 8vw, 40px)',
          fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
          borderRadius: '8px',
          border: 'none',
          background: gameMode && gridSize ? '#4CAF50' : '#ccc',
          color: 'white',
          cursor: gameMode && gridSize ? 'pointer' : 'not-allowed',
          fontWeight: 'bold',
          transition: 'all 0.2s',
          opacity: gameMode && gridSize ? 1 : 0.6,
          touchAction: 'manipulation'
        }}
      >
        Start Game
      </button>

      <Footer />
    </div>
  );
}
