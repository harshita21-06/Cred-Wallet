export function getCardType(number) {
  if (!number) return "nothing";
  const n = number.replace(/\D/g, "");
  // RuPay: 6521, 6522, 6528, 508, 606985, 608, 607, 60, 65, 81, 82, 60, 50, 60, 65, 81, 82
  if (/^(6521|6522|6528|508|606985|608|607|60|65|81|82)[0-9]{10,12}$/.test(n))
    return "rupay";
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(n)) return "visa";
  if (/^5[1-5][0-9]{14}$/.test(n)) return "mastercard";
  if (/^3[47][0-9]{13}$/.test(n)) return "amex";
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(n)) return "discover";
  if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(n)) return "dinersclub";
  if (/^35(?:2[89]|[3-8][0-9])[0-9]{12}$/.test(n)) return "jcb";
  return "nothing";
}
