const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const container = document.getElementById("container");
const tableContainer = document.getElementById("tableContainer");
const easy = [1,2,3,4,1,2,3,4].sort(() => 0.5 - Math.random());
const medium = [1,2,3,4,5,6,1,2,3,4,5,6].sort(() => 0.5 - Math.random());
const hard = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8].sort(() => 0.5 - Math.random());

let counter = 0;
let firstId = "";
let firstChoice = 0;
let secondChoice = 0;

easyBtn.addEventListener("click", () => createBoard(easy));
mediumBtn.addEventListener("click", () => createBoard(medium));
hardBtn.addEventListener("click", () => createBoard(hard));

function createBoard(diff){

    container.textContent = "";

    let myTable = document.createElement("table");
    myTable.setAttribute("class", "table-bordered border-light");

    let myTbody = document.createElement("tbody");

    let idCounter = 0;

    for (let i = 0 ; i < diff.length/4 ; i++){
        let myRow = document.createElement("tr");
        for (let j = 0 ; j < 4; j++){
            let myColumn = document.createElement("th")
            myColumn.setAttribute("id", idCounter);
            myColumn.textContent = diff[idCounter];
            myColumn.addEventListener("click", play)
            myRow.append(myColumn);
            idCounter++;
        }
        myTbody.append(myRow);
    }
    myTable.append(myTbody);
    tableContainer.append(myTable);
}

async function play(){

    if (this.style.backgroundColor !== "goldenrod"){

        if (counter < 2) {

            let currentEl = this;
            currentEl.style.backgroundColor = "goldenrod";
            counter ++;

            if (counter === 1){
                firstChoice = currentEl.textContent;
                firstId = currentEl.getAttribute("id");
            }

            else if (counter === 2){
                secondChoice = currentEl.textContent;
                await sleep(500);

                if (firstChoice !== secondChoice){
                    currentEl.style.backgroundColor = "black";
                    document.getElementById(firstId).style.backgroundColor = "black";
                }
                counter = 0;
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}