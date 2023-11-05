import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

interface Props {}

function Toast({}: Props) {
  return (
    <div
      id="toast-success"
      className="items-center w-fit px-4 py-2 border bg-green-50 border-green-400 text-green-800 rounded-lg fixed top-6 left-0 right-0 mx-auto lg:top-24 z-50 hidden shadow-lg gap-4"
      role="alert"
    >
      <div className="text-sm font-normal toast-message">
        Item moved successfully.
      </div>
      <button
        type="button"
        className="stroke-green-400 hover:stroke-green-600 rounded-lg p-2 hover:bg-green-100 inline-flex items-center justify-center duration-200"
        data-dismiss-target="#toast-success"
        id="toast-close-button"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <Icon id="XMark" size={24} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default Toast;
