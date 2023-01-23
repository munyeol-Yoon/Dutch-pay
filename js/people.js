const $peopleForm = document.querySelector("#peopleForm");
const $peopleInput = document.querySelector("#people");
const $peopleBtn = document.querySelector("#peopleBtn");
//const $notice = document.querySelector("#people-notice");

const $moneyForm = document.querySelector("#moneyForm");

const $total = document.querySelector("#total");

const $redoBtn = document.querySelector("#total-redoButton");

let objArr = []; // 초기배열
let maxPeople = 0;
let sortArr = []; // 금액별 정렬
let recipient = []; // 받는사람
let giver = []; // 주는사람

let trycheck = false;

const peopleConuting = (event) => {
  event.preventDefault();
  //$notice.textContent = `${$peopleInput.value} 명 입니다. 각자 낸 금액을 입력해주세요.`;
  maxPeople = $peopleInput.value;
  peopleInsert($peopleInput.value);
  $peopleInput.value = null;
  $peopleForm.style.display = "none";
};
const peopleInsert = (value) => {
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

  button.addEventListener("click", valueSave);
};

const valueSave = (event) => {
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
  arraySort();
};

const arraySort = () => {
  sortArr = [];
  recipient = [];
  for (let name in objArr) {
    sortArr.push([name, objArr[name]]);
  }
  sortArr.sort((a, b) => b[1] - a[1]);
  if (recipient !== "") {
    arraySplit();
  }
  moneyPrintingPage();
};

const arraySplit = () => {
  giver = [];
  let sum = 0;
  for (let i = 0; i < sortArr.length; i++) {
    sum += Number(sortArr[i][1]);
  }
  let divide = Math.floor(sum / sortArr.length);
  for (let i = 0; i < sortArr.length; i++) {
    sortArr[i].push(divide);
    sortArr[i].push(sortArr[i][1] - sortArr[i][2]);
    if (sortArr[i][3] > 0) {
      // 돈을받아야하는사람
      recipient.push(sortArr[i]);
    } else if (sortArr[i][3] <= 0) {
      // 돈을내야하는사람
      giver.push(sortArr[i]);
    }
  }
  noticeMoney(sum, divide);
};

const noticeMoney = (sum, divide) => {
  let $p = document.createElement("p");
  $total.append($p);
  $p.textContent = `총합계 ${sum}원, 각자 내야할 돈은 ${divide}원 입니다. `;
};

const giverPrint = () => {
  //rec 8000, giv -11000
  //rec 14000, giv -3000

  for (let i = 0; i < recipient.length; i++) {
    for (let j = 0; j < giver.length; j++) {
      let $p = document.createElement("p");
      $total.append($p);

      if (recipient[i][3] < Math.abs(giver[j][3])) {
        let money = recipient[i][3];
        giver[j][3] += money;
        // giv -3000
        $p.textContent = `${giver[j][0].charAt(
          giver[0][0].length - 1
        )}번째님 ${recipient[i][0].charAt(
          recipient[0][0].length - 1
        )}번째님에게 ${Math.abs(money)}원 입금하시면됩니다.`;
        recipient[i][3] = 0;
        //rec 0

        i++;
        j--;
      } else {
        recipient[i][3] -= Math.abs(giver[j][3]);

        $p.textContent = `${giver[j][0].charAt(
          giver[0][0].length - 1
        )}번째님 ${recipient[i][0].charAt(
          recipient[0][0].length - 1
        )}번째님에게 ${Math.abs(giver[j][3])}원 입금하시면됩니다.`;
        giver[j][3] = 0;
      }
    }
  }
};

const moneyPrintingPage = () => {
  for (let i = 0; i < sortArr.length; i++) {
    let $p = document.createElement("p");
    $total.append($p);
    if (sortArr[i][3] > 0) {
      $p.textContent = `${sortArr[i][0].charAt(
        sortArr[0][0].length - 1
      )}번째님 총 ${sortArr[i][3]}원 받으시면됩니다.`;
    } else if (sortArr[i][3] < 0) {
      // 함수만들기
      giverPrint();
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

$peopleForm.addEventListener("submit", peopleConuting);
$redoBtn.addEventListener("click", handleRetry);
