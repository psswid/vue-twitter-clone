<template>
  <div id="app">
    {{fullName}}
    <strong>Followers: </strong>{{ followers }}
    <button @click="followUser">
      Follow
    </button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: "",
        firstName: "Roman",
        lastName: "Motopompa",
        email: "",
        isAdmin: true
      }
    }
  },
  watch: {
    /**
     * name of watcher has to be the same as value he observes
     */
    followers(newFollowerCount, oldFollowerCount) {
      console.log(oldFollowerCount, newFollowerCount)
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
    }
  },
  mounted() {
    this.followUser();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
