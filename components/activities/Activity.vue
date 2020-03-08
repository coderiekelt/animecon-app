<template>
    <div>
        <div v-if="loaded">
            <h1>
                {{activityInfo.title}}
            </h1>
            <p>{{activityInfo.description}}</p>
            <Timetable :activity="activityInfo.id"/>
        </div>
        <div v-if="!loaded">
            <center>
                <h1>Please wait...</h1>
                <small>This activity is loading...</small>
            </center>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import Timetable from './Timetable'

    export default {
        name: 'Activity',
        props: ['id'],
        components: {
            Timetable,
        },
        data() {
            return {
                loaded: false,
                activityInfo: null,
            }
        },
        mounted() {
            this.$animecon.sendAuthorizedRequest('GET','/activities/' + this.$props.id + '.json').then(response => {
                this.loaded = true;
                this.activityInfo = response.data;
            });
        }
    }
</script>

<style scoped>
    .host {
        font-size: 16pt;
        float: right;
    }
</style>
