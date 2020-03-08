<template>
    <div>
        <div class="row">
            <div class="col-md-3" v-for="timeslot in timeslots">
                <Timeslot :timeslot="timeslot" />
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
        props: ['activity'],
        data() {
            return {
                timeslots: [],
            }
        },
        mounted() {
            let accessToken = this.$store.state.auth.oauth;

            axios.get(process.env.API_BASE + '/timeslots.json?activity.id=' + this.$props.activity, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }).then(response => {
                this.timeslots = response.data;
            });
        },
    }
</script>

<style scoped>

</style>
