import { images, imgIncognite } from "./images.js";
let selected = [];
let guessed = [];
const numSquare = 16;
const fragment = document.createDocumentFragment();

//memoTestContent es un id, por lo tanto se esta usando de manera directa.

let imagesNew = images
  .flatMap((image) => [image, image])
  .sort(() => Math.random() - 0.5);

function startGame() {
  for (let i = 0; i < numSquare; i++) {
    fragment.appendChild(createSquare());
  }

  memoTestContent.appendChild(fragment);

  const squares = document.querySelectorAll(".squares");

  squares.forEach((ele, inx) =>
    ele.addEventListener("click", () => {
      selectedSquare({ index: inx, squares });
    })
  );

  buttonRestar.addEventListener("click", () => {
    restarGame(squares);
  });
}

function restarGame(squares, isWin = false) {
  if (guessed.length > 0) {
    if (guessed.length !== imagesNew.length)
      squares.forEach((ele, inx) => {
        ele.style.background = `url(${imagesNew[inx]})`;
        backgroundArrangement(inx, squares);
      });

    setTimeout(
      () => {
        squares.forEach((ele) => {
          memoTestContent.removeChild(ele);
        });
        selected = [];
        guessed = [];
        startGame();
        modalWin.style.display = "none";
      },
      isWin ? 0 : 2000
    );
  } else {
    error.style.display = "block";
    setTimeout(() => {
      error.style.display = "none";
    }, 2000);
  }
}

function backgroundArrangement(inx, squares, isIncognito = false) {
  squares[inx].style.background = `url(${
    isIncognito ? imgIncognite : imagesNew[inx]
  })`;
  squares[inx].style.backgroundSize = "cover";
  squares[inx].style.backgroundPosition = "center";
}

function validateGame(squares) {
  if (guessed.length === squares.length) {
    modalWin.style.display = "flex";
    buttonRestarModal.addEventListener("click", () =>
      restarGame(squares, true)
    );
  }
}

function selectedSquare({ index, squares }) {
  if (selected.includes(index) || guessed.includes(index)) return;
  selected.push(index);
  if (selected.length > 2) return;

  backgroundArrangement(index, squares);

  if (selected.length == 2) {
    if (imagesNew[selected[0]] == imagesNew[selected[1]]) {
      selected.map((inx) => guessed.push(inx));
      selected = [];
    } else {
      setTimeout(() => {
        selected.forEach((inx) => {
          backgroundArrangement(inx, squares, true);
          selected = [];
        });
      }, 800);
    }
  } else {
    backgroundArrangement(index, squares);
  }

  validateGame(squares);
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("squares");
  square.style.background = `url(${imgIncognite})`;
  square.style.backgroundSize = "cover";
  square.style.backgroundPosition = "center";
  return square;
}

window.onload = startGame();
