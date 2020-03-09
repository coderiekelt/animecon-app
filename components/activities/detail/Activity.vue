<template>
    <div>
        <div v-if="loaded">
            <h4>
                {{activityInfo.title}}
            </h4>
            <div class="row">
                <div class="col-md-3" v-if="hasLargeImage">
                    <img style="width: 100%" :src="imageBase + activityInfo.largeImage"></img>
                </div>
                <div :class="'col-md-' + (hasLargeImage ? '9' : '12')">
                    <p>{{activityInfo.description}}</p>
                    <Timetable :payload="activityInfo.timeslots"/>
                </div>
            </div>
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
        computed: {
            imageBase() {
                return process.env.API_BASE + '/images/';
            },
            hasLargeImage() {
                return this.activityInfo.largeImage !== null;
            }
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
