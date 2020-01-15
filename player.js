class Player {
    constructor() {

        this.dropCounter = 0;
        this.dropInterval = 1000;
        
        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;
        
    }

    move(dir){
        this.pos.x += dir;
        if(collisonDetector(arena, this)) {
            this.pos.x -= dir;
        }
    }

    rotate(dir) {
        const pos = this.pos.x
        let offset = 1;
        this.actualMovingPieces(this.matrix, dir)
        while (collisonDetector(arena, this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if ( offset > this.matrix[0].length) {
                this.actualMovingPieces(this.matrix, -dir);
                this.pos.x = pos
                return;
            }
        }
    }

    actualMovingPieces(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                    matrix[y][x],
                    matrix[x][y]
                ];
            }
        }
    
        if(dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    drop() {
        this.pos.y++;
        if (collisonDetector(arena, this)) {
            this.pos.y--;
            arena.merge(this);
            this.reset();
            arena.rowClear();
            updateScore();
        }
        this.dropCounter = 0;
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;

        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }

    reset() {
        const pieces = "ILJOTSZ"
        this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (arena.gameGrid[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);
    
        if(collisonDetector(arena, this)) {
            arena.clear()
            player.score = 0;
            updateScore();
        }
    }
}