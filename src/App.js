import './App.css';
import React, { useState } from 'react'
import Board from './components/Board';

const App = () => {
  const [history, sethistory] = useState([
    { squares: Array(9).fill(null) }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setstepNumber] = useState(0)

  const calculateWinner = (squares) =>{
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let index = 0; index < lines.length; index++) {
      const [a,b,c] = lines[index];
      if(squares[a] && squares[a]=== squares[b] && squares[a]===squares[c]){
        return squares[a]
      }
    }
    return null;
  }
  const current = history[stepNumber]
  const winner = calculateWinner(current.squares);
  let status;
  winner 
    ? status = `Winner : ${winner}` 
    : status = `Next player ${xIsNext ? 'X' : 'O'}` 
  

  const handleClick = (i) => {
    const newHistory = history.slice(0,stepNumber + 1);
    const newCurrent = newHistory[newHistory.length -1]
    const newSquares = [...newCurrent.squares];
    if(calculateWinner(newSquares) || newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    sethistory([...newHistory,{squares:newSquares}]);
    setXIsNext(prev => !prev);

    setstepNumber(newHistory.length)
  }

  console.log(xIsNext);

  const moves = history.map((move,idx)=>{
    const desc = idx 
      ? `Go to Move #${idx}`
      : `Go to Game Start`
    return(
      <li key={idx}>
        <button 
          className='move-button'
          onClick={()=>jumpTo(idx)}>{desc}</button>
      </li>
    )
  });

  const jumpTo = (step) =>{
    setstepNumber(step);
    setXIsNext((step%2)===0);
  };
  

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares = {current.squares}
          ck={(i)=>handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className='status'>
          {status}
        </div>
        <ol style={{listStyle:'none'}}>
          {moves}
        </ol>
      </div>
    </div>  
  )
}

export default App;
