import Vue from 'vue'
import axios from 'axios'

let $animecon = {
    data: {
        store: null,
    },
    validateAccessToken() {
        let now = (new Date()).getTime();

        if (now >= this.data.store.state.auth.oauth.tokenExpires) {
            return this.refreshAccessToken();
        }

        return true;
    },
    async refreshAccessToken() {
        let clientId = process.env.OAUTH_CLIENT_ID;
        let clientSecret = process.env.OAUTH_CLIENT_SECRET;

        let body = new FormData();
        body.set('grant_type', 'refresh_token');
        body.set('client_id', clientId);
        body.set('client_secret', clientSecret);
        body.set('refresh_token', this.data.store.state.auth.oauth.refreshToken);

        return await this.$animecon.sendAuthorizationRequest(body);
    },
    // Authenticates against the OAUTH api, returns true on success, error on false
    sendAuthorizationRequest(body) {
        let tokenEndpoint = process.env.OAUTH_BASE + '/token';

        return new Promise(resolve => {
            axios({
                method: 'post',
                url: tokenEndpoint,
                data: body,
            }).catch(response => {
                resolve(false);
            }).then(response => {
                this.data.store.commit('auth/login',
                    {
                        oauth: {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            tokenExpires: (new Date()).getTime() + response.data.expires_in,
                        },
                        username: 'Username',
                        roles: ['ROLE_USER'], // TO-DO: Fetch from API?
                    }
                );

                resolve(true);
            });
        });
    },
    // Sends a request with authorization provided by the OAUTH api
    sendAuthorizedRequest(method, endpoint, body) {
        this.validateAccessToken();

        return new Promise(resolve => {
            axios({
                method: method,
                url: process.env.API_BASE + endpoint,
                data: body,
                header: {
                    'Authorization': 'Bearer ' + this.data.store.state.auth.oauth.accessToken,
                }
            }).catch(response => {
                resolve(response);
            }).then(response => {
                this.data.store.commit('auth/login',
                    {
                        oauth: {
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                            tokenExpires: (new Date()).getTime() + response.data.expires_in,
                        },
                        username: 'Username',
                        roles: ['ROLE_USER'], // TO-DO: Fetch from API?
                    }
                );

                resolve(response);
            });
        });
    }
};

export default ({store, app}) => {
    $animecon.data.store = store;
}

Vue.prototype.$animecon = $animecon;
