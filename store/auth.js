const anonymousState = {
  authenticated: false,
  oauth: {
    accessToken: null,
    refreshToken: null,
    tokenExpires: null,
  },
  username: 'Guest',
  roles: ['IS_AUTHENTICATED_ANONYMOUSLY'],
};

export const state = () => (JSON.parse(JSON.stringify(anonymousState))); // Copy instead of refer

export const mutations = {
  login(oauth, username, roles) {
    state.authenticated = true;
    state.oauth = oauth;
    state.username = username;
    state.roles = roles;
  },
  logout() {
    state.authenticated = anonymousState.authenticated;
    state.oauth = anonymousState.oauth;
    state.username = anonymousState.username;
    state.roles = anonymousState.roles;
  }
};
