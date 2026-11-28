import axios from "axios";
import toast from "react-hot-toast";

export const toastError = (
  err: unknown,
  fallbackMessage = "Something went wrong",
) => {
  toast.error(getErrorMessage(err, fallbackMessage));
};

export const toastSuccess = (msg: string) => {
  toast.success(msg);
};


function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (typeof error === "string") {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const responseData: unknown = error.response?.data;
    if (
      typeof responseData === "object" &&
      responseData !== null &&
      "message" in responseData
    ) {
      return String(responseData.message);
    }
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }

  return fallbackMessage;
}