const { createRef } = require("../createRef");

describe("createRef", () => {
  test("returns an empty object when passed an empty array", () => {
    // Arrange
    const testEmployees = [];
    const inputKey = "name";
    const inputValue = "id";
    // Act
    const outputObj = createRef(testEmployees, inputKey, inputValue);
    // Assert
    expect(outputObj).toEqual({});
  });
  test("returns object with correct key value pair when passed an array of length one", () => {
    // Arrange
    const testEmployees = [
      { name: "Rose", id: "dS8rJns", secretFear: "spiders" },
    ];
    const inputKey = "name";
    const inputValue = "id";
    // Act
    const outputObj = createRef(testEmployees, inputKey, inputValue);
    // Assert
    expect(outputObj).toEqual({ Rose: "dS8rJns" });
  });
  test("returns object with correct key value pairs when passed an array of length greater than one", () => {
    // Arrange
    const testEmployees = [
      { name: "Rose", id: "dS8rJns", secretFear: "spiders" },
      { name: "Simon", id: "Pk34ABs", secretFear: "mice" },
      { name: "Jim", id: "lk1ff8s", secretFear: "bears" },
      { name: "David", id: "og8r0nV", secretFear: "Rose" },
    ];
    const inputKey = "name";
    const inputValue = "id";
    // Act
    const outputObj = createRef(testEmployees, inputKey, inputValue);
    // Assert
    expect(outputObj).toEqual({
      Rose: "dS8rJns",
      Simon: "Pk34ABs",
      Jim: "lk1ff8s",
      David: "og8r0nV",
    });
  });
  test("ignores objects in passed array if they don't contain the key passed", () => {
    // Arrange
    const testEmployees = [
      { name: "Rose", id: "dS8rJns", secretFear: "spiders" },
      { name: "Simon", id: "Pk34ABs", secretFear: "mice" },
      { name: "Jim", id: "lk1ff8s", secretFear: "bears" },
      { surname: "David", id: "og8r0nV", secretFear: "Rose" },
    ];
    const inputKey = "surname";
    const inputValue = "id";
    // Act
    const outputObj = createRef(testEmployees, inputKey, inputValue);
    // Assert
    expect(outputObj).toEqual({ David: "og8r0nV" });
  });
  test("sets values to undefined if input employees don't have the value passed", () => {
    // Arrange
    const testEmployees = [
      { name: "Rose", id: "dS8rJns", secretFear: "spiders" },
      { name: "Simon", id: "Pk34ABs", secretFear: "mice" },
      { name: "Jim", id: "lk1ff8s", secretFear: "bears" },
      { name: "David", secretFear: "Rose" },
    ];
    const inputKey = "name";
    const inputValue = "id";
    // Act
    const outputObj = createRef(testEmployees, inputKey, inputValue);
    // Assert
    expect(outputObj).toEqual({
      Rose: "dS8rJns",
      Simon: "Pk34ABs",
      Jim: "lk1ff8s",
      David: undefined,
    });
  });
});
