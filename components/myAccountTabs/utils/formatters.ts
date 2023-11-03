export function formatDocumentByType(document: string) {
  switch (document.length) {
    case 11:
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    case 14:
      return document.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5",
      );
    default:
      return document;
  }
}

export function formatPhone(phone: string) {
  switch (phone.length) {
    case 10:
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    case 11:
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    default:
      return phone;
  }
}

export function formatBirthDate(birthDate: string) {
  return birthDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
}

export function returnOnlyFourCardDigits(cardNumber: string) {
  return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$4");
}

export const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export function formatGender(gender: string) {
  switch (gender) {
    case "male":
      return "Masculino"
    case "female":
      return "Feminino"
    default:
      return "Outro"
  }
}

export const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
