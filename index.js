var expression = document.getElementsByTagName("input")[0].value;
var global = "";

const synth = window.speechSynthesis;

document.addEventListener("keypress", (event) => {
  expression += event.key;
  synth.speak(new SpeechSynthesisUtterance(event.key));
});

function inputChangeHandler(event) {
  if (event.target.innerHTML === ".") {
    synth.speak(new SpeechSynthesisUtterance("point"));
    if (expression === "") {
      expression = "0.";
    } else {
      expression += ".0";
    }
    document.getElementsByTagName("input")[0].value = expression;
  } else {
    if (event.target.innerHTML === "*") {
      synth.speak(new SpeechSynthesisUtterance("Multiply"));
    } else if (event.target.innerHTML === "/") {
      synth.speak(new SpeechSynthesisUtterance("Divide"));
    } else {
      synth.speak(new SpeechSynthesisUtterance(event.target.innerHTML));
    }
    expression = document.getElementsByTagName("input")[0].value;
    expression += String(event.target.innerHTML);
    document.getElementsByTagName("input")[0].value = expression;
  }
}

function submitHandler() {
  console.log(expression);
  synth.speak(new SpeechSynthesisUtterance("Equals"));
  expression = eval(expression);
  synth.speak(new SpeechSynthesisUtterance(expression));
  document.getElementsByTagName("input")[0].value = expression;
}

async function actionHandler(event) {
  if (event.target.innerHTML === "C") {
    expression = "";
    synth.speak(new SpeechSynthesisUtterance("clear"));
    document.getElementsByTagName("input")[0].value = expression;
  } else if (event.target.innerHTML === "1/x") {
    expression = eval(1 / eval(expression));
    synth.speak(new SpeechSynthesisUtterance("reciprocal"));
    document.getElementsByTagName("input")[0].value = expression;
    synth.speak(new SpeechSynthesisUtterance(expression));
  } else if (event.target.innerHTML === "x2") {
    expression *= eval(expression);
    synth.speak(new SpeechSynthesisUtterance("square"));
    synth.speak(new SpeechSynthesisUtterance(expression));
    document.getElementsByTagName("input")[0].value = expression;
  } else if (event.target.innerHTML === "???") {
    expression = Math.sqrt(eval(expression));
    synth.speak(new SpeechSynthesisUtterance("square root"));
    document.getElementsByTagName("input")[0].value = expression;
    synth.speak(new SpeechSynthesisUtterance(expression));
  } else if (event.target.innerHTML === "??") {
    expression = eval(expression) * -1;
    document.getElementsByTagName("input")[0].value = expression;
    synth.speak(new SpeechSynthesisUtterance(expression));
  }
}

function storageHandler(event) {
  if (event.target.innerHTML === "MS") {
    if (isNaN(expression) || expression === "") {
      synth.speak(new SpeechSynthesisUtterance("Cannot store equation!"));
    } else {
      synth.speak(
        new SpeechSynthesisUtterance(`${expression} stored successfully`)
      );
      global = expression;
    }
  } else if (event.target.innerHTML === "MC") {
    synth.speak(new SpeechSynthesisUtterance(`${global} cleared successfully`));
    global = "";
  } else if (event.target.innerHTML === "MR") {
    expression = global;
    document.getElementsByName("input")[0].value = expression;
    synth.speak(new SpeechSynthesisUtterance(expression));
  } else if (event.target.innerHTML === "M+") {
    expression += global;
    global = expression;
    document.getElementsByName("input")[0].value = expression;
    synth.speak(new SpeechSynthesisUtterance(expression));
  }
}

function handleMicClick() {
  const recognition = new webkitSpeechRecognition(); // Create a new SpeechRecognition object
  recognition.lang = "en-US"; // Set the language of the recognition
  recognition.interimResults = false; // Set interim results to false, meaning the final result will be returned only
  recognition.maxAlternatives = 1; // Set the maximum number of alternatives that can be returned

  recognition.onresult = (event) => {
    let result = event.results[0][0].transcript; // Get the transcript of the first alternative of the final result
    result = eval(result.replace(/\s/g, "").substring(0, result.length - 1));
    console.log(result); // Log the result to the console
    synth.speak(new SpeechSynthesisUtterance(result));
    document.getElementsByTagName("input")[0].value = result;
  };

  recognition.start();
}
