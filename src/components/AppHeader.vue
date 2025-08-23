<template>
   <app-menubar :model="items" class="custom-menu">
    <template #item="{ item, props }">
        <template v-if="item.show">
            <router-link :to="item.path" class="flex items-center p-2" id="link" 
                v-bind="props.action">
                <span :class="item.icon" class="p-menuitem-icon"></span>
                <span class="ml-2">{{ item.label }}</span>
            </router-link>
        </template>
    </template>
    <template #end>
        <span v-if="userStore.userId" 
            @click="userStore.userId = ''" 
            class="flex align-item-center cursor-pointer justify-content-center menu exit">
            <span class="pi pi-sign-out p-p-mebuitem-icon">
                <span class="mi-2 p-2">Выход</span>
            </span>
        </span>
    </template>
   </app-menubar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

interface IMenuItem {
  label: string
  icon: string
  path: string
  show: ComputedRef<boolean>
}

const items = ref<IMenuItem[]>([
  {
    label: 'Авторизация',
    icon: 'pi pi-user',
    path: '/auth',
    show: computed((): boolean => !userStore.userId)
  },
  {
    label: 'Добавить',
    icon: 'pi pi-plus',
    path: '/',
    show: computed((): boolean => !!userStore.userId)
  },
  {
    label: 'Список собеседований',
    icon: 'pi pi-list',
    path: '/list',
    show: computed((): boolean => !!userStore.userId)
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie',
    path: '/statistic',
    show: computed((): boolean => !!userStore.userId)
  }
])
</script>

<style scoped>
.custom-menu {
  margin: 30px 30px;
  height: 50px;
  width: 90%;
  border: 3px solid rgb(219, 219, 219);
  background-color: rgb(230, 230, 230);
  border-radius: 20px;
}
#link{
    border-radius: 15px;
    margin-top: 5px;
    border: 3px solid rgb(219, 219, 219);
    transition: all 0.3s;
}
#link:hover{
    background-color:  rgb(219, 219, 219);
}
.menu-exit {
  cursor: pointer;
}
:deep(.p-menubar-root-list) {
  background-color: rgb(238, 238, 238) !important;
  border-radius: 15px !important;
  padding: 10px !important;
}
</style>