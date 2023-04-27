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
const xWeights = [0.45, 0.45, 0.76, 0.44, 0.27];
const yWeights = [0.30, 0.20, 0.87, 0.86, 0.38];

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
    //Condition: If there are no more locations
    //In the future, will need to be changed since
    //I hope to randomize the order
    if (index < paths.length - 1) {
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
        adjustment = 100 * (1 - (distance/max));
        score += adjustment;
        textScore.innerText = "Score: " + Math.round(score);
    
        //Update Index and Image
        index++;
        currentImg.src = paths[index];
    }
});

//Gets Maximum Possible Error in a Guess (px)
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