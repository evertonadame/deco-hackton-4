export const maskCreditCardNumber = (number: string) => {
  return number
    .replace(/\D/g, "")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2")
    .replace(/(\d{4})(\d)/, "$1 $2");
};

export const maskCreditCardValidity = (validity: string) => {
  return validity.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
};

export const maskCreditCardExpiration = (expiration: string) => {
  const digitsOnly = expiration.replace(/\D/g, "");
  const month = digitsOnly.slice(0, 2);
  const year = digitsOnly.slice(2, 4);
  return `${month}/${year}`;
};
