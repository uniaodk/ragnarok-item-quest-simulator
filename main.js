const inputLvlCurrent = document.getElementById('lvlCurrent');
const inputLvlGoal = document.getElementById('lvlGoal');
const inputRate = document.getElementById('rate');
const formCalculator = document.getElementById('formCalculator');

function calculate() {
  const expTableSelected = document.querySelector('input[name="exp_table"]:checked');
  let lvlCurrent = Number(inputLvlCurrent.value);
  const lvlGoal = Number(inputLvlGoal.value);
  const rate = Number(inputRate.value);
  const baseExpRange = [...BASE_EXP[expTableSelected.value]];

  for (let item of EXP_ITEMS) {
    if (lvlCurrent < item.minLvl) {
      console.log(`Upar ${item.minLvl - lvlCurrent} levels para utilizar o item ${item.name}!`);
      lvlCurrent = item.minLvl;
      break;
    }
    if (lvlGoal < item.minLvl) break;
    const expRange = baseExpRange.splice(lvlCurrent - 1, item.maxLvl);
    const expTotal = expRange.reduce((e1, e2) => e1 + e2, 0);
    const questUseAmount = expTotal / (item.exp * rate);
    const itemAmount = questUseAmount * item.amount
    const itemCost = itemAmount * item.zeny;
    lvlCurrent = ++item.maxLvl;
    console.log(item.name, itemAmount, itemCost)
  }
}