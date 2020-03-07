<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <b-card header="Sign in to your account" header-tag="header">
                    <b-form @submit="authenticate">
                        <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                        >
                            <b-form-input
                                id="input-1"
                                v-model="username"
                                type="email"
                                required
                                placeholder="E-mail"
                            />
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                            <b-input type="password" id="text-password" required v-model="password"/>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Login</b-button>
                    </b-form>
                </b-card>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        layout: 'anime',
        components: {},
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            authenticate(event) {
                event.preventDefault()

                let clientId = process.env.OAUTH_CLIENT_ID;
                let clientSecret = process.env.OAUTH_CLIENT_SECRET;
                let tokenEndpoint = process.env.OAUTH_BASE + '/token';

                let body = new FormData();
                body.set('grant_type', 'password');
                body.set('client_id', clientId);
                body.set('client_secret', clientSecret);
                body.set('username', this.username);
                body.set('password', this.password);

                axios({
                    method: 'post',
                    url: tokenEndpoint,
                    data: body,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                }).then(response => {
                    this.$store.commit('auth/login',
                        {
                            oauth: {
                                accessToken: response.data.access_token,
                                refreshToken: response.data.refresh_token,
                                tokenExpires: (new Date()).getTime() + response.data.expires_in,
                            },
                            username: this.username,
                            roles: ['ROLE_USER'], // TO-DO: Fetch from API?
                        }
                    );
                });
            },
        }
    }
</script>
