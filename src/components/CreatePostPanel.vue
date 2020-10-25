<template>
     <form action="" class="create-post-panel" @submit.prevent="createNewPost" :class="{ '--exceeded': newPostCharacterCount > 180 }">
        <label for="newPost"><strong>New Post</strong> ({{ newPostCharacterCount }}/180)</label>
        <textarea name="" id="newPost" cols="30" rows="10" v-model="newPostContent"></textarea>

        <div class="create-post-panel__submit">
            <div class="create-post-type">
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
        </div>
    </form>
</template>

<script>
export default {
    name: 'CreatePostPanel',
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
        }
    },
    computed: {
        newPostCharacterCount() {
            return this.newPostContent.length;
        }  
    },
    methods: {
        createNewPost() {
            if (this.newPostContent && this.selectedPostType !== 'draft') {

                /** Some axios backend post call */
                this.$emit('add-post', this.newPostContent);
                this.newPostContent = '';
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.create-post-panel {
  margin-top: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  textarea {
    border: 1px solid #DFE3E8;
    border-radius: 5px;
  }
  .create-post-panel__submit {
    display: flex;
    justify-content: space-between;
    .create-post-type {
      padding: 10px 0;
    }
    button {
      padding: 5px 20px;
      margin: auto 0;
      border-radius: 5px;
      border: none;
      background-color: deeppink;
      color: white;
      font-weight: bold;
    }
  }
  &.--exceeded {
    color: red;
    border-color: red;
    .create-post-panel__submit {
      button {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>