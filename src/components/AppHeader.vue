<template>
   <app-menubar :model="items" class="custom-menu">
    <template #item="{ item, props }">
        <router-link :to="item.path" class="flex items-center p-3" id="link" 
            v-bind="props.action">
            <span :class="item.icon" class="p-menuitem-icon"></span>
            <span class="ml-2">{{ item.label }}</span>
        </router-link>
    </template>
   </app-menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface IMenuItem {
    label: string,
    icon: string, 
    path: string,
}

const items = ref<IMenuItem[]>([
    {
        label: 'Авторизация',
        icon: 'pi pi-user',
        path: '/auth'
    },
    {
        label: 'Добавить',
        icon: 'pi pi-plus',
        path: '/'
    },
    {
        label: 'Список собеседований',
        icon: 'pi pi-list',
        path: '/list'
    },
    {
        label: 'Статистика',
        icon: 'pi pi-chart-pie',
        path: '/statistic'
    },
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
    transform: translateY(-3px);
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