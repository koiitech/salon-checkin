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
          Chọn dịch vụ
        </div>
      </template>
    </v-toolbar>

    <v-expansion-panels focusable>
      <v-expansion-panel v-for="category in categories" :key="category.id">
        <v-expansion-panel-header>
          <v-list three-line>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon v-if="!category.image">mdi-camera</v-icon>
                <img v-else :src="category.image | imgPath" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ category.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  category.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-treeview
            selectable
            rounded
            open-on-click
            hoverable
            activatable
            selected-color="red"
            :items="category.children"
            selection-type="independent"
          >
            <template v-slot:label="props">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ props.item.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    props.item.name
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-treeview>
          <!-- <v-list three-line>
            <template v-for="service in category.services">
              <v-list-item
                class="ml-3"
                v-if="service.extras.length === 0"
                :key="service.id"
              >
                <v-list-item-action>
                  <v-checkbox
                    color="deep-purple accent-4"
                    @click.stop="toggleService"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ service.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    service.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action> ${{ service.price }} </v-list-item-action>
              </v-list-item>
              <v-list-group
                v-else
                three-line
                :key="service.id"
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
                      <v-list-item-title>{{ service.name }}</v-list-item-title>
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
                  <v-list-item class="ml-3" :key="extra.id">
                    <v-list-item-avatar>
                      <v-checkbox color="deep-purple accent-4"></v-checkbox>
                    </v-list-item-avatar>
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
              </v-list-group>
            </template>
          </v-list> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import getCategories from '~/graphql/queries/getCategories.gql'
import { mapState } from 'vuex'
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
      services: [],
    }
  },
  computed: mapState({
    user: (state) => state.auth.user,
    customer: (state) => state.customer,
  }),
  methods: {
    toggleService(a, b, c) {
      console.log({ a, b, c })
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
