<template>
    <div class="container">
        <h1>Logging you out...</h1>
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
        mounted() {
            this.$store.commit('auth/logout');

            this.$router.push({
                path: '/login'
            })
        }
    }
</script>
