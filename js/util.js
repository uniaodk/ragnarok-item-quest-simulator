const util = {};

util.toNode = (tagText) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = tagText;
  return tempDiv.firstChild;
}

util.formatCurrency = (amount, locale = 'pt-BR') => {
  return new Intl.NumberFormat(locale).format(amount);
}