<script setup>
import { ref, onMounted } from 'vue';
import Task from './components/Task.vue';
import { getTasks, modifyTaskTo, deleteTaskId, addEmptyTask } from '@/services/api';

const tasks = ref([]);

async function updateTasks() {
  const res = await getTasks();
  if (res) {
    tasks.value = res;
  }
}

onMounted(updateTasks);

async function deleteTask(id) {
  if (confirm("Sure to delete?")) {
    await deleteTaskId(id);
    await updateTasks();
  }
}

async function modifyTask(id, updated) {
  await modifyTaskTo(id, updated);
  await updateTasks();
}

async function addTask() {
  const id = await addEmptyTask();
  tasks.value.push({
    id: id,
    title: '',
    description: '',
    end_date: null,
    show_description: false,
    show_end_date: false,
    editMode: true
  })
  await updateTasks();
}
</script>
<template>
  <div class="flex flex-row border-b-2 border-gray-100 mt-6 ml-6 mr-6 items-center gap-2">
    <h2 class="text-4xl font-extrabold text-gray-800">Tasks</h2>
    <button @click="addTask"
      class="h-8 transition md:hover:bg-gray-100 flex flex-row items-center gap-1 rounded-xl pt-1 pb-1 pl-1 pr-2 ml-2">
      <svg viewBox="0 0 100 100" class="stroke-black size-6" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="50" x2="85" y2="50" stroke-width="5" stroke-linecap="round" />
        <line x1="50" y1="15" x2="50" y2="85" stroke-width="5" stroke-linecap="round" />
      </svg>
      <span class="text-lg relative text-gray-800 top-[1px]">Add Task</span>
    </button>
  </div>
  <ul class="grow">
    <li v-for="task in tasks" :key="task['id']">
      <Task :id="task['id']" v-model:title="task['title']" v-model:description="task['description']"
        v-model:endDate="task['end_date']" v-model:showDescription="task['show_description']"
        v-model:showEndDate="task['show_end_date']" :editMode="Boolean(task['editMode'])" @delete="deleteTask"
        @modify="modifyTask" />
    </li>
  </ul>
</template>
