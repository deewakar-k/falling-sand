function make2Darray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
    for(let j = 0; j < arr[i].length; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 5;
let cols, rows;

function setup() {
  createCanvas(640, 480);
  cols = width / w;
  rows = height / w;
  grid = make2Darray(cols, rows);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      grid[i][j] = 0;
    }
  }
}

function mouseDragged() {
  let mouseCol = floor(mouseX / w)
  let mouseRow = floor(mouseY / w)

  let matrix = 10;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++){
    for (let j = -extent; j <= extent; j++){
      let col = mouseCol + i;
      let row = mouseRow + j;
      if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
        grid[col][row] = 1
      }
    }
  }
}

function draw() {
  background(25, 25, 25);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      noStroke();
      if (grid[i][j] == 1) {
        fill(203, 189, 147);
        let x = i * w;
        let y = j * w;
        square(x, y, w)
      }
    }
  }
  let nextGrid = make2Darray(cols, rows)
  for (let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let state = grid[i][j];
      if (state === 1){
        let below = grid[i][j+1];

        let dir = 1
        if (random(1) < 0.5) {
          dir *= -1;
        }

        let belowL, belowR
        if (i + dir >= 0 && i + dir <= cols - 1) {
          belowR = grid[i+dir][j+1];
        }
        if (i - dir >= 0 && i - dir <= cols - 1){
          belowL = grid[i-dir][j+1];
        }

        if (below === 0) {
          nextGrid[i][j + 1] = 1;
        } else if(belowR === 0){
            nextGrid[i+dir][j+1] = 1
        } else if (belowL === 0) {
          nextGrid[i-dir][j+1] = 1
        } else {
          nextGrid[i][j] = 1;
        }
      }
    }
  }
  grid = nextGrid;
}
