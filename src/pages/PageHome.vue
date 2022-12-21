<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">MaliciousQ</q-item-label>
              <q-item-label caption> {{ post.location }} </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-img :src="post.imageUrl" />
          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ fancyTime(post.date) }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold">MaliciousQ</q-item-label>
            <q-item-label caption> Agent Smith </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import axios from "axios";

export default {
  name: "PageHome",
  data() {
    return {
      posts: [
        // {
        //   id: 1,
        //   caption: "Red Square",
        //   date: 1670261361432,
        //   location: "Moscow, Russia",
        //   imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        // },
        // {
        //   id: 2,
        //   caption: "Red Square",
        //   date: 1670261361432,
        //   location: "Moscow, Russia",
        //   imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        // },
        // {
        //   id: 3,
        //   caption: "Red Square",
        //   date: 1670261361432,
        //   location: "Moscow, Russia",
        //   imageUrl: "https://cdn.quasar.dev/img/parallax2.jpg",
        // },
      ],
    };
  },
  methods: {
    fancyTime(timestamp) {
      return date.formatDate(timestamp, "D MMMM YYYY, HH:mm");
    },
    getPosts() {
      // console.log("Get posts method fired");
      axios
        .get("http://192.168.25.129:3000/posts")
        .then((response) => {
          // console.log(response.data);
          this.posts = response.data;
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style lang="sass">

.card-post
  .q-img
    min-height: 200px
</style>
