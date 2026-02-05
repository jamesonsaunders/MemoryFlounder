export function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      paddingTop: 'clamp(20px, 6vw, 40px)',
      textAlign: 'center',
      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
      color: '#666'
    }}>
      <a 
        href="https://github.com/jamesonsaunders/MemoryFlounder" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          color: '#2196F3',
          textDecoration: 'none',
          marginBottom: '0.5rem',
          display: 'block'
        }}
      >
        View on GitHub
      </a>
      <div>© 2026 Bot Group LLC. All rights reserved.</div>
    </footer>
  );
}
