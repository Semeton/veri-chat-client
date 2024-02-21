let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

function showInstallButton() {
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";
  installButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the installation prompt");
      } else {
        console.log("User dismissed the installation prompt");
      }
      deferredPrompt = null;
    });
  });
}
