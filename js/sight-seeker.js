let score = 0;
let toggle = true;

const confirm = document.getElementById("confirmBtn");
const map = document.getElementById("campus");
const mappin = document.getElementById("mappin");
const pin = document.getElementById("pin");
const infoText = document.getElementById("txtInfo");



mappin.addEventListener('mousemove', function(e) {
    if (toggle) {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        let xPos = e.clientX - rect.left;
        let yPos = e.clientY - rect.top;
        infoText.innerText = `(${xPos}, ${yPos})`;
    } 
});

confirm.addEventListener("click", function(e) {
    console.log("Confirm Button Clicked");
    console.log(e);
});

