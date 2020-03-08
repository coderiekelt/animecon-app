<template>
    <div class="container">
        <div>
            <Activity :id="$route.params.id"/>
        </div>
    </div>
</template>

<script>
    import Activity from '~/components/activities/Activity'

    export default {
        layout: 'anime',
        components: {
            Activity
        }
    }
</script>
