let state = [1, 0, 1, 0, 0, 1, 1, 1, 0]; // Game state, with 1 indicating available spaces
let flag = true; // Start with Player 1
let player1Score = 0; // Initialize Player 1's score
let player2Score = 0; // Initialize Player 2's score
let drawsCount = 0; // Initialize draws count

const player1=document.getElementById("player1Display");
const player2=document.getElementById("player2Display");
const drawDisplay = document.querySelector('.draw');


// console.log(state)
// starting the game with name
document.getElementById('startGameButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    const player1Name = document.getElementById('player1').value.trim();
    const player2Name = document.getElementById('player2').value.trim();
    
    if (player1Name === "" || player2Name === "") {
        alert("Please enter both player names before starting the game.");
    } else {
        startGame(player1Name, player2Name);
    }
});

//start game without name
document.getElementById('startGamewithoutBtn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission
    startGameWithoutName(); // Call the function to start without names
});


function startGameWithoutName() {
    // Set default names for players
    const player1Name = "Player 1";
    const player2Name = "Player 2";

    // Set the player names in the display
    document.getElementById('player1Display').innerText = player1Name + " (X)";
    document.getElementById('player2Display').innerText = player2Name + " (O)";

    // Hide the name input page and show the game board
    document.getElementById('nameInputPage').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
}

// Functions to Start the Game
function startGame(player1Name, player2Name) {
    document.getElementById('player1Display').innerText = player1Name + " (X)";
    document.getElementById('player2Display').innerText = player2Name + " (O)";
    document.getElementById('nameInputPage').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    document.getElementById('p1stats').innerText=`${player1.innerText}`;
    document.getElementById('p2stats').innerText=`${player2.innerText}`;
}

document.querySelector('.container').addEventListener('click', (e) => {
    var boxId = e.target.id;
    // console.log(boxId) // Get the id of the clicked button
    if (boxId != "") {
        if (state[boxId] == 1 || state[boxId] == 0) { // Check if the space is available
            if (flag) {
                e.target.innerHTML = "X"; // Player 1's turn
                state[boxId] = "X"; // Update the state
                document.getElementById('player1Display').classList.add('player1');
                document.getElementById('player2Display').classList.remove('player2');
              
            } else {
                e.target.innerHTML = "O"; // Player 2's turn
                state[boxId] = "O"; // Update the state
                // Apply Player 2 color
                document.getElementById('player2Display').classList.add('player2');
                document.getElementById('player1Display').classList.remove('player1');
               
            }
            flag = !flag; // Toggle turn
            checkWinner(!flag); // Check for a winner after the move
        }
    }
});


function checkWinner(flag) {
    if (state[0] == state[1] && state[0] == state[2] && state[0] !== 1) {
        highlightWinningLine([0, 1, 2]); // Highlight top row
        declareWinner(flag);
    } else if (state[3] == state[4] && state[3] == state[5] && state[3] !== 1) {
        highlightWinningLine([3, 4, 5]); // Highlight middle row
        declareWinner(flag);
    } else if (state[6] == state[7] && state[6] == state[8] && state[6] !== 1) {
        highlightWinningLine([6, 7, 8]); // Highlight bottom row
        declareWinner(flag);
    } else if (state[0] == state[3] && state[0] == state[6] && state[0] !== 1) {
        highlightWinningLine([0, 3, 6]); // Highlight left column
        declareWinner(flag);
    } else if (state[1] == state[4] && state[1] == state[7] && state[1] !== 1) {
        highlightWinningLine([1, 4, 7]); // Highlight middle column
        declareWinner(flag);
    } else if (state[2] == state[5] && state[2] == state[8] && state[2] !== 1) {
        highlightWinningLine([2, 5, 8]); // Highlight right column
        declareWinner(flag);
    } else if (state[0] == state[4] && state[0] == state[8] && state[0] !== 1) {
        highlightWinningLine([0, 4, 8]); // Highlight diagonal (top-left to bottom-right)
        declareWinner(flag);
    } else if (state[2] == state[4] && state[2] == state[6] && state[2] !== 1) {
        highlightWinningLine([2, 4, 6]); // Highlight diagonal (top-right to bottom-left)
        declareWinner(flag);
    }else{
        let count=9;
        for(let i=0;i<9;i++){
            if (state[i]=="X" || state[i]=="O")
            {
                count--
            }
        }
        if (count==0)
        {
            document.getElementById('winnerName').innerText = "It's a Draw!"; 
            drawsCount++;
            drawDisplay.textContent=drawsCount;//Draws count
        }
    }
}

// Declaring a Winner
function declareWinner(flag) {
    // Increment scores based on the winner
    if (flag) {
        player1Score++; // Increment Player 1's score
        document.getElementById('winnerName').innerText =`${player1.innerText} wins!`;
    } else {
        player2Score++; // Increment Player 2's score
        document.getElementById('winnerName').innerText = `${player2.innerText} wins!`;
    }
    // Update score display
    document.querySelector('.score1').innerText = player1Score; // Update Player 1's score
    document.querySelector('.score2').innerText = player2Score; // Update Player 2's score
    document.querySelector('.winnerName').innerText = player2Score; // Update Player 2's score
    
   
    setDisabled(); // Disable further clicks
}



function setDisabled() {
    // Disable all buttons by setting their state to null
    for (let i = 0; i < 9; i++) {
        if (state[i] == 1 || state[i] == 0) {
            state[i] = null; // Set the state to null to indicate the game is over
        }
    }
}

// Clear/reset all

function resetUI() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerText = ""; // Clear the board
        document.getElementById(i).classList.remove('winning-line'); // Remove highlight
    }
    state = [1, 0, 1, 0, 0, 1, 1, 1, 0]; // Reset state
    flag = true; // Reset turn
    document.getElementById('winnerName').innerText = ""; // Clear the winner display
    document.getElementById('player1Display').classList.remove('player1'); // Reset Player 1 color
    document.getElementById('player2Display').classList.remove('player2'); // Reset Player 2 color
}



// restart game
function restartUI(){
    window.location.reload();
}


function highlightWinningLine(cells) {
    cells.forEach(index => {
        document.getElementById(index).classList.add('winning-line');
    });
}


// Call this function initially to set the display for the starting player
// displayCurrentPlayer();