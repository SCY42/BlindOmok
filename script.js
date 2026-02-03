define("omok", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isOmok = isOmok;
    const FIRST = 0, LAST = 224, BOARD_LENGTH = 15;
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = -15] = "Up";
        Direction[Direction["UpRight"] = -14] = "UpRight";
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["DownRight"] = 16] = "DownRight";
        Direction[Direction["Down"] = 15] = "Down";
        Direction[Direction["DownLeft"] = 14] = "DownLeft";
        Direction[Direction["Left"] = -1] = "Left";
        Direction[Direction["UpLeft"] = 14] = "UpLeft";
    })(Direction || (Direction = {}));
    var Color;
    (function (Color) {
        Color[Color["Black"] = 0] = "Black";
        Color[Color["White"] = 1] = "White";
    })(Color || (Color = {}));
    const Directions = [Direction.Up, Direction.UpRight, Direction.Right, Direction.DownRight,
        Direction.Down, Direction.DownLeft, Direction.Left, Direction.UpLeft];
    function isOmok(currentIdx) {
        const currentDol = document.getElementById(currentIdx.toString());
        if (currentDol == null) {
            alert("Something's Wrong!");
            return;
        }
        let color;
        if (currentDol.classList.contains("black")) {
            color = Color.Black;
        }
        else {
            color = Color.White;
        }
        Directions.forEach((dir) => {
            let combo = countCombo(dir, 0);
            console.log(dir.toString() + " 방향 콤보: " + combo.toString());
        });
        function countCombo(dir, currentCombo) {
            let nextIdx = currentIdx + dir;
            if (nextIdx < FIRST || LAST < nextIdx) {
                return currentCombo;
            }
            let nextDol = document.getElementById((nextIdx).toString());
            if (nextDol == null) {
                alert("Something's Wrong!");
                return currentCombo;
            }
            let colorString = color == Color.Black ? "black" : "white";
            if (nextDol.classList.contains(colorString)) {
                currentCombo++;
                return countCombo(dir, currentCombo);
            }
            else {
                return currentCombo;
            }
        }
    }
});
define("main", ["require", "exports", "omok"], function (require, exports, omok_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let isWhiteTurn = true;
    let isGameOver = false;
    const board = document.getElementsByClassName("board")[0];
    const div = document.createElement("div");
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
            showBoard();
            button.textContent = "재시작";
        }
        else {
            isGameOver = false;
            button.textContent = "게임 종료";
            resetBoard();
        }
    }
    div.classList.add("dol");
    for (let i = 0; i < 225; i++) {
        div.id = i.toString();
        board.append(div.cloneNode(true));
    }
    board.addEventListener("click", (e) => {
        if (e.target == null || !(e.target instanceof Element)) {
            alert("Something's Wrong!");
            return;
        }
        if (e.target.classList.contains("dol")) {
            doOmok(e.target);
            (0, omok_1.isOmok)(+e.target.id);
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
});
