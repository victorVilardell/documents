import "./attachments-input";
import "./contributors-input";
import validateDocument from "../../utilities/validateDocument";
import { getItem, setItem } from "../../utilities/localStorageUtil";
import { convertDateToISO } from "../../utilities/dateUtils";

export default class DocumentForm extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .modal {
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: fixed;
        top: 50%;
        left: 50%;
        min-width: 400px;
        transform: translate(-50%, -50%);
        background: white;
        padding: 16px;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        border-radius: 8px;
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      label {
        font-family: Arial, sans-serif;
        display: flex;
        flex-direction: column;
      }
      label[group="dates"] {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }
      label[group="dates"] label {
        flex: 1;
      }
      input, button {
        padding: 8px;
        font-family: Arial, sans-serif;
      }
      .error {
        color: red;
        font-size: 12px;
      }
    `;

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.addEventListener("click", () => this.closeModal());

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
    <h4>New Document</h4>
      <form>
        <label for="title">Title:
            <input type="text" id="documentTitle" name="title" required>
        </label>
        <label for="version">Version:
            <input type="text" id="documentVersion" name="version" pattern="\\d+\\.\\d+\\.\\d+" placeholder="00.00.00" required>
        </label>
        <label group="dates">
            <label for="createdAt">Document created:
                <input type="date" id="documentCreated" name="createdAt" required>
            </label>
            <label for="updatedAt">Document updated:
                <input type="date" id="documentUpdated" name="updatedAt">
            </label>
        </label>
        <label for="attachments">Attachments:
            <attachments-input></attachments-input>
        </label>
        <label for="contributors">Contributors:
            <contributors-input></contributors-input>
        </label>
        <div class="error" id="errorMessages"></div>
        <button type="submit">Add Document</button>
      </form>
    `;

    modal.querySelector("form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const documentTitle = (
        modal.querySelector("#documentTitle") as HTMLInputElement
      ).value;
      const documentVersion = (
        modal.querySelector("#documentVersion") as HTMLInputElement
      ).value;
      const documentCreated = (
        modal.querySelector("#documentCreated") as HTMLInputElement
      ).value;
      const documentUpdated = (
        modal.querySelector("#documentUpdated") as HTMLInputElement
      ).value;
      const attachmentsInput = modal.querySelector("attachments-input");
      const attachments = attachmentsInput
        ? (attachmentsInput as any).getAttachments()
        : [];
      const contributorsInput = modal.querySelector("contributors-input");
      const contributors = contributorsInput
        ? (contributorsInput as any).getContributors()
        : [];

      try {
        if (
          isNaN(Date.parse(documentCreated)) ||
          (documentUpdated && isNaN(Date.parse(documentUpdated)))
        ) {
          throw new Error("Invalid date format.");
        }

        const newDocument = {
          ID: generateRandomId(),
          Title: documentTitle,
          Version: documentVersion,
          CreatedAt: convertDateToISO(documentCreated),
          UpdatedAt: documentUpdated
            ? convertDateToISO(documentUpdated)
            : undefined,
          Attachments: attachments,
          Contributors: contributors,
        };

        const errors = validateDocument(newDocument);
        const errorMessages = modal.querySelector(
          "#errorMessages"
        ) as HTMLDivElement;
        errorMessages.innerHTML = errors.join("<br>");

        if (errors.length === 0) {
          const documents = getItem("documents") || [];
          documents.push(newDocument);
          setItem("documents", documents);
          this.dispatchEvent(new CustomEvent("document-added"));
          this.closeModal();
        }
      } catch (error) {
        const errorMessages = modal.querySelector(
          "#errorMessages"
        ) as HTMLDivElement;
        errorMessages.innerHTML = "Invalid date format.";
      }
    });

    shadow.appendChild(style);
    shadow.appendChild(overlay);
    shadow.appendChild(modal);
  }

  closeModal() {
    this.remove();
  }
}

function generateRandomId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
