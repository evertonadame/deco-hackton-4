interface ToastProps {
  variant: "success" | "error" | "warning";
  message: string;
}

const fadeOut = async (toast: HTMLElement) => {
  toast.classList.add("fade-out");
  await new Promise((resolve) => setTimeout(resolve, 300));
};

const closeToast = async (toast: HTMLElement) => {
  await fadeOut(toast);

  toast.classList.remove("flex");
  toast.classList.add("hidden");
  toast.classList.remove("fade-out");
};

export const showToast = ({
  variant,
  message,
}: ToastProps) => {
  const toast = document.getElementById("ui-toast");
  const toastCloseButton = toast?.querySelector("#toast-close-button");

  if (!toast || !toastCloseButton) return;

  toast.classList.add(variant);
  toastCloseButton.classList.add(variant);

  const toastMessage = toast.querySelector(".toast-message");

  if (!toastMessage || !toastCloseButton) return;

  toastCloseButton.addEventListener("click", () => {
    if (!toast) return;

    closeToast(toast);
  });

  toastMessage.innerHTML = message;
  toast.classList.remove("hidden");
  toast.classList.add("flex");

  setTimeout(() => {
    if (!toast) return;

    closeToast(toast);
  }, 2000);
};
