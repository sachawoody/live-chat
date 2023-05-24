import { updateProfile } from 'firebase/auth'
import { ref } from 'vue'

const useProfile = (user) => {
    const error = ref(null)
    const test = async (newData) => {

        error.value = null
        try {
            const auth = user.value

            const res = await auth.updateProfile({
                displayName: displayName
            })

            error.value = null

            return res
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, test }
}

export default useProfile
