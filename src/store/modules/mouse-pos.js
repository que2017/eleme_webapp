import * as type from '../mutation-types'

const state = {
  pos: {
    x: 0,
    y: 0
  }
}

const getters = {}

const actions = {
  setPos ({commit}, pos) {
    commit(type.SET_POS, pos)
  }
}

const mutations = {
  [type.SET_POS] (state, pos) {
    state.pos = pos
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
