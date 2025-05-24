<template>
    <main class="w-full">
        <ViewHeader v-if="currentComputerId === undefined" titleHeader="Registrar computador"
            :showButtonRegister="false" />
        <ViewHeader v-else titleHeader="Editar computador" :showButtonRegister="false" />

        <form @submit.prevent="submitForm" class="bg-white border border-[#DDDDDD] rounded-lg p-8 md:p-16">
            <section class="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-16">
                <div class="grid grid-cols-1">
                    <label>Marca</label>
                    <InputText v-model="computerInput.brand" placeholder="Ex: Dell" />
                </div>

                <div class="grid grid-cols-1">
                    <label><span class="text-[#FF0000]">* </span>Processador</label>
                    <InputText v-model="computerInput.cpu" required placeholder="Ex: Intel Core i5-12400F" />
                </div>

                <div class="grid grid-cols-1">
                    <label><span class="text-[#FF0000]">* </span>Armazenamento</label>
                    <InputText v-model="computerInput.storage" required placeholder="Ex: 512GB" />
                </div>

                <div class="grid grid-cols-1">
                    <label><span class="text-[#FF0000]">* </span>Memória RAM</label>
                    <InputText v-model="computerInput.ram" required placeholder="Ex: 16GB" />
                </div>

                <div class="grid grid-cols-1">
                    <label><span class="text-[#FF0000]">* </span>Estoque</label>
                    <InputNumber v-model="computerInput.quantity" required placeholder="Ex: 10"
                        inputClass="w-full md:w-auto" />
                </div>
            </section>

            <div class="pt-[5vh] flex justify-end gap-[2vw]">
                <Button @click="$router.go(-1)" type="button"
                    class="w-1/2 md:w-1/4 lg:w-[15%] hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666]"
                    label="Cancelar" outlined />
                <Button type="submit" :label="currentComputerId ? 'Atualizar' : 'Registrar'"
                    class="active:scale-95 w-1/2 md:w-1/4 lg:w-[15%] !border-[#2C2C2C] !bg-[#05A51D] hover:!bg-[#058D1A]" />
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ComputerService } from './computer.service';
import { Computer } from '../../models/computer.model';

export default defineComponent({
    name: "computer-form",
    data() {
        return {
            computerInput:
            {
                brand: "" as string,
                cpu: "" as string,
                ram: "" as string,
                storage: "" as string,
                quantity: 1 as number
            },
            computerData: {} as Computer
        }
    },

    methods: {
        getComputerById(id: string): void {
            this.computerService.computer.subscribe({
                next: (response) => {
                    this.computerData = response.data;
                    this.populateFields();
                }
            });
            this.computerService.getComputerById(id)
        },
        createComputer(): void {
            if (this.computerInput.quantity <= 0) return alert("A quantidade em estoque deve ser maior que zero.");
            this.goBackToAllComputers();
            this.computerService.computer.subscribe({
                next: () => {

                }
            });
            this.computerService.createComputer(this.computerInput);
        },
        updateComputer(): void {
            if (this.currentComputerId) {

                this.goBackToAllComputers();
                this.computerService.computer.subscribe({
                    next: () => {

                    },
                    error: () => {

                    }
                });
                this.computerService.updateComputer(this.currentComputerId, this.computerInput);
            }
        },
        goBackToAllComputers() {
            this.$router.push('/computer');
        },
        populateFields() {
            this.computerInput.brand = String(this.computerData?.brand);
            this.computerInput.cpu = String(this.computerData?.cpu);
            this.computerInput.ram = String(this.computerData?.ram);
            this.computerInput.storage = String(this.computerData?.storage);
            this.computerInput.quantity = Number(this.computerData?.quantity);
        },
        handleComputerId() {
            if (this.currentComputerId) {
                this.getComputerById(this.currentComputerId);
            }
        },
        submitForm() {
            if (this.currentComputerId) {
                this.updateComputer();
            } else {
                this.createComputer();
            }
        },
    },
    computed: {
        computerService(): ComputerService {
            return new ComputerService();
        },
        currentComputerId(): string | undefined {
            return this.$route.params.id as string | undefined;
        }
    },
    mounted() {
        this.handleComputerId();
    }
})
</script>