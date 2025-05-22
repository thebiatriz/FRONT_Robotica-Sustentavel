<template>
    <header class="flex flex-row gap-2 pb-[4.5vh] justify-between">
        <h1 class="font-bold text-2xl md:text-3xl text-[#333333]">
            <span>
                {{ titleHeader }}&nbsp;<span class="text-[#05A51D]"> {{ titleForRobotics }} </span>
            </span>
        </h1>
        <div class="flex justify-end items-center space-x-4">
            <Button v-if="showButtonRegister" @click="$emit('to-register')"
                class="!rounded-full !bg-[#05A51D] hover:!bg-[#058D1A] items-center h-10" type="button"
                icon="pi pi-plus" />
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'view-header',
    props: {
        titleHeader: {
            type: String,
            required: true
        },
        showButtonRegister: {
            type: Boolean,
            required: true
        },
        titleForRobotics: {
            type: String,
            required: false
        }
    },
})
</script>