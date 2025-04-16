const { createRef } = require("../createRef");
const { formatAlbums } = require("../formatAlbums");

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

describe("formatAlbums", () => {
  test("returns an empty array when passed an empty array of albums", () => {
    // Arrange
    const testAlbums = [];
    const testArtistIdReference = {};
    // Act
    const outputAlbums = formatAlbums(testAlbums, testArtistIdReference);
    // Assert
    expect(outputAlbums).toEqual([]);
  });
  test("returns a new array of albums as output", () => {
    // Arrange
    const testAlbums = [];
    const testArtistIdReference = {};
    // Act
    const outputAlbums = formatAlbums(testAlbums, testArtistIdReference);
    // Assert
    expect(outputAlbums).not.toBe(testAlbums);
  });
  test("returns object with artist swapped for id when passed one album in array", () => {
    // Arrange
    const testAlbums = [
      { name: "Lover", artist: "Taylor Swift", releaseYear: 2019 },
    ];
    const testArtistIdReference = {
      "Taylor Swift": 9923,
    };
    // Act
    const outputAlbums = formatAlbums(testAlbums, testArtistIdReference);
    // Assert
    expect(outputAlbums).toEqual([
      { name: "Lover", artistId: 9923, releaseYear: 2019 },
    ]);
  });
  test("returns object with artist swapped for id when passed multiple albums in array", () => {
    // Arrange
    const testAlbums = [
      { name: "Lover", artist: "Taylor Swift", releaseYear: 2019 },
      { name: "High Voltage", artist: "AC/DC", releaseYear: 1975 },
    ];
    const testArtistIdReference = {
      "Taylor Swift": 9923,
      "AC/DC": 324,
    };
    // Act
    const outputAlbums = formatAlbums(testAlbums, testArtistIdReference);
    // Assert
    expect(outputAlbums).toEqual([
      { name: "Lover", artistId: 9923, releaseYear: 2019 },
      { name: "High Voltage", artistId: 324, releaseYear: 1975 },
    ]);
  });
  test("does not mutate input albums array", () => {
    // Arrange
    const testAlbums = [
      { name: "Lover", artist: "Taylor Swift", releaseYear: 2019 },
      { name: "High Voltage", artist: "AC/DC", releaseYear: 1975 },
    ];
    const testArtistIdReference = {
      "Taylor Swift": 9923,
      "AC/DC": 324,
    };
    // Act
    const outputAlbums = formatAlbums(testAlbums, testArtistIdReference);
    // Assert
    expect(testAlbums).toEqual([
      { name: "Lover", artist: "Taylor Swift", releaseYear: 2019 },
      { name: "High Voltage", artist: "AC/DC", releaseYear: 1975 },
    ]);
  });
});
