import Swal from "sweetalert2";

const Alerts = {
  success: (message: string) => {
    Swal.fire({
      text: message,
      icon: "success",
      confirmButtonColor: "#1437E9"
    });
  },

  error: (message: string) => {
    Swal.fire({
      text: message,
      icon: "error",
      confirmButtonColor: "#1437E9"
    });
  }
};

export default Alerts;
