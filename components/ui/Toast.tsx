import Icon from "$store/components/ui/Icon.tsx";

function Toast() {
  return (
    <div
      id="ui-toast"
      className="items-center w-fit px-4 py-2 border rounded-lg fixed top-6 left-0 right-0 mx-auto lg:top-24 z-50 hidden shadow-lg gap-4 duration-300 opacity-100"
      role="alert"
    >
      <div className="text-sm font-normal toast-message">
        Toast default message.
      </div>
      <button
        type="button"
        className="rounded-lg p-2 inline-flex items-center justify-center duration-200"
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
