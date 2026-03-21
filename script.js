import {newwordlist} from './newwordlist.js';

let d = new Date();
let t = d.getTime();
let days = Math.floor(t / (3600000)) - 8; //Get in hour time change from utc to pacific
days = Math.floor(days/24);//Divide for days
days -= 20454; //Represents days since Jan 1 2025. Used to distinguish time when getting words from Google Sheets

const randomLetters = true;

let testbox = document.getElementById("Text");
let foundbox = document.getElementById("found");
let letterbox = document.getElementById("letters");
let letters = ["R","S","T","A","E","C"];
let foundwords = [""];

let lettersString = "";
let numLetters = 0;


const sheetId = "1pd-XJZCpMlxXAOCWehDC1ekeCetzY0tRnnzfrJPkc_g";
const sheetName = encodeURIComponent("LetterDataSheet");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
fetch(sheetURL)
  .then((response) => response.text())
  .then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
    if(localStorage.getItem("lastCompleted")!=days.toString()){
        let sheetObjects = csvToObjects(csvText);
        // sheetObjects is now an Array of Objects
        lettersString = sheetObjects[days]["LETTERS"];
        numLetters = sheetObjects[days]["NUMBEROFLETTERS"];
        setUpGame();
        
        console.log("Finished loaing spreadsheets");
        console.log(lettersString)
    }
}
function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    for (let i = 1, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvSplit(csvRows[i]);
      for (let j = 0, max = row.length; j < max; j++) {
        thisObject[propertyNames[j]] = row[j];
      }
      objects.push(thisObject);
    }
    return objects;
}
  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
}





// Example usage
function setUpGame(){
    if(randomLetters){
        for(let i = 0; i < 6; i++){
            let toAdd = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            while(letters.includes(toAdd)){
                toAdd = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
            letters[i] = toAdd;
        }   
    }
    letterbox.textContent = "letters: ";
    for (let i = 0; i < letters.length; i++){
        letterbox.textContent += letters[i] + " ";
    }
}


function findWord(str){
    return newwordlist.includes(str);
}
console.log("ef");
document.addEventListener("keydown", (e) => {

        // if (guessesRemaining === 0) {
        //     return;
        // }
        let pressedKey = String(e.key);
        if (pressedKey === "Backspace") {
            testbox.textContent = testbox.textContent.slice(0, -1);
            return;
        }

        if (pressedKey === "Enter") {
            if(!foundwords.includes(testbox.textContent) && isInLetters(testbox.textContent) && findWord(testbox.textContent)) {
                foundbox.textContent += testbox.textContent + ", ";
                foundwords.push(testbox.textContent);
            }
            else{
                console.log("not found");
            }
            testbox.textContent = "";
            return;
        }
        let found = pressedKey.match(/[a-z]/gi)
        if (!found || found.length > 1) {
            console.log("invalid key")
            return;
        } 
        else {
            testbox.textContent += pressedKey;
        }
})

function isInLetters(s){
    const sarray = s.split('');
    for(let i = 0; i < sarray.length; i++){
        if(!letters.includes(sarray[i].toUpperCase())){
            return false;
        }
    }
    return true;
}

