function formatAlbums(albums, artistIdReference) {
  const updatedAlbums = [];
  albums.forEach((album) => {
    const updatedAlbum = { ...album };
    updatedAlbum.artistId = artistIdReference[updatedAlbum.artist];
    delete updatedAlbum.artist;
    updatedAlbums.push(updatedAlbum);
  });
  return updatedAlbums;
}

module.exports = { formatAlbums };
