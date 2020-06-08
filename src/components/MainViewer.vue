<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-light">
        <MapViewer></MapViewer>
    </main>
</template>
<script>
    import MapViewer from "./MapViewer";
    export default {
        name: "MainViewer",
        components: {MapViewer}
    }
</script>

<style scoped>

</style>
