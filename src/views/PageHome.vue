<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование:</template>
      <template #content>
        <app-input-text id="button" class="input mb-3" placeholder="Компания" v-model="company" />
        <app-input-text id="button"
          v-model="vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)"
        />
        <app-input-text id="button" v-model="hrName" class="input mb-3" placeholder="Контакт (имя)" />
        <app-input-text id="button"
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram username HR"
        />
        <app-input-text id="button"
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp телефон HR"
        />
        <app-input-text id="button" v-model="contactPhone" class="input mb-3" placeholder="Телефон HR" />
        <app-button id="buttonCreate"
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
        <div class="line"></div>
      </template>
    </app-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { IInterview } from '@/interfaces';
import { v4 as uuidv4 } from "uuid"
import { useUserStore } from '@/stores/user';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const userStore = useUserStore()
const db = getFirestore()
const router = useRouter()

const company = ref<string>('')
const vacancyLink = ref<string>('')
const hrName = ref<string>('')
const contactTelegram = ref<string>('')
const contactWhatsApp = ref<string>('')
const contactPhone = ref<string>('')

const loading = ref<boolean>(false)

const addNewInterview = async (): Promise<void> => {
  loading.value = true

  const payload: IInterview ={
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsApp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createAr: new Date()
  }

  if(userStore.userId) {
    await setDoc(doc(db, `users/${userStore.userId}/interviews`, payload.id)
      ,payload).then(() => {
          router.push('/list')
      })

  }


  loading.value = false
}

const disabledSaveButton = computed<boolean>(() => {
  return !(company.value && vacancyLink && hrName.value)
})
</script>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
#button{
  border: 3px solid rgb(182, 182, 182);
  border-radius: 15px;
  padding: 7px 30px;
}
#buttonCreate{
  border-radius: 15px;
  border: 3px solid rgb(182, 182, 182);
  background-color: #87cefa ;
  padding: 12px 50px;
  transition: all 0.3s;
  cursor: pointer;
}
#buttonCreate:hover{
  transform: translateY(-2px);
}
.line{
  height: 1px;
  background-color: grey;
  border-radius: 10px;
  margin: 30px 0;
  width: 90vh;
}
</style>
