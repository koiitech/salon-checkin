<template>
  <v-card class="elevation-10">
    <v-toolbar
      dark
      color="primary"
      extended
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title
        ><v-icon size="48" left>mdi-account-circle</v-icon>
        {{ customer.name }}</v-toolbar-title
      >
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <template v-slot:extension>
        <div class="headline">
          Dịch vụ của bạn
        </div>
      </template>
    </v-toolbar>

  
    <v-footer fixed app>
      <v-btn x-large @click="next" color="primary" block>Tiếp theo</v-btn>
    </v-footer>
  </v-card>
</template>

<script>
import getCategories from '~/graphql/queries/getCategories.gql'
import { mapState, mapActions } from 'vuex'
export default {
  apollo: {
    categories: {
      query: getCategories,
      variables() {
        return {
          salon_id: this.user.salon_id,
        }
      },
    },
  },
  data() {
    return {
      categories: [],
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('cart', ['services']),
    ...mapState(['customer']),
    services: {
      get() {
        return this.$store.state.cart.services
      },
      set(value) {
        this.$store.commit('cart/SERVICES', value)
      },
    },
  },
  methods: {
    ...mapActions('cart', ['addExtra', 'removeExtra']),
    toggleExtra(service_id, extra_id, checked) {
      if (!checked) {
        this.removeExtra(service_id, extra_id)
      } else {
        this.addExtra({ service_id, extra_id })
      }
    },
    next() {
      this.$router.push({ name: 'cart' })
    },
  },
  mounted() {
    if (!this.customer.id) {
      this.$router.replace({ name: 'index' })
    }
  },
}
</script>

<style></style>
