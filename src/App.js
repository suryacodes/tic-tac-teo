import { useEffect, useState } from 'react';
import './App.css';

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(() =>
    Array.from({ length: 9 }, () => null)
  );
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);

  const onChange = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player === 1 ? 'X' : 'O';
    setBoard(newBoard);
    setPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  };

  useEffect(() => {
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(player);
        return;
      }
    }

    if (board.every((cell) => cell !== null)) {
      setWinner('Draw');
    }
  }, [board, player]);

  return (
    <div className="App">
      <div className="board">
        {board?.map((cell, index) => (
          <button onClick={() => onChange(index)} key={index}>
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div>
          {winner === 'Draw' ? "It's a draw!" : `The winner is ${winner}`}
        </div>
      )}
    </div>
  );
}

export default App;
