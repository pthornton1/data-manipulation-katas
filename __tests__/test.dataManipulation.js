const { createRef } = require("../createRef");
const { formatAlbums } = require("../formatAlbums");
const { formatUserData, createFilmLookup } = require("../formatUserData");

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

describe("formatUserData", () => {
  test("returns an empty array when passed an empty array of users", () => {
    // Arrange
    const testUsers = [];
    const testFilmRatings = [];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert
    expect(outputUsers).toEqual([]);
  });
  test("returns a new array", () => {
    // Arrange
    const testUsers = [];
    const testFilmRatings = [];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert
    expect(outputUsers).not.toBe(testUsers);
  });
  test("returns new user objects inside the returned array", () => {
    // Arrange
    const testUsers = [
      { username: "bartyBoo", favFilms: ["Barbie", "Braveheart", "Ben-Hur"] },
    ];
    const testFilmRatings = [];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert
    expect(outputUsers[0]).not.toBe(testUsers[0]);
  });
  test("updates favFilms in users to an array of objects with name and score keys when passed one user object", () => {
    // Arrange
    const testUsers = [
      { username: "bartyBoo", favFilms: ["Barbie", "Braveheart", "Ben-Hur"] },
    ];
    const testFilmRatings = [
      { title: "Barbie", rating: 3 },
      { title: "Barbie", rating: 1 },
      { title: "Barbie", rating: 5 },
      { title: "Babe", rating: 1 },
      { title: "Bambi", rating: 2 },
      { title: "Bambi", rating: 4 },
      { title: "Ben-Hur", rating: 5 },
      { title: "Ben-Hur", rating: 3 },
      { title: "Ben-Hur", rating: 4 },
      { title: "Braveheart", rating: 4 },
      { title: "Braveheart", rating: 3 },
      { title: "Barbie", rating: 4 },
    ];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert
    expect(typeof outputUsers[0].favFilms[0]).toBe("object");
    expect(typeof outputUsers[0].favFilms[1]).toBe("object");
    expect(typeof outputUsers[0].favFilms[2]).toBe("object");

    expect(outputUsers[0].favFilms[0].hasOwnProperty("name")).toBe(true);
    expect(outputUsers[0].favFilms[1].hasOwnProperty("name")).toBe(true);
    expect(outputUsers[0].favFilms[2].hasOwnProperty("name")).toBe(true);

    expect(outputUsers[0].favFilms[0].hasOwnProperty("score")).toBe(true);
    expect(outputUsers[0].favFilms[1].hasOwnProperty("score")).toBe(true);
    expect(outputUsers[0].favFilms[2].hasOwnProperty("score")).toBe(true);
  });

  test("scores for each film are the average of the score from the filmRatings array", () => {
    // Arrange
    const testUsers = [
      { username: "bartyBoo", favFilms: ["Barbie", "Braveheart", "Ben-Hur"] },
    ];
    const testFilmRatings = [
      { title: "Barbie", rating: 3 },
      { title: "Barbie", rating: 1 },
      { title: "Barbie", rating: 5 },
      { title: "Babe", rating: 1 },
      { title: "Bambi", rating: 2 },
      { title: "Bambi", rating: 4 },
      { title: "Ben-Hur", rating: 5 },
      { title: "Ben-Hur", rating: 3 },
      { title: "Ben-Hur", rating: 4 },
      { title: "Braveheart", rating: 4 },
      { title: "Braveheart", rating: 3 },
      { title: "Barbie", rating: 4 },
    ];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert

    expect(outputUsers[0].favFilms[0].score).toBe(3.25);
    expect(outputUsers[0].favFilms[1].score).toBe(3.5);
    expect(outputUsers[0].favFilms[2].score).toBe(4);
  });

  test("handles multiple users in the array", () => {
    // Arrange
    const testUsers = [
      { username: "bartyBoo", favFilms: ["Barbie", "Braveheart", "Ben-Hur"] },
      { username: "rosieandjim", favFilms: ["Braveheart", "Bambi", "Babe"] },
    ];
    const testFilmRatings = [
      { title: "Barbie", rating: 3 },
      { title: "Barbie", rating: 1 },
      { title: "Barbie", rating: 5 },
      { title: "Babe", rating: 1 },
      { title: "Bambi", rating: 2 },
      { title: "Bambi", rating: 4 },
      { title: "Ben-Hur", rating: 5 },
      { title: "Ben-Hur", rating: 3 },
      { title: "Ben-Hur", rating: 4 },
      { title: "Braveheart", rating: 4 },
      { title: "Braveheart", rating: 3 },
      { title: "Barbie", rating: 4 },
    ];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert

    expect(outputUsers).toEqual([
      {
        username: "bartyBoo",
        favFilms: [
          { name: "Barbie", score: 3.25 },
          { name: "Braveheart", score: 3.5 },
          { name: "Ben-Hur", score: 4 },
        ],
      },
      {
        username: "rosieandjim",
        favFilms: [
          { name: "Braveheart", score: 3.5 },
          { name: "Bambi", score: 3 },
          { name: "Babe", score: 1 },
        ],
      },
    ]);
  });

  test("does not mutate input users", () => {
    // Arrange
    const testUsers = [
      { username: "bartyBoo", favFilms: ["Barbie", "Braveheart", "Ben-Hur"] },
      { username: "rosieandjim", favFilms: ["Braveheart", "Bambi", "Babe"] },
    ];
    const testFilmRatings = [
      { title: "Barbie", rating: 3 },
      { title: "Barbie", rating: 1 },
      { title: "Barbie", rating: 5 },
      { title: "Babe", rating: 1 },
      { title: "Bambi", rating: 2 },
      { title: "Bambi", rating: 4 },
      { title: "Ben-Hur", rating: 5 },
      { title: "Ben-Hur", rating: 3 },
      { title: "Ben-Hur", rating: 4 },
      { title: "Braveheart", rating: 4 },
      { title: "Braveheart", rating: 3 },
      { title: "Barbie", rating: 4 },
    ];

    // Act
    const outputUsers = formatUserData(testUsers, testFilmRatings);
    // Assert

    expect(testUsers).toEqual([
      { username: "bartyBoo", favFilms: ["Barbie", "Braveheart", "Ben-Hur"] },
      { username: "rosieandjim", favFilms: ["Braveheart", "Bambi", "Babe"] },
    ]);
  });
});

describe("createFilmLookup", () => {
  test("returns empty object when passed an empty filmRatings array ", () => {
    // Arrange
    const testFilmRatings = [];
    // Act
    const outputLookupObj = createFilmLookup(testFilmRatings);
    // Assert
    expect(outputLookupObj).toEqual({});
  });
  test("returns object with one key of film and a value of average score when passed filmRatings with one film", () => {
    // Arrange
    const testFilmRatings = [{ title: "Barbie", rating: 3 }];
    // Act
    const outputLookupObj = createFilmLookup(testFilmRatings);
    // Assert
    expect(outputLookupObj).toEqual({ Barbie: 3 });
  });
  test("returns average score when passed a film that has multiple corresponding rating in the film ratings array", () => {
    // Arrange
    const testFilmRatings = [
      { title: "Barbie", rating: 3 },
      { title: "Barbie", rating: 1 },
      { title: "Barbie", rating: 5 },
      { title: "Barbie", rating: 4 },
    ];
    // Act
    const outputLookupObj = createFilmLookup(testFilmRatings);
    // Assert
    expect(outputLookupObj).toEqual({ Barbie: 3.25 });
  });
  test("handles multiple films ", () => {
    // Arrange
    const testFilmRatings = [
      { title: "Barbie", rating: 3 },
      { title: "Barbie", rating: 1 },
      { title: "Barbie", rating: 5 },
      { title: "Babe", rating: 1 },
      { title: "Bambi", rating: 2 },
      { title: "Bambi", rating: 4 },
      { title: "Ben-Hur", rating: 5 },
      { title: "Ben-Hur", rating: 3 },
      { title: "Ben-Hur", rating: 4 },
      { title: "Braveheart", rating: 4 },
      { title: "Braveheart", rating: 3 },
      { title: "Barbie", rating: 4 },
    ];
    // Act
    const outputLookupObj = createFilmLookup(testFilmRatings);
    // Assert
    expect(outputLookupObj).toEqual({
      Barbie: 3.25,
      Braveheart: 3.5,
      "Ben-Hur": 4,
      Bambi: 3,
      Babe: 1,
    });
  });
});
