<template>
    <div>
      <TopNavBar/>
        <div class="container-fluid">
            <div class="row">
               <SideBarWrapper/>
                <MainViewer/>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBarWrapper from "./SideBarWrapper";
    import MainViewer from "./MainViewer";
    import TopNavBar from "./TopNavBar";
    export default {
        name: "MapAndSearchWrapper",
        components: {TopNavBar, MainViewer, SideBarWrapper}
    }
</script>

<style scoped>

</style>
