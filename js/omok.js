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
    Direction[Direction["UpLeft"] = -16] = "UpLeft";
})(Direction || (Direction = {}));
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color || (Color = {}));
const Directions = [Direction.Up, Direction.UpRight, Direction.Right, Direction.DownRight];
const CounterDirections = [Direction.Down, Direction.DownLeft, Direction.Left, Direction.UpLeft];
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
    for (let i = 0; i < 4; i++) {
        let combo = countCombo(currentIdx, Directions[i], 0);
        let counterCombo = countCombo(currentIdx, CounterDirections[i], 0);
        combo = combo + counterCombo + 1;
        console.log(currentIdx.toString() + "번 칸의 콤보 " + i.toString() + ": " + combo.toString());
        if (combo >= 5) {
            const button = document.getElementsByClassName("end-button")[0];
            if (button == null) {
                alert("Something's Wrong!");
                return true;
            }
            endGame(button);
            return;
        }
    }
    function countCombo(idx, dir, currentCombo) {
        let nextIdx = idx + dir;
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
            return countCombo(nextIdx, dir, currentCombo);
        }
        else {
            return currentCombo;
        }
    }
}
