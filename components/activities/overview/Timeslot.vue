<template>
    <div>
        <a :href="'/activities/' + activity.id" class="list-group-item list-group-item-action" v-if="loaded && activity" v-bind:style="style">
            {{activity.title}}
            <span style="float: right;">
                {{$moment(timeslot.dateStartsAt).format('HH:mm')}}
            </span>
        </a>
        <li class="list-group-item" v-else>
            Nope!
        </li>
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Timeslot',
        props: ['payload'],
        computed: {
            loaded() {
                return this.timeslot !== null && this.activity !== null;
            },
            style() {
                let style = {
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
                    borderLeftColor: '#14376A',
                    borderLeftWidth: '3px',
                    cursor: 'pointer',
                };

                style.borderLeftColor = this.activity.activityType.cssBackgroundColor;

                return style;
            }
        },
        data() {
            return {
                timeslot: null,
                activity: null,
            }
        },
        mounted() {
            this.timeslot = this.$props.payload;
            this.activity = this.timeslot.activity;
        },
        methods: {
            goToActivity() {
                this.$router.push({
                    path: '/activities/' + this.activity.id,
                })
            }
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
