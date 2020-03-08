<template>
    <li v-if="loaded" class="list-group-item">
<!--        <h5>{{activity.description}}</h5>-->
    </li>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Timeslot',
        props: ['payload'],
        computed: {
            loaded() {
                return this.timeslot !== null && this.location !== null && this.activity !== null;
            }
        },
        data() {
            return {
                location: null,
                timeslot: null,
                activity: null,
            }
        },
        mounted() {
            this.timeslot = this.$props.payload;

            this.$animecon.sendAuthorizedRequest('GET', this.timeslot.location + '.json').then(response => {
                this.location = response.data;
            });

            this.$animecon.sendAuthorizedRequest('GET', this.timeslot.activity + '.json').then(response => {
                console.log(response);
                this.activity = response.data;
            });
        }
    }
</script>

<style scoped>
    #spinner {
        text-align: center;
        animation-name: spin, depth;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 3s;
    }
    @keyframes spin {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(-360deg); }
    }
    @keyframes depth {
        0% { text-shadow: 0 0 black; }
        25% { text-shadow: 1px 0 black, 2px 0 black, 3px 0 black, 4px 0 black, 5px 0 black; }
        50% { text-shadow: 0 0 black; }
        75% { text-shadow: -1px 0 black, -2px 0 black, -3px 0 black, -4px 0 black, -5px 0 black; }
        100% { text-shadow: 0 0 black; }
    }
</style>
