import * as type from '../mutation-types'

const state = {
  pos: {
    x: 0,
    y: 0
  },
  click: false
}

const getters = {}

const actions = {
  setPos ({commit}, pos) {
    commit(type.SET_POS, pos)
  },
  setClick ({commit}, click) {
    commit(type.SET_CLICK, click)
  }
}

const mutations = {
  [type.SET_POS] (state, pos) {
    state.pos = pos
  },
  [type.SET_CLICK] (state, click) {
    state.click = click
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
