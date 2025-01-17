export default class AttachmentsInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .attachments {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 8px;
      }
      .attachment-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .attachment-item span {
        flex-grow: 1;
      }
      .attachment-item button {
        margin-left: 8px;
      }
    `;

    const container = document.createElement("div");
    container.className = "attachments";
    container.innerHTML = `
      <input type="text" id="attachmentInput" placeholder="Add attachment">
      <button type="button" id="addAttachment">Add</button>
      <ul id="attachmentList"></ul>
    `;

    const attachmentInput = container.querySelector(
      "#attachmentInput"
    ) as HTMLInputElement;
    const attachmentList = container.querySelector(
      "#attachmentList"
    ) as HTMLUListElement;
    const addAttachmentButton = container.querySelector(
      "#addAttachment"
    ) as HTMLButtonElement;

    addAttachmentButton.addEventListener("click", () => {
      const attachmentValue = attachmentInput.value.trim();
      if (attachmentValue) {
        const listItem = document.createElement("li");
        listItem.className = "attachment-item";
        listItem.innerHTML = `<span>${attachmentValue}</span><button type="button" class="removeAttachment">Remove</button>`;
        attachmentList.appendChild(listItem);
        attachmentInput.value = "";

        listItem
          .querySelector(".removeAttachment")
          ?.addEventListener("click", () => {
            listItem.remove();
          });
      }
    });

    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  getAttachments(): string[] {
    const shadow = this.shadowRoot;
    if (!shadow) return [];
    const attachmentList = shadow.querySelector(
      "#attachmentList"
    ) as HTMLUListElement;
    return Array.from(attachmentList.querySelectorAll("li span")).map(
      (span) => span.textContent || ""
    );
  }
}

if (!customElements.get("attachments-input")) {
  customElements.define("attachments-input", AttachmentsInput);
}
