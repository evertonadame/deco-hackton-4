import type { Order, User } from "$store/sections/Account/MyAccount.tsx";
import {
  dateFormatter,
  priceFormatter,
} from "$store/components/myAccountTabs/utils/formatters.ts";
import OrderDetails from "$store/components/myAccountTabs/common/OrderDetails.tsx";
import { getStatusLabel } from "$store/components/myAccountTabs/utils/orderDetails.ts";
import { useSignal } from "@preact/signals";

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
  const orderDetails = useSignal<{
    isOpen: boolean;
    order?: Order;
  }>({
    isOpen: false,
    order: undefined,
  });
  const closeOrderDetails = () => {
    orderDetails.value = { isOpen: false, order: undefined };
  };

  const handleViewOrderDetails = (order: Order) => {
    orderDetails.value = { isOpen: true, order };
  };

  if (!orders.length) {
    return (
      <div className="flex justify-center w-full">
        <h3 className="text-base text-center text-slate-600">
          Você ainda não realizou nenhum pedido.
        </h3>
      </div>
    );
  }

  console.log(
    "🚀 ~ file: MyOrdersTab.tsx:27 ~ MyOrdersTab ~ orderDetails:",
    orderDetails.value
  );

  return orderDetails.value.isOpen ? (
    <OrderDetails
      isOpen={orderDetails.value.isOpen}
      closeModal={closeOrderDetails}
      order={orderDetails.value.order}
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
