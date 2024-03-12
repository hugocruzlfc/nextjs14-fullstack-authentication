import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function catchErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const { response } = error;
    if (response) {
      toast.error(response.data.error);
    }
  } else {
    toast.error((error as Error).message);
  }
}
