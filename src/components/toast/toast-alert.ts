interface AlertCounter {
  text: string;
  alarmNumber: string;
}

export default class ToastAlert extends HTMLElement {
  private toastAlert: AlertCounter = { text: "", alarmNumber: "0" };

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
        .toastAlert {
          position: fixed;
          top: 3%;
          left: 50%;
          transform: translate(5%, -50%);
          border-radius: 24px;
          padding: 8px 16px;
          display: flex;
          font-family: Arial, sans-serif;
          align-items: center;
          background-color: white;
        }
        .toastAlert img {
          width: 16px;
          height: 16px;
        }
        .text {
          margin-left: 12px;
          font-size: 11px;
        }
        .counter {
          background-color: blue;
          color: white;
          border: 1px solid white;
          border-radius: 50%;
          min-width: 10px;
          height: 10px;
          font-size: 6px;
          font-family: Arial, sans-serif;
          display: flex; 
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 4px;
          left: 25px;
          padding:2px
        }
      `;

    shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  setDocuments(toastAlert: AlertCounter) {
    this.toastAlert = toastAlert;
    this.render();
  }

  set alarmNumber(value: string) {
    this.toastAlert.alarmNumber = value;
    this.updateAlarmNumber();
  }

  get alarmNumber() {
    return this.toastAlert.alarmNumber;
  }

  set text(value: string) {
    this.toastAlert.text = value;
    this.updateText();
  }

  get text() {
    return this.toastAlert.text;
  }

  private updateAlarmNumber() {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const counterElement = shadow.querySelector(".counter");
    if (counterElement) {
      counterElement.textContent = this.toastAlert.alarmNumber;
    }
  }

  private updateText() {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const textElement = shadow.querySelector(".text");
    if (textElement) {
      textElement.textContent = this.toastAlert.text;
    }
  }

  private render() {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    shadow.querySelector(".toastAlert")?.remove();

    const toastElement = document.createElement("div");
    toastElement.className = "toastAlert";
    toastElement.setAttribute("role", "alert");
    toastElement.innerHTML = `<img src="/assets/bell.svg" alt="Bell Icon"><span class="counter">${this.toastAlert.alarmNumber}</span> <span class="text">${this.toastAlert.text}</span>`;

    shadow.appendChild(toastElement);
  }
}
