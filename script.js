let textArea = document.getElementById("text");   //textArea is now assigned to the element with the ID, text from the html
let results = document.getElementById("results"); //results is now assigned to the element with the ID, results from the html
let button= document.getElementById("btn");


let result = {  // object with "key-value pairs". the values are given an initial value
    text: "", 
    vowels: {
      a: 0,
      e: 0,
      i: 0,
      o: 0,
      u: 0
    },
    punctuation: {
      period: 0,
      comma: 0,
      exclamation: 0,
      questionMark: 0
    },
    numCharacters: 0,
    numWords: 0,
    longestWord: "",
    shortestWord: "",
    lastThreeWords: ["","",""],
    waldoIndexes: [],
}

document.addEventListener('keyup',onKeyUp); // listen for when the keyboard is DONE being pressed, then execute "onKeyUp" function everytime
function onKeyUp (e){ // as just mentioned, this is executed everytime the keyboard is DONE being pressed.
    /* Based on what the user inputs, it changes values inside the object. Each of these functions/assignments assign actual values to the values in the object above. */

    updateVowels(e.code);  //this function is called to see if some vowels need to be incremented. e.code is passed as a paramater. go to update value functions for more
    updatePunctuation(e.code); // this function is the same idea as the one above, but instead of vowels, its different puncuations

    result.text=(textArea.value);   //textArea.value is the text inside the textarea thats showed in the html. remember "textArea" was assigned to this above.
    result.numWords = wordCount(textArea.value);   //word count returns the amount of words inside the textarea on the html page. this is because textarea.value is the ENTIRE text in the text area, and it is passed as a parameter to the function.
    result.numCharacters = textArea.value.length; // this is simple. textarea.value is the ENTIRE text or "string" inside the text field in the html page. by simply putting the .length at the end, it gives the amount of characters inside the text field also called the length of the string
    result.longestWord = findLongestWord(textArea.value);     //findLongestWord returns the longest word inside the text area
    result.shortestWord = findShortestWord(textArea.value);    //findshortestword return the shortest word inside the text area. it is assigned to "shortestWord" that is inside the object
    result.lastThreeWords = getLastWords(textArea.value);       // getLastWords returns the last three words of the entire text field. it is assigned to "lastThreeWords" that is inside the object

    var indices = findWaldo("waldo",textArea.value);    // findWaldo returns the starting indices of when waldo is typed in the text field. it is then assigned to a local variable "indices"
    result.waldoIndexes = indices;          //the local variable just assigned is then used to set waldoIndexes that is inside the object to this value

    renderResults();  //display everything above
}

document.addEventListener('keydown',(e)=>{      
    /* this addeventlistener is a bit different then the one above. It helps get the character 
    that was just deleted when pressing backspace, which 'keyup' event listener can not do. */
    if(e.code == "Backspace"){ //if user presses backspace
        let tempChar = e.target.value.slice(-1); // save the character that was deleted
        updateObject(tempChar);         // and decrement the values inside the object accordingly. If it was an 'a' that was deleted, decrement a's value and so on.
    }


})

function updateVowels (char){   
    switch(char){   //based on the parameter, see if it is a vowel, if it is, find out which one. if its a, increment a, if e increment e, so on.
        case 'KeyA': 
            result.vowels.a++; 
            console.log(result.vowels.a);
            break;
        case 'KeyE': 
            result.vowels.e++; 
            console.log(result.vowels.e);
            break;
        case 'KeyI': 
            result.vowels.i++; 
            console.log(result.vowels.i); 
            break;
        case 'KeyO': 
            result.vowels.o++; 
            console.log(result.vowels.o); 
            break;
        case 'KeyU': 
            result.vowels.u++; 
            console.log(result.vowels.u); 
            break;
    }
    return;
}

function updatePunctuation (sign){//same idea as above
    switch(sign){
        case 'Digit1':
            result.punctuation.exclamation++;
            console.log(result.punctuation.exclamation);
            break;
        case 'Comma':
            result.punctuation.comma++;
            console.log(result.punctuation.comma);
            break;
        case 'Slash':
            result.punctuation.questionMark++;
            console.log(result.punctuation.questionMark);
            break;
        case 'Period':
            result.punctuation.period++;
            console.log(result.punctuation.period);
            break;
    }
}

function wordCount(text) {
    return text.split(" ").length;  /*everytime theres a space inside "text", save the words into an array. 
         the .length returns the size of the array when finished which is also the amount of words inside "text"*/
}

function findLongestWord(str){  //too much to explain, but its a function the returns the longest word
    let strSplit = str.split(' ');
    let longestWord =0;
    let tempResult = "";
    for(let i=0; i<strSplit.length; i++) {
        if(strSplit[i].length>longestWord){
            longestWord=strSplit[i].length;
            tempResult = strSplit[i];
        }
    }
    return tempResult;
}

function findShortestWord(str) {  //finds shortest word
    var words = str.split(' ');
    var shortest = words.reduce((shortestWord, currentWord) => {
      return currentWord.length < shortestWord.length ? currentWord : shortestWord;
    }, words[0]);
    return shortest;
}


function getLastWords(str){  //gets last three words.
    const arr = str.split(' ');
    const forReturn =["","",""];
    if(arr.length>=3){
        forReturn[2] = arr[arr.length-1];
        forReturn[1] = arr[arr.length-2];
        forReturn[0] = arr[arr.length-3];
    }
    else if(arr.length == 1){
            forReturn[2]=arr[arr.length-1];
            forReturn[1]="";
            forReturn[0]="";
    }
    else if(arr.length == 2){
        forReturn[2]=arr[arr.length-1];
        forReturn[1]=arr[arr.length-2];
        forReturn[0]="";
    }
    else{
        return forReturn;
    }
    return forReturn;
}

function findWaldo(searchStr, str, caseSensitive) {  //determines if word is = to waldo.
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }   
    let startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function updateObject(char){  //decrement values inside the object accordingly
    let newChar = char.toLowerCase();
    if(newChar=='a' && result.vowels.a>=1){
        result.vowels.a--;
    }
    else if(newChar=='e' && result.vowels.e>=1){
        result.vowels.e--;
    }
    else if(newChar=='i' && result.vowels.i>=1){
        result.vowels.i--;
    }
    else if(newChar=='o' && result.vowels.o>=1){
        result.vowels.o--;
    }
    else if(newChar=='u' && result.vowels.u>=1){
        result.vowels.u--;
    }
    else if(newChar=='!' && result.punctuation.exclamation>=1){
        result.punctuation.exclamation--;
    }
    else if(newChar==',' && result.punctuation.comma>=1){
        result.punctuation.comma--;
    }
    else if(newChar=='.' && result.punctuation.period>=1){
        result.punctuation.period--;
    }
    else if(newChar=='?' && result.punctuation.questionMark>=1){
        result.punctuation.questionMark--;
    }
    else{
        return;
    }
}

//displaying information
let newElement = document.createElement('div');
newElement.classList.add("firstElement");
results.appendChild(newElement);

let secondNewElement = document.createElement('div');
secondNewElement.classList.add("secondElement");
results.appendChild(secondNewElement);

// var sheet = document.createElement('style')
// sheet.innerHTML = "div {width:300px; }";
// newElement.appendChild(sheet);

function renderResults(){
    newElement.innerHTML ="<h2>Text Analysis</h2>";
    newElement.innerHTML += "<h3>Vowel Counts</h3>";
    newElement.innerHTML += "<p>a: "+ result.vowels.a; +"</p>";
    newElement.innerHTML += "<p>e: "+result.vowels.e+"</p>";
    newElement.innerHTML += "<p>i: "+result.vowels.i+"</p>";
    newElement.innerHTML += "<p>o: "+result.vowels.o+"</p>";
    newElement.innerHTML += "<p>u: "+result.vowels.u+"</p>";

    newElement.innerHTML += "<h3>Punctuation Counts</h3>";
    newElement.innerHTML += "<p>Periods: "+result.punctuation.period+"</p>";
    newElement.innerHTML += "<p>Commas: "+result.punctuation.comma+"</p>";
    newElement.innerHTML += "<p>Question Marks: "+result.punctuation.questionMark+"</p>";
    newElement.innerHTML += "<p>Exclamation Marks: "+result.punctuation.exclamation+"</p>";

    secondNewElement.innerHTML ="<br /><br /><br /> <h3>Number Of Characters:" + result.numCharacters+"</h3>";
    secondNewElement.innerHTML +="<h3>Num Of Words :" + result.numWords+"</h3>";
    secondNewElement.innerHTML +="<h3>Longest Word:" + result.longestWord+"</h3>";
    secondNewElement.innerHTML +="<h3>Shortest Word:" + result.shortestWord+"</h3>";
    secondNewElement.innerHTML +="<h3>Last Three:" + result.lastThreeWords+"</h3>";
    secondNewElement.innerHTML +="<h3>Waldo Indeces:" + result.waldoIndexes+ "</h3>";

}

btn.addEventListener("click",(e)=>{
    result.text = "";
    result.vowels.a=0;
    result.vowels.e=0;
    result.vowels.i=0;
    result.vowels.o=0;
    result.vowels.u=0;
    result.punctuation.comma=0;
    result.punctuation.period=0;
    result.punctuation.exclamation=0;
    result.punctuation.questionMark=0;
    result.numWords = 0;
    result.numCharacters=0;
    result.shortestWord="";
    result.longestWord="";
    result.lastThreeWords=["","",""];
    result.waldoIndexes=[];
    textArea.value="";
    renderResults();
})
