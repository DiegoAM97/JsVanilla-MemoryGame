const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const container = document.getElementById("container");
const tableContainer = document.getElementById("tableContainer");
const easy = [1,2,3,4,1,2,3,4].sort(() => 0.5 - Math.random());
const medium = [1,2,3,4,5,6,1,2,3,4,5,6].sort(() => 0.5 - Math.random());
const hard = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].sort(() => 0.5 - Math.random());

let numberBoxSelected = 0;
let firstId = 0;
let firstChoice = 0;
let start = false;
let interval;

easyBtn.addEventListener("click", () => createBoard(easy));
mediumBtn.addEventListener("click", () => createBoard(medium));
hardBtn.addEventListener("click", () => createBoard(hard));

function createBoard(diff){

    let counter = 0;
    container.textContent = "";

    let myPlayButton = document.createElement("button");
    myPlayButton.setAttribute("class", "btn btn-dark btn-lg");
    myPlayButton.textContent = "Play";
    myPlayButton.addEventListener("click", () => {
        if(!start){
            interval = setInterval(() => {
                            counter++;
                            myCounter.textContent = "Time: " + counter;
                        }, 1000);
            start = true;
            myPlayButton.textContent = "Pause";
        } else {
            clearInterval(interval);
            start = false;
            myPlayButton.textContent = "Resume";
        }
    });

    let myCounter = document.createElement("h2");
    myCounter.textContent = "Time: " + counter;

    let myTable = document.createElement("table");
    myTable.setAttribute("class", "table-bordered border-light");

    let myTbody = document.createElement("tbody");

    let idIncrement = 0;

    for (let i = 0 ; i < diff.length/4 ; i++){
        let myRow = document.createElement("tr");
        for (let j = 0 ; j < 4; j++){
            let myColumn = document.createElement("th")
            myColumn.setAttribute("id", idIncrement);
            myColumn.setAttribute("class", diff[idIncrement]);
            myColumn.addEventListener("click", play)
            myRow.append(myColumn);
            idIncrement++;
        }
        myTbody.append(myRow);
    }
    myTable.append(myTbody);
    tableContainer.append(myPlayButton);
    tableContainer.append(myCounter);
    tableContainer.append(myTable);
}

async function play(){

    if (this.style.backgroundColor !== "goldenrod" && start){

        if (numberBoxSelected < 2) {

            let currentEl = this;
            currentEl.style.backgroundColor = "goldenrod";
            currentEl.textContent = currentEl.getAttribute("class");
            numberBoxSelected ++;

            if (numberBoxSelected === 1){
                firstChoice = currentEl.textContent;
                firstId = currentEl.getAttribute("id");
            }

            else if (numberBoxSelected === 2){
                const secondChoice = currentEl.textContent;
                await sleep(500);

                if (firstChoice !== secondChoice){
                    currentEl.style.backgroundColor = "black";
                    currentEl.textContent = "";
                    document.getElementById(firstId).style.backgroundColor = "black";
                    document.getElementById(firstId).textContent = "";
                }
                numberBoxSelected = 0;
            }
        }
    }
}

// another way to add events to new elements (IF addEventListener not added on the element creation)
// getElementById is optional
/*
document.getElementById("tableContainer").addEventListener("click",  async function(e){

    if (e.target.nodeName === "TH" && 
        document.getElementById(e.target.id).style.backgroundColor !== "goldenrod"
        && start){

        if (numberBoxSelected < 2) {

            let currentEl = document.getElementById(e.target.id);
            currentEl.style.backgroundColor = "goldenrod";
            currentEl.textContent = currentEl.getAttribute("class");
            numberBoxSelected ++;

            if (numberBoxSelected === 1){
                firstChoice = currentEl.textContent;
                firstId = e.target.id;
            }

            else if (numberBoxSelected === 2){
                const secondChoice = currentEl.textContent;
                await sleep(550);

                if (firstChoice !== secondChoice){
                    currentEl.style.backgroundColor = "black";
                    currentEl.textContent = "";
                    document.getElementById(firstId).style.backgroundColor = "black";
                    document.getElementById(firstId).textContent = "";
                }
                numberBoxSelected = 0;
            }
        }
    }
});
*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}