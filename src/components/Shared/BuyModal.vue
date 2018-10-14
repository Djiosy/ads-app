<template>
  <v-dialog width="400px" v-model="modal">
   <v-btn raised class="primary" slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs-12>
            <v-card-title>
              <h1 class="text--primary">Do you want to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs-12>
            <v-card-text>
              <v-text-field
                      name="name"
                      label="Your name"
                      type="text"
                      v-model="name"
              ></v-text-field>
              <v-textarea
                      name="phone"
                      label="Name phone"
                      type="text"
                      v-model="phone"
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs-12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="error" @click="onCancel" :disabled="localLoading">Close</v-btn>
              <v-btn class="success" @click="onBuy" :disabled="localLoading" :loading="localLoading">Buy it</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['ad'],
    data () {
      return {
        modal: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      onCancel () {
        this.name = ''
        this.phone = ''
        this.modal = false
      },
      onBuy () {
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
            .finally(() => {
              this.phone = ''
              this.name = ''
              this.localLoading = false
              this.modal = false
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>