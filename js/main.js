window.onload = function () {
  DIV_QUEST_ITEMS.appendChild(util.toNode(controller.buildTemplateListItems()));
  controller.loadInputList();
  controller.calculate();
  dragDrop.init();
};