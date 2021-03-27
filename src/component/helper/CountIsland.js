const DFS = (board, row, col, rowNum, colNum, visited) => {
  let rowDir = [-1, -1, -1, 0, 0, 1, 1, 1]
  let colDir = [-1, 0, 1, -1, 1, -1, 0, 1]
  visited[row][col] = true
    
  for (let k = 0; k < 8; ++k) {
    let newRow = row + rowDir[k]
    let newCol = col + colDir[k]
    if ((newRow >= 0) && (newRow < rowNum) && 
        (newCol >= 0) && (newCol < colNum) && 
        (board[newRow][newCol] !== "#ffffff" && !visited[newRow][newCol])) {
      DFS(board, newRow, newCol, rowNum, colNum, visited)
    }
  }        
}

const CountIsland = board => {
  let rowNum = board.length || 0
  let colNum = board[0].length || 0
  let visited = []
  for (let r = 0; r < rowNum; r++) {
    let curRow = []
    for (let c = 0; c < colNum; c++) curRow.push(false)
    visited.push(curRow)
  }

  let count = 0;
  for (let i = 0; i < rowNum; ++i) {
    for (let j = 0; j < colNum; ++j) {
      if (board[i][j] !== "#ffffff" && !visited[i][j]) {
        DFS(board, i, j, rowNum, colNum, visited)
        count++
      }
    }
  }
  return count
}
  
export default CountIsland