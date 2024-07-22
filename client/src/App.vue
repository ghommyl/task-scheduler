<script setup>
import { ref } from 'vue'
import Task from './components/Task.vue'

const tasks = ref([])

fetch('/api/get-tasks', {
  method: 'POST'
})
.then(response => response.json())
.then(data => {
  console.log(data)
  if (data['error']) {
    console.error(data['error'])
    return
  }
  tasks.value.push(...data['tasks'].map(task => {
    task['has_description'] = Boolean(task['has_description'])
    task['has_end_date'] = Boolean(task['has_end_date'])
    return task
  }))
})
.catch(error => console.error('Error:', error))

function deleteTask(id) {
  if (confirm('Sure to delete?')) {
    tasks.value = tasks.value.filter((task) => task.id != id)
    fetch('/api/delete-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
  }
}

function updateTask(id) {
  console.log(tasks.value.find(task => task['id'] == id))
  fetch('/api/update-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tasks.value.find(task => task['id'] == id))
  })
}

function addTask() {
  fetch('/api/add-task', {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => tasks.value.push({
    id: data['result']['insertId'],
    title: '',
    description: '',
    end_date: '',
    has_description: false,
    has_end_date: false,
    editMode: true
  }))
}
</script>
<template>
  <div class="flex flex-row border-b-2 border-gray-100 mt-6 ml-6 mr-6 items-center gap-2">
    <h2 class="text-4xl font-extrabold text-gray-800">Tasks</h2>
    <button @click="addTask" class="h-8 transition hover:bg-gray-100 flex flex-row items-center gap-1 rounded-xl pt-1 pb-1 pl-1 pr-2 ml-2">
      <svg viewBox="0 0 100 100" class="stroke-black size-6 align-middle" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="50" x2="85" y2="50" stroke-width="5" stroke-linecap="round" />
        <line x1="50" y1="15" x2="50" y2="85" stroke-width="5" stroke-linecap="round" />
      </svg>
      <span class="text-lg relative top-[1px] text-gray-800">Add Task</span>
    </button>
  </div>
  <ul class="grow">
    <li v-for="task in tasks" :key="task['id']">
      <Task :id="task['id']" v-model:title="task['title']" v-model:description="task['description']" v-model:endDate="task['end_date']"
        v-model:hasDescription="task['has_description']" v-model:hasEndDate="task['has_end_date']"
        :editMode="Boolean(task['editMode'])"
        @delete="deleteTask" @update="updateTask" />
    </li>
  </ul>
</template>
