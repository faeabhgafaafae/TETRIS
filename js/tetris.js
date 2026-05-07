import { COLS, ROWS, BLOCK_SIZE, POINTS, KEY, SHAPES } from './constants.js';
import { Board } from './board.js';
import { Piece } from './piece.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

let accountValues = { score: 0, lines: 0, level: 0 };
function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) { element.textContent = value; }
}
let account = new Proxy(accountValues, {
    set: (target, key, value) => { target[key] = value; updateAccount(key, value); return true; }
});

let board = new Board(ctx);
let piece; let next; let requestId;
let time = { start: 0, elapsed: 0, level: 1000 };
let bag = [];

function getNextPiece() {
    if (bag.length === 0) {
        bag = Object.keys(SHAPES);
        for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }
    }
    return bag.pop();
}

function resetGame() {
    account.score = 0; account.lines = 0; account.level = 0;
    board.reset();
    time = { start: 0, elapsed: 0, level: 1000 };
    piece = new Piece(ctx, getNextPiece());
    next = new Piece(ctxNext, getNextPiece());
    ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
    next.x = 0; next.y = 0; next.draw();
}

function play() { resetGame(); animate(); }

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        if (!drop()) { gameOver(); return; }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw(); piece.draw();
    requestId = requestAnimationFrame(animate);
}

function drop() {
    let p = { ...piece, y: piece.y + 1 };
    if (board.isValid(p)) { piece.move(p); }
    else {
        board.freeze(piece);
        let lines = board.clearLines();
        if (lines > 0) {
            account.score += [0, POINTS.SINGLE, POINTS.DOUBLE, POINTS.TRIPLE, POINTS.TETRIS][lines] * (account.level + 1);
            account.lines += lines;
            if (account.lines >= (account.level + 1) * 10) { account.level++; time.level *= 0.8; }
        }
        if (piece.y === 0) return false;
        piece = next; piece.ctx = ctx; piece.x = 3; piece.y = 0;
        next = new Piece(ctxNext, getNextPiece());
        ctxNext.clearRect(0, 0, ctxNext.canvas.width, ctxNext.canvas.height);
        next.x = 0; next.y = 0; next.draw();
    }
    return true;
}

function gameOver() {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black'; ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial'; ctx.fillStyle = 'red'; ctx.fillText('GAME OVER', 1.8, 4);
}

const moves = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p) => board.rotate(p)
};

document.addEventListener('keydown', event => {
    if (moves[event.key]) {
        event.preventDefault();
        let p = moves[event.key](piece);
        if (event.key === KEY.SPACE) {
            while (board.isValid(p)) { account.score += 2; piece.move(p); p = moves[KEY.DOWN](piece); }
        } else if (board.isValid(p)) {
            if (event.key === KEY.UP) piece.shape = p.shape; else piece.move(p);
            if (event.key === KEY.DOWN) account.score += 1;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        board.draw(); piece.draw();
    }
});

document.getElementById('play-button').addEventListener('click', () => {
    if (requestId) cancelAnimationFrame(requestId);
    play();
});

ctx.canvas.width = COLS * BLOCK_SIZE; ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
ctxNext.canvas.width = 4 * BLOCK_SIZE; ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
