import toast from "react-hot-toast";

export const toastError = (err: unknown) => {
  const message = err instanceof Error
    ? err.message
    : "Something went wrong";

  toast.error(message);
};

export const toastSuccess = (msg: string) => {
  toast.success(msg);
};
