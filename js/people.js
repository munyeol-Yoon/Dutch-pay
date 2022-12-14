const $peopleForm = document.querySelector("#peopleForm");
const $peopleInput = document.querySelector("#people");
const $peopleBtn = document.querySelector("#peopleBtn");
const $notice = document.querySelector("#people-notice");

const $moneyForm = document.querySelector("#moneyForm");

const handlePeopleCheck = (event) => {
  event.preventDefault();
  //console.log($peopleInput.value);
  $notice.textContent = `${$peopleInput.value} 명 입니다.`;
  handlePeopleInput($peopleInput.value);
  $peopleInput.value = null;
};
const handlePeopleInput = (value) => {
  for (let i = 0; i < value; i++) {
    let $input = document.createElement("input");
    let $label = document.createElement("label");
    $moneyForm.append($label);
    $label.textContent = `${i + 1} 번째사람이 낸 금액  `;
    $moneyForm.append($input);
    $moneyForm.append(document.createElement("br"));
  }
};
$peopleForm.addEventListener("submit", handlePeopleCheck);
