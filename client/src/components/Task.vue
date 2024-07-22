<script setup>
import { ref, onUpdated } from 'vue'

const emit = defineEmits(['delete', 'update'])

const props = defineProps({
  'id': {
    required: true,
    type: Number
  },
  'editMode': Boolean
})

const title = defineModel('title', { type: String, required: true })
const description = defineModel('description', { type: String })
const endDate = defineModel('endDate', { type: String })
const hasDescription = defineModel('hasDescription', { type: Boolean, required: true })
const hasEndDate = defineModel('hasEndDate', { type: Boolean, required: true })

const editMode = ref(props.editMode)
onUpdated(() => {
  const textarea = document.getElementById('description')
  if (textarea) {
    textarea.style.height = textarea.scrollHeight + 'px'
  }
})
const titleEdit = ref(title.value)
const descriptionEdit = ref(description.value)
const hasDescriptionEdit = ref(hasDescription.value)
const hasEndDateEdit = ref(hasEndDate.value)

function startEdit() {
  editMode.value = true
}
if (editMode.value) {
  startEdit()
}
function completeEdit() {
  editMode.value = false
  title.value = titleEdit.value
  description.value = descriptionEdit.value
  hasDescription.value = hasDescriptionEdit.value
  hasEndDate.value = hasEndDateEdit.value
  endDate.value = document.getElementById('endDate').value
  emit('update', props.id)
}
function cancelEdit() {
  editMode.value = false
  titleEdit.value = title.value
  descriptionEdit.value = description.value
  hasDescriptionEdit.value = hasDescription.value
  hasEndDateEdit.value = hasEndDate.value
}

function formatDate(dateStr) {
  if (!dateStr) {
    return null
  }
  const date = new Date(dateStr)
  date.setHours(date.getHours() - date.getTimezoneOffset() / 60)
  return date.toISOString().slice(0, 16).replace('T', ' ')
}

function autoResize(event) {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}
</script>
<template>
  <div class="bg-gray-100 ml-6 mr-6 mb-3 mt-3 p-4 rounded-3xl flex justify-between items-center flex-row">
    <div v-if="editMode" class="grow">
      <input type="text" id="title" class="bg-gray-100 font-sans font-semibold text-2xl text-gray-700 outline-none w-full" v-model="titleEdit">
      <div class="flex flex-row gap-2 items-center">
        <input type="checkbox" id="checkboxDescription" v-model="hasDescriptionEdit">
        <textarea id="description" :disabled="!hasDescriptionEdit" class="bg-gray-100 font-sans font-light text-sm text-gray-700 outline-none w-full resize-none overflow-hidden disabled:opacity-50" rows="1" @input="autoResize" v-model="descriptionEdit" />
      </div>
      <div class="flex flex-row gap-2 items-center">
        <input type="checkbox" id="checkboxEndDate" v-model="hasEndDateEdit">
        <div :class="{'opacity-50 pointer-events-none text-gray-900': !hasEndDateEdit}" class="font-sans font-normal text-base text-gray-700 flex flex-row flex-wrap">
          <span>Ends at</span>
          <input type="datetime-local" id="endDate" :disabled="!hasEndDateEdit" class="outline-none pl-1 pr-1 rounded-md transition h-6 items-center" :value="formatDate(endDate)">
        </div>
      </div>
    </div>
    <div v-else class="grow w-0 flex flex-col">
      <span class="bg-gray-100 font-sans font-semibold text-2xl text-gray-700 overflow-auto text-clip whitespace-pre">{{ title }}</span>
      <span v-if="hasDescription" class="bg-gray-100 font-sans font-light text-sm text-gray-700 break-words whitespace-pre-wrap w-full">{{ description }}</span>
      <div v-if="hasEndDate" class="font-sans font-normal text-base text-gray-700">Ends at {{ formatDate(endDate) }}</div>
    </div>
    <div class="flex flex-row-reverse items-center gap-2 mr-2">
      <svg @click="emit('delete', props.id)" class="align-middle size-6 fill-gray-300 hover:fill-gray-400 transition cursor-pointer" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 482.428 482.429">
        <title>Delete</title>
        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979V115.744z"/><path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/><path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/><path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
      </svg>
      <svg @click="startEdit" v-if="!editMode" class="size-7 align-middle fill-gray-300 hover:fill-gray-400 transition cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>Edit</title>
        <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z"  /><path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z"  />
      </svg>
      <div v-else class="flex flex-row-reverse gap-2 items-center">
        <svg @click="completeEdit" class="size-8 align-middle fill-gray-300 hover:fill-gray-400 transition cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <title>Complete</title>
          <path d="M910.7 302.7L408.4 805c-23.1 23.1-60.6 23.1-83.7 0l-41.9-41.9L826.9 219c23.1-23.1 60.6-23.1 83.7 0 23.2 23.1 23.2 60.6 0.1 83.7z"  /><path d="M324.6 805L115.3 595.7c-23.1-23.1-23.1-60.6 0-83.7s60.6-23.1 83.7 0l251.2 251.2-41.8 41.8c-23.2 23.1-60.6 23.1-83.8 0z"  />
        </svg>
        <svg @click="cancelEdit" viewBox="0 0 100 100" class="stroke-gray-300 hover:stroke-gray-400 transition cursor-pointer size-6 align-middle" xmlns="http://www.w3.org/2000/svg">
          <title>Cancel</title>
          <line x1="20" y1="20" x2="80" y2="80" stroke-width="15" stroke-linecap="round" />
          <line x1="20" y1="80" x2="80" y2="20" stroke-width="15" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  </div>
</template>
