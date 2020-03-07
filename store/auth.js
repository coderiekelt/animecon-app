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
  login(state, payload) {
    state.authenticated = true;
    state.oauth = payload.oauth;
    state.username = payload.username;
    state.roles = payload.roles;
  },
  logout(state) {
    state.authenticated = anonymousState.authenticated;
    state.oauth = anonymousState.oauth;
    state.username = anonymousState.username;
    state.roles = anonymousState.roles;
  }
};
