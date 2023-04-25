//Variables
let score = 0;
let index = 0;
let xPos = 0;
let yPos = 0;
let guess = "";

//Elements
const confirm = document.getElementById("confirmBtn");
const map = document.getElementById("campus");
let pin = document.getElementById("pin");
const mappin = document.getElementById("mappin");
const infoText = document.getElementById("txtInfo");
const currentImg = document.getElementById("current-img");
let textScore = document.getElementById("score");

//Correct Answer Information
const paths = [
    "assets/img/mlc-back.jpg",
    "assets/img/founders-garden.jpg",
    "assets/img/jfh-commons.jpg"
];
//Percentages of width/height of map
const xWeights = [0.45, 0.45, 0.76];
const yWeights = [0.30, 0.20, 0.87];

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
    infoText.innerText = "(" + Math.round(xPos) + ", " + Math.round(yPos) + ")";
    //Log Details
    guess = "(" + xPos + ", " + yPos + ")";
    console.log("Pin placed at: " + guess);
});

//Submits the Guess when Confirm is Clicked
confirm.addEventListener("click", function(e) {
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
    let c2 = (differenceX * differenceX) + (differenceY * differenceY);
    let distance = Math.sqrt(c2);
    console.log("You were " + distance + " away");

    //Adjust and Update Score
    let adjustment = 0;
    let max = Math.sqrt(map.width * map.width + map.height * map.height)
    adjustment = 100 * (1 - (distance/max));
    score += adjustment;
    textScore.innerText = "Score: " + Math.round(score);

    //Update Index and Image
    index++;
    currentImg.src = paths[index];
});

