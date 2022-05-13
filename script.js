const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'default'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setMode(newMode){
    activateButton(newMode);
    currentMode = newMode;
}

const colorPicker = document.getElementById('color-choice');
const colorBtn = document.getElementById('defaultBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeGrid');
const confirmBtn = document.getElementById('confirm');
/*const sizeSlider = document.getElementById('sizeSlider')*/
const grid = document.getElementById('grids')

colorPicker.onchange = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setMode('default')
rainbowBtn.onclick = () => setMode('rainbow')
eraserBtn.onclick = () => setMode('eraser')
clearBtn.onclick = () => reloadGrid();
confirmBtn.onclick = () => changeGrid();
/*sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)*/

/*confirmBtn.addEventListener("click", changeGrid);*/

function changeGrid(){
    var x = sizeValue.value;
    if (x == "" || !(x >= 0 && x < 65) || x % 1 !== 0){
        alert("Grid Size must be filled out properly");
        return;
    }
    else{
        currentSize = x;
        reloadGrid();
    }
    
}
/*
function setCurrentSize(newSize) {
    currentSize = newSize;
  }

function updateSizeValue(value){
    sizeValue.innerHTML = `${value} x ${value}`;
}

function changeSize(value){
    setCurrentSize(value);
    updateSizeValue(value);
}
*/

function clearGrid(){
    grid.innerHTML = '';
}

function reloadGrid(){
    clearGrid();
    setupGrid(currentSize);
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
      }
}

function activateButton(newMode){
    if (currentMode === 'default'){
        colorBtn.classList.remove('active');
    }
    else if (currentMode === 'rainbow'){
        rainbowBtn.classList.remove('active');
    }
    else if (currentMode === 'eraser'){
        eraserBtn.classList.remove('active');
    }

    if (newMode === 'default'){
        colorBtn.classList.add('active');
    }
    if (newMode === 'rainbow'){
        rainbowBtn.classList.add('active');
    }
    if (newMode === 'eraser'){
        eraserBtn.classList.add('active');
    }
}

function getRandomColor(){
    const r = Math.floor(Math.random() *256);
    const g = Math.floor(Math.random() *256);
    const b = Math.floor(Math.random() *256);
    const rgb = `rgb(${r},${g},${b})`;
    return rgb;
}

function changeColor(e){
    if (currentMode === 'default')
    {
        e.target.style.backgroundColor = currentColor;
    }
    if (currentMode === 'rainbow')
    {
        e.target.style.backgroundColor = getRandomColor();
    }
    if (currentMode === 'eraser')
    {
        e.target.style.backgroundColor = 'white';
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }

