const $peopleForm = document.querySelector("#peopleForm");
const $peopleInput = document.querySelector("#people");
const $peopleBtn = document.querySelector("#peopleBtn");
//const $notice = document.querySelector("#people-notice");

const $moneyForm = document.querySelector("#moneyForm");

const $total = document.querySelector("#total");

const $redoBtn = document.querySelector("#total-redoButton");

let objArr = [];
let maxPeople = 0;
let sortArr = [];

let trycheck = false;

const handlePeopleCount = (event) => {
  event.preventDefault();
  //$notice.textContent = `${$peopleInput.value} 명 입니다. 각자 낸 금액을 입력해주세요.`;
  maxPeople = $peopleInput.value;
  handlePeopleInput($peopleInput.value);
  $peopleInput.value = null;
  $peopleForm.style.display = "none";
};
const handlePeopleInput = (value) => {
  if (trycheck === true) {
    $moneyForm.style.display = "flex";
    objArr = [];
  }
  for (let i = 0; i < value; i++) {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.type = "number";
    input.placeholder = "금액을 입력해주세요";
    $moneyForm.append(label);
    label.htmlFor = `people${i + 1}`;
    label.textContent = `${i + 1} 번째사람이 낸 금액`;
    $moneyForm.append(input);
    input.id = `people${i + 1}`;
    $moneyForm.append(document.createElement("br"));
    objArr[`people${i + 1}`] = "null";
  }
  let button = document.createElement("button");
  $moneyForm.append(button);
  button.innerText = "확인";

  button.addEventListener("click", handleValueSave);
};

const handleValueSave = (event) => {
  event.preventDefault();
  $moneyForm.style.display = "none";
  //$notice.style.display = "none";
  for (let i = 1; i <= Object.keys(objArr).length; i++) {
    const people = document.getElementById(`people${i}`);

    try {
      objArr[`people${i}`] = people.value;
      people.value = null;
    } catch {
      objArr[`people${i}`] = Number(0);
    }
  }
  handleSort();
};

const handleSort = () => {
  sortArr = [];
  for (let name in objArr) {
    sortArr.push([name, objArr[name]]);
  }
  sortArr.sort((a, b) => b[1] - a[1]);
  handleCalculator();
};

const handleCalculator = () => {
  let sum = 0;
  for (let i = 0; i < sortArr.length; i++) {
    sum += Number(sortArr[i][1]);
  }
  let divide = Math.floor(sum / sortArr.length);
  let $p = document.createElement("p");
  $total.append($p);
  $p.textContent = `총합계 ${sum}원, 각자 내야할 돈은 ${divide}원 입니다. `;
  for (let i = 1; i < sortArr.length; i++) {
    let $p = document.createElement("p");
    $total.append($p);
    if (Math.abs(divide - sortArr[i][1]) === 0) {
      $p.textContent = `${sortArr[i][0].charAt(
        sortArr[0][0].length - 1
      )}번째님은 입금안하셔도 됩니다.`;
    } else {
      $p.textContent = `${sortArr[i][0].charAt(
        sortArr[0][0].length - 1
      )}번째님 ${sortArr[0][0].charAt(
        sortArr[0][0].length - 1
      )}번째님에게 ${Math.abs(divide - sortArr[i][1])}원 입금하시면됩니다.`;
    }
  }
  $redoBtn.style.display = "block";
};

const handleRetry = () => {
  $redoBtn.style.display = "none";
  $total.innerHTML = "";
  $moneyForm.innerHTML = "";
  maxPeople = 0;
  $peopleForm.style.display = "block";
  trycheck = true;
};

$peopleForm.addEventListener("submit", handlePeopleCount);
$redoBtn.addEventListener("click", handleRetry);
