<template>
    <div>
        <v-container>
            <v-layout row>
                <v-flex x12>
                    <v-card v-if="!loading">
                        <v-img
                                :src="ad.imageSrc"
                                height="300px"
                        >

                        </v-img>
                        <v-card-text>
                            <h1 class="text--primary">{{ad.title}}</h1>
                            <p>{{ad.description}}</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <appEditAdModal v-if="isOwner" :ad="ad" class="mr-3"></appEditAdModal>
                            <app-buy-modal :ad="ad"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                    <div v-else xs12 class="text-xs-center" style="padding-top: 35vh;">
                        <v-progress-circular
                                :size="70"
                                :width="7"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
  import EditAdModal from './EditAdModal'

  export default {
    props: ['id'],
    computed: {
      ad () {
        const id = this.id
        return this.$store.getters.adById(id)
      },
      loading () {
        return this.$store.getters.loading
      },
      isOwner () {
        if (this.$store.getters.user) {
          return this.ad.ownerId === this.$store.getters.user.id
        }
        return false
      }
    },
    components: {
      appEditAdModal: EditAdModal
    }

}
</script>

<style scoped>

</style>