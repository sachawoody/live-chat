<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="formattedDocuments" ref="messages" class="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="name">{{ doc.name }}</span>
        <div class="chatBox">
          <p class="message" v-html="formatMessage(doc.message)">

          </p>
          <img v-if="doc.sticker" :src="doc.sticker" class="imageSent" alt="sticker">

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import { computed, onUpdated, ref } from 'vue'
import { formatDistanceToNow } from 'date-fns'

export default {
  setup() {
    const { error, documents } = getCollection('messages')

    // format timestamp
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map(doc => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return { ...doc, createdAt: time }
        })
      }
    })

    // auto-scroll to bottom of messages
    const messages = ref(null)
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    })


    const formatMessage = (message) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const youtubeLinkRegex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/;
      let links = '';
      let text = '';

      message = message.replace(urlRegex, (match) => {
        if (youtubeLinkRegex.test(match)) {
          const videoYtbId = match.slice(
            match.indexOf('watch?v=') + 'watch?v='.length,
            match.indexOf('watch?v=') + 'watch?v='.length + 11
          );
          links += `<div><iframe width="420" height="315" src="https://www.youtube.com/embed/${videoYtbId}" frameborder="0" allowfullscreen></iframe></div>`;
        } else {
          links += `<div><a href="${match}" target="_blank">${match}</a></div>`;
        }
        return '';
      });

      if (links) {
        links = `<div>${links}</div>`;
      }

      text = `<div>${message}</div>`;

      return links + text;
    };


    return { formatMessage, error, documents, formattedDocuments, messages }
  }
}
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}

.single {
  margin: 18px 0;
  padding: 5px;
  border-radius: 10px;

}

.chatBox {
  display: flex;
  flex-direction: column;
}

.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}

.name {
  font-weight: bold;
  margin-right: 6px;
}

.messages {
  max-height: 600px;
  overflow: auto;
}

.imageSent {
  border-radius: 10px;
  max-width: 300px;
  max-height: 300px;
}
</style>