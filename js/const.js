const INPUT_LEVEL_CURRENT = document.getElementById('lvlCurrent');
const INPUT_LEVEL_GOAL = document.getElementById('lvlGoal');
const INPUT_RATE = document.getElementById('rate');
const FORM_CALCULATOR = document.getElementById('formCalculator');

const HAZELNUT_AMOUNT = document.getElementById('hazelnut_amount');
const HAZELNUT_ZENY = document.getElementById('hazelnut_zeny');

function input_level_current() {
    return Number(INPUT_LEVEL_CURRENT.value)
}
function input_level_goal() {
    return Number(INPUT_LEVEL_GOAL.value)
}
function input_level_rate() {
    return Number(INPUT_RATE.value)
}


function hazelnut_amount(zeny) {
    HAZELNUT_AMOUNT.innerHTML = zeny
}
function hazelnut_zeny(zeny) {
    HAZELNUT_ZENY.innerHTML = zeny
}

