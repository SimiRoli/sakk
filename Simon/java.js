document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('chessboard');
    let isWhiteTurn = true;

    // Initial setup
    setupChessboard();

    function setupChessboard() {
        let isWhiteCell = true;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell', isWhiteCell ? 'white' : 'black');
                cell.dataset.row = row;
                cell.dataset.col = col;

                // Place initial pieces
                placeInitialPieces(row, col, cell);

                cell.addEventListener('click', cellClick);

                board.appendChild(cell);
                isWhiteCell = !isWhiteCell;
            }
            isWhiteCell = !isWhiteCell;
        }
    }

    function placeInitialPieces(row, col, cell) {
        if (row === 1) {
            createPiece('♙', 'black', cell);
        } else if (row === 6) {
            createPiece('♟', 'white', cell);
        } else if (row === 0 || row === 7) {
            // Place other pieces on the first and last rows
            let piece;
            if (col === 0 || col === 7) {
                piece = '♖'; // Rook
            } else if (col === 1 || col === 6) {
                piece = '♘'; // Knight
            } else if (col === 2 || col === 5) {
                piece = '♗'; // Bishop
            } else if (col === 3) {
                piece = '♕'; // Queen
            } else if (col === 4) {
                piece = '♔'; // King
            }

            if (piece) {
                createPiece(piece, row === 0 ? 'black' : 'white', cell);
            }
        }
    }

    function createPiece(piece, color, cell) {
        const pieceElement = document.createElement('div');
        pieceElement.textContent = piece;
        pieceElement.classList.add('piece', color);
        cell.appendChild(pieceElement);
    }

    function cellClick() {
        const selectedCell = this;
        // Handle piece movement logic here
        // For simplicity, let's just alternate turns by changing cell color
        if (selectedCell.textContent !== '') {
            return; // Do nothing if the cell already has a piece
        }

        if (isWhiteTurn) {
            createPiece('♙', 'black', selectedCell);
        } else {
            createPiece('♟', 'white', selectedCell);
        }

        isWhiteTurn = !isWhiteTurn;
    }
});
