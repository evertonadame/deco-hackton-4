import { Order } from "../../../sections/Account/MyAccount.tsx";
import { translateStatus } from "../utils/formatters.ts";
import StatusBadge from "./StatusBadge.tsx";

type OrderDetailsProps = Order["deliveries"][number]["history"];

const OrderDetails = ({ history }: {
  history: OrderDetailsProps;
}) => {
  return (
    <div className="flex flex-row flex-wrap w-full gap-2">
      {history.map((item, index) => {
        const isLast = index === history.length - 1;

        return (
          <div key={index} className="flex items-center mt-2">
            <StatusBadge status={item.status} />
            <span className="ml-2">{translateStatus(item.status)}</span>
            {!isLast && <div className="flex-1 h-0.5 bg-slate-200 ml-2 w-4" />}
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetails;
