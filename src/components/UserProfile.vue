<template>
    <div class="user-profile">
        <div class="user-profile__user-panel">
            <h1 class="user-profile__username">@{{ user.username }}</h1>
            <div class="user-profile__admin-badge" v-if="user.isAdmin">
              Admin
            </div>
            
            <div class="user-profile__follower-count">
                <strong>Followers: </strong> {{ followers }}
            </div>
           <CreatePostPanel 
              @add-post="addPost"
           />
        </div>
        <div class="user-profile__posts-wrapper">
          <PostElement 
            v-for="post in user.posts" 
            :key="post.id" 
            :username="user.username" 
            :post="post" 
            @favorite="toggleFavorite"
          />
          
        </div>
    </div>
</template>

<script>

import PostElement from './PostElement';
import CreatePostPanel from './CreatePostPanel'

export default {
  name: 'UserProfile',
  components: {
    PostElement,
    CreatePostPanel
  },
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: "_RomanMotopompa",
        firstName: "Roman",
        lastName: "Motopompa",
        email: "motopompa@gmail.com",
        isAdmin: true,
        posts: [
          {
            id: 1,
            content: "lorem ipsum"
          },
          {
            id: 2,
            content: "Michał Białek kończył nocną zmianę..."
          }
        ],
      }
    }
  },
  watch: {
    /**
     * name of watcher has to be the same as value he observes
     */
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} gained a follower!`);
      }
    }
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },

  },
  methods: {
    followUser(){
      this.followers++;
    },
    toggleFavorite(id) {

      /**
       * i.e. for axios call to backend for add favorite count etc.
       */
      console.log(`Favorited post #${id}`);
    },
    addPost(newPostContent) {
        console.log(newPostContent)
        /** Some axios backend post call */
        this.user.posts.unshift({
          id: this.user.posts.length + 1,
          content: newPostContent
        })
      }
  },
  mounted() {
    this.followUser();
  },
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    margin-bottom: auto;

    h1 {
      margin: 0;
    }

    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }
  }

  .user-profile__posts-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>