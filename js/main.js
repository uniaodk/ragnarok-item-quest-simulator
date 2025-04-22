window.onload = function () {
  DIV_QUEST_ITEMS.appendChild(util.toNode(controller.buildTemplateListItems()));
  controller.loadInputList(calculate.bind(this));
  calculate();
};

function calculate() {
  let inputExpTableChecked = document.querySelector('input[name="exp_table"]:checked');
  let lvlCurrent = controller.getLevelCurrent();
  let lvlGoal = controller.getLevelGoal();
  let rate = controller.getRate();
  let baseExpList = controller.getBaseExpList(inputExpTableChecked.value);
  let currentItemQuest = controller.getCurrentItemQuest(lvlCurrent, lvlGoal);

  const indexItemQuestUsageByLvl = {};
  while (lvlCurrent < lvlGoal) {
    let expRequestedByLvl = baseExpList[lvlCurrent - 1];
    if (currentItemQuest) {
      const questUsageAmount = parseFloat(expRequestedByLvl / (currentItemQuest.exp * rate)).toFixed(2);
      const itemAmount = parseFloat((questUsageAmount * currentItemQuest.amount).toFixed(2));
      const itemCost = parseFloat((itemAmount * (currentItemQuest.zeny || 0)).toFixed(2));
      indexItemQuestUsageByLvl[lvlCurrent] = { item: currentItemQuest, amount: itemAmount, cost: itemCost };
    } else {
      indexItemQuestUsageByLvl[lvlCurrent] = { message: message.NOT_FOUND_QUEST };
    }
    currentItemQuest = controller.getCurrentItemQuest(++lvlCurrent, lvlGoal);
  }
  TBODY_ITEM_BY_LVL.innerHTML = controller.buildTemplateItemsByLvl(indexItemQuestUsageByLvl);
  const indexByItemQuestTotal = Object.values(indexItemQuestUsageByLvl).reduce((index, itemByLvl) => {
    if (!itemByLvl.item) return index;
    index[itemByLvl.item.index] = index[itemByLvl.item.index] || { item: itemByLvl.item, amount: 0, cost: 0 };
    index[itemByLvl.item.index].amount += itemByLvl.amount;
    index[itemByLvl.item.index].cost += itemByLvl.cost;
    return index;
  }, {});
  TBODY_ITEM_TOTAL.innerHTML = controller.buildTemplateItemsTotal(indexByItemQuestTotal);
}
