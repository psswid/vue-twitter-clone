<template>
     <form action="" class="create-post-panel" @submit.prevent="createNewPost" :class="{ '--exceeded': newPostCharacterCount > 180 }">
        <label for="newPost"><strong>New Post</strong> ({{ newPostCharacterCount }}/180)</label>
        <textarea name="" id="newPost" cols="30" rows="10" v-model="state.newPostContent"></textarea>

        <div class="create-post-panel__submit">
            <div class="create-post-type">
                <label for="newPostType"><strong>Type</strong></label>
                <select name="" id="newPostType" v-model="state.selectedTPostType">
                <option :value="option.value" v-for="(option, index) in state.postTypes" :key="index">
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
import { reactive, computed } from 'vue'

export default {
    name: 'CreatePostPanel',
    setup(props, ctx) {
        const state  = reactive({
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
        })

        const newPostCharacterCount = computed(() => state.newPostContent.length);

        function createNewPost() {
            if (state.newPostContent && state.selectedPostType !== 'draft') {

                /** Some axios backend post call */
                ctx.emit('add-post', state.newPostContent);
                state.newPostContent = '';
            }
        }

        return {
            state,
            newPostCharacterCount,
            createNewPost
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