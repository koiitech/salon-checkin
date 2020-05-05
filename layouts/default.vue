<template>
  <v-app dark>
    <v-content class="grey lighten-4">
      <v-container fluid class="">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      title: 'Hệ thống quản lý salon',
    }
  },
}
</script>
