const winnum = 20; //100 is too big, my CPU dies :<

//Change to 0 if you want AI to start
let lastTurn = 1; //0 - ai, 1- human

let over = false;

let number = 0;

function updateNumber() {
    document.getElementById('number').innerText = number;
}

function updateInfo(info) {
    document.getElementById('info').innerText = info;
}

function turn(num, player) {
    number += num;
    updateNumber();

    if(number >= winnum) {
        updateInfo((lastTurn === 0 ? "AI" : "Player") + " won with last move of " + num);
        over = true;
        return;
    }
    if(player === 0)
        updateInfo("AI moved " + num);

    if(player === 0) lastTurn = 1;
    else if (player === 1) lastTurn = 0;
}

function onClick(num) {
    if(!over)
        turn(num, 1);

    if(!over)
        aiMove();
}

function aiMove() {
    turn(minimax(number, 0).added, 0);
}

function minimax(newNum, player) {
    if(newNum >= winnum) {
        if (player === 1)
            return {score: 10};
        if (player === 0)
            return {score: -10};
    }

    let moves = [];
    for(let i = 1; i < 10; i++) {
        let move = {};
        move.lastNum = newNum;
        move.added = i;
        newNum += i;

        if(player === 0) { // AI
            let result = minimax(newNum, 1);
            move.score = result.score;
        } else { // Human
            let result = minimax(newNum, 0);
            move.score = result.score;
        }

        newNum = move.lastNum;

        moves.push(move);
    }

    let bestMove;
    if(player === 0 ) { // AI
        let bestScore = -100000;
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else { // Human
        let bestScore = 100000;
        for (let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

if(lastTurn === 0) {
    aiMove();
}