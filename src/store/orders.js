import fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({commit}, {name, phone, adId, ownerId}) {
      const order = new Order(name, phone, adId)
      commit('clearError')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)

      const resultOrders = []

      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()

        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.phone, o.adId, o.done, key)
        )
        })

        commit('loadOrders', resultOrders)

        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw Error
      }
    },
    async markOrderDone ({commit, getters}, payload) {
      commit('clearError')

      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
