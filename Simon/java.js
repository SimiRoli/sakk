document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('chessboard');
    let isWhiteTurn = true;
    let selectedPiece = null;

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
        const clickedCell = this;
        const clickedRow = parseInt(clickedCell.dataset.row, 10);
        const clickedCol = parseInt(clickedCell.dataset.col, 10);

        if (!selectedPiece) {
            // If no piece is selected, try to select one
            selectPiece(clickedRow, clickedCol, clickedCell);
        } else {
            // If a piece is selected, try to move it
            movePiece(clickedRow, clickedCol, clickedCell);
        }
    }

    function selectPiece(row, col, cell) {
        const piece = cell.querySelector('.piece');

        if (piece && ((isWhiteTurn && piece.classList.contains('white')) || (!isWhiteTurn && piece.classList.contains('black')))) {
            // Select the piece if it belongs to the current player
            selectedPiece = piece;
        }
    }

    function movePiece(row, col, targetCell) {
        if (isValidMove(selectedPiece, targetCell)) {
            // Move the piece to the target cell
            targetCell.appendChild(selectedPiece);
            selectedPiece = null;
            isWhiteTurn = !isWhiteTurn;
        }
    }
    function isValidMove(piece, targetRow, targetCol, targetCell) {
        const currentRow = parseInt(piece.parentElement.dataset.row, 10);
        const currentCol = parseInt(piece.parentElement.dataset.col, 10);

        // Implement chess rules for valid moves here
        switch (piece.textContent) {
            case '♙': // Pawn
                return isValidPawnMove(currentRow, currentCol, targetRow, targetCol, piece.classList.contains('white'));
            case '♟': // Pawn
                return isValidPawnMove(currentRow, currentCol, targetRow, targetCol, piece.classList.contains('black'));
            case '♖': // Rook
                return isValidRookMove(currentRow, currentCol, targetRow, targetCol);
            case '♘': // Knight
                return isValidKnightMove(currentRow, currentCol, targetRow, targetCol);
            case '♗': // Bishop
                return isValidBishopMove(currentRow, currentCol, targetRow, targetCol);
            case '♕': // Queen
                return isValidQueenMove(currentRow, currentCol, targetRow, targetCol);
            case '♔': // King
                return isValidKingMove(currentRow, currentCol, targetRow, targetCol);
            default:
                return false;
            }
        }
        function isValidPawnMove(currentRow, currentCol, targetRow, targetCol, isWhite) {
            // Validating pawn move logic
            // Implement the specific rules for pawn movement here
            // For simplicity, allow pawn to move one step forward
            const direction = isWhite ? 1 : -1;
            return currentCol === targetCol && targetRow === currentRow + direction;
        }
    
        function isValidRookMove(currentRow, currentCol, targetRow, targetCol) {
            // Validating rook move logic
            // Implement the specific rules for rook movement here
            // For simplicity, allow rook to move horizontally or vertically
            return currentRow === targetRow || currentCol === targetCol;
        }
    
        function isValidKnightMove(currentRow, currentCol, targetRow, targetCol) {
            const rowDiff = Math.abs(targetRow - currentRow);
            const colDiff = Math.abs(targetCol - currentCol);
            return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        }
    
        function isValidBishopMove(currentRow, currentCol, targetRow, targetCol) {
            return Math.abs(targetRow - currentRow) === Math.abs(targetCol - currentCol);
        }
    
        function isValidQueenMove(currentRow, currentCol, targetRow, targetCol) {
            // Validating queen move logic
            // Implement the specific rules for queen movement here
            // For simplicity, allow queen to move horizontally, vertically, or diagonally
            return currentRow === targetRow || currentCol === targetCol || Math.abs(targetRow - currentRow) === Math.abs(targetCol - currentCol);
        }
    
        function isValidKingMove(currentRow, currentCol, targetRow, targetCol) {
            // Validating king move logic
            // Implement the specific rules for king movement here
            // For simplicity, allow king to move one step in any direction
            const rowDiff = Math.abs(targetRow - currentRow);
            const colDiff = Math.abs(targetCol - currentCol);
            return rowDiff <= 1 && colDiff <= 1;
        }
    

    function isValidMove(piece, targetCell) {
        // Implement chess rules for valid moves here
        // For simplicity, allow any move for now
        return true;
    }
});
