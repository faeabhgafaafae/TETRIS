import { SHAPES, COLORS } from './constants.js';

export class Piece {
    constructor(ctx, type) {
        this.ctx = ctx;
        this.type = type;
        this.shape = SHAPES[type];
        this.color = COLORS[type];
        this.x = 3;
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    rotate() {
        // Transpose
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [this.shape[x][y], this.shape[y][x]] = [this.shape[y][x], this.shape[x][y]];
            }
        }
        // Reverse rows for clockwise
        this.shape.forEach(row => row.reverse());
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
    }
}
