const controller = {};

const INPUT_LEVEL_CURRENT = document.getElementById('baseLvlCurrent');
const INPUT_LEVEL_GOAL = document.getElementById('baseLvlGoal');
const INPUT_PERC_LEVEL_CURRENT = document.getElementById('basePercCurrent');
const INPUT_PERC_LEVEL_GOAL = document.getElementById('basePercGoal');
const INPUT_RATE = document.getElementById('rate');
const FORM_CALCULATOR = document.getElementById('formCalculator');
const DIV_QUEST_ITEMS = document.getElementById('questItems');
const TBODY_ITEM_BY_LVL = document.getElementById('itemByLvl');
const TBODY_ITEM_TOTAL = document.getElementById('itemsTotal');
const INPUT_JOB_LVL_GOAL = document.getElementById('jobLvlGoal');

function truncateByMinMax(event) {
    const min = Number(event.target.min);
    const max = Number(event.target.max);
    const value = Number.isNaN(event.target.value) ? 0 : Number(event.target.value);
    event.target.value = controller.truncateByMinMax(value, min, max);
}

function truncateByGoal(event, goal) {
    const currentValue = Number.isNaN(event.target.value) ? 0 : Number(event.target.value);
    const goalValue = Number.isNaN(goal.value) ? 0 : Number(goal.value);
    event.target.value = Math.min(currentValue, goalValue - 1);
}

function truncateByCurrent(event, current) {
    const goalValue = Number.isNaN(event.target.value) ? 0 : Number(event.target.value);
    const currentValue = Number.isNaN(current.value) ? 0 : Number(current.value);
    event.target.value = Math.max(currentValue + 1, goalValue);
}

function changeExpTable(event) {
    const newMaxJobLvl = db.MAX_JOB_LVL[event.target.value];
    INPUT_JOB_LVL_GOAL.max = newMaxJobLvl;
    INPUT_JOB_LVL_GOAL.value = newMaxJobLvl;
}

function blockOthersExpBuster(event, expBusters) {
    for (const element of expBusters) {
        element.checked = event.target.checked ? false : element.checked;
        element.disabled = event.target.checked;
    }
}

controller.calculate = () => {
    let inputExpTableChecked = document.querySelector('input[name="exp_table"]:checked');
    const indexItemQuestUsageByBaseLvl = controller.calculateBaseExp(inputExpTableChecked.value);

    TBODY_ITEM_BY_LVL.innerHTML = controller.buildTemplateItemsByLvl(indexItemQuestUsageByBaseLvl);
    const indexByItemQuestTotal = Object.values(indexItemQuestUsageByBaseLvl).reduce((index, itemByLvl) => {
        if (!itemByLvl.item) return index;
        index[itemByLvl.item.index] = index[itemByLvl.item.index] || { item: itemByLvl.item, amount: 0, cost: 0 };
        index[itemByLvl.item.index].amount += itemByLvl.amount;
        index[itemByLvl.item.index].cost += itemByLvl.cost;
        return index;
    }, {});
    controller.roundAmountItems(indexByItemQuestTotal);
    TBODY_ITEM_TOTAL.innerHTML = controller.buildTemplateItemsTotal(indexByItemQuestTotal);
}

controller.roundAmountItems = (indexByItemQuestTotal) => {
    for (const [index, value] of Object.entries(indexByItemQuestTotal)) {
        const moduleAmount = indexByItemQuestTotal[index].amount % value.item.amount;
        indexByItemQuestTotal[index].amount += value.item.amount - moduleAmount;
        indexByItemQuestTotal[index].cost = parseFloat((indexByItemQuestTotal[index].amount * (value.item.zeny || 0)).toFixed(2));
    }
}

controller.calculateBaseExp = (expTable) => {
    let baseLvlCurrent = controller.getLevelCurrent();
    let baseLvlGoal = controller.getLevelGoal();
    let currentItemQuest = controller.getCurrentItemQuest(baseLvlCurrent, baseLvlGoal);
    let baseExpList = controller.getExpList(expTable, "base");
    let expRequestedByLvl = controller.calculatePercentagemLvlCurrent(baseExpList[baseLvlCurrent - 1]);

    const indexItemQuestUsageByBaseLvl = {};
    while (baseLvlCurrent <= baseLvlGoal) {
        if (currentItemQuest) {
            const questUsageAmount = parseFloat(expRequestedByLvl / controller.calculateItemBaseExp(currentItemQuest)).toFixed(2);
            const itemAmount = parseFloat((questUsageAmount * currentItemQuest.amount).toFixed(2));
            const itemCost = parseFloat((itemAmount * (currentItemQuest.zeny || 0)).toFixed(2));
            indexItemQuestUsageByBaseLvl[baseLvlCurrent] = { item: currentItemQuest, amount: itemAmount, cost: itemCost };
        } else {
            indexItemQuestUsageByBaseLvl[baseLvlCurrent] = { message: message.NOT_FOUND_QUEST };
        }
        currentItemQuest = controller.getCurrentItemQuest(++baseLvlCurrent, baseLvlGoal);
        expRequestedByLvl = baseExpList[baseLvlCurrent - 1];
        if (baseLvlCurrent === baseLvlGoal) expRequestedByLvl = controller.calculatePercentagemLvlGoal(expRequestedByLvl);
    }
    return indexItemQuestUsageByBaseLvl;
}

controller.getLevelCurrent = () => Number(INPUT_LEVEL_CURRENT.value);
controller.getLevelGoal = () => Number(INPUT_LEVEL_GOAL.value);
controller.getPercLvlCurrent = () => Number(INPUT_PERC_LEVEL_CURRENT.value);
controller.getPercLvlGoal = () => Number(INPUT_PERC_LEVEL_GOAL.value);
controller.getRate = () => Number(INPUT_RATE.value);
controller.getExpList = (expTable, type) => [...db.EXP_TABLE[expTable][type]];
controller.truncateByMinMax = (value, min, max) => Math.max(min, Math.min(max, value));
controller.calculatePercentagemLvlCurrent = (expRequestedByLvl) => expRequestedByLvl * (1 - controller.getPercLvlCurrent() / 100);
controller.calculatePercentagemLvlGoal = (expRequestedByLvl) => expRequestedByLvl * (controller.getPercLvlGoal() / 100);

controller.calculateItemBaseExp = (item) => {
    let rate = controller.getRate();
    const exp200 = document.getElementById('exp200').checked ? 2 : 0;
    const base50 = document.getElementById('base50').checked ? .5 : 0;
    const base30 = document.getElementById('base30').checked ? .3 : 0;
    const shareClan = document.getElementById('shareExpClan').checked ? -.5 : 0;
    return (item.exp * rate) * (1 + [exp200, base50, base30, shareClan].reduce((exp1, exp2) => exp1 + exp2));
}

controller.getItemsChecked = () => {
    const itemsChecked = [];
    const dragDropsItems = dragDrop.getItems();
    for (const elementItem of dragDropsItems) {
        if (!elementItem.querySelector("#item-checked").checked) continue;
        const item = db.ITEMS_QUEST.find(item => item.id === Number(elementItem.id));
        if (!item) continue;
        item.index = Number(elementItem.dataset.index);
        item.zeny = Number(elementItem.querySelector("#item-zeny").value);
        itemsChecked.push(item);
    }
    return itemsChecked;
}

controller.getCurrentItemQuest = (baseLvlCurrent, baseLvlGoal) => {
    if (baseLvlCurrent > baseLvlGoal) return null;
    const itemsChecked = controller.getItemsChecked();
    const itemsQuestAllowed = itemsChecked.filter(item => baseLvlCurrent >= item.minLvl && baseLvlCurrent <= item.maxLvl);
    if (itemsQuestAllowed.length === 0) return null;
    return controller.getFirstItemByOrder(itemsQuestAllowed);
}

controller.getFirstItemByOrder = (itemsQuestAllowed) => {
    itemsQuestAllowed.sort((i1, i2) => i2.index < i1.index ? 1 : -1);
    return itemsQuestAllowed[0];
}

controller.loadInputList = () => {
    const inputList = FORM_CALCULATOR.querySelectorAll('input');
    const selectList = FORM_CALCULATOR.querySelectorAll('select');
    for (const element of [...inputList, ...selectList]) {
        element.addEventListener('change', () => controller.calculate());
    }
}

controller.buildTemplateListItems = () => {
    return db.ITEMS_QUEST.reduce((template, item) => {
        return template + `
        <div class="drag-drop-item" draggable=true data-index="${item.index}" id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
                <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            <div class="form-check">
                <input class="form-check-input pointer" id="item-checked" type="checkbox" ${db.DEFAULT_ITEMS.includes(item.id) ? "checked" : ""}/>
                <label class="form-check-label" for="${item.id}">
                    <img src="https://static.divine-pride.net/images/items/item/${item.id}.png"/>
                    <span>${in18.translate(item.name)}</span>
                </label>
            </div>
            <div class="flex-fill d-flex justify-content-end">
                <div class="input-group me-2 mw-120px">
                    <span class="input-group-text">$</span>
                    <input id="item-zeny" type="number" class="form-control form-control-sm" value="${item.zeny}">
                </div>
                <small class="badge badge-lvl text-bg-primary text-end">
                    <small>Min: ${item.minLvl}</small><br>
                    <small>Max: ${item.maxLvl}</small>
                </small>
            </div>
        </div>`
    }, '<div class="drag-drop" id="item-list-quest">') + "</div>";
}

controller.buildTemplateItemsByLvl = (indexByLvl) => {
    return Object.entries(indexByLvl).reduce((template, [lvl, data]) => {
        return template + `<tr>
        <td>${lvl}</td>
        ${data.message
                ? `<td class="text-left" colspan="3">${data.message}</td>`
                : `<td class="text-left">
                        <img src="https://static.divine-pride.net/images/items/item/${data.item.id}.png"/>
                        <a href="https://ratemyserver.net/item_db.php?item_id=${data.item.id}&small=1&back=1" target="_blank">
                            ${in18.translate(data.item.name)}
                        </a>
                   </td>
                   <td>${util.formatCurrency(data.amount)}</td>
                   <td>${util.formatCurrency(data.cost)}</td>`}
    </tr>`
    }, '');
}

controller.buildTemplateItemsTotal = (indexByTotal) => {
    const templateItemsTh = Object.entries(indexByTotal).reduce((template, [index, data]) => {
        const npcLocation = data.item.buyLocation ? `<kbd class="user-select-all">/navi ${data.item.buyLocation}</kbd>` : "Não é vendido em NPC"
        return template + `<tr>
        <td class="text-left">
            <img src="https://static.divine-pride.net/images/items/item/${data.item.id}.png"/>
            <a href="https://ratemyserver.net/item_db.php?item_id=${data.item.id}&small=1&back=1" target="_blank">
                ${in18.translate(data.item.name)}
            </a>
        </td>
        <td>${npcLocation}</td>
        <td>${util.formatCurrency(data.amount)}</td>
        <td>${util.formatCurrency(data.cost)}</td>
    </tr>`
    }, '');
    const totalCost = Object.entries(indexByTotal).reduce((total, [index, data]) => total + data.cost, 0);
    return templateItemsTh + `<tr>
        <td colspan="3"><b>Total Zeny</b></td>
        <td>${util.formatCurrency(totalCost)}</td>
    </tr>`;
}