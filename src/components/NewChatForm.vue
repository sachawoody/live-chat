<template>
  <form>
    <textarea placeholder="Type a message and hit enter to send..." v-model="message"
      @keypress.enter.prevent="handleSubmit"></textarea>
    <input type="file" @change="handleFileUpload" accept="image/">
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import { ref } from 'vue'

export default {
  setup() {
    const { user } = getUser()
    const { addDoc, error } = useCollection('messages')

    // refs
    const message = ref('')
    const sticker = ref(null)

    const handleSubmit = async () => {
      if(!message.value) return
      const chat = {
        name: user.value.displayName,
        message: message.value,
        sticker: sticker.value, // Include selected sticker in chat object
        createdAt: timestamp()
      }
      await addDoc(chat)
      if (!error.value) {
        message.value = ''
        sticker.value = null // Reset sticker after sending message
      }
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      // Read file and convert to data URL
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        sticker.value = reader.result // Set sticker value to data URL
      }
    }

    return { message, handleSubmit, error, sticker, handleFileUpload }
  }
}
</script>
<style scoped>
form {
  margin: 10px;
}

textarea, input {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}


.error {
  text-align: center;
  color: #ff2a58;
  font-size: 12px;
  padding: 10px 0;
}
</style>