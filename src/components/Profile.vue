<template>
    <h2>{{ user.displayName }}'s profile:</h2>
    {{ user }}
    <p>ID : {{ user.uid }}</p>
    <p>Mail :{{ user.email }}</p>
    <p>Pseudo : {{ user.displayName }}</p>
    <div v-if="error">{{ error }}</div>
    <form>
        <input type="text" placeholder="new pseudo" v-model="newName">
        <input type="file" @change="handleFileUpload" accept="image/">

        <button @click="handleSubmit">Update profile!</button>
    </form>

    <img :src="user.photoUrl" :alt="'photo of ' + user.displayName">
</template>

<script>

import getUser from '../composables/getUser'
import useProfile from '../composables/useProfile'

import { ref, watch } from 'vue'

import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const { user } = getUser()
        const { error, test } = useProfile(user)

        const newName = ref('')

        watch(user, () => {
            if (!user.value) {
                router.push({ name: 'Welcome' })
            }
        })

        const handleSubmit = async () => {
            await test(newName.value)
        }

        return { error, user, handleSubmit, newName, test }

    }
}
</script>

<style></style>