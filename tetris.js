const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
    context.scale(20, 20);

const arena = new Arena(12, 20);

// -------------------------------------Game Board
function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena.gameGrid, {x:0, y:0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(
                                x + offset.x,
                                y + offset.y, 
                                1, 1
                )
            }
        });
    });
}

// -----------------------------------------Game Pieces
const colors = [
    null, 
    'red',
    'blue',
    'violet',
    'green',
    'orange',
    'purple',
    'pink'
]

function createPiece(type){
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === "O") {
        return [
            [2, 2],
            [2, 2]
        ]
    } else if (type === "L") {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ]
    } else if (type === "J") {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ]
    } else if (type === "I") {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ]
    } else if (type === "S") {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ]
    } else if (type === "Z") {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ]
    }
}

//--------------------------------------------Game Controls

document.addEventListener('keydown', e => {
    if (e.key === "ArrowLeft") {
        player.move(-1);
    } else if (e.key === "ArrowRight") {
        player.move(1);
    } else if (e.key === "ArrowDown") {
        player.drop();
    } else if (e.key === 'q') {
        player.rotate(-1)
    } else if (e.key === 'w') {
        player.rotate(1)
    }
})

//-------------------------------------------------Player Mechanics

const player = new Player();


// ----------------------------------------------------Game Mechanics

function merge(gameGrid, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function collisonDetector(arena, player) {
    // const [m, o] = [player.matrix, player.pos];
    const m = player.matrix;
    const o = player.pos
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && 
                (arena[y + o.y] && 
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function updateScore(){
    document.getElementById('score').innerText = player.score;
}


let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    player.update(deltaTime)

    draw();
    requestAnimationFrame(update);
}

player.reset();
updateScore();
update();