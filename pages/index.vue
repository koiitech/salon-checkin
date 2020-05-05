<template>
  <v-row no-gutters class="fill-height">
    <v-col order="2" order-md="1" class="blue" cols="12" md="5" lg="4">
      <v-card class="fill-height elevation-5" tile img="/images/checkin-bg.jpg">
        <v-row class="align-center justify-center fill-height">
          <v-card width="70%" flat outlined class="transparent" dark>
            <v-form @submit.prevent="checkin">
              <v-card-title class="text-uppercase display-1 justify-center"
                >Đăng nhập</v-card-title
              >
              <v-card-text class="px-10 mt-5">
                <v-text-field
                  v-model="phone"
                  label="Số điện thoại"
                  height="60"
                  solo-inverted
                  prepend-inner-icon="mdi-phone"
                  required
                ></v-text-field>
                <v-btn x-large color="primary" block type="submit"
                  ><v-icon left>mdi-login</v-icon> Đăng nhập</v-btn
                >
              </v-card-text>
            </v-form>
          </v-card>
        </v-row>
      </v-card>
    </v-col>
    <v-col order="1" order-md="2">
      <v-row class="mx-1">
        <v-col cols="12">
          <v-card tile flat>
            <v-responsive :aspect-ratio="16 / 9">
              <v-carousel
                cycle
                height="100%"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet :color="colors[i]" height="100%">
                    <v-row class="fill-height" align="center" justify="center">
                      <div class="display-3">{{ slide }} Slide</div>
                    </v-row>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-responsive>
          </v-card>
        </v-col>
        <v-col cols="12" class="hidden-sm-and-down">
          <v-card class="fill-height" flat>
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-avatar size="150" class="elevation-3">
                    <v-icon v-if="!salon.logo">mdi-camera</v-icon>
                    <img v-else :src="salon.logo" alt="salon.name" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-card-title>{{ salon.name }}</v-card-title>
                  <v-card-subtitle>{{ salon.address }}</v-card-subtitle>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-rating
                        :value="4.5"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                      ></v-rating>

                      <div class="grey--text ml-4">4.5 (413)</div>
                    </v-row>

                    <div class="my-4">
                      {{ salon.description }}
                    </div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import getSalon from '~/graphql/queries/getSalon.gql'
import checkinMutation from '~/graphql/queries/checkin.gql'

import { mapState, mapActions } from 'vuex'

export default {
  layout: 'blank',
  apollo: {
    salon: {
      query: getSalon,
      prefetch: false,
      variables() {
        return {
          id: this.user.salon_id,
        }
      },
    },
  },
  data: () => ({
    salon: {},
    phone: '+1-703-967-9498',
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ],
    slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
  }),
  computed: mapState({
    user: (state) => state.auth.user,
  }),
  methods: {
    ...mapActions(['setCustomer']),
    checkin() {
      this.$apollo
        .mutate({
          mutation: checkinMutation,
          variables: { phone: this.phone },
        })
        .then(({ data }) => Object.values(data)[0])
        .then((customer) => this.setCustomer(customer))
        .then(() => this.$router.push({ name: 'menus' }))
    },
  },
}
</script>
