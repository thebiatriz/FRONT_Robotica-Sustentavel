<template>
    <nav class="fixed top-0 w-full z-50">
        <Menubar :model="items"
            class="border !border-[#DDDDDD] flex justify-between h-20 items-center !px-[5vw] md:!px-[2vw] !rounded-none"
            :pt="{
                itemLabel: ['text-[#666666] font-semibold'],
                submenuIcon: ['text-[#666666]']
            }">
            <template #start>
                <div @click="navigateTo('/')" class="flex items-center ml-4 cursor-pointer">
                    <img src="../../assets/images/robotics-logo.svg" alt="logo" class="h-10" />
                </div>
            </template>
        </Menubar>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "navbar",
    data() {
        return {
            items: [
                {
                    label: "Computadores",
                    path: "/computer",
                    command: () => this.navigateTo('/computer')
                },
                {
                    label: "Vendas",
                    items: [
                        {
                            label: "Visualizar",
                            command: () => this.navigateTo('/sale')
                        },
                        {
                            label: "Registrar",
                            command: () => this.navigateTo('/sale/register')
                        }
                    ]
                },
                {
                    label: "Doações",
                    items: [
                        {
                            label: "Visualizar",
                            command: () => this.navigateTo('/donation')
                        },
                        {
                            label: "Registrar",
                            command: () => this.navigateTo('/donation/register')
                        }
                    ]
                }
            ]
        }
    },

    methods: {
        navigateTo(route: string): void {
            this.$router.push(route);
        },
    }
})
</script>
