interface Contributor {
  ID: string;
  Name: string;
}

export interface Document {
  Attachments: string[];
  Contributors: Contributor[];
  CreatedAt: string;
  ID: string;
  Title: string;
  UpdatedAt: string;
  Version: string;
}
