import { io } from "socket.io-client"

const socket = io();
let roomUniqueId = null;
let player1 = false;

// function createGame() {
//   player1 = true;
//   socket.emit("createGame");
// }

// function joinGame() {
//   roomUniqueId = document.getElementById("roomUniqueId").value;
//   socket.emit("joinGame", { roomUniqueId });
// }

socket.on("newGame", (data) => {
  roomUniqueId = data.roomUniqueId;
  document.getElementById("initial").style.display = "none";
  document.getElementById("gamePlay").style.display = "block";
  const copyButton = document.createElement("button");
  copyButton.style.display = "block";
  copyButton.innerText = "Copy code";
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(roomUniqueId).then(
      () => console.log("Copied to clipboard"),
      (err) => {
        console.log("Could not copy text: ", err);
      }
    );
  });
  document.getElementById(
    "waitingArea"
  ).innerHTML = `Waiting for an opponent, pease share code ${roomUniqueId} to join`;
  document.getElementById("waitingArea").appendChild(copyButton);
});

socket.on("playersConnected", () => {
  document.getElementById("initial").style.display = "none";
  document.getElementById("waitingArea").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
});

// socket.on("p1Choice", (data) => {
//   if (!player1) {
//     createOpponentChoiceButton(data);
//   }
// });

// socket.on("p2Choice", (data) => {
//   if (player1) {
//     createOpponentChoiceButton(data);
//   }
// });

socket.on("result", (data) => {
  let winnerText = "";

  if (data.winner !== "d") {
    if (data.winner === "p1" && player1) {
      winnerText = "You win";
    } else if (data.winner === "p1") {
      winnerText = "You lose";
    } else if (data.winner === "p2" && !player1) {
      winnerText = "You win";
    } else if (data.winner === "p2") {
      winnerText = "You lose";
    }
  } else {
    winnerText = `It's a draw`;
  }

  document.getElementById("opponentState").style.display = "none";
  document.getElementById("opponentButton").style.display = "block";
  document.getElementById("winnerArea").innerText = winnerText;
});

// function sendChoice(rspValue) {
//   const choiceEvent = player1 ? "p1Choice" : "p2Choice";
//   socket.emit(choiceEvent, {
//     rspValue: rspValue,
//     roomUniqueId: roomUniqueId,
//   });

//   let playedChoiceButton = document.createElement("button");
//   playedChoiceButton.style.display = "block";
//   playedChoiceButton.innerText = rspValue;
//   document.getElementById("player1Choice").innerHTML = "";
//   document.getElementById("player1Choice").appendChild(playedChoiceButton);
// }

// function createOpponentChoiceButton(data) {
//   document.getElementById("opponentState").innerHTML = "Opponent made a choice";
//   const opponentButton = document.createElement("button");
//   opponentButton.id = "opponentButton";
//   opponentButton.style.display = "none";
//   opponentButton.innerText = data.rspValue;
//   document.getElementById("player2Choice").appendChild(opponentButton);
// }
