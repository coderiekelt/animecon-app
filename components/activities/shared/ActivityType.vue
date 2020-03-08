<template>
    <div v-if="typeInfo !== null" class="badge" v-bind:style="style">
        {{typeInfo.description}}
    </div>
</template>

<script>
    export default {
        name: 'ActivityType',
        props: ['payload', 'activity-type'],
        computed: {
            style() {
                if (this.typeInfo === null) {
                    return {};
                }

                let style = {
                    backgroundColor: this.typeInfo.cssBackgroundColor,
                    color: this.typeInfo.cssForegroundColor,
                    fontWeight: this.typeInfo.cssBold ? 'bold' : 'normal',
                    marginLeft: '5px',
                };

                if (this.typeInfo.cssIsStrikeThrough) {
                    style.textDecoration = 'line-through';
                }

                return style;
            }
        },
        data() {
            return {
                typeInfo: null,
            }
        },
        mounted() {
            if (typeof this.$props.payload !== 'undefined') {
                this.typeInfo = this.$props.payload;

                return;
            }

            this.$animecon.sendAuthorizedRequest('GET', this.$props.activityType + '.json').then(response => {
                this.typeInfo = response.data;
            })
        },
    }
</script>

<style scoped>

</style>
