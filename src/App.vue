<template>
  <div class="min-h-screen">
    <Navbar />
    <div class='pt-[20vh] px-[6vh] md:px-[7vh]'>
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
})
</script>