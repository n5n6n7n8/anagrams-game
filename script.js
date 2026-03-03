import {newwordlist} from './newwordlist.js';

const randomLetters = true;

let testbox = document.getElementById("Text");
let foundbox = document.getElementById("found");
let letterbox = document.getElementById("letters");
let letters = ["R","S","T","A","E","C"];
let foundwords = [""];


setUpGame();
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

