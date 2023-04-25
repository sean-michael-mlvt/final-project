let score = 0;
let toggle = true;
let xPos = 0;
let yPos = 0;
let guess = "";

const confirm = document.getElementById("confirmBtn");
const map = document.getElementById("campus");
let pin = document.getElementById("pin");
const mappin = document.getElementById("mappin");
const infoText = document.getElementById("txtInfo");

console.log(pin);

//Drops the Pin when the map div is clicked.
mappin.addEventListener('click', function(e) {
    
    const target = e.target;
    const rect = target.getBoundingClientRect();
    xPos = e.clientX - rect.left;
    yPos = e.clientY - rect.top;
    pin.style.top = (yPos - 42) + "px";
    pin.style.left = (xPos - 14) + "px";
    infoText.innerText = `(${xPos}, ${yPos})`;
    guess = "(" + xPos + ", " + yPos + ")";
    console.log("Pin placed at: " + guess);
});

//Submits the Guess
confirm.addEventListener("click", function(e) {
    console.log("Confirm Button Clicked");
    console.log("Guess: " + guess);
});

