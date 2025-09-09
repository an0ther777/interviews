<template>
  <h2>Статистика:</h2>
    <div class="card flex justify-center">
        <app-chart type="pie" :data="chartData" :options="chartOptions" class="md:w-[40rem]" />
    </div>
</template>

<script setup lang="ts">
import { getFirestore, collection, query,
          orderBy, getDocs } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import type { IInterview } from '@/interfaces';

const chartData = ref();
const chartOptions = ref();

const userStore = useUserStore()
const db = getFirestore()
const interviews = ref<IInterview[]>([])

onMounted(async () => {
  interviews.value = await getAllInterviews()
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const getAllInterviews = async <T extends IInterview>()
    : Promise<T[]> => {

  const getData = query(
    collection(db, `users/${userStore.userId}/interviews`),
    orderBy('createAr', "desc")
  )
  const listDocs = await getDocs(getData)

  return listDocs.docs.map((doc) => doc.data() as T)
}

const setChartData = () => {

  const data: number[] = [0, 0, 0]

  interviews.value.forEach((interview: IInterview) => {
    if (interview.result === 'Offer') {
      data[0]++
    } else if (interview.result === 'Refusal') {
      data[1]++
    } else {
      data[2]++
    }
  })
    return {
        labels: ['Оффер', 'Отказ', 'В процессе'],
        datasets: [
            {
                data,
                backgroundColor: [
                    '#0F766E', // cyan-500
                    '#EA580C', // orange-500
                    '#6B7280'  // gray-500
                ],
                hoverBackgroundColor: [
                    '#0D9488', // cyan-400
                    '#F97316', // orange-400
                    '#9CA3AF'  // gray-400
                ]
            }
        ]
    };
};

const setChartOptions = () => {
    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: '#495057' // стандартный текст PrimeVue
                }
            }
        }
    };
};
</script>
