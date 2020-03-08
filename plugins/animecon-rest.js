import Vue from 'vue'
import axios from 'axios'

let $animecon = {
    store: null,
    validateAccessToken() {
        let now = (new Date()).getTime();

        if (now >= this.store.state.auth.oauth.tokenExpires) {
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
        body.set('refresh_token', this.store.state.auth.oauth.refreshToken);

        return await this.sendAuthorizationRequest(body);
    },
    // Authenticates against the OAUTH api, returns true on success, error on false
    sendAuthorizationRequest(body) {
        let tokenEndpoint = process.env.OAUTH_BASE + '/token';

        return new Promise(resolve => {
            axios({
                method: 'post',
                url: tokenEndpoint,
                data: body,
            }).then(response => {
                this.store.commit('auth/login',
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
            }).catch(response => {
                resolve(false);
            })
        });
    },
    // Sends a request with authorization provided by the OAUTH api
    sendAuthorizedRequest(method, endpoint, body) {
        console.log(this.store.state.auth.oauth);
        console.log(this.store.state.oauth.accessToken);
        return new Promise(resolve => {
            axios({
                method: method,
                url: process.env.API_BASE + endpoint,
                data: body,
                header: {
                    'Authorization': 'Bearer ' + this.store.state.auth.oauth.accessToken,
                }
            }).then(response => {
                resolve(response);
            }).catch(response => {
                resolve(response);
            })
        });
    }
};

export default ({store, app}, inject) => {
    $animecon.store = store;
}

Vue.prototype.$animecon = $animecon;
