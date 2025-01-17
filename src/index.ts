import {
  fetchDocuments,
  renderDocuments,
} from "./services/getDocuments/fetch-documents";
import connect from "./services/getDocuments/webSocket";
import DocumentList from "./components/document-list/document-list";
import ToastAlert from "./components/toast/toast-alert";
import DocumentForm from "./components/document-form/document-form";
import { getItem, setItem } from "./utilities/localStorageUtil";
import sortDocuments from "./utilities/sortDocumentsUtil";

let filterBy = "title";

let documentGrid = "list";
const documentListContainer = document.getElementById("documentList");
const selectGridFormat = document.getElementById("gridFormat");
const selectGridFormatElements = selectGridFormat?.querySelectorAll("li");

selectGridFormatElements?.forEach((element) => {
  element.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target || target.tagName !== "LI") return;

    const textContent = target.textContent?.toLowerCase() ?? "";
    if (textContent !== "list" && textContent !== "table") return;

    setSelectedElement(target, textContent);
  });
});

const setSelectedElement = (selectedElement: HTMLElement, gridType: string) => {
  documentGrid = gridType;

  deleteSelectedClass();
  selectedElement.classList.add("selected");

  documentListContainer?.classList.remove("list", "table");
  documentListContainer?.classList.add(gridType);
};

const deleteSelectedClass = () => {
  selectGridFormatElements?.forEach((element) => {
    element.classList.remove("selected");
  });
};

documentListContainer?.classList.add(documentGrid);

const customElementsMap = {
  "document-list": DocumentList,
  "toast-alert": ToastAlert,
  "document-form": DocumentForm,
};

Object.entries(customElementsMap).forEach(([name, element]) => {
  if (!customElements.get(name)) {
    customElements.define(name, element);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  let documents = [];
  if (getItem("documents") !== null) {
    documents = getItem("documents");
  } else {
    try {
      documents = await fetchDocuments(filterBy);
      setItem("documents", documents);
    } catch (error) {
      console.error("No se pueden obtener los documentos.");
    }
  }

  if (renderDocuments.length > 0) {
    renderDocuments(documents);
  }

  document
    .getElementById("filterBy")
    ?.addEventListener("change", async (event) => {
      filterBy = (event.target as HTMLSelectElement).value;
      const sortedDocuments = sortDocuments(getItem("documents"), filterBy);

      renderDocuments(sortedDocuments);
    });

  document.querySelector("#addDocument")?.addEventListener("click", () => {
    if (!document.querySelector("document-form")) {
      const formModal = document.createElement("document-form");
      document.body.appendChild(formModal);
    }
  });

  connect();
});
