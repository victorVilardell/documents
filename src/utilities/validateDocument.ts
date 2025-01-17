interface Document {
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
  UpdatedAt?: string;
  Attachments: string[];
  Contributors: { id: string; name: string }[];
}

const isValidVersion = (version: string): boolean => {
  const versionPattern = /^\d+\.\d+\.\d+$/;
  return versionPattern.test(version);
};

export default function validateDocument(document: Document): string[] {
  const errors: string[] = [];

  if (!document.Title) {
    errors.push("Title is required.");
  }

  if (!document.Version || !isValidVersion(document.Version)) {
    errors.push("Version must be in the format 00.00.00.");
  }

  if (!document.CreatedAt || isNaN(Date.parse(document.CreatedAt))) {
    errors.push("Created date is invalid.");
  }

  if (document.UpdatedAt && isNaN(Date.parse(document.UpdatedAt))) {
    errors.push("Updated date is invalid.");
  }

  return errors;
}
