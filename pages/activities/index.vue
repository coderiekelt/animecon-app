<template>
    <div>
        <ActivityType v-for="activityType in activityTypes" v-bind:key="activityType.id" :payload="activityType" />
        <div v-for="day in days" v-if="loaded">
            <h4>{{day.date}}</h4>
            <ul class="list-group">
                <Timeslot :payload="timeslot" v-for="timeslot in day.timeslots"/>
            </ul>
        </div>
        <div v-if="!loaded">
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
    import ActivityType from '~/components/activities/shared/ActivityType';
    import Timeslot from '~/components/activities/overview/Timeslot'

    export default {
        layout: 'anime',
        data() {
            return {
                loaded: false,
                activityTypes: [],
                timeslots: [],
                unsortedTimeslotsByDay: {},
                days: [],
            };
        },
        components: {
            ActivityType, Timeslot
        },
        mounted() {
            this.$animecon.sendAuthorizedRequest('GET', '/activity-types.json').then(response => {
                this.activityTypes = response.data;
            });

            this.fetchTimeslots(1);
        },
        methods: {
            async handleTimeslots(timeslots) {
                timeslots.forEach(timeslot => {
                    let dayKey = this.$moment(timeslot.dateStartsAt).format('YYYY-MM-DD');

                    if (this.unsortedTimeslotsByDay[dayKey] === undefined) {
                        this.unsortedTimeslotsByDay[dayKey] = [];
                    }

                    this.unsortedTimeslotsByDay[dayKey].push(timeslot);
                });
            },
            async fetchTimeslots(page) {
                this.$animecon.sendAuthorizedRequest('GET', '/timeslots.json?activity.visible=1&dateStartsAt[after]=2019-01-01&page=' + page).then(response => {
                    this.handleTimeslots(response.data);

                    if (response.data.length > 0) {
                        this.fetchTimeslots(page + 1);

                        return;
                    }

                    console.log('hier');
                    this.sortDays();
                });
            },
            sortDays() {
                Object.keys(this.unsortedTimeslotsByDay).forEach(key => {
                    this.unsortedTimeslotsByDay[key].sort((a, b) => {
                        return this.$moment(a.dateStartsAt).format('x') > this.$moment(b.dateStartsAt).format('x');
                    });
                });

                let keys = Object.keys(this.unsortedTimeslotsByDay);

                keys.sort((a, b) => {
                     return this.$moment(a).format('x') > this.$moment(b).format('x');
                });

                keys.forEach(date => {
                    this.days.push({
                        date: this.$moment(date).format('DD-MM-YYYY'),
                        timeslots: this.unsortedTimeslotsByDay[date],
                    });
                });

                this.loaded = true;
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
