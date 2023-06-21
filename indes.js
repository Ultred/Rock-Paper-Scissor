const icons = document.querySelectorAll(".icon");
const showUserPick = document.getElementById("playerpick");
const showComputerPick = document.getElementById("computerpick");
const showResult = document.getElementById("resultOutput");
const showUserLives = document.getElementById("userLive");
const showComputerLives = document.getElementById("computerLive");
const endgameText = document.getElementById("endgameText");
const showVS = document.getElementById("VS");
const showLast = document.querySelector(".endgame");
let userLives = 5;
let computerLives = 5;
let isGameOver = false;

const getComputerPick = () => {
  const randomNum = generateRandomNum();
  const iconClasses = {
    rock: "fa-hand-back-fist",
    paper: "fa-hand",
    scissor: "fa-hand-scissors",
  };
  const computerPick = Object.keys(iconClasses)[randomNum - 1];
  showComputerPick.innerHTML = `<i class="fa-solid ${iconClasses[computerPick]} fa-beat icon"></i>`;
  return computerPick;
};

const handleIconClick = (userPick) => {
  if (isGameOver) {
    return; // Do nothing if the game is over
  }
  const iconClasses = {
    rock: "fa-hand-back-fist",
    paper: "fa-hand",
    scissor: "fa-hand-scissors",
  };
  showUserPick.innerHTML = `<i class="fa-solid ${iconClasses[userPick]} fa-beat icon"></i>`;
  showVS.innerHTML = "<h1>VS</h1>";
  const computerPick = getComputerPick();

  if (userPick === computerPick) {
    showResult.innerHTML = "<h1>DRAW</h1>";
  } else if (
    (userPick === "rock" && computerPick === "paper") ||
    (userPick === "scissor" && computerPick === "rock") ||
    (userPick === "paper" && computerPick === "scissor")
  ) {
    showResult.innerHTML = "<h1>Computer Win</h1>";
    updateUserLives();
  } else {
    updateComputerLives();
    showResult.innerHTML = "<h1>You Win</h1>";
  }
};

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icons.forEach((icon) => {
      icon.classList.remove("clicked");
    });
    const userPick = icon.id;
    icon.classList.add("clicked");
    handleIconClick(userPick);
  });
});

const generateRandomNum = () => {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  return randomNum;
};

const updateUserLives = () => {
  userLives--;
  showUserLives.innerHTML = userLives;
  if (userLives === 0) {
    isGameOver = true;
    icons.forEach((icon) => {
      icon.removeEventListener("click", handleIconClick);
    });
    endgameText.innerHTML = "<h2>Game Over</h2>";
    showLast.classList.add("last");
  }
};

const updateComputerLives = () => {
  computerLives--;
  showComputerLives.innerHTML = computerLives;
  if (computerLives === 0) {
    isGameOver = true;
    icons.forEach((icon) => {
      icon.removeEventListener("click", handleIconClick);
    });
    endgameText.innerHTML = "<h2>You Win</h2>";
    showLast.classList.add("last");
  }
};
