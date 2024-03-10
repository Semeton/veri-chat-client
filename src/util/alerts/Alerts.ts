import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
// Toast.fire({
//   icon: "success",
//   title: "Signed in successfully"
// });

const Alerts = {
  success: (message: string) => {
    Toast.fire({
      title: message,
      icon: "success",
      // confirmButtonColor: "rgb(79 70 229)",
    });
  },

  error: (message: string) => {
    Toast.fire({
      title: message,
      icon: "error",
      // confirmButtonColor: "rgb(79 70 229)",
    });
  },
};

export default Alerts;
