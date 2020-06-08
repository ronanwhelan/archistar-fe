<template>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse mt-3">
        <h3 class="text-muted">Filters</h3>
        <form>
            <div class="form-group">
                <label>State</label>
                <select class="form-control" v-model="form.state">
                    <option value=""></option>
                    <option v-for="(item,index) in states" :key="index">{{item}}</option>
                </select>
            </div>

            <div class="form-group">
                <label>Suburbs</label>
                <multiselect
                        class=""
                        v-model="form.selectedSuburbs"
                        :placeholder="``"
                        :options="suburbs"
                        :show-labels="false"
                        :searchable="true"
                        :multiple="true"
                        @select="filterMap"
                >
                    <template slot="selection"></template>
                </multiselect>
            </div>

            <div class="form-group">
                <label>Type</label>
                <select class="form-control" v-model="form.type">
                    <option value=""></option>
                    <option v-for="(item,index) in types" :key="index">{{item}}</option>
                </select>
            </div>
        </form>
    </nav>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapMutations, mapGetters, mapActions} = createNamespacedHelpers('places');
    export default {
        name: "SideBarWrapper",
        components: {
            Multiselect
        },
        data() {
            return {
                form: {
                    'state': null,
                    'suburb': null,
                    'type': null,
                    selectedSuburbs: []
                }
            };
        },
        methods: {
            ...mapMutations([
                "setCoordidates",
                "setMapZoom",
            ]),
            filterMap(reset = false) {
                let map = this.$store.map;
                let id, visibility, property;
                let form = this.form;
                this.places.features.forEach(function (feature) {
                    id = feature.properties.id
                    property = feature.properties.project;
                    visibility = 'none';
                    if (reset) {
                        map.setLayoutProperty(id, 'visibility', 'visible');
                        return
                    }
                    if (!form.suburb && !form.state && !form.category && form.selectedSuburbs.length < 1) {
                        map.setLayoutProperty(id, 'visibility', 'none');
                        return
                    }
                    if (form.selectedSuburbs.length > 0 || true) {
                        if (form.selectedSuburbs.indexOf(property.Suburb.toString()) > -1) {
                            visibility = 'visible'
                        }
                    }
                    form.suburb && form.suburb.toString() === property.Suburb.toString() ? visibility = 'visible' : null;
                    form.state && form.state.toString() === property.State.toString() ? visibility = 'visible' : null;
                    form.category && form.suburb.toString() === property.Category.toString() ? visibility = 'visible' : null;
                    form.type && form.type.toString() === property.Type.toString() ? visibility = 'visible' : null;

                    map.setLayoutProperty(id, 'visibility', visibility);
                });
                map.zoomTo(14);
            },
            filterAttributes(name) {
                let states = [];
                this.$_.forEach(this.features, function (item) {
                    if (item.properties && item.properties.project) {
                        states.push(item.properties.project[name])
                    }
                });
                return this.$_.uniq(states);
            },
        },
        computed: {
            ...mapState({
                places: state => state.places,
            }),
            features: function () {
                return this.places.features;
            },
            states: function () {
                return this.filterAttributes('State');
            },
            suburbs: function () {
                return this.filterAttributes('Suburb');
            },
            types: function () {
                return this.filterAttributes('Type');
            },
        },
        watch: {
            'form': {
                handler: function (v) {
                    return this.filterMap();
                },
                deep: true
            },
        },
        mounted: function () {
        },
        created: function () {
        },
    }
</script>

<style scoped>

</style>
