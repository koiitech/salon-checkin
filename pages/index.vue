<template>
  <v-row no-gutters class="fill-height">
    <v-col class="hidden-sm-and-down" cols="12" md="5" lg="4">
      <v-card class="fill-height">
        <v-img
          class="grey lighten-2 align-end"
          :aspect-ratio="16 / 9"
          :src="salon.cover | imgPath"
        >
          <v-row justify="center">
            <v-avatar size="150" class="mb-5 elevation-3" color="white">
              <v-icon v-if="!salon.logo">mdi-image</v-icon>
              <img v-else :src="salon.logo | imgPath" alt="" />
            </v-avatar>
          </v-row>
        </v-img>
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

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
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
        <v-col cols="12">
          <v-card>
            <v-card-title class="justify-center text-uppercase headline"
              >Đăng nhập</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import getSalon from '~/graphql/queries/getSalon.gql'
import { mapState } from 'vuex'
export default {
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
}
</script>
