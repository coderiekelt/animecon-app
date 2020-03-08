<template>
    <div>
        <div class="card" v-if="loaded">
            <div class="card-body">
                <h5 class="card-title">{{location.name}}</h5>
                <p class="card-text">
                    <b>{{$moment(timeslot.dateStartsAt).format('dddd')}}</b><br>
                    From {{$moment(timeslot.dateStartsAt).format('HH:mm')}}<br>
                    Until {{$moment(timeslot.dateEndsAt).format('HH:mm')}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Timeslot',
        props: ['timeslot'],
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
            let locationLoaded = false;
            let activityLoaded = false;

            this.timeslot = this.$props.timeslot;

            let accessToken = this.$store.state.auth.oauth;

            axios.get(process.env.API_BASE + this.timeslot.location + '.json', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }).then(response => {
                locationLoaded = true;

                if (activityLoaded) {
                    this.loaded = true;
                }

                this.location = response.data;
            });

            axios.get(process.env.API_BASE + this.timeslot.activity + '.json', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                }
            }).then(response => {
                this.activity = response.data;
            });
        }
    }
</script>

<style scoped>

</style>
