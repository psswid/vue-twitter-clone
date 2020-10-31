<template>
    <div class="user-profile">
        <div class="user-profile__user-panel">
            <h1 class="user-profile__username">@{{ state.user.username }}</h1>
            <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
              Admin
            </div>
            
            <div class="user-profile__follower-count">
                <strong>Followers: </strong> {{ state.followers }}
            </div>
           <CreatePostPanel 
              @add-post="addPost"
           />
        </div>
        <div class="user-profile__posts-wrapper">
          <PostElement 
            v-for="post in state.user.posts" 
            :key="post.id" 
            :username="state.user.username" 
            :post="post" 
          />
          
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { users } from '../assets/users';
import PostElement from '../components/PostElement';
import CreatePostPanel from '../components/CreatePostPanel'

export default {
  name: 'UserProfile',
  components: {
    PostElement,
    CreatePostPanel
  },
  setup() { 
    const route = useRoute();
    const userId = computed(() => route.params.userId);




    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0]
    });

    function followUser(){
      state.followers++;
    }

    function addPost(post) {
      /** Some axios backend post call */
      this.user.posts.unshift({
        id: this.user.posts.length + 1,
        content: post
      });
    }

    return {
      state,
      addPost,
      followUser,
      userId
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