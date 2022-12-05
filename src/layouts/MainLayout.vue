<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          dense
          round
          flat
          to="/camera"
          icon="eva-camera-outline"
          size="lg"
          class="large-screen-only"
        />
        <q-separator class="large-screen-only" vertical spaced />
        <q-toolbar-title class="text-grand-hotel text-bold"
          >Quasagram
        </q-toolbar-title>
        <q-btn
          dense
          round
          flat
          to="/"
          icon="eva-home-outline"
          size="lg"
          class="large-screen-only"
        />
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" label="home" />
        <q-route-tab to="/camera" icon="eva-camera-outline" label="camera" />
      </q-tabs>
    </q-footer>
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  components: {},

  methods: {},
};
</script>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 80px
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
.footer
  .q-tab__icon
    font-size: 30px
</style>
