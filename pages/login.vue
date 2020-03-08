<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-3">
                <div class="alert alert-danger" v-if="failed">Invalid username / password!</div>
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
                failed: false,
            }
        },
        methods: {
            async authenticate(event) {
                event.preventDefault();

                this.failed = false;

                let clientId = process.env.OAUTH_CLIENT_ID;
                let clientSecret = process.env.OAUTH_CLIENT_SECRET;

                let body = new FormData();
                body.set('grant_type', 'password');
                body.set('client_id', clientId);
                body.set('client_secret', clientSecret);
                body.set('username', this.username);
                body.set('password', this.password);

                let result = await this.$animecon.sendAuthorizationRequest(body);

                this.failed = !result;
            },
        }
    }
</script>
