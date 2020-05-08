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
    <v-card-text>
      <v-container>
        <v-row align="center">
          <v-col>
            <v-card>
              <v-card-title class="justify-center text-uppercase headline"
                >Dịch vụ</v-card-title
              >
              <v-card-text>
                <!-- <v-list three-line>
                  <template v-for="service in servicesSelected">
                    <v-list-item
                      class="ml-3"
                      v-if="service.extras.length === 0"
                      :key="service.id"
                    >
                      <v-list-item-action>
                        <v-checkbox
                          color="deep-purple accent-4"
                          v-model="services"
                          :value="service.id"
                        ></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          service.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          service.description
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        ${{ service.price }}
                      </v-list-item-action>
                    </v-list-item>
                    <v-list-group
                      v-else
                      three-line
                      :key="`${category.id}-${service.id}`"
                      no-action
                      :value="false"
                    >
                      <template v-slot:activator>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-checkbox
                              color="deep-purple accent-4"
                              v-model="services"
                              :value="service.id"
                            ></v-checkbox>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{
                              service.name
                            }}</v-list-item-title>
                            <v-list-item-subtitle>{{
                              service.description
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            ${{ service.price }}
                          </v-list-item-action>
                        </v-list-item>
                      </template>

                      <template v-for="extra in service.extras">
                        <v-list-item
                          class="ml-3"
                          :key="`${category.id}-${service.id}-${extra.id}`"
                          :disabled="!services.includes(service.id)"
                        >
                          <v-list-item-avatar>
                            <v-checkbox
                              color="deep-purple accent-4"
                              :value="extra.id"
                              @change="
                                toggleExtra(service.id, extra.id, $event)
                              "
                            ></v-checkbox>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{
                              extra.name
                            }}</v-list-item-title>
                            <v-list-item-subtitle>{{
                              extra.description
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            ${{ extra.price }}
                          </v-list-item-action>
                        </v-list-item>
                      </template>
                    </v-list-group>
                  </template>
                </v-list> -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-footer fixed app>
      <v-row>
        <v-col>
          <v-btn x-large @click="$router.back()" block>Quay lại</v-btn>
        </v-col>
        <v-col>
          <v-btn x-large @click="submit" color="primary" block>Đồng ý</v-btn>
        </v-col>
      </v-row>
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
    submit() {
      this.$router.push({ name: 'cart' })
    },
  },
  mounted() {
    // if (!this.customer.id) {
    //   this.$router.replace({ name: 'index' })
    // }
  },
}
</script>

<style></style>
