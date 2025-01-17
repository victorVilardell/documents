import { Document } from "../services/getDocuments/types-documents";

function sortDocuments(documents: Document[], filterBy: string): Document[] {
  switch (filterBy) {
    case "date":
      return documents.sort((a, b) => {
        return (
          new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime()
        );
      });
    case "title":
      return documents.sort((a, b) =>
        a.Title.localeCompare(b.Title.trim(), undefined, {
          sensitivity: "base",
        })
      );
    case "version":
      return documents.sort((a, b) => a.Version.localeCompare(b.Version));
    default:
      return documents;
  }
}

export default sortDocuments;
