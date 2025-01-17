import { fetchDocuments } from "../src/services/getDocuments/fetch-documents";
import { Document } from "../src/services/getDocuments/types-documents";

global.fetch = jest.fn();

describe("fetchDocuments", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch documents successfully", async () => {
    const mockDocuments: Document[] = [
      {
        ID: "1",
        Title: "Document 1",
        Version: "1.0.0",
        CreatedAt: "2023-10-15",
        UpdatedAt: "2023-10-20",
        Attachments: [],
        Contributors: [],
      },
      {
        ID: "2",
        Title: "Document 2",
        Version: "1.0.1",
        CreatedAt: "2023-10-16",
        UpdatedAt: "2023-10-21",
        Attachments: [],
        Contributors: [],
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDocuments,
    });

    const documents = await fetchDocuments("title");
    expect(documents).toEqual(mockDocuments);
  });

  it("should throw an error if the fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(fetchDocuments("title")).rejects.toThrow(
      "HTTP Error: 404 - Not Found"
    );
  });
});
