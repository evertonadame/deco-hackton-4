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
