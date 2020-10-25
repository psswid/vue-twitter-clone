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
            <form action="" class="user-profile__create-post" @submit.prevent="createNewPost">
              <label for="newPost"><strong>New Post</strong></label>
              <textarea name="" id="newPost" cols="30" rows="10" v-model="newPostContent"></textarea>

              <div class="user-profile__create-post-type">
                <label for="newPostType"><strong>Type</strong></label>
                <select name="" id="newPostType" v-model="selectedTPostType">
                  <option :value="option.value" v-for="(option, index) in postTypes" :key="index">
                    {{ option.name }}
                  </option>
                </select>
              </div>
              <button>
                Send post
              </button>
            </form>
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

export default {
  name: 'UserProfile',
  components: {
    PostElement
  },
  data() {
    return {
      newPostContent: '',
      selectedPostType: 'instant',

      postTypes: [
        {
          value: 'draft',
          name: 'Draft'
        },
        {
          value: 'instant',
          name: 'Instant Post'
        },
      ],
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
    }  
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
    createNewPost() {
      if (this.newPostContent && this.selectedPostType !== 'draft') {

        /** Some axios backend post call */
        this.user.posts.unshift({
          id: this.user.posts.length + 1,
          content: this.newPostContent
        })
        this.newPostContent = '';
      }
    }
  },
  mounted() {
    this.followUser();
  },
}
</script>

<style scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5%;
}

.user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
}

.user-profile__admin-badge {
  background: red;
  color: white;
  border-radius: 5px;
  margin-right: auto;
  padding: 0 10px;
  font-weight: bold;
  margin-bottom: 10px;
}

h1 {
    margin: 0;
}

.user-profile__create-wrapper {
  display: grid;
  grid-gap: 10px;
}

.user-profile__create-post {
  border-top: 1px solid black;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>