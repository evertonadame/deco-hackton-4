import type { User, Order } from "$store/sections/Account/MyAccount.tsx";
import {
  dateFormatter,
  priceFormatter,
} from "$store/components/myAccountTabs/utils/formatters.ts";
import ModalOrderDetails from "$store/components/myAccountTabs/ui/ModalOrderDetails.tsx";
import { useState } from "preact/hooks";
import { getStatusLabel } from "$store/components/myAccountTabs/utils/orderDetails.ts";

export interface Props extends Partial<User> {}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-amber-400";
    case "approved":
      return "bg-green-400";
    case "canceled":
      return "bg-red-400";
    default:
      return status;
  }
};

function MyOrdersTab({ orders = [] }: Props) {
  const [modalOrderDetails, setModalOrderDetails] = useState<{
    isOpen: boolean;
    order?: Order;
  }>({
    isOpen: false,
    order: undefined,
  });

  const closeModalOrderDetails = () => {
    setModalOrderDetails({ isOpen: false, order: undefined });
  };

  const handleViewOrderDetails = (order: Order) => {
    setModalOrderDetails({ isOpen: true, order });
  };

  if (!orders.length)
    return (
      <div className="flex justify-center w-full">
        <h3 className="text-base text-center text-slate-600">
          Você ainda não realizou nenhum pedido.
        </h3>
      </div>
    );

  return modalOrderDetails.isOpen ? (
    <ModalOrderDetails
      isOpen={modalOrderDetails.isOpen}
      closeModal={closeModalOrderDetails}
      order={modalOrderDetails.order}
    />
  ) : (
    <div className="relative overflow-x-auto">
      <table className="w-full text-base text-left text-slate-600 border border-slate-200">
        <thead className="text-base-600 text-xs font-semibold bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nº DO PEDIDO
            </th>
            <th scope="col" className="px-6 py-3">
              DATA
            </th>
            <th scope="col" className="px-6 py-3">
              VALOR
            </th>
            <th scope="col" className="px-6 py-3">
              STATUS
            </th>
            <th scope="col" className="px-6 py-3">
              DETALHES
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const { id, date, price, status } = order;

            return (
              <tr
                className={
                  index !== orders.length - 1 ? "border-b border-slate-200" : ""
                }
              >
                <th className="px-6 py-4 font-normal">{id}</th>
                <td className="px-6 py-4">
                  {dateFormatter.format(new Date(date))}
                </td>
                <td className="px-6 py-4">{priceFormatter.format(price)}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${getStatusColor(status)}`}
                  />
                  {getStatusLabel(status)}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-accent hover:underline"
                    onClick={() => handleViewOrderDetails(order)}
                  >
                    Visualizar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrdersTab;
