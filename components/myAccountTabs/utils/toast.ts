interface ToastProps {
  variant: "success" | "error" | "warning";
  message: string;
}

const closeToast = (toast: HTMLElement) => {
  toast.classList.remove("flex");
  toast.classList.add("hidden");
};

export const showToast = ({
  variant,
  message,
}: ToastProps) => {
  let toast: HTMLElement | null;

  switch (variant) {
    case "success":
      toast = document.getElementById("toast-success");
      break;
    case "error":
      toast = document.getElementById("toast-danger");
      break;
    case "warning":
      toast = document.getElementById("toast-warning");
      break;
  }

  if (!toast) return;

  const toastMessage = toast.querySelector(".toast-message");
  const closeToasterButton = toast.querySelector("#toast-close-button");

  if (!toastMessage || !closeToasterButton) return;

  closeToasterButton.addEventListener("click", () => {
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
