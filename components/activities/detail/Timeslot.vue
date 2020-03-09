<template>
    <li class="list-group-item" v-if="loaded">
        {{location.name}}
        <span style="float: right;">
            {{$moment(timeslot.dateStartsAt).format('dddd')}} {{$moment(timeslot.dateStartsAt).format('HH:mm')}} - {{$moment(timeslot.dateEndsAt).format('HH:mm')}}
        </span>
    </li>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Timeslot',
        props: ['timeslot'],
        computed: {
            loaded() {
                return this.timeslot !== null && this.location !== null;
            }
        },
        data() {
            return {
                timeslot: null,
                location: null,
            }
        },
        mounted() {
            this.timeslot = this.$props.timeslot;
            this.location = this.timeslot.location;
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
