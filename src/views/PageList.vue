<template>
  <app-dialog
    :style="{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #666',}"/>

  <app-progress v-if="isLoading" />

  <app-message v-else-if="!isLoading && !interviews.length" severity="info">
    Нет добавленных собеседований</app-message>

  <div v-else>
    <h1>Список собеседований</h1>

    <div class="flex align-items-center mb-5">
      <div class="flex align-items-center mr-2">
        <app-radio
          inputId="interviewResult1"
          name="result"
          value="Refusal"
          v-model="selectedFilterResult"
        />
        <label for="interviewResult1" class="ml-2">Отказ</label>
      </div>
      <div class="flex align-items-center mr-2">
        <app-radio
          inputId="interviewResult2"
          name="result"
          value="Offer"
          v-model="selectedFilterResult"
        />
        <label for="interviewResult2" class="ml-2">Оффер</label>
      </div>
      <app-button class="mr-2" @click="submitFilter" :disabled="!selectedFilterResult"
        style="border-radius: 5px; padding: 5px; cursor: pointer; background-color: rgb(51, 143, 230);"
         >Применить</app-button
      >
      <app-button severity="danger" :disabled="!selectedFilterResult" @click="clearFilter"
        style="border-radius: 5px; padding: 5px; cursor: pointer;"
        >Сбросить</app-button
      >
    </div>


    <app-datatable :value="interviews">
      <app-column field="company" header="Компания"></app-column>
      <app-column field="hrName" header="Имя HR"></app-column>

      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">
            Ссылка на вакансию</a>
        </template>
      </app-column>

      <app-column header="Пройденные этапы">
        <template #body="slotProps">
          <span v-if="!slotProps.data.stages">Не заполнено</span>
          <div class="interview-stages" style="color: green;">
            <app-badge v-for="(stage, i) in slotProps.data.stages"
              :key="i" :value="i+1" rounded v-tooltip.top="stage.name"/>
          </div>
        </template>
      </app-column>

      <app-column header="Зарплатная вилка">
        <template #body="slotProps">
          <span v-if="!slotProps.data.salaryFrom">Не заполнено</span>
          <span v-else>{{ slotProps.data.salaryFrom }} - {{ slotProps.data.salaryTo }}</span>
        </template>
      </app-column>

      <app-column header="Результат">
        <template #body="slotProps">
          <span v-if="!slotProps.data.result">Не заполнено</span>
          <template v-else>
            <app-badge style="border-radius: 5px; padding: 5px;" :severity="slotProps.data.result === 'Offer' ? 'success' : 'danger'"
              :value="slotProps.data.result === 'Offer' ? 'Оффер' : 'Отказ'"></app-badge>
          </template>
        </template>
      </app-column>

      <app-column header="Контакты">
        <template #body="slotProps">
          <div class="contacts">

            <a
              v-if="slotProps.data.contactTelegram"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
              target="_blank"
              class="contacts__telegram"
            >
              <span class="contacts__icon pi pi-telegram"></span>
            </a>

            <a
              v-if="slotProps.data.contactWhatsApp"
              :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
              target="_blank"
              class="contacts__whatsapp"
            >
              <span class="contacts__icon pi pi-whatsapp"></span>
            </a>

            <a
              v-if="slotProps.data.contactPhone"
              :href="`https://tel:${slotProps.data.contactPhone}`"
              target="_blank"
              class="contacts__phone"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>

      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencil" severity="info" />
            </router-link>
            <app-button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmRemoveInterview(slotProps.data.id)"
            />
          </div>
        </template>
      </app-column>

    </app-datatable>
  </div>
</template>

<script setup lang="ts">
import { getFirestore, collection, query,
          orderBy, getDocs, deleteDoc, doc, where } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import type { IInterview } from '@/interfaces';
import { useConfirm } from 'primevue/useconfirm';

const userStore = useUserStore()
const db = getFirestore()
const confirm = useConfirm()

const interviews = ref<IInterview[]>([])
const isLoading = ref<boolean>(true)
const selectedFilterResult = ref<string>('')

const submitFilter = async (): Promise<void> => {
  isLoading.value = true

  const listIntervies: Array<IInterview> = await getAllInterviews(true)
    interviews.value = listIntervies

  isLoading.value = false
}

const clearFilter = async (): Promise<void> => {
  isLoading.value = true

  const listIntervies: Array<IInterview> = await getAllInterviews()
    interviews.value = listIntervies

  isLoading.value = false
}

const getAllInterviews = async <T extends IInterview>(isFilter?: boolean)
    : Promise<T[]> => {

  let getData;

  if(isFilter){
    getData = query(
      collection(db, `users/${userStore.userId}/interviews`),
      orderBy('createAr', "desc"),
      where('result', '==', selectedFilterResult.value)
    )
  } else {
    getData = query(
      collection(db, `users/${userStore.userId}/interviews`),
      orderBy('createAr', "desc")
    )
  }

  const listDocs = await getDocs(getData)

  return listDocs.docs.map((doc) => doc.data() as T)
}

const confirmRemoveInterview = async (id: string): Promise<void> => {
  confirm.require({
    message: 'Вы хотите удалить собеседование?',
    header: 'Удаление собеседований',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-dange',

    accept: async () => {
      isLoading.value = true
      await deleteDoc(doc(db, `users/${userStore.userId}/interviews`, id))

      const listIntervies: Array<IInterview> = await getAllInterviews()
      interviews.value = [...listIntervies]

      isLoading.value = false
    }
  })
}

onMounted(async () => {
  const listIntervies: Array<IInterview> = await getAllInterviews()

  interviews.value = [...listIntervies]

  isLoading.value = false
})
</script>

<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
</style>
