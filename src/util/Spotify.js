const clientID = '6ee054486c6e433a80088de12a7b570d';
const redirectUri = 'http://localhost:3000/';
let accesToken;

export const Spotify = {
  getAccessToken() {
    if (accesToken) {
      return accesToken;
    }

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accesToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // this clears the paremeters, allowing to grab a new access token when it expires
      window.setTimeout(() => accesToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accesToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}
`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    { headers: {
      Authorization: `Bearer ${accessToken}`
    }}).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artist,
        album: track.album,
        uri: track.uri
      }));
    });
  }
};