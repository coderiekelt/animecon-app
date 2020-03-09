<template>
    <div>
        <ul class="list-group" v-if="timeslots.length">
            <Timeslot v-for="timeslot in timeslots" :timeslot="timeslot" />
        </ul>
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
