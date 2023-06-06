const boardAreas = document.querySelectorAll("#board div");
let virtualBoard = [];
let turnPlayer = "";

function updateTitle() {
  const Player = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = "Vez de:" + Player.value;
}

function initGame() {
  turnPlayer = "player1";
  virtualBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  document.getElementsByClassName("h2").innerText = "";
  updateTitle();

  boardAreas.forEach(function (element) {
    element.classList.remove("Win");
    element.innerText = "";
    element.addEventListener("click", handleBoardClick);
  });
}

function handleWin(area) {
  area.forEach(function (area) {
    document.querySelector('[data-area ="' + area + '"]').classList.add("Win");
  });

  const Playername = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerText = Playername + " Venceu";
}

function getWinRegions() {
  const winRegions = [];

  if (
    virtualBoard[0][0] &&
    virtualBoard[0][0] === virtualBoard[0][1] &&
    virtualBoard[0][0] === virtualBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    virtualBoard[1][0] &&
    virtualBoard[1][0] === virtualBoard[1][1] &&
    virtualBoard[1][0] === virtualBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    virtualBoard[2][0] &&
    virtualBoard[2][0] === virtualBoard[2][1] &&
    virtualBoard[2][0] === virtualBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    virtualBoard[0][0] &&
    virtualBoard[0][0] === virtualBoard[1][0] &&
    virtualBoard[0][0] === virtualBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    virtualBoard[0][1] &&
    virtualBoard[0][1] === virtualBoard[1][1] &&
    virtualBoard[0][1] === virtualBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    virtualBoard[0][2] &&
    virtualBoard[0][2] === virtualBoard[1][2] &&
    virtualBoard[0][2] === virtualBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    virtualBoard[0][0] &&
    virtualBoard[0][0] === virtualBoard[1][1] &&
    virtualBoard[0][0] === virtualBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    virtualBoard[0][2] &&
    virtualBoard[0][2] === virtualBoard[1][1] &&
    virtualBoard[0][2] === virtualBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

//remove o eventListener e o cursor
function disableArea(element) {
  element.style.cursor = "default";
  element.removeEventListener("click", handleBoardClick);
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const area = span.dataset.area; // N.N
  const rowColumnPair = area.split("."); // ["N", "N"]
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];

  if (turnPlayer === "player1") {
    span.innerText = "X";
    virtualBoard[row][column] = "X";
  } else if (turnPlayer === "player2") {
    span.innerText = "O";
    virtualBoard[row][column] = "O";
  }

  console.clear();
  console.table(virtualBoard);

  disableArea(span);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (virtualBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.getElementById("turnPlayer").innerHTML = "Empate";
  }
}

document.getElementById("start").addEventListener("click", initGame);
