import validateDocument from "../../src/utilities/validateDocument";

describe("validateDocument", () => {
  it("should return an error if the title is missing", () => {
    const document = {
      ID: "1",
      Title: "",
      Version: "1.0.0",
      CreatedAt: "2023-10-15",
      Attachments: [],
      Contributors: [],
    };

    const errors = validateDocument(document);
    expect(errors).toContain("Title is required.");
  });

  it("should return an error if the version is invalid", () => {
    const document = {
      ID: "1",
      Title: "Test Document",
      Version: "1.0",
      CreatedAt: "2023-10-15",
      Attachments: [],
      Contributors: [],
    };

    const errors = validateDocument(document);
    expect(errors).toContain("Version must be in the format 00.00.00.");
  });

  it("should return an error if the created date is invalid", () => {
    const document = {
      ID: "1",
      Title: "Test Document",
      Version: "1.0.0",
      CreatedAt: "invalid-date",
      Attachments: [],
      Contributors: [],
    };

    const errors = validateDocument(document);
    expect(errors).toContain("Created date is invalid.");
  });

  it("should return an error if the updated date is invalid", () => {
    const document = {
      ID: "1",
      Title: "Test Document",
      Version: "1.0.0",
      CreatedAt: "2023-10-15",
      UpdatedAt: "invalid-date",
      Attachments: [],
      Contributors: [],
    };

    const errors = validateDocument(document);
    expect(errors).toContain("Updated date is invalid.");
  });

  it("should return no errors for a valid document", () => {
    const document = {
      ID: "1",
      Title: "Test Document",
      Version: "1.0.0",
      CreatedAt: "2023-10-15",
      Attachments: [],
      Contributors: [],
    };

    const errors = validateDocument(document);
    expect(errors).toHaveLength(0);
  });
});
