class Arena {
    constructor(w, h) {
        const gameGrid = [];
        while (h--) {
            gameGrid.push(new Array(w).fill(0));
        }
        this.gameGrid = gameGrid;
    }

    collisonDetector(player) {
        // const [m, o] = [player.matrix, player.pos];
        const m = player.matrix;
        const o = player.pos;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 && 
                    (this.gameGrid[y + o.y] && 
                    this.gameGrid[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    rowClear() {
        let rowCount = 1;
        outer: for (let y = this.gameGrid.length - 1; y > 0; --y){
            for (let x = 0; x < this.gameGrid[y].length; ++x) {
                if (this.gameGrid[y][x] === 0) {
                    continue outer;
                }
            }
            const emptyRow = this.gameGrid.splice(y, 1)[0].fill(0);
            this.gameGrid.unshift(emptyRow);
            ++y;
    
            player.score += rowCount * 10;
            rowCount *= 2;
        }
    }

    clear() {
        this.gameGrid.forEach(row => row.fill(0));
    }

    merge(player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.gameGrid[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    }
}
