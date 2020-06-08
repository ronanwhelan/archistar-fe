<template>
    <div>
        <div v-if="!loaded" id="loader" class="d-flex justify-content-center mb-3">
            <b-spinner variant="primary" style="width: 5rem; height: 5rem;" label="Loading..."></b-spinner>
        </div>
        <MglMap
                id="map"
                :accessToken="accessToken"
                :mapStyle.sync="mapStyle"
                :center="coordidates"
                :zoom="mapZoom"
                @load="onMapLoaded"
        >
            <MglNavigationControl position="top-right"/>
        </MglMap>
    </div>
</template>

<script>
    import Mapbox from "mapbox-gl";
    import {MglMap, MglNavigationControl, MglMarker, MglGeojsonLayer, MglPopup} from "vue-mapbox";
    import {createNamespacedHelpers} from "vuex";

    const {mapState, mapMutations, mapGetters, mapActions} = createNamespacedHelpers('places');
    export default {
        name: 'MapViewer',
        components: {MglMap, MglMarker, MglNavigationControl, MglGeojsonLayer, MglPopup},
        data() {
            return {
                loaded: false,
                accessToken: 'pk.eyJ1Ijoicm9uYW5qIiwiYSI6ImNrYjBoaGFwcTAxaGwycXJvc3FoZXUyem4ifQ.6DJv2gnyUF3gQ4UbhRh6qw', // your access token. Needed if you using Mapbox maps
                mapStyle: 'mapbox://styles/mapbox/streets-v11',// 'mapbox://styles/mapbox/light-v9',// 'mapbox://styles/mapbox/streets-v11',// 'mapbox://styles/mapbox/dark-v10', //hosted style id
                // coordinates: [151.208929, -33.872566],// coordinates: [-111.549668, 39.014]
            };
        },
        methods: {
            ...mapMutations([
                "setCoordidates",
                "setMapZoom",
            ]),
            onMapLoaded(event) {
                this.$store.map = event.map;
                this.$store.map.addSource('places', {
                    'type': 'geojson',
                    'data': this.places,
                });
                let _this = this;
                let map = this.$store.map;
                this.places.features.forEach(function (feature) {
                    var id = feature.properties.id;
                    if (!_this.$store.map.getLayer(feature.properties.id)) {
                        _this.$store.map.addLayer({
                            'id': id,
                            'type': 'circle',
                            'source': 'places',
                            'layout': {
                                'visibility': 'none'
                            },
                            'paint': {
                                'circle-radius': 8,
                                "circle-color": ["get", "color"]
                            },
                            'filter': ['==', 'id', id]
                        });
                    }
                    _this.setCoordidates(feature.geometry.coordinates);
                });
                this.setMapZoom(12)
                this.$nextTick(() => {
                    this.loaded = true;
                })

                map.on("click", event => {
                    const features = map.queryRenderedFeatures(event.point, {
                        places: ["id"]
                    });
                    if (!features.length) {
                        return;
                    }
                    const feature = features[0];
                    const project = JSON.parse(feature.properties.project);
                    new Mapbox.Popup({offset: [0, 0]})
                        .setLngLat(feature.geometry.coordinates)
                        .setHTML(
                            `<p class="font-weight-bold">${project.Title}</p><p>${project.Description}</p>`
                        )
                        .addTo(map);
                });
            },
        },
        computed: {
            ...mapState({
                places: state => state.places,
                coordidates: state => state.coordidates,
                mapZoom: state => state.mapZoom,
            }),
        },
        created() {
            this.mapbox = Mapbox;
        }
    };
</script>

<style>
    #map {
        height: 1000px;
    }

    #loader {
        position: absolute;
        z-index: 1;
        top: 300px;
        left: 40%;
    }
</style>
