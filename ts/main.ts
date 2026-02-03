let isWhiteTurn = true;
let isGameOver = false;

// const container = document.getElementsByClassName("container")[0];
const board = document.getElementsByClassName("board")[0];
const showTurn = document.getElementsByClassName("show-turn")[0];
const endButton = document.getElementsByClassName("end-button")[0];

// ╔════════════════════════════════════════════════════════════════════════╗ //
// ║                          function definitions                          ║ //
// ╚════════════════════════════════════════════════════════════════════════╝ //

function doOmok(dol: Element) {
    if (isWhiteTurn) {
        dol.classList.add("white");
    } else {
        dol.classList.add("black");
    } dol.classList.add("hidden");
}

function changeTurn() {
    isWhiteTurn = !isWhiteTurn
    
    if (isWhiteTurn) {
        if (showTurn.getHTML() == "흑 차례" && showTurn.classList.contains("turn-black")) {
            showTurn.textContent = "백 차례";
            showTurn.classList.remove("turn-black");
            showTurn.classList.add("turn-white");
        } else {
            alert("Something's Wrong!")
        }
    } else {
        if (showTurn.getHTML() == "백 차례" && showTurn.classList.contains("turn-white")) {
            showTurn.textContent = "흑 차례";
            showTurn.classList.remove("turn-white");
            showTurn.classList.add("turn-black");
        } else {
            alert("Something's Wrong!")
        }
    }
}

function showBoard() {
    let hiddens = document.getElementsByClassName("hidden");
    [...hiddens].forEach((e) => {
        e.classList.remove("hidden");
    })
}

function resetBoard() {
    // 돌 없애기
    let dols = document.getElementsByClassName("dol");
    [...dols].forEach((e) => {
        e.classList.remove("black");
        e.classList.remove("white");
        e.classList.remove("selected");
    })
}

function endGame(button: Element) {
    if (!isGameOver) {      // 게임을 끝내기 위해 버튼을 누름
        isGameOver = true;
        console.log("GAME OVER!")
        button.textContent = "재시작";
        board.classList.add("game-over");
        showBoard();
    } else {                // 판을 리셋하기 위해 버튼을 누름
        isGameOver = false;
        console.log("GAME RESTARTED!")
        button.textContent = "게임 종료";
        board.classList.remove("game-over");
        resetBoard();
    }
}

// ╔════════════════════════════════════════════════════════════════════════╗ //
// ║                            initialize board                            ║ //
// ╚════════════════════════════════════════════════════════════════════════╝ //

const dol = document.createElement("div");
dol.classList.add("dol")

for (let i = 0; i < 225; i++) {
    dol.id = i.toString();
    board.append(dol.cloneNode(true));
}

const line = document.createElement("div");
for (let i = 0; i < 15; i++) {
    line.className = "line-horizontal";
    line.style.marginTop = `calc(2.5vmin + ${5 * i}vmin - 1px)`;
    line.style.marginLeft = "0px";
    board.append(line.cloneNode(true));

    line.className = "line-vertical";
    line.style.marginTop = "0px"
    line.style.marginLeft = `calc(2.5vmin + ${5 * i}vmin - 1px)`
    board.append(line.cloneNode(true));
}

// ╔════════════════════════════════════════════════════════════════════════╗ //
// ║                            event listeners                             ║ //
// ╚════════════════════════════════════════════════════════════════════════╝ //

board.addEventListener("click", (e) => {
    if (e.target == null || !(e.target instanceof Element)) { alert("Something's Wrong!"); return; }
    
    if (e.target.classList.contains("dol")) {
        doOmok(e.target);   // 돌 놓기
        isOmok(+e.target.id);
        changeTurn();       // 턴 넘기기
        e.target.classList.add("selected"); // 놓은 칸 표시
        e.preventDefault();
    }
})

// 마우스 호버 시 하이라이트
board.addEventListener("mouseover", (e) => {
    if (e.target == null || !(e.target instanceof Element)) { alert("Something's Wrong!"); return; }
    
    if (e.target.classList.contains("dol")) {
        e.target.classList.add("hover");
        e.preventDefault();
    }
})

// 마우스 호버 종료 시 하이라이트 제거
board.addEventListener("mouseout", (e) => {
    if (e.target == null || !(e.target instanceof Element)) { alert("Something's Wrong!"); return; }
    
    if (e.target.classList.contains("dol") && e.target.classList.contains("hover")) {
        e.target.classList.remove("hover");
        e.preventDefault();
    }
})

// 게임 종료 버튼
endButton.addEventListener("click", (e) => {
    if (e.target == null || !(e.target instanceof Element)) { alert("Something's Wrong!"); return; }
    
    endGame(e.target);
})