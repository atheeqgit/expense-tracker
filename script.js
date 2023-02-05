const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const historyUl = document.getElementById("history-ul");
const textInput = document.getElementById("text-input");
const amountInput = document.getElementById("money-input");
const submitBtn = document.getElementById("submit-btn");

const form = document.querySelector("form");

const LSarray = JSON.parse(localStorage.getItem("transactionArr"));

let transactionArr = localStorage.getItem('transactions') !== null ? LSarray : [];

addTransactionToDOM();

submitBtn.addEventListener("click", (e) => {
e.preventDefault();
  addTransaction(e);
 
});

function addTransaction(e) {
e.preventDefault();

  let text = textInput.value;

  if (text.trim() === "" || amountInput.value.trim() === "") {
    alert("Put valid inputs on both fields");
  } else {
    const transaction = {
      id: generateId(),
      text: text,
      amount: +amountInput.value,
    };

    transactionArr.push(transaction);

    addTransactionToDOM();

    textInput.value = "";
    amountInput.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem("transactionArr", JSON.stringify(transactionArr));
}

function generateId() {
  const id = Math.floor(Math.random() * 10000000);

  return id;
}

function addTransactionToDOM() {
  historyUl.innerHTML = "";

  transactionArr.forEach((transaction) => {
    const sign = transaction.amount < 0 ? "-" : "+";

    const li = document.createElement("li");
    li.className = sign == "-" ? "minus-li" : "";

    li.innerHTML = `
        <p class="text">${transaction.text}</p>
        <p class="cash">${transaction.amount}₹</p>
        <i class="ri-close-line" onclick="removeItemFromArr(${transaction.id})"></i>
        `;

    historyUl.appendChild(li);

    updateValues();
  });
  // if(transactionArr !== []){
  // }
}

function removeItemFromArr(id) {
  console.log(id);
  transactionArr = transactionArr.filter(
    (transaction) => transaction.id !== id
  );

  addTransactionToDOM();
  updateValues();
  updateLocalStorage();
}
function updateValues() {
  const amounts = transactionArr.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  //.toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  // .toFixed(2);

  const expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0);
  // .toFixed(2);
  balanceEl.innerText = total + "₹";
  incomeEl.innerText = income + "₹";
  expenseEl.innerHTML = expense + "₹";
}
