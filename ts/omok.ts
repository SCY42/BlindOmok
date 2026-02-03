const FIRST = 0, LAST = 224, BOARD_LENGTH = 15;

enum Direction {
    Up = -BOARD_LENGTH,
    UpRight = -BOARD_LENGTH + 1,
    Right = 1,
    DownRight = BOARD_LENGTH + 1,
    Down = BOARD_LENGTH,
    DownLeft = BOARD_LENGTH - 1,
    Left = -1,
    UpLeft = -BOARD_LENGTH - 1
}

enum Color {
    Black = 0,
    White = 1
}

const Directions = [Direction.Up, Direction.UpRight, Direction.Right, Direction.DownRight]
const CounterDirections = [Direction.Down, Direction.DownLeft, Direction.Left, Direction.UpLeft]

function isOmok(currentIdx: number) {
    const currentDol = document.getElementById(currentIdx.toString())
    if (currentDol == null) { alert("Something's Wrong!"); return; }

    let color: Color;

    if (currentDol.classList.contains("black")) {
        color = Color.Black;
    } else { color = Color.White; }

    for (let i = 0; i < 4; i++) {
        let combo: number = countCombo(currentIdx, Directions[i], 0);
        let counterCombo: number = countCombo(currentIdx, CounterDirections[i], 0)
        
        combo = combo + counterCombo + 1
        console.log(currentIdx.toString() + "번 칸의 콤보 " + i.toString() + ": " + combo.toString())

        if (combo >= 5) {
            const button = document.getElementsByClassName("end-button")[0];
            if (button == null) { alert("Something's Wrong!"); return true; }
            endGame(button);
            return;
        }
    }

    function countCombo(idx: number, dir: Direction, currentCombo: number): number {
        // 돌이 보드 내에 있는지 검사
        let nextIdx = idx + dir;
        if (nextIdx < FIRST || LAST < nextIdx) { return currentCombo; }
        
        // 돌이 null이 아닌지 검사 (null일 시 경고)
        let nextDol = document.getElementById((nextIdx).toString());
        if (nextDol == null) { alert("Something's Wrong!"); return currentCombo; }

        let colorString = color == Color.Black ? "black" : "white";

        if (nextDol.classList.contains(colorString)) {  // 콤보
            // 콤보 카운트를 증가시키고 재귀적으로 콤보 검사
            currentCombo++;
            return countCombo(nextIdx, dir, currentCombo);
        } else {                                        // 콤보 아님
            // 루프 종료
            return currentCombo;
        }
    }
}