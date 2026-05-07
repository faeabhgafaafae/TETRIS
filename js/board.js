import { COLS, ROWS, COLORS } from './constants.js';

export class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.getEmptyGrid();
    }
    getEmptyGrid() { return Array.from({ length: ROWS }, () => Array(COLS).fill(0)); }
    rotate(piece) {
        let p = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) { [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]]; }
        }
        p.shape.forEach(row => row.reverse());
        return p;
    }
    isValid(p) {
        return p.shape.every((row, dy) => row.every((value, dx) => {
            let x = p.x + dx; let y = p.y + dy;
            return (value === 0 || (x >= 0 && x < COLS && y < ROWS && (y < 0 || (this.grid[y] && this.grid[y][x] === 0))));
        }));
    }
    freeze(p) {
        p.shape.forEach((row, y) => row.forEach((value, x) => {
            if (value > 0) { this.grid[p.y + y][p.x + x] = p.color; }
        }));
    }
    draw() {
        this.grid.forEach((row, y) => row.forEach((value, x) => {
            if (value !== 0) { this.ctx.fillStyle = value; this.ctx.fillRect(x, y, 1, 1); }
        }));
    }
    clearLines() {
        let lines = 0;
        for (let y = ROWS - 1; y >= 0; y--) {
            if (this.grid[y].every(value => value !== 0)) {
                lines++; this.grid.splice(y, 1); this.grid.unshift(Array(COLS).fill(0)); y++;
            }
        }
        return lines;
    }
    reset() { this.grid = this.getEmptyGrid(); }
}
