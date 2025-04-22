const INPUT_LEVEL_CURRENT = document.getElementById('lvlCurrent');
const INPUT_LEVEL_GOAL = document.getElementById('lvlGoal');
const INPUT_RATE = document.getElementById('rate');
const FORM_CALCULATOR = document.getElementById('formCalculator');

function getLevelCurrent() {
    return Number(INPUT_LEVEL_CURRENT.value)
}
function getLevelGoal() {
    return Number(INPUT_LEVEL_GOAL.value)
}
function getRate() {
    return Number(INPUT_RATE.value)
}

function getBaseExpList(expTable) {
    console.log()
    return [...BASE_EXP[expTable]];
}

function getCurrentItemQuest(lvlCurrent, lvlGoal) {
    if (lvlCurrent > lvlGoal) return null;
    const itemsQuestAllowed = ITEMS_QUEST.filter(item => lvlCurrent >= item.minLvl && lvlCurrent <= item.maxLvl);
    if (itemsQuestAllowed.length === 0) return null;
    itemsQuestAllowed.sort((i1, i2) => i1.exp > i2.exp && i1.zeny ? 1 : -1);
    return itemsQuestAllowed[0];
}

