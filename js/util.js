const util = {};

util.toNode = (tagText) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = tagText;
  return tempDiv.firstChild;
}