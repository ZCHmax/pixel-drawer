import React, { useState } from 'react'
import Board from './component/Board'
import './App.css';

function App() {
  const [status, setStatus]  = useState('set')
  const [rowNum, setRowNum] = useState(0)
  const [colNum, setColNum] = useState(0)

  const handleSubmit = () => {
    setStatus('play')
  }

  return (
    <div className="App">
      { status === 'set' && 
        <div className="prompt">
          <label> Row Number: </label>
          <input type="number" value={rowNum} min={1} onChange={e => setRowNum(e.target.value)} />
          <label> Column Number: </label>
          <input type="number" value={colNum} min={1} onChange={e => setColNum(e.target.value)} />
          <button onClick={handleSubmit}> Let's Play! </button>
        </div>
      }
      { status === "play" && 
        <Board rowNum={rowNum} colNum={colNum} />
      }
    </div>
  )
}

export default App;
