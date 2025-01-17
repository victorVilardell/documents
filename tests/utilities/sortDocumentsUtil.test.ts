import sortDocuments from "../../src/utilities/sortDocumentsUtil";
import { Document } from "../../src/services/getDocuments/types-documents";

describe("sortDocuments", () => {
  const documents: Document[] = [
    {
      Title: "Document B",
      CreatedAt: "2023-10-15",
      Version: "1.0",
      Attachments: [],
      Contributors: [],
      ID: "",
      UpdatedAt: "",
    },
    {
      Title: "Document A",
      CreatedAt: "2023-10-14",
      Version: "1.1",
      Attachments: [],
      Contributors: [],
      ID: "",
      UpdatedAt: "",
    },
    {
      Title: "Document C",
      CreatedAt: "2023-10-16",
      Version: "0.9",
      Attachments: [],
      Contributors: [],
      ID: "",
      UpdatedAt: "",
    },
  ];

  it("should sort documents by date", () => {
    const sortedByDate = sortDocuments(documents, "date");
    expect(sortedByDate[0].CreatedAt).toBe("2023-10-14");
    expect(sortedByDate[1].CreatedAt).toBe("2023-10-15");
    expect(sortedByDate[2].CreatedAt).toBe("2023-10-16");
  });

  it("should sort documents by title", () => {
    const sortedByTitle = sortDocuments(documents, "title");
    expect(sortedByTitle[0].Title).toBe("Document A");
    expect(sortedByTitle[1].Title).toBe("Document B");
    expect(sortedByTitle[2].Title).toBe("Document C");
  });

  it("should sort documents by version", () => {
    const sortedByVersion = sortDocuments(documents, "version");
    expect(sortedByVersion[0].Version).toBe("0.9");
    expect(sortedByVersion[1].Version).toBe("1.0");
    expect(sortedByVersion[2].Version).toBe("1.1");
  });

  it("should return documents as is for unknown filter", () => {
    const sortedByUnknown = sortDocuments(documents, "unknown");
    expect(sortedByUnknown).toEqual(documents);
  });
});
