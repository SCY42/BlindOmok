let isWhiteTurn = true;
let isGameOver = false;
const container = document.getElementsByClassName("container")[0];
const board = document.getElementsByClassName("board")[0];
const showTurn = document.getElementsByClassName("show-turn")[0];
const endButton = document.getElementsByClassName("end-button")[0];
function doOmok(dol) {
    if (isWhiteTurn) {
        dol.classList.add("white");
    }
    else {
        dol.classList.add("black");
    }
    dol.classList.add("hidden");
}
function changeTurn() {
    isWhiteTurn = !isWhiteTurn;
    if (isWhiteTurn) {
        if (showTurn.getHTML() == "흑 차례" && showTurn.classList.contains("turn-black")) {
            showTurn.textContent = "백 차례";
            showTurn.classList.remove("turn-black");
            showTurn.classList.add("turn-white");
        }
        else {
            alert("Something's Wrong!");
        }
    }
    else {
        if (showTurn.getHTML() == "백 차례" && showTurn.classList.contains("turn-white")) {
            showTurn.textContent = "흑 차례";
            showTurn.classList.remove("turn-white");
            showTurn.classList.add("turn-black");
        }
        else {
            alert("Something's Wrong!");
        }
    }
}
function showBoard() {
    let hiddens = document.getElementsByClassName("hidden");
    [...hiddens].forEach((e) => {
        e.classList.remove("hidden");
    });
}
function resetBoard() {
    [...board.children].forEach((child) => {
        child.className = "dol";
    });
    let blacks = document.getElementsByClassName("black");
    let whites = document.getElementsByClassName("white");
    [...blacks, ...whites].forEach((e) => {
        e.remove();
    });
}
function endGame(button) {
    if (!isGameOver) {
        isGameOver = true;
        console.log("GAME OVER!");
        button.textContent = "재시작";
        board.classList.add("game-over");
        showBoard();
    }
    else {
        isGameOver = false;
        console.log("GAME RESTARTED!");
        button.textContent = "게임 종료";
        board.classList.remove("game-over");
        resetBoard();
    }
}
const dol = document.createElement("div");
dol.classList.add("dol");
for (let i = 0; i < 225; i++) {
    dol.id = i.toString();
    board.append(dol.cloneNode(true));
}
const line = document.createElement("div");
for (let i = 0; i < 15; i++) {
    line.className = "line-horizontal";
    line.style.marginTop = `calc(3vmin + ${6 * i}vmin - 1px)`;
    line.style.marginLeft = "0px";
    container.append(line.cloneNode(true));
    line.className = "line-vertical";
    line.style.marginTop = "0px";
    line.style.marginLeft = `calc(3vmin + ${6 * i}vmin - 1px)`;
    container.append(line.cloneNode(true));
}
board.addEventListener("click", (e) => {
    if (e.target == null || !(e.target instanceof Element)) {
        alert("Something's Wrong!");
        return;
    }
    if (e.target.classList.contains("dol")) {
        doOmok(e.target);
        isOmok(+e.target.id);
        changeTurn();
        e.target.classList.add("selected");
        e.preventDefault();
    }
});
board.addEventListener("mouseover", (e) => {
    if (e.target == null || !(e.target instanceof Element)) {
        alert("Something's Wrong!");
        return;
    }
    if (e.target.classList.contains("dol")) {
        e.target.classList.add("hover");
        e.preventDefault();
    }
});
board.addEventListener("mouseout", (e) => {
    if (e.target == null || !(e.target instanceof Element)) {
        alert("Something's Wrong!");
        return;
    }
    if (e.target.classList.contains("dol") && e.target.classList.contains("hover")) {
        e.target.classList.remove("hover");
        e.preventDefault();
    }
});
endButton.addEventListener("click", (e) => {
    if (e.target == null || !(e.target instanceof Element)) {
        alert("Something's Wrong!");
        return;
    }
    endGame(e.target);
});
