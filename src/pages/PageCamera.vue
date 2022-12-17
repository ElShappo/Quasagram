<template>
  <q-page class="constrain q-pa-md row justify-center">
    <div
      class="camera-frame q-pa-md col-6 col-md-4 row justify-center items-center"
    >
      <video ref="video" autoplay class="full-width" />
      <!-- <img class="fit" src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
    </div>
    <div class="text-center q-pa-md col-12">
      <q-btn round color="grey-10" size="lg" icon="eva-camera" />
    </div>
    <div class="col-12 col-sm-6 row justify-center q-gutter-md">
      <q-input class="col-12" v-model="caption" label="Caption" dense="dense" />
      <q-input class="col-12" v-model="location" label="Location" dense="dense">
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" />
        </template>
      </q-input>
      <q-btn unelevated rounded color="primary" label="Add a new post" />
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
require("md-gum-polyfill");

export default {
  name: "PageCamera",
  data() {
    return {
      id: uid(),
      caption: "",
      location: "",
      photo: null,
      date: Date.now(),
    };
  },
  methods: {
    checkGetUserMedia() {
      if (
        !navigator.mediaDevices ||
        typeof navigator.mediaDevices.getUserMedia !== "function"
      ) {
        console.log("cannot access camera source");
      }
    },
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        });
    },
  },
  mounted() {
    this.initCamera();
    this.checkGetUserMedia();
  },
};
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
