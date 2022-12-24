<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
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
              <div class="text-caption text-grey">
                {{ fancyTime(post.date) }}
              </div>
            </q-card-section>
          </q-card>
        </template>

        <template v-else-if="!loadingPosts && !posts.length">
          <div
            class="row text-h6 justify-center text-weight-ligh content-center text-grey-6"
            style="height: 100%"
          >
            <span>No posts present.</span>
          </div>
        </template>

        <template v-else>
          <q-card flat bordered size="40px">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </template>
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
      posts: [],
      loadingPosts: false,
    };
  },
  methods: {
    fancyTime(timestamp) {
      return date.formatDate(timestamp, "D MMMM YYYY, HH:mm");
    },
    getPosts() {
      // console.log("Get posts method fired");
      this.loadingPosts = true;
      axios
        .get(`${process.env.API}/posts`)
        .then((response) => {
          // console.log(response.data);
          this.posts = response.data;
          this.loadingPosts = false;
        })
        .catch((error) => {
          console.log("error: ", error);
          this.$q.notify({
            type: "warning",
            position: "top",
            message: "Unable to fetch posts from database",
            icon: "eva-alert-circle-outline",
          });
          this.loadingPosts = false;
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
