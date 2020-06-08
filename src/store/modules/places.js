import places from '../../assets/data/places.json'
const state = () => ({
  mapInstance:null,
  places: places,
  checkoutStatus: null,
  renderMap:false,
  coordidates:[0, 0],
  mapZoom:15
})

// getters
const getters = {

}

// mutations
const mutations = {

  setMapInstance (state,data) {
    state.mapInstance = data;
  },
  setMapZoom (state,value) {
    state.mapZoom = value;
  },
  setCoordidates (state,value) {
    state.coordidates = value;
  },
}

export default {
  namespaced: true,
  state,
  mutations
}
