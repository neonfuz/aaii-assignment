export function formatMoney(decimalPlaces = 2) {
  const intl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces
  });
  return amount => {
    if (isNaN(amount))
      console.log(amount);
    return intl.format(amount)
  };
}

export function filterNull(item) {
  return item ?? '';
}
