const user1 = {
  userName: "Ahmed Samir",
  movements: [400, 600, 200, -1000, 2000, 500, -1000, 700],
  interestRate: 1.2,
  pin: 1111,
};
const user2 = {
  userName: "Eslam samir",
  movements: [70, 600, 1000, 3000, -500, -2000, 20000, 7000],
  interestRate: 1.1,
  pin: 2222,
};
const user3 = {
  userName: "israa Mohamed",
  movements: [400, 600, 20, 100, 3000, -500, -2000, 20000],
  interestRate: 1.3,
  pin: 3333,
};
const user4 = {
  userName: "rehab samir",
  movements: [800, 600, 500, 3000, -500, -2000, 20000, 900],
  interestRate: 1.5,
  pin: 4444,
};
let accounts = [user1, user2, user3, user4];

const moveElement = document.querySelector(".movements");
const money = document.querySelector(".money");
const totalDeposits = document.querySelector(".total-in");
const totalWithdraws = document.querySelector(".total-out");
const interest = document.querySelector(".interest");
const userLogField = document.querySelector(".password");
const loginForm = document.querySelector(".login");
const loginBtn = document.querySelector(".login-btn");
const application = document.querySelector(".app");
const loginInput = document.querySelector(".user-name");
const welcome = document.querySelector(".welcome");
const transferTO = document.querySelector(".transfer-to");
const transferAmount = document.querySelector(".transfer-amount");
const transferBtn = document.querySelector(".transfer button");
const loanAmount = document.querySelector(".loan-amount");
const loanBtn = document.querySelector(".loan-btn");
const accClose = document.querySelector(".acc-close");
const passClose = document.querySelector(".pass-close");
const closeBtn = document.querySelector(".close-btn");

let currentUserAccount;
const updateUI = function (acc) {
  displayMoves(acc.movements);
  displayMoney(acc);
  displayTotalSumary(acc);
};

const displayMoves = function (moves) {
  moveElement.innerHTML = "";
  moves.forEach(function (move, i) {
    let type = move > 0 ? "deposit" : "withdraw";
    moveElement.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="movement-row ${type}">
            <div class="movement-${type}">${i + 1} ${type}</div>
            <div class = "mov-date"> 16/4/1994 </div> 
            <div class="movement-value">${Math.abs(move)} &dollar;</div>
            
          </div>
        `
    );
  });
};

const createUser = function (accs) {
  accs.forEach(function (acc) {
    acc.logName = acc.userName
      .toLowerCase()
      .split(" ")
      .map(function (e) {
        return e[0];
      })
      .join("");
  });
};
createUser(accounts);
const displayMoney = function (acc) {
  let ballance = acc.movements.reduce((a, e) => a + e);
  money.textContent = ballance + ` \€`;
  acc.ballance = ballance;
};

const displayTotalSumary = function (acc) {
  let deposits = acc.movements.filter((mov) => mov > 0).reduce((a, c) => a + c);
  totalDeposits.textContent = deposits + `\€`;
  let withdraws = acc.movements
    .filter((mov) => mov < 0)
    .reduce((a, c) => a + c);
  withdraws = Math.abs(withdraws);
  totalWithdraws.textContent = withdraws + `\€`;
  interest.textContent =
    Math.trunc(
      acc.movements
        .filter((e) => e > 0)
        .map((e) => e * (user1.interestRate - 1))
        .reduce((a, e) => a + e)
    ) + `€`;
};

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currentUserAccount = accounts.find((acc) => acc.logName === loginInput.value);
  if (userLogField.value * 1 === currentUserAccount?.pin) {
    loginInput.value = userLogField.value = ``;
    application.classList.remove("hidden");
    welcome.textContent = ` welcome back ${
      currentUserAccount?.userName.split(" ")[0]
    }`;
    updateUI(currentUserAccount);
  } else {
    welcome.textContent = ` Wrong LOGIN !!!!`;
    welcome.style.color = "red";
  }
});
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let reciever = accounts.find((acc) => acc.logName === transferTO.value);
  let amount = transferAmount.value * 1;
  if (
    currentUserAccount.ballance >= amount &&
    reciever &&
    reciever.logName !== currentUserAccount.logName &&
    amount > 0
  ) {
    currentUserAccount.movements.push(amount * -1);
    reciever?.movements.push(amount * 1);
    transferTO.value = "";
    transferAmount.value = "";
    updateUI(currentUserAccount);
  } else if (reciever === undefined) {
    transferTO.value = " invalid user";
    transferTO.style.color = "red";
  } else if (reciever === currentUserAccount) {
    transferTO.value = " invalid user";
    transferTO.style.color = "red";
    transferAmount.value = "";
  } else {
    alert("wrong transfer data");
  }
  console.log(reciever);
  console.log(amount);
});
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let loan = loanAmount.value * 1;
  if (loan <= 10 * currentUserAccount.ballance && loan > 0) {
    currentUserAccount.movements.push(loan);
    updateUI(currentUserAccount);
  } else {
    alert("wrong loan request");
  }
});
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userClose = accClose.value;
  let userpassClose = passClose.value * 1;
  if (
    currentUserAccount.logName === userClose &&
    currentUserAccount.pin === userpassClose
  ) {
    let bb = accounts.findIndex((acc) => acc.pin === currentUserAccount.pin);
    accounts.splice(bb, bb + 1);
    console.log(accounts);
    console.log(bb);
    application.classList.add("hidden");
    updateUI(currentUserAccount);
  }
});
