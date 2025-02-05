let gameBox = document.querySelector("#gameBox");
let boxes = document.querySelector("#Boxes");
let firstColor = document.querySelector("#firstColor");
let secondColor = document.querySelector("#secondColor");
let thirdColor = document.querySelector("#thirdColor");
let score = document.querySelector("#scoreNumber");
let result = document.querySelector("#result");
let textWinLose = document.querySelector("#textWinLose");
let numClick = document.querySelector("#countClickNumber");

// tlačítko
let spinBtn = document.querySelector("#spinBtn");
let btnArrLeftPos = document.querySelector("#leftArrToRight");
let btnArrRightPos = document.querySelector("#rightArrToLeft");
let resetBtn = document.querySelector("#resetBtn");

// pole barev
const colors = ["red", "pink", "blue", "yellow", "purple", "orange"];

// funkce pro opakující se rotaci barev
let currentRotation = 0;
const rotate = () => {
  currentRotation = (currentRotation + 90) % 360;
  return `rotate(${currentRotation}deg)`;
};

// funkce pro pohyb šipek
const animateButton = () => {
  btnArrLeftPos.style.transition = "padding-left 0.5s ease-in";
  btnArrRightPos.style.transition = "padding-right 0.5s ease-in";

  btnArrLeftPos.style.paddingLeft = "20px";
  btnArrRightPos.style.paddingRight = "20px";

  setTimeout(() => {
    btnArrLeftPos.style.paddingLeft = "0px";
    btnArrRightPos.style.paddingRight = "0px";
  }, 400);
};

// restart hry
resetBtn.addEventListener("click", () => {
  location.reload();
});

//
// kliknutí na tlačítko pro změnu barev
//
spinBtn.addEventListener("click", () => {
  // animace klikacího tlačítka
  animateButton();

  // rotace barev ve čtvercích
  firstColor.style.transform = rotate();
  secondColor.style.transform = rotate();
  thirdColor.style.transform = rotate();

  // funkce pro generování barev
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  let randColor1 = getRandomColor();
  let randColor2 = getRandomColor();
  let randColor3 = getRandomColor();

  // přiřazení barev
  firstColor.style.backgroundColor = randColor1;
  secondColor.style.backgroundColor = randColor2;
  thirdColor.style.backgroundColor = randColor3;

  //
  // logika hry
  //
  // podmínky pro přičítání bodů
  if (
    randColor1 === randColor2 &&
    randColor2 === randColor3 &&
    randColor3 === randColor1
  ) {
    numClick.textContent++;
    score.textContent = parseInt(score.textContent) + 500;
  } else if (
    randColor1 === randColor2 ||
    randColor2 === randColor3 ||
    randColor3 === randColor1
  ) {
    numClick.textContent++;
    score.textContent = parseInt(score.textContent) + 200;
  } else {
    numClick.textContent++;
  }
  //
  // podmínky pro zobrazení výherního textu
  //
  if (
    // prohra
    parseInt(numClick.textContent) === 5 &&
    parseInt(score.textContent) < 600
  ) {
    setTimeout(() => {
      spinBtn.classList.add("invisible");
    }, 200);
    setTimeout(() => {
      textWinLose.textContent = "Prohra! :(";
      textWinLose.style.transition = "transform 0.9s";
      textWinLose.style.transform = "scale(1.3)";
      setTimeout(() => {
        textWinLose.style.transform = "scale(0)";
      }, 800);
    }, 500);
    setTimeout(() => {
      boxes.classList.add("invisible");
      resetBtn.classList.remove("invisible");
    }, 2000);
  } else if (
    // výhra
    parseInt(numClick.textContent) <= 5 &&
    parseInt(score.textContent) >= 600
  ) {
    setTimeout(() => {
      spinBtn.classList.add("invisible");
    }, 200);
    setTimeout(() => {
      textWinLose.textContent = "Výhra! :)";
      textWinLose.style.transition = "transform 0.9s";
      textWinLose.style.transform = "scale(.3)";
      setTimeout(() => {
        textWinLose.style.transform = "scale(1.3)";
      }, 800);
    }, 500);
    setTimeout(() => {
      boxes.classList.add("invisible");
      resetBtn.classList.remove("invisible");
    }, 2000);
  }
});
