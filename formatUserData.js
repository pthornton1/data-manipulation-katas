function formatUserData(users, filmRatings) {
  const updatedUsers = [];
  const filmReference = createFilmLookup(filmRatings);

  users.forEach((user) => {
    const updatedUser = { ...user, favFilms: [...user.favFilms] };
    updatedUser.favFilms = updatedUser.favFilms.map((film) => {
      return { name: film, score: filmReference[film] };
    });
    updatedUsers.push(updatedUser);
  });
  return updatedUsers;
}

function createFilmLookup(filmRatings) {
  const referenceObj = {};
  filmRatings.forEach((rating) => {
    if (referenceObj.hasOwnProperty([rating.title])) {
      referenceObj[rating.title].push(rating.rating);
    } else {
      referenceObj[rating.title] = [rating.rating];
    }
  });

  for (film in referenceObj) {
    const ratingTotal = referenceObj[film].reduce((ratingTotal, rating) => {
      ratingTotal += rating;
      return ratingTotal;
    }, 0);
    const averageRating = ratingTotal / referenceObj[film].length;
    referenceObj[film] = averageRating;
  }

  return referenceObj;
}

module.exports = { formatUserData, createFilmLookup };
