import { Order } from "../../../sections/Account/MyAccount.tsx";

type StatusBadgeProps =
  Order["deliveries"][number]["history"][number]["status"];

const StatusBadge = ({ status }: { status: StatusBadgeProps }) => {
  const getStatusColor = (status: StatusBadgeProps) => {
    switch (status) {
      case "ready-to-handle":
        return "bg-slate-400";
      case "shipped":
        return "bg-yellow-400";
      case "delivered":
        return "bg-green-400";
      case "canceled":
        return "bg-red-400";
      case "returned":
        return "bg-purple-400";
      default:
        return "bg-gray-400";
    }
  };

  return <div className={`w-5 h-5 rounded-full ${getStatusColor(status)}`} />;
};

export default StatusBadge;
