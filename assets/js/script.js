


// *********************************************** // 
// Main code for the generate password function
// *********************************************** // 

// limits on password characters
const MIN_PASSWORD_CHARS = 8; // 7 no, 8 yes
const MAX_PASSWORD_CHARS = 128; // 128 yes, 129 no

// character classes
var charClasses = [
  {
    characterClassName: "lowerLetters",
    promptString: "Do you want lower case characters?",
    characterArray: 'abcdefghijklmnopqrstuvwxyz'.split('')
  } ,
  {
    characterClassName: "upperLetters",
    promptString: "Do you want upper case characters?",
    characterArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  } ,
  {
    characterClassName: "digits",
    promptString: "Do you want digigts?",
    characterArray: '0123456789'.split('')
  } , 
  {
    characterClassName: "special",
    promptString: "Do you want special characters?",
    characterArray: ' !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'.split('')
  },
  // maybe later
  // {  
  //   characterClassName: "emjoi",
  //   promptString: "Do you want emojis?",
  //   characterArray: "😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛" + 
  //   "😝😜🤪🤨🧐🤓😎🥸🤩🥳😏😒😞😔😟😕🙁☹️😣😖😫😩🥺😢" + 
  //   "😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬" + 
  //   "🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿" + 
  //   "👹👺🤡💩👻💀☠️👽👾🤖🎃😺😸😹😻😼😽🙀😿😾".split('')
  // }
]  // end of the character classes options to use in generating the password.



// create the pool of characters to choose from
// called from inside the generatePassword function
// assummes that charClasses is available, and mutates the array
function getCharacterPool(finalCharPool, charClassesArray) {

  // loop through the charClasses array and add the appropriate array of 
  // characters to the final selection array 
  charClassesArray.forEach(charClass => {
    if (confirm(charClass.promptString)) {
      finalCharPool = finalCharPool.concat(charClass.characterArray)
    }
  }) // closes the forEach callback function
  return finalCharPool;
} 



function getNumPasswordChars(){
  var numChars = null;
  var promptString = `Please enter the number of password characters. \n` + 
                    `(between ${MIN_PASSWORD_CHARS} and ${MAX_PASSWORD_CHARS})`;
  var keepLooping = true;

do  {  // loop until we get good data
  numChars = prompt(promptString);
    // check if the user has cancelled out. Return early from the function
    if (numChars === null){
      return null;
    } 

    numChars = parseInt(numChars); // try for numbers
    if (isNaN(numChars)) {  // user entereda string; bad user
      alert('You must enter a number.\n')
    } else if ((numChars < MIN_PASSWORD_CHARS) || (numChars > MAX_PASSWORD_CHARS)){
      alert(`Number of characters must be between ${MIN_PASSWORD_CHARS} and ${MAX_PASSWORD_CHARS}.`);
    } else {
      keepLooping = false; // we have good data
    }

  } while (keepLooping); // keep looping until we get good data

  return numChars;
}

// generate password 
function generatePassword(){

  var numChars = getNumPasswordChars();
  if (numChars === null){
     // user pressed cancel on the prompt and getNumPasswordChars return NaN
     //   --> bail out of this function and return empty string
    return '';
  }


  var finalCharacterPool = getCharacterPool([], charClasses); 

  // check to see that at least one character class has been selected:
  while (finalCharacterPool.length === 0){
    alert('You must choose at least one class of characters for your password');
    finalCharacterPool = getCharacterPool([], charClasses);
  }

  //  build the password by selecting a random element from our pool
  //  for the number of character we have
  var passwordText ='';
  for(let i = 0; i<numChars; i++){
    passwordText = passwordText + finalCharacterPool[Math.floor(Math.random() * finalCharacterPool.length)]
  }
  return passwordText;
};

// *********************************************** // 
// Interface to the web page
// *********************************************** // 

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

  // select text to highlight spaces and allow simple copy paste
  passwordText.select();
}

// Add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

