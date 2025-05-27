<template>
  <template v-if="shouldShowNavigation">
    <Navbar />
    <main class="min-h-screen pt-[20vh] pb-[5vh] px-[4vh] md:px-[7vh]">
      <RouterView />
    </main>
  </template>
  <template v-else>
    <main class="min-h-screen px-[4vh] md:px-0">
      <RouterView />
    </main>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  computed: {
    shouldShowNavigation(): boolean {
      return !this.$route.meta.hideNavigation;
    }
  }
})
</script>