import { useState } from 'react';
import './App.css';

const Square = ({ value, index, handleStateUpdate }) => {
  return (
    <button
      className='tic-tac-toe-state'
      onClick={() => handleStateUpdate(index)}>
      {value}
    </button>
  );
};

function App() {
  const [initialState, setInitialState] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');

  const handleStateUpdate = (idx) => {
    if (checkWinner(initialState) || initialState[idx]) return;
    initialState.map((val, index) => {
      if (index === idx) {
        initialState[index] = player;
      }
    });
    setInitialState(initialState);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const handleReset = () => {
    setPlayer('X');
    setInitialState(Array(9).fill(null));
  };

  const checkWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <>
      <p>Current player: {player}</p>
      <button
        className='reset-btn'
        type='button'
        onClick={handleReset}>
        Reset
      </button>
      <div className='tic-tac-toe'>
        {initialState.map((value, index) => {
          return (
            <Square
              key={`key-${index}`}
              value={value}
              index={index}
              handleStateUpdate={handleStateUpdate}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
