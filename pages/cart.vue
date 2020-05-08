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
        <div class="headline">Dịch vụ của bạn ({{ services.length }})</div>
      </template>
    </v-toolbar>
    <v-container>
      <v-row align="center">
        <v-col>
          <v-card>
            <v-card-title class="justify-center text-uppercase headline"
              >Dịch vụ</v-card-title
            >
            <v-card-text>
              <v-list three-line>
                <template v-for="service in services">
                  <v-list-item :key="service.id">
                    <v-list-item-action>
                      <v-icon>mdi-camera</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{ service.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        service.description
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      ${{ service.price }}
                    </v-list-item-action>
                  </v-list-item>
                  <template v-for="extra in service.extras">
                    <v-list-item
                      class="pl-12"
                      :key="`${service.id}-${extra.id}`"
                    >
                      <v-list-item-action> </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{ extra.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          extra.description
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        ${{ extra.price }}
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                  <!-- <v-list-group
                      v-else
                      three-line
                      :key="`${service.id}`"
                      no-action
                      :value="true"
                    >
                      <template v-slot:activator>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon>mdi-camera</v-icon>
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
                          :key="`${service.id}-${extra.id}`"
                        >
                          <v-list-item-avatar>
                            <v-icon>mdi-camera</v-icon>
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
                    </v-list-group> -->
                </template>
                <v-divider />
                <v-list-item>
                  <v-list-item-content class="text-right">
                    <v-list-item-title class="headline"
                      >Tổng: ${{ amount }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapState(['customer']),
    ...mapGetters('cart', ['services', 'amount']),
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
