<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <img src="~/assets/image/logo.png" alt="Animecon logo" height="150">
                    <span class="header-text">Animecon</span>
                </div>
            </div>
            <b-navbar class="anime-navbar" variant="light">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="/">Home</b-nav-item>
                        <b-nav-item href="/activities">Schedule</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content>
                                <em>{{$store.state.auth.username}}</em>
                            </template>
                            <b-dropdown-item href="/login" v-if="!$store.state.auth.authenticated">Sign in</b-dropdown-item>
                            <b-dropdown-item href="/profile" v-if="$store.state.auth.authenticated">Profile
                            </b-dropdown-item>
                            <b-dropdown-item href="/logout" v-if="$store.state.auth.authenticated">Sign Out
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <div class="content">
                <div class="container">
                    <nuxt/>
                </div>
            </div>
            <div class="footer">
                CONCEPT - NOT SUITABLE FOR PRODUCTION USE
            </div>
        </div>
    </div>
</template>

<style scoped>
    .header-text {
        font-size: 32pt;
        color: #fff;
    }

    .content {
        background-color: #fff;
        padding-bottom: 20px;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .footer {
        width: 100%;
        text-align: center;
        color: red;
    }

    .anime-navbar {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
</style>
