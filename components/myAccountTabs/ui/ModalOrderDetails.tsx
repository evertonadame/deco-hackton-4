import type { Order } from "$store/sections/Account/MyAccount.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import {
  dateFormatter,
  priceFormatter,
} from "$store/components/myAccountTabs/utils/formatters.ts";
import { getStatusLabel } from "$store/components/myAccountTabs/utils/orderDetails.ts";
import Image from "apps/website/components/Image.tsx";

interface OrderDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  order?: Order;
}

function ModalOrderDetails({ isOpen, closeModal, order }: OrderDetailsProps) {
  return isOpen && order ? (
    <div className="bg-white flex flex-col gap-10">
      <div className="flex gap-2 items-center text-lg lg:text-xl">
        <button className="p-1" onClick={closeModal}>
          <Icon id="ChevronLeft" size={24} strokeWidth={2} />
        </button>
        Pedido <span className="font-bold text-accent">{order.id}</span>
      </div>
      <div className="text-md lg:text-lg">
        <p>
          <span className="font-semibold">Data:</span>{" "}
          {dateFormatter.format(new Date(order.date))}
        </p>
        <p>
          <span className="font-semibold">Valor total:</span>{" "}
          {priceFormatter.format(order.price)}
        </p>
        <p>
          <span className="font-semibold">status:</span>{" "}
          {getStatusLabel(order.status)}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {order.items.map((item) => (
          <div className="flex gap-6 border border-slate-200 p-2 lg:p-5">
            <div className="w-full max-w-[150px]">
              <Image
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                class="h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 text-base">
              <p className="font-semibold mb-2">{item.name}</p>
              <p>Quantidade: {item.quantity}</p>
              <p>Valor: {priceFormatter.format(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}

export default ModalOrderDetails;
