import { convertDateToISO } from "../../src/utilities/dateUtils";

describe("convertDateToISO", () => {
  it("should convert a valid date string to ISO format", () => {
    const dateString = "2023-10-15";
    const result = convertDateToISO(dateString);
    expect(result).toBe("2023-10-15T00:00:00.000Z");
  });

  it("should throw an error for an invalid date string", () => {
    const invalidDateString = "invalid-date";
    expect(() => convertDateToISO(invalidDateString)).toThrow(
      "Invalid date format."
    );
  });
});
