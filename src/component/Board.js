import React, { useState, useEffect } from 'react'
import CountIsland from './helper/CountIsland'
import useKeyPress from './helper/KeyPress'
import './Board.css'

const createBoard = ( rowNum, colNum ) => {
  let b = []
  for (let r = 0; r < rowNum; r++) {
    let curRow = []
    for (let c = 0; c < colNum; c++) curRow.push('#ffffff')
    b.push(curRow)
  }
  return b
}

const newColorBoard = board => {
  let b = [...board]
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (b[r][c] === '#ffffff') continue
      let randomColor = '#' +  Math.floor(Math.random()*16777215).toString(16)
      b[r][c] = randomColor
    }
  }
  return b
}

const Board = ({ rowNum, colNum }) => {
  const { innerWidth: width, innerHeight: height } = window;
  // const gridWidth = Math.round(width/colNum)
  // const gridHeight = Math.round(height/rowNum)
  const gridWidth = width/colNum
  const gridHeight = height/rowNum

  const [board, setBoard] = useState(createBoard(rowNum, colNum))
  const [island, setIsland] = useState(0)
  const [transitionTime, setTransitionTime] = useState(0)
  const changeColor = useKeyPress('c')
  // let transitionTime = 2

  // left click
  const handleClick = (e, rowId, colId) => {
    let b = [...board]
    if (e.button === 0) {
      let randomColor = '#' +  Math.floor(Math.random()*16777215).toString(16)
      b[rowId][colId] = randomColor
      setBoard(b)
      setTransitionTime(0)
    }
  }

  // right click
  document.oncontextmenu = e => {
    let colId = Math.floor(e.clientX/gridWidth)
    let rowId = Math.floor(e.clientY/gridHeight)
    if (e.button === 2) {
      e.preventDefault();
      let b = [...board]
      b[rowId][colId] = '#ffffff'
      setBoard(b)
      setTransitionTime(0)
    }
  }

  useEffect(() => {
    setIsland(CountIsland(board))
  }, [board])

  useEffect(() => {
    if (changeColor) {
      setTransitionTime(2)
      newColorBoard(board)
    }
  })

  return (
    <>
      <div className="board" style={{ width: width, height: height }}>
        {board.map((row, ind) => {
          return (
            <div key={ind} style={{ display: "inline-block" }}>
              {row.map((col, index) => {
                return (
                  <div 
                    key={index}
                    className="col" 
                    style={{
                      position: "absolute",
                      left: `${gridWidth*index}px`,
                      top: `${gridHeight*ind}px`,
                      width: `${gridWidth}px`, 
                      height: `${gridHeight}px`,
                      margin: 0,
                      backgroundColor: col,
                      transition: `background-color ${transitionTime}s ease`,
                      border: "0.5px solid grey",
                    }}
                    onClick={e => handleClick(e, ind, index)}
                  ></div>
                )}
              )}  
            </div>
          )}
        )}
      </div>
      <div className="popup" key={Math.random()}>{island}</div>
    </>
  )
}

export default Board