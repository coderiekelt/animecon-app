<template>
    <div>
        <ActivityType v-for="activityType in activityTypes" v-bind:key="activityType.id" :payload="activityType" />
        <div v-for="(timeslots, day) in timeslotsByDay">
            <h4>{{day}}</h4>
            <ul class="list-group">
                <Timeslot :payload="timeslot" v-for="timeslot in timeslots"/>
            </ul>
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
                activityTypes: [],
                timeslots: [],
                timeslotsByDay: [],
            };
        },
        components: {
            ActivityType, Timeslot
        },
        mounted() {
            console.log(this.$store.state.auth.oauth);
            this.$animecon.sendAuthorizedRequest('GET', '/activity-types.json').then(response => {
                this.activityTypes = response.data;
            });

            this.$animecon.sendAuthorizedRequest('GET', '/timeslots.json?activity.visible=true').then(response => {
                this.timeslots = response.data;
                let timeslotsByDay = {};

                this.timeslots.forEach(timeslot => {
                    let dayKey = this.$moment(timeslot.dateStartsAt).format('DD-MM-YYYY');

                    if (timeslotsByDay[dayKey] === undefined) {
                        timeslotsByDay[dayKey] = [];
                    }

                    timeslotsByDay[dayKey].push(timeslot);
                });
                console.log(timeslotsByDay);

                this.timeslotsByDay = timeslotsByDay;
            });
        }
    }
</script>
