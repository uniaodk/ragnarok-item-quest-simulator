const DRAG_ELEMENTS = document.getElementsByClassName("drag-drop");
const DRAG_DROP_ITEM = 'drag-drop-item';
const TOP = "top";
const BOTTOM = "bottom";
const RESET_BORDER_WIDTH = "";
const NEXT_BORDER_WIDTH = "4px";

const dragDrop = {};

dragDrop.lastItemOver = {};
dragDrop.getItems = () => document.getElementsByClassName(DRAG_DROP_ITEM);

function isDraggableElement(target) {
  return target.draggable && target.className === DRAG_DROP_ITEM;
}

function setBorderWidth(target, direction, width) {
  target.style[`border-${direction}-width`] = width;
}

function resetBordersWidth(target) {
  setBorderWidth(target, TOP, RESET_BORDER_WIDTH);
  setBorderWidth(target, BOTTOM, RESET_BORDER_WIDTH);
}

function isTargetOnTop(event, target) {
  const bounding = target.getBoundingClientRect();
  const offset = bounding.y + bounding.height / 2;
  return event.clientY - offset > 0;
}

function syncDragDropItemIndex() {
  let index = 0;
  for (const element of dragDrop.getItems()) {
    element.dataset.index = index++;
  }
}

dragDrop.init = function () {
  for (const element of DRAG_ELEMENTS) {

    element.addEventListener("dragstart", (event) => {
      if (!isDraggableElement(event.target)) {
        return event.preventDefault();
      }
      event.dataTransfer.effectAllowed = "move";
    });

    element.addEventListener("dragover", (event) => {
      event.preventDefault();
      const target = event.target;
      const lastItemOver = dragDrop.lastItemOver[element.id];
      if (target && target !== lastItemOver && isDraggableElement(target)) {
        if (lastItemOver) resetBordersWidth(lastItemOver);
        dragDrop.lastItemOver[element.id] = target;
        setBorderWidth(target, isTargetOnTop(event, target) ? TOP : BOTTOM, NEXT_BORDER_WIDTH);
      }
    });

    element.addEventListener("dragend", (event) => {
      event.preventDefault();
      const target = event.target;
      const lastItemOver = dragDrop.lastItemOver[element.id];
      if (target && target !== lastItemOver && lastItemOver.draggable && isDraggableElement(target)) {
        const nextTarget = isTargetOnTop(event, target) ? lastItemOver.nextSibling : lastItemOver;
        element.insertBefore(target, nextTarget);
        syncDragDropItemIndex();
        controller.calculate();
      }
      resetBordersWidth(lastItemOver);
    });
  }
}