const array = new Array(9).fill(null);
let turno = "X";
let win = false;

const positionsWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function verifyWin(items) {
  for (let i = 0; i < positionsWins.length; i++) {
    const [a, b, c] = positionsWins[i];
    if (array[a] && array[a] === array[b] && array[a] === array[c]) {
      win = true;
      positionsWins[i].forEach((num) => {
        items[num].classList.add("animation-win");
      });
    }
  }
  if (!array.includes(null) && !win) {
    items.forEach((element) => {
      element.classList.add("animation-win");
    });
  }
}

function playerGame(inx, items) {
  if (!win) {
    if (array[inx] == null) {
      array[inx] = turno;
      items[inx].classList.add(turno == "X" ? "cross" : "circle");

      verifyWin(items);
      turno = turno == "X" ? "O" : "X";
    }
  }
}

function createSquare() {
  const square = document.createElement("button");
  square.classList.add("item");
  return square;
}

function startGame() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createSquare());
  }

  contentGames.appendChild(fragment);
  const items = document.querySelectorAll(".item");
  items.forEach((element, inx) => {
    element.addEventListener("click", () => {
      playerGame(inx, items);
    });
  });

  reset.addEventListener("click", () => resetGame(items));
}

function resetGame(items) {
  if (array.includes("X") || array.includes("O")) {
    array.fill(null);
    items.forEach((element) => {
      contentGames.removeChild(element);
    });
    win = false
    return startGame();
  }
}

window.onload = startGame();
