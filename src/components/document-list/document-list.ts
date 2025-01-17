import { getItem } from "../../utilities/localStorageUtil";

interface Contributor {
  ID: string;
  Name: string;
}

interface Document {
  Attachments: string[];
  Contributors: Contributor[];
  CreatedAt: string;
  ID: string;
  Title: string;
  UpdatedAt: string;
  Version: string;
}

export default class DocumentList extends HTMLElement {
  private documents: Document[] = [];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        --document-padding: 24px;
        --document-flex-direction: row;
        --document-width: 100%;
      }

      .document {
        display: flex;
        flex-direction: var(--document-flex-direction);
        width: var(--document-width);
        border-radius: 4px;
        padding: var(--document-padding);
        gap: 8px;
        background-color: white;
        justify-content: space-between;
        box-sizing: border-box;
        flex:1 1 auto;
      }
      .document h3 {
        margin: 0;
        color: #000;
      }
      .document .document-info {
        display: flex;
        flex-direction: column;
        flex: 2;
      }
      .document ul {
        display: flex;
        flex-direction: column;
        margin: 0;
        flex: 1;
      }
      .document li {
        list-style-type: none;
        margin: 4px 0;
      }
    `;

    shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
    document.addEventListener(
      "document-added",
      this.handleDocumentAdded.bind(this)
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      "document-added",
      this.handleDocumentAdded.bind(this)
    );
  }

  private handleDocumentAdded() {
    console.log("Document added");
    const documents = getItem("documents") || [];
    this.setDocuments(documents);
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.render();
  }

  private render() {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    shadow.querySelectorAll(".document").forEach((el) => el.remove());

    this.documents.forEach(({ Title, Version, Contributors, Attachments }) => {
      const docElement = document.createElement("article");
      docElement.className = "document";

      docElement.innerHTML = `
        <header class="document-info">
          <h3>${Title}</h3>
          <p>Versión ${Version}</p>
        </header>
        <ul>
          ${Contributors.map(
            (contributor) => `<li>${contributor.Name}</li>`
          ).join("")}
        </ul>
        <ul> 
          ${Attachments.map((attachment) => `<li>${attachment}</li>`).join("")}
        </ul>
      `;
      shadow.appendChild(docElement);
    });
  }
}
