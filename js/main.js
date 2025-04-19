function load_input_list() {
  const inputList = FORM_CALCULATOR.querySelectorAll('input');
  const inputArray = Array.from(inputList);

  inputArray.forEach(input => {
    input.addEventListener('change', function() {
      calculate();
    });
  });
}

window.onload = function () {
  load_input_list();
};


function calculate() {
  let expTableSelected = document.querySelector('input[name="exp_table"]:checked');
  let levelCurrent = input_level_current();
  let levelGoal = input_level_goal();
  let rate = input_level_rate();

  let baseExpRange = [...BASE_EXP[expTableSelected.value]];

  for (let item of EXP_ITEMS) {
    if (levelCurrent < item.minLvl) {
      MESSAGE.insufficient_level(levelCurrent, item);
      levelCurrent = item.minLvl;
      break;
    }

    if (levelGoal < item.minLvl) break;
  
    const expRange = baseExpRange.splice(levelCurrent - 1, item.maxLvl);
    const expTotal = expRange.reduce((e1, e2) => e1 + e2, 0);
    const questUseAmount = parseInt(expTotal / (item.exp * rate));
    const itemAmount = parseInt(questUseAmount * item.amount);
    const itemCost = parseInt(itemAmount * item.zeny);
  
    levelCurrent = ++item.maxLvl;
    console.log(item.name, expTotal, questUseAmount, itemAmount, itemCost, levelCurrent);

    hazelnut_amount(questUseAmount);
    hazelnut_zeny(itemCost);
  }
}
