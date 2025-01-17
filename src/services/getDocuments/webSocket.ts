const connect = () => {
  const socket = new WebSocket("ws://localhost:8080/notifications");
  let count = 0;

  socket.onopen = () => console.log("Conectado al servidor WebSocket");
  socket.onmessage = () => {
    count++;

    const container = document.querySelector("body");
    if (container) {
      let toast = document.querySelector("toast-alert") as any;
      if (!toast) {
        toast = document.createElement("toast-alert");
        container.appendChild(toast);
      }
      toast.alarmNumber = count.toString();
      toast.text = "New document added";
    }
  };
};

export default connect;
