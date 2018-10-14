<template>
    <v-container>
        <v-layout v-if="!loading && orders.length !== 0" row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Orders</h1>
                <v-list two-line subheader>
                    <v-list-tile
                            avatar
                            v-for="order in orders"
                            :key="order.id"
                    >
                        <v-list-tile-action>
                            <v-checkbox
                                    color="success"
                                    :input-value="order.done"
                                    @click="markDone(order)"
                            ></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{order.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn
                                    :to="'/ad/' + order.adId"
                                    class="primary"
                            >Open</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="!loading && orders.length === 0">
            <v-flex xs12 class="text-xs-center">
                <h1 class="text--primary">You have no Ads</h1>
            </v-flex>
        </v-layout>
        <v-layout v-else>
            <v-flex xs12 class="text-xs-center" style="padding-top: 35vh;">
                <v-progress-circular
                        :size="70"
                        :width="7"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    computed: {
      orders () {
        return this.$store.getters.orders
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      markDone (order) {
        this.$store.dispatch('markOrderDone', order.id)
          .then(() => {
            order.done = true
          })
          .catch(() => {})
      }
    },
    created () {
      this.$store.dispatch('fetchOrders')
    }

  }
</script>

<style scoped>

</style>