import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export const toastMessage = ({ message, type }) => {
  toast(message, { type: toast.TYPE.ERROR });
};
export const toastMessageWarning = ({ message, type }) => {
  toast(message, { type: toast.TYPE.WARNING });
};
export const toastMessageSuccess = ({ message, type }) => {
  toast(message, { type: toast.TYPE.SUCCESS });
};
