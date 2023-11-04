import type { Order } from "$store/sections/Account/MyAccount.tsx";

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "approved":
      return "Aprovado";
    case "canceled":
      return "Cancelado";
    default:
      return status;
  }
};

export const getPaymentMethodLabel = (
  paymentMethod: Order["paymentMethod"],
) => {
  switch (paymentMethod) {
    case "boleto":
      return "Boleto";
    case "creditCard":
      return "Cartão de crédito";
    case "debitCard":
      return "Cartão de débito";
    case "pix":
      return "PIX";
    case "voucher":
      return "VOUCHER";
  }
};
