import DocumentList from "../../components/document-list/document-list";
import sortDocuments from "../../utilities/sortDocumentsUtil";
import { Document } from "./types-documents";

const apiEndpoint: string = "http://localhost:8080/documents";

async function fetchDocuments(filterBy: string): Promise<Document[]> {
  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }

    const data: Document[] = await response.json();
    return sortDocuments(data, filterBy);
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    throw error;
  }
}

function renderDocuments(documents: Document[]): void {
  const documentList = document.getElementById("documentList") as DocumentList;
  documentList.setDocuments(documents);
}

export { fetchDocuments, renderDocuments };
