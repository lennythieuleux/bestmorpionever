//TIC TAC TOE APP - Lenny THIEULEUX 3AWD

let grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

//VAR INIT
let playerSign = null;
let turn = 0;
let cellIndex = null;
let cellRow = null;
let isGameOver = false;
let pointsToWin = 0;
let totalPoints = 0;
let startGameButton = '<button id="startGame" onclick="startGame();">Commencer la partie</button>';

function whichPlayerTurn() {
    if (turn % 2 === 0) {
        playerSign = '<i class="nes-icon heart"></i>';
    } else {
        playerSign = '<i class="nes-icon star"></i>';
    }
}

function startGame() {

    let displayGrid = "";

    grid.map((row, index) => {
        displayGrid += `
            <div class="row" key=${index}>
                <div class="cell" key="0"></div>
                <div class="cell" key="1"></div>
                <div class="cell" key="2"></div>
            </div>
            `
    });

    document.querySelector('main').innerHTML = displayGrid;
    document.querySelector('#restart').innerHTML = '<button onclick="restartGame()">Recommencer la partie</button>';
    document.querySelector('#startGame').remove();

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        //Get cell coordinates to update grid
        let cellIndex = null;
        let cellRow = null;
        cell.addEventListener('click', (e) => {
            if (isGameOver != true) {
                whichPlayerTurn();
                cellIndex = cell.getAttribute('key');
                cellRow = cell.parentElement.getAttribute('key');
                console.log(cellIndex)

                if (grid[cellRow][cellIndex] === null) {
                    //Display the player's sign
                    cell.innerHTML = playerSign;

                    //Update the grid with right player's sign for verification
                    grid[cellRow][cellIndex] = playerSign;

                    checkHorizontal();

                    turn++;
                }

            } else {
                console.log('none')
            }
        })

    }
}

function checkWin() {
    if (pointsToWin === 3) {
        document.body.querySelector(".congrats").innerHTML = `Les ${playerSign} ont gagné la partie !  <i class="nes-icon trophy"></i>`;
        isGameOver = true;
    }
}

function checkHorizontal() {
    for (let cell of grid[0]) {
        if (cell === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;
    for (let cell of grid[1]) {
        if (cell === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;
    for (let cell of grid[2]) {
        if (cell === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;

    //Call next check func
    checkVertical();
}

function checkVertical() {
    for (let [index, value] of grid.entries()) {
        if (grid[index][0] === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;
    for (let [index, value] of grid.entries()) {
        if (grid[index][1] === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;
    for (let [index, value] of grid.entries()) {
        if (grid[index][2] === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;

    //Call next check func
    checkDiagonal();
}

function checkDiagonal() {
    for (let [index, value] of grid.entries()) {
        if (grid[index][index] === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;
    for (let [index, value] of grid.entries()) {
        if (grid[index][2 - index] === playerSign) {
            pointsToWin++;
        }
        checkWin();
    }
    pointsToWin = 0;

    //Call next check func
    checkGridFull();
}

function checkGridFull() {
    totalPoints = 0;
    grid.map((row) => {
        row.map((block) => {
            if (block !== null) {
                totalPoints++;
            }
        })
    })

    if (totalPoints === 9 && isGameOver === false) {
        isGameOver = true;
        document.body.querySelector(".congrats").innerHTML = 'Match nul !  <i class="nes-icon close"></i>';
    }
}

function restartGame() {
    document.body.querySelector(".congrats").innerHTML = "";
    grid = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    isGameOver = false;
    document.body.querySelector('#start').innerHTML = startGameButton;
    startGame();
}