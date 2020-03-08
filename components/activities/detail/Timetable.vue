<template>
    <div>
        <div class="row" v-if="timeslots.length">
            <div class="col-md-3" v-for="timeslot in timeslots">
                <Timeslot :timeslot="timeslot" />
            </div>
        </div>
        <div v-if="loading && !timeslots.length">
            <div class="card-body">
                <p class="card-text" style="text-align: center;" id="spinner">
                    UwU
                </p>
                <p class="card-text" style="text-align: center;">
                    Loading!
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Timeslot from './Timeslot'

    import axios from 'axios';

    export default {
        name: 'Timetable',
        components: {
            Timeslot,
        },
        props: ['payload'],
        data() {
            return {
                loading: false,
                timeslots: [],
            }
        },
        mounted() {
            this.timeslots = this.$props.payload;
        },
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
