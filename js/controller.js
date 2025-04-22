const controller = {};

const INPUT_LEVEL_CURRENT = document.getElementById('lvlCurrent');
const INPUT_LEVEL_GOAL = document.getElementById('lvlGoal');
const INPUT_RATE = document.getElementById('rate');
const FORM_CALCULATOR = document.getElementById('formCalculator');
const DIV_QUEST_ITEMS = document.getElementById('questItems');
const TBODY_ITEM_BY_LVL = document.getElementById('itemByLvl');
const TBODY_ITEM_TOTAL = document.getElementById('itemsTotal');

function getItemQuestHasMoreExpAndPreferBuyable(itemsQuestAllowed) {
    itemsQuestAllowed.sort((i1, i2) => i2.exp < i1.exp || i1.zeny ? -1 : 1);
    return itemsQuestAllowed[0];
}

controller.getLevelCurrent = () => Number(INPUT_LEVEL_CURRENT.value);
controller.getLevelGoal = () => Number(INPUT_LEVEL_GOAL.value);
controller.getRate = () => Number(INPUT_RATE.value);
controller.getBaseExpList = (expTable) => [...db.BASE_EXP[expTable]];

controller.getIdItemsChecked = () => {
    const idItemsChecked = [];
    DIV_QUEST_ITEMS.querySelectorAll('input:checked').forEach(element => idItemsChecked.push(Number(element.id)));
    return idItemsChecked;
}

controller.getCurrentItemQuest = (lvlCurrent, lvlGoal) => {
    if (lvlCurrent > lvlGoal) return null;
    const idItemsChecked = controller.getIdItemsChecked();
    const itemsQuestAllowed = db.ITEMS_QUEST.filter(item => lvlCurrent >= item.minLvl && lvlCurrent <= item.maxLvl && idItemsChecked.includes(item.id));
    if (itemsQuestAllowed.length === 0) return null;
    return getItemQuestHasMoreExpAndPreferBuyable(itemsQuestAllowed);
}

controller.buildTemplateListItems = () => {
    return db.ITEMS_QUEST.reduce((template, item) => {
        return template + `
        <li class="item-quest">
            <img src="https://static.divine-pride.net/images/items/item/${item.id}.png"/>
            <input id="${item.id}" type="checkbox" ${db.DEFAULT_ITEMS.includes(item.id) ? "checked" : ""}/>
            <label for="${item.id}">${in18.translate(item.name)}</label>
        </li>`
    }, '<ul class="item-quest-container">') + "</ul>";
}

controller.buildTemplateItemsByLvl = (indexByLvl) => {
    return Object.entries(indexByLvl).reduce((template, [lvl, data]) => {
        return template + `<tr>
        <td>${lvl}</td>
        ${data.message
                ? `<td class="text-left" colspan="3">${data.message}</td>`
                : `<td class="text-left">
                    <img src="https://static.divine-pride.net/images/items/item/${data.item.id}.png"/>
                    <span>${in18.translate(data.item.name)}</span>
                   </td>
                   <td>${data.amount}</td>
                   <td>${data.cost}</td>`}
    </tr>`
    }, '');
}

controller.buildTemplateItemsTotal = (indexByTotal) => {
    return Object.entries(indexByTotal).reduce((template, [index, data]) => {
        return template + `<tr>
        <td class="text-left">
            <img src="https://static.divine-pride.net/images/items/item/${data.item.id}.png"/>
            <span>${in18.translate(data.item.name)}</span>
        </td>
        <td>${data.amount}</td>
        <td>${data.cost}</td>
    </tr>`
    }, '');
}

controller.loadInputList = (fnCalculate) => {
    const inputList = FORM_CALCULATOR.querySelectorAll('input');
    for (const input of inputList) {
        input.addEventListener('change', () => fnCalculate());
    }
}