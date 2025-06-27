let currNum = "";
let currOp = null;
let nextNum = "";

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op == "+") {
    return a+b;
  }
  else if (op == "-") {
    return a-b;
  }
  else if (op == "*") {
    return a*b;
  }
  else if (op == "/") {
    return a/b;
  }
  else {
    console.log(`operate: illegal operation (${op})`);
  }
}

function updateScreen() {
  const screen = document.querySelector(".screen");
  if (currOp) screen.innerText = nextNum;
  else screen.innerText = currNum;
}

function updateCurr(num) {
  currNum = num;
  updateScreen();
}

function updateNext(num) {
  nextNum = num;
  updateScreen();
}

const operators = document.querySelector(".operators");
function selectOp(op) {
  Array.from(operators.children).forEach(operator => {
    if (operator.getAttribute("value") == op) operator.classList.add("op-selected");
    else operator.classList.remove("op-selected");
  });
}
function deselectOps() {
  Array.from(operators.children).forEach(operator => {
    operator.classList.remove("op-selected");
  });
}

const buttons = document.querySelector(".buttons");
Array.from(buttons.children).forEach(column => {
  console.log("hey");
  Array.from(column.children).forEach(button => {
    if (button.classList.contains("num")) {
      button.addEventListener("click", e => {
        if (currOp) updateNext(nextNum + e.target.innerText);
        else updateCurr(currNum + e.target.innerText);
      })
    }
    else if (button.classList.contains("backspace")) {
      button.addEventListener("click", e => {
        if (currOp) updateNext(nextNum.slice(0, nextNum.length-1));
        else updateCurr(currNum.slice(0, currNum.length-1));
      });
    }
    else if (button.classList.contains("clear")) {
      button.addEventListener("click", e => {
        updateCurr("");
        currOp = null;
        updateNext("");
      });
    }
    else if (button.classList.contains("equals")) {
      button.addEventListener("click", e => {
        if (currOp && nextNum != "") {
          currNum = operate(currNum, nextNum, currOp).toString();
          currOp = null;
          updateNext("");
          deselectOps();
        }
      });
    }
    else {
      button.addEventListener("click", e => {
        if (currNum != "" && !e.target.classList.contains("op-disabled")) {
          currOp = e.target.getAttribute("value");
          selectOp(currOp);
          console.log("check");
          console.log(currOp);
        }
      });
    }
  });
});