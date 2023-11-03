import { Order } from "../../../sections/Account/MyAccount.tsx";

type StatusBadgeProps =
  Order["deliveries"][number]["history"][number]["status"];

const StatusBadge = ({ status }: {
  status: StatusBadgeProps;
}) => {
  const getStatusColor = (status: StatusBadgeProps) => {
    switch (status) {
      case "ready-to-handle":
        return "bg-slate-500";
      case "shipped":
        return "bg-yellow-500";
      case "delivered":
        return "bg-green-500";
      case "canceled":
        return "bg-red-500";
      case "returned":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return <div className={`w-6 h-6 rounded-full ${getStatusColor(status)}`} />;
};

export default StatusBadge;
