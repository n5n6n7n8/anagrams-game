import jsonData from "./words_dictionary.json" with { type: 'json' };

let testbox = document.getElementById("Text");
let letters = ["R","S","T","A","E","C"];

document.addEventListener("keydown", (e) => {

        // if (guessesRemaining === 0) {
        //     return;
        // }
        let pressedKey = String(e.key);
        if (pressedKey === "Backspace") {
            testbox.textContent = testbox.textContent.slice(0, -1);
            console.log("deleted");
            return;
        }

        if (pressedKey === "Enter") {
            console.log("submitted")
            testbox.textContent += "\n";
            return;
        }
        let found = pressedKey.match(/[a-z]/gi)
        if (!found || found.length > 1) {
            console.log("invalid key")
            return;
        } 
        else {
            console.log("added" + pressedKey);
            testbox.textContent += pressedKey;
        }
})

if(jsonData.find(word => word === "cat")) {
    console.log("found cat");
}