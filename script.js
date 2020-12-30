//player factory function
const createPlayer = (name, marker) => {
    return {name, marker};
}

//gameboard object (module)
const Gameboard = (()=>{

        //generate board array
        let board=[];
        for(let i=0;i<9;i++){
            board.push('');
        }

        // display square for each item in board array
        let squares = document.querySelector('.squares');

        board.forEach((item)=>{
            const square = document.createElement('button');
            square.className = 'square';
            
            square.setAttribute('style','border:3px solid lightblue;cursor:pointer;font-size:100px;color:red')
            squares.appendChild(square);

        })

        //add event listeners on each square
        Array.from(squares.children).forEach((square,index)=>{
            square.addEventListener('click',()=>{
                //display active player marker
                if(game.subtext.innerHTML == `<b>${game.activePlayer.name} wins!</b>`){
                    square.textContent=''; 
                }else{
                square.textContent=(game.activePlayer.marker);
                }
                square.setAttribute('data',game.activePlayer.marker);
                //update array value to be that of active player
                board[index] = game.activePlayer.marker;
                //remove event listener from the marked index
                square.style.pointerEvents = 'none';
                //update remaining spots
                game.remainingSpots -= 1;
                //check winner
                game.checkWinner();
                //check remaing spots
                if(game.winnerDeclared==false){
                    if(game.remainingSpots>0){
                        game.alertNextPlayer();
                        game.nextPlayer();
                    }else if(game.remainingSpots==0){
                        game.declareTie();
                    }
                }

            })
        });
        //return
        return {board};
    }
)();

//game object

const game = (()=>{

    //declare players
    const playerOne = createPlayer('Player 1(X)','X');
    const playerTwo = createPlayer('Player 2(O)','O');

    //starting point
    let activePlayer=playerOne;
    let winnerDeclared=false;
    let remainingSpots=9;

    //selectors
    let subtext = document.querySelector('.subtext'); //display winner/tie
    let playerName = document.querySelector('.player-name'); //purpose :alert player turn

    //winning conditions
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],

    ];

    function checkWinner(){
        winningAxes.forEach((item,index)=>{
            if(Gameboard.board[item[0]]===this.activePlayer.marker && Gameboard.board[item[1]]===this.activePlayer.marker && Gameboard.board[item[2]]===this.activePlayer.marker){
                console.log('winner!');
                subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
                
                
            }
        })
    }

    //alert next player
    function alertNextPlayer(){
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2(O)' : playerName.textContent = 'Player 1(X)';
    }

    //next player
    function nextPlayer(){
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    }

    //declare tie
    function declareTie(){
        subtext.innerHTML = '<b>Game Tie!<b>';
    }

    //return

    return{
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared,
        subtext,
    };

})();

