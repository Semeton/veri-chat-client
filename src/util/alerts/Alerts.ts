import Swal from "sweetalert2";
import "./style.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  width: "70%",
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: "colored-toast",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const Alerts = {
  success: (message: string) => {
    Toast.fire({
      title: message,
      icon: "success",
    });
  },

  error: (message: string) => {
    Toast.fire({
      title: message,
      icon: "error",
    });
  },

  info: (message: string) => {
    Toast.fire({
      title: message,
      icon: "info",
      iconColor: "#6366f1",
    });
  },
};

export default Alerts;
