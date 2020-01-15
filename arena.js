class Arena {
    constructor(w, h) {
        const gameGrid = [];
        while (h--) {
            gameGrid.push(new Array(w).fill(0));
        }
        this.gameGrid = gameGrid;
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
}
