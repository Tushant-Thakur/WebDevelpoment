class ChessBoard {
    constructor() {
        this.board = this.createBoard();
        this.turn = 'w';
    }

    createBoard() {
        // 8x8 board, FEN-like setup
        return [
            ['r','n','b','q','k','b','n','r'],
            ['p','p','p','p','p','p','p','p'],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null],
            ['P','P','P','P','P','P','P','P'],
            ['R','N','B','Q','K','B','N','R']
        ];
    }

    renderBoard(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'chess-row';
            for (let j = 0; j < 8; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.className = 'chess-cell ' + ((i + j) % 2 === 0 ? 'white' : 'black');
                cellDiv.dataset.row = i;
                cellDiv.dataset.col = j;
                cellDiv.textContent = this.board[i][j] || '';
                rowDiv.appendChild(cellDiv);
            }
            container.appendChild(rowDiv);
        }
    }

    printBoard() {
        console.log(this.board.map(row => row.map(cell => cell || '.').join(' ')).join('\n'));
    }

    move(from, to) {
        const [fx, fy] = from;
        const [tx, ty] = to;
        const piece = this.board[fx][fy];
        if (!piece) return false;
        this.board[tx][ty] = piece;
        this.board[fx][fy] = null;
        this.turn = this.turn === 'w' ? 'b' : 'w';
        return true;
    }