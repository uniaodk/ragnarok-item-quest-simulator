MESSAGE = {
    insufficient_level: function(levelCurrent, item) {
        console.log(`Level insuficiente. Faltam ${item.minLvl - levelCurrent} levels para utilizar o item ${item.name}!`);
    }
}