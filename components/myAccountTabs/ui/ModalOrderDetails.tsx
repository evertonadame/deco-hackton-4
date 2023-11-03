import type { Order } from "$store/sections/Account/MyAccount.tsx";

interface OrderDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  order?: Order;
}

function ModalOrderDetails({ isOpen, closeModal, order }: OrderDetailsProps) {
  return isOpen && order ? (
    <div className="absolute top-0 left-0 w-full h-full bg-white">
      <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
      <p className="mb-4">Modal content goes here.</p>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  ) : null;
}

export default ModalOrderDetails;
