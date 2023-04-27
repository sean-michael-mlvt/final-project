//Variables
let score = 0;    //Total Score
let index = 0;    //Location Number
let xPos = 0;     //X Coordinate of Guess
let yPos = 0;     //Y Coordinate of Guess (from top)
let correctX = 0; //X Coordinate of Current Location
let correctY = 0; //Y Coordinate of Current Location
let guess = "";   //String to display each guess
//State variable meant to mimic enums
let state = "GUESSING"; //State of Game: GUESSING or CHECKING

//Elements
const confirm = document.getElementById("confirmBtn");
let confirmText = document.getElementById("confirm-txt");
const map = document.getElementById("campus");
let pin = document.getElementById("pin");
const mappin = document.getElementById("mappin");
const infoText = document.getElementById("txtInfo");
const currentImg = document.getElementById("current-img");
let textScore = document.getElementById("score");
let flag = document.getElementById("flag");
flag.style.display = "none";

//Correct Answer Information
//Image Source Paths
const paths = [
    "assets/img/mlc-back.jpg",
    "assets/img/founders-garden.jpg",
    "assets/img/jfh-commons.jpg",
    "assets/img/driftmier.jpg",
    "assets/img/bdm-hall.jpg",
    "assets/img/the-end.jpg"
];
//Percentages of width/height of map for locations
const xWeights = [0.45, 0.45, 0.77, 0.45, 0.255];
const yWeights = [0.30, 0.20, 0.88, 0.86, 0.375];

console.log(map.width);
console.log(map.height);

//Drops the Pin when the map div is clicked.
mappin.addEventListener('click', function(e) {
    
    //Get Mouse Relative Location
    const target = e.target;
    const rect = target.getBoundingClientRect();
    xPos = e.clientX - rect.left;
    yPos = e.clientY - rect.top;
    //Move Pin (Point)
    pin.style.top = (yPos - 42) + "px";
    pin.style.left = (xPos - 14) + "px";
    

    //Display Coordinates
    guess = "(" + Math.round(xPos) + ", " + Math.round(yPos) + ")";
    //Log Details
    infoText.innerText = guess;
    console.log("Pin placed at: " + guess);
});

//Submits the Guess when Confirm is Clicked
//Shows correct answer when Next is Clicked
confirm.addEventListener("click", function(e) {
    //Condition: Next or Confirm State?
    if (state === "GUESSING") {
        points = submitGuess();
        showAnswer(points);
        switchToChecking();
    } else if (state === "CHECKING") {
        switchToGuessing();
    }
});

//Gets Maximum Possible Error for current location (px)
//CX CY = correctX/Y
function getMax() {
    const CX = xWeights[index];
    const CY = yWeights[index];
    let sideX = 0;
    let sideY = 0;
    if (CX >= 0.5 && CY >= 0.5) {
        //Calc From Top Left
        sideX = (map.width * CX);
        sideY = (map.height * CY);
    } else if (CX < 0.5 && CY>= 0.5) {
        //Calc From Top Right
        sideX = (map.width * (1 - CX));
        sideY = (map.height * CY);
    } else if (CX < 0.5 && CY < 0.5) {
        //Calc From Bottom Right
        sideX = (map.width * (1 - CX));
        sideY = (map.height * (1 - CY));
    } else if (CX >= 0.5 && CY < 0.5) {
        //Calc from Bottom Left
        sideX = (map.width * CX);
        sideY = (map.height * (1 - CY));
    }
    return pythagorean(sideX, sideY);
} //getMax

//Finds the diagonal of the right triangle with
//side lengths a and b
function pythagorean(a, b) {
    let cSquared = (a * a) + (b * b);
    return Math.sqrt(cSquared);
} //pythagorean

//SUBMITS A GUESS AND UPDATES TOTAL SCORE
function submitGuess() {
    //Log Guess
    console.log("Confirm Button Clicked");
    console.log("Guess: " + guess);
    //Calculate Correct Answer
    correctX = map.width * xWeights[index];
    correctY = map.height * yWeights[index];
    console.log("Correct (" + correctX + ", " + correctY + ")" );

    //Calculate Distance From Guess to Answer
    let differenceX = Math.abs(xPos - correctX);
    let differenceY = Math.abs(yPos - correctY);
    let distance = pythagorean(differenceX, differenceY);
    console.log("You were " + distance + " away");

    //Adjust and Update Score
    let adjustment = 0;
    //Deprecated Max Calculation:
    /*let max = Math.sqrt(map.width * map.width + map.height * map.height);*/
    let max = 5 + getMax();
    if (distance < 5) {
        adjustment = 100;
    } else {
        adjustment = 100 * (1 - (distance/max));
    }
    score += adjustment;
    textScore.innerText = "Score: " + Math.round(score);

    //Update Index and Image
    index++;

    return adjustment;
} //submitGuess

//Shows where the correct answer was
function showAnswer(points) {
    flag.style.top = (correctY - 46) + "px";
    flag.style.left = (correctX - 8) + "px";
    flag.style.display = '';
    infoText.innerText = "+" + Math.round(points) + "!";
} //showAnswer

function switchToChecking() {
    confirmText.innerText = "Next";
    state = "CHECKING";
    
}

function switchToGuessing() {
    flag.style.display = "none";
    currentImg.src = paths[index];
    infoText.innerText = guess;
    confirmText.innerText = "Confirm Guess";
    state = "GUESSING";

    //If locations exhausted -> Disable Button
    if (index === paths.length - 1) {
        confirm.disabled = true;
        console.log("Confirm Disabled");
    }
}