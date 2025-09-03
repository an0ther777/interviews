<template>
    <h1>Список собеседований</h1>
    
</template>

<script setup lang="ts">
import { getFirestore, collection, query,
          orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import type { IInterview } from '@/interfaces';

const userStore = useUserStore()
const db = getFirestore()

const interviews = ref<IInterview[]>([])
const isLoading = ref<boolean>(true)

const getAllInterviews = async <T extends IInterview>()
    : Promise<T[]> => {

  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createAr', "desc")
  )

  const listDocs = await getDocs(getData)

  return listDocs.docs.map((doc) => doc.data() as T)
}

onMounted(async () => {
  const listIntervies: Array<IInterview> = await getAllInterviews()
    console.log(listIntervies);

  interviews.value = [...listIntervies]
})
</script>

<style lang="scss" scoped>

</style>
