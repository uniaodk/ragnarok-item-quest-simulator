function loadInputList() {
  const inputList = FORM_CALCULATOR.querySelectorAll('input');
  const inputArray = Array.from(inputList);

  inputArray.forEach(input => {
    input.addEventListener('change', function () {
      calculate();
    });
  });
}

window.onload = function () {
  loadInputList();
};


function calculate() {
  let inputExpTableChecked = document.querySelector('input[name="exp_table"]:checked');
  let lvlCurrent = getLevelCurrent();
  let lvlGoal = getLevelGoal();
  let rate = getRate();
  let baseExpList = getBaseExpList(inputExpTableChecked.value);
  let currentItemQuest = getCurrentItemQuest(lvlCurrent, lvlGoal);

  const indexItemQuestUsageByLvl = {};
  while (currentItemQuest) {
    let expRequestedByLvl = baseExpList[lvlCurrent - 1];
    const questUsageAmount = parseFloat(expRequestedByLvl / (currentItemQuest.exp * rate)).toFixed(2);
    const itemAmount = parseFloat((questUsageAmount * currentItemQuest.amount).toFixed(2));
    const itemCost = parseFloat((itemAmount * currentItemQuest.zeny).toFixed(2));
    indexItemQuestUsageByLvl[lvlCurrent] = { item: currentItemQuest, amount: itemAmount, cost: itemCost };
    currentItemQuest = getCurrentItemQuest(++lvlCurrent, lvlGoal);
  }
  console.log(indexItemQuestUsageByLvl);
  const indexByItemQuestTotal = Object.values(indexItemQuestUsageByLvl).reduce((index, itemByLvl) => {
    index[itemByLvl.item.name] = index[itemByLvl.item.name] || { item: itemByLvl.item, amount: 0, cost: 0 };
    index[itemByLvl.item.name].amount += itemByLvl.amount;
    index[itemByLvl.item.name].cost += itemByLvl.cost;
    return index;
  }, {});
  console.log(indexByItemQuestTotal);
}
