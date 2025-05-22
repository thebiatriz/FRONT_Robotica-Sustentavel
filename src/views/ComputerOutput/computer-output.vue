<template>
    <main class="w-full">
        <ViewHeader titleHeader="Saída de Computadores" :showButtonRegister="false" />

        <form @submit.prevent="testSubmit"
            class="bg-white border border-[#DDDDDD] rounded-lg p-4 md:p-10 text-[#666666]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-[18vw] md:gap-[8vh] lg:gap-[13vw]">

                <section aria-labelledby="computer-selection-heading">
                    <h2 id="computer-selection-heading" class="sr-only">Seleção do Computador</h2>
                    <div class="grid grid-cols-1">
                        <div> <label for="computerSearchInput" class="font-bold">Computador</label>
                            <IconField class="w-full mt-[1vh]">
                                <InputText v-debounce:200ms="getComputerBySearch" v-model="searchedComputer"
                                    id="computerSearchInput" class="w-full" placeholder="Pesquisar computador" />
                                <InputIcon class="pi pi-search" />
                            </IconField>
                        </div>

                        <div class="mt-[4vh] p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg" aria-live="polite"
                            aria-atomic="true">
                            <h3 class="sr-only">Resultados da Pesquisa de Computadores</h3>
                            <DataView :value="allComputers" data-key="id">
                                <template #empty>
                                    <div class="text-xl">
                                        <div v-if="isLoading" v-for="loaderItem in 2" :key="'loader-' + loaderItem"
                                            class="h-fit flex flex-col gap-3 rounded-lg bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] p-3 mb-6">
                                            <Skeleton v-for="skelItem in 3" :key="'skeleton-' + skelItem"
                                                height="1.0rem" />
                                        </div>
                                        <template v-else>
                                            <p v-if="isComputerSearched" class="block mt-4 text-lg text-[#666666]">
                                                Nenhum resultado encontrado para <strong>"{{ searchedComputer.trim()
                                                    }}"</strong>
                                            </p>
                                            <p v-else class="block mt-4 text-lg text-[#666666]">
                                                Nenhum computador cadastrado
                                            </p>
                                        </template>
                                    </div>
                                </template>

                                <template #list="computerList">
                                    <div role="list">
                                        <article v-for="computer in computerList.items" :key="computer.id"
                                            aria-labelledby="'computer_item_heading_' + computer.id"
                                            class="flex flex-col md:flex-row justify-between items-center bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] rounded-lg p-3 mb-6">

                                            <div v-if="isLoading" class="h-fit grid grid-cols-1 gap-3 w-full">
                                                <Skeleton v-for="skelItem in 3" :key="'skeleton-' + skelItem"
                                                    height="1.0rem" />
                                            </div>
                                            <template v-else>
                                                <div class="grid grid-cols-1">
                                                    <h4 :id="'computer_item_heading_' + computer.id" class="sr-only">
                                                        Computador {{ formattedBrand(computer.brand) }} {{ computer.cpu
                                                        }}</h4>
                                                    <span><strong class="text-[#333]">Marca:</strong> {{
                                                        formattedBrand(computer.brand) }}</span>
                                                    <span><strong class="text-[#333]">Processador:</strong> {{
                                                        computer.cpu }}</span>
                                                </div>
                                                <div class="mt-[2vh] md:mt-0 flex justify-end md:block">
                                                    <Button @click="selectComputer(computer)" type="button"
                                                        class="w-full hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666]"
                                                        :aria-label="'Selecionar computador ' + formattedBrand(computer.brand) + ' ' + computer.cpu"
                                                        label="Selecionar" outlined />
                                                </div>
                                            </template>
                                        </article>
                                    </div>
                                </template>

                                <template #footer>
                                    <Paginator v-if="totalRegisters > 0" :rows="query.PageSize"
                                        :total-records="totalRegisters" :page-link-size="2" :first="firstElementPage"
                                        @page="onPaginate" template="PrevPageLink PageLinks NextPageLink" :pt="{
                                            prevIcon: 'text-[#038013]', nextIcon: 'text-[#038013]',
                                            firstIcon: 'text-[#038013]', lastIcon: 'text-[#038013]',
                                        }" aria-label="Paginação dos resultados" />
                                </template>
                            </DataView>
                        </div>

                        <div class="pt-6">
                            <p class="font-bold"><span class="text-[#FF0000]">* </span>Selecionado:
                                <span class="text-[#05A51D]" aria-live="polite">
                                    {{ computerSelected.brand && computerSelected.cpu ? `${computerSelected.brand} -
                                    ${computerSelected.cpu}` :
                                        computerSelected.brand ?? 'Nenhum' }}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="registration-details-heading">
                    <h2 id="registration-details-heading" class="sr-only">Detalhes do Registro de Saída</h2>
                    <div class="grid grid-cols-1">
                        <fieldset>
                            <legend class="font-bold">Tipo de cadastro</legend>
                            <div class="flex flex-row gap-[8vw] mt-[1vh]">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="radioOutputOption" inputId="donation_id" name="outputType"
                                        value="Donation" />
                                    <label for="donation_id">Doação</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="radioOutputOption" inputId="sale_id" name="outputType"
                                        value="Sale" />
                                    <label for="sale_id">Venda</label>
                                </div>
                            </div>
                        </fieldset>

                        <div class="w-full mt-[6vh] md:mt-[8vh] lg:mt-[10vh]">
                            <div class="flex flex-col md:flex md:flex-row md:items-start gap-[6vw]">
                                <div class="grid grid-cols-1 items-center gap-y-2 md:flex-1 min-w-0">
                                    <label for="quantityInStockInput" class="font-bold">Estoque</label>
                                    <Select v-model="quantitySelected" :options="quantityInStock" option-label="value"
                                        placeholder="Quantidade" class="w-full" :disabled="isQuantityDisabled"
                                        inputId="quantityInStockInput">
                                        <template #value="slotProps">
                                            <span v-if="slotProps.value">Quantidade: {{ slotProps.value.value }}</span>
                                            <span v-else>Quantidade:</span>
                                        </template>
                                    </Select>
                                </div>
                                <div class="grid grid-cols-1 mt-[3vh] md:mt-0 items-center gap-y-2 md:flex-1 min-w-0">
                                    <label for="datePickerInput" class="font-bold">
                                        {{ radioOutputOption === 'Sale' ? 'Data da venda' : 'Data da doação' }}
                                    </label>
                                    <DatePicker disabled v-model="currentDateToRegister" date-format="dd/mm/yy"
                                        inputId="datePickerInput" class="w-full" />
                                </div>
                            </div>
                        </div>

                        <div v-if="radioOutputOption === 'Sale'"
                            class="grid grid-cols-1 mt-[6vh] md:mt-[8vh] lg:mt-[10vh] items-center gap-y-2">
                            <label for="currency-brazil" class="font-bold"><span class="text-[#FF0000]">* </span>Preço
                                por
                                unidade</label>
                            <InputNumber v-model="computerUnitPrice" :invalid="computerUnitPrice === null"
                                input-id="currency-brazil" mode="currency" currency="BRL" locale="pt-BR"
                                placeholder="R$ 0,00" :pt="{ root: { class: 'w-full' } }" />
                        </div>


                    </div>
                </section>

            </div>
            <div
                class="mt-[9vh] md:mt-[8vh] lg:mt-[1vh] flex flex-col-reverse items-center md:flex-row justify-center md:justify-end gap-[2vw]">
                <Button @click="$router.go(-1)" type="button"
                    class="w-full sm:w-1/2 md:w-1/4 lg:w-[15%] hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666]"
                    label="Cancelar" outlined />
                <Button type="submit" label="Registrar"
                    class="active:scale-95 w-full sm:w-1/2 md:w-1/4 lg:w-[15%] !border-[#2C2C2C] !bg-[#05A51D] hover:!bg-[#058D1A]" />
            </div>

        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Computer } from '../../models/computer.model';
import { QueryParams } from '../../models/query-params.model';
import { ComputerService } from '../Computer/computer.service';
import type { PageState } from 'primevue';
import { take } from 'rxjs';
import vueDebounce from 'vue-debounce';

export default defineComponent({
    name: "computer-output",
    directives: {
        debounce: vueDebounce({ lock: true }),
    },
    data() {
        return {
            computerSelected: new Computer(),
            allComputers: [] as Computer[],
            query: new QueryParams(1, 2),
            totalRegisters: 0 as number,
            isLoading: true as boolean,
            totalRegistersBeforeReload: 0 as number,

            isComputerSearched: false as boolean,
            searchedComputer: "" as string,
            radioOutputOption: "Donation" as string,
            quantitySelected: null as { value: number } | null,
            quantityInStock: [] as Array<{ value: number }>,
            currentDateToRegister: new Date(),
            isQuantityDisabled: true as boolean,
            computerUnitPrice: null,
        };
    },

    methods: {
        getAllComputers(query: QueryParams): void {
            this.isLoading = true;
            this.totalRegistersBeforeReload = this.totalRegisters;

            this.computerService.allComputers.subscribe({
                next: (response: any) => {
                    this.allComputers = response.data;
                    this.totalRegisters = response.totalRegisters;

                    const hasRedirected = this.handleVoidPage(this.allComputers, query.PageNumber, this.totalRegistersBeforeReload, query.PageSize);

                    if (!hasRedirected) {
                        this.isLoading = false;
                        this.isComputerSearched = false;
                    }
                },
                error: () => {
                    this.isLoading = false;
                    this.isComputerSearched = false;
                }
            });
            this.computerService.getAllComputers(query);
        },
        getComputerBySearch(): void {
            this.query.Search = this.searchedComputer.trim();
            const query: QueryParams = {
                PageNumber: 1,
                PageSize: 2,
                Search: this.query.Search
            }

            if (!this.searchedComputer.trim()) {
                this.resetSearch();
                return;
            }

            this.computerService.allComputers.pipe(take(1)).subscribe({
                next: (response: any) => {
                    this.allComputers = response.data;
                    this.totalRegisters = response.totalRegisters
                    this.isComputerSearched = true;
                },
                error: () => {
                    this.isComputerSearched = false;
                }
            });
            this.computerService.getAllComputers(query);
        },
        resetSearch(): void {
            this.searchedComputer = '';
            this.query.Search = '';
            this.isComputerSearched = false;
            this.getAllComputers(this.query);
        },
        updateQuantityOptions(stockQuantity: number): void {
            this.quantityInStock = Array.from({ length: stockQuantity }, (_, i) => ({
                value: i + 1
            }));
            this.quantitySelected = null;
        },
        navigateTo(route: string): void {
            this.$router.push(route);
        },
        onPaginate(event: PageState): void {
            this.query.PageNumber = event.page + 1;
            this.$router.replace({ name: "ComputerOutput", query: { page: this.query.PageNumber } });
            this.getAllComputers(this.query);
        },
        getCurrentPage(): void {
            this.query.PageNumber = this.pageFromRoute;
        },
        handleVoidPage(allComputers: Computer[], currentPage: number, totalRegisters: number, pageSize: number): boolean {
            if (allComputers === undefined || allComputers.length === 0) {
                if (totalRegisters > 0) {
                    const totalPages = Math.floor(totalRegisters / pageSize);
                    if (currentPage > totalPages) {
                        this.query.PageNumber = totalPages;
                        this.$router.replace({ name: "ComputerOutput", query: { page: totalPages } });
                        this.getAllComputers(this.query);
                        return true;
                    }
                }
                if (currentPage > 1) {
                    this.query.PageNumber = 1;
                    this.$router.replace({ name: "ComputerOutput", query: { page: 1 } });
                    this.getAllComputers(this.query);
                    return true;
                }
            }
            return false;
        },
        formattedBrand(brand: string | undefined | null): string {
            return !brand || brand.trim() === '' ? 'Sem marca' : brand;
        },
        selectComputer(computer: Computer): void {
            this.computerSelected = computer;
            this.isQuantityDisabled = false;

            this.updateQuantityOptions(Number(computer.quantity));
        },
        testSubmit() {
            alert("Quantidade selecionada: " + this.quantitySelected?.value);
        }
    },
    computed: {
        computerService(): ComputerService {
            return new ComputerService();
        },
        firstElementPage(): number {
            return (this.query.PageNumber - 1) * this.query.PageSize;
        },
        pageFromRoute(): number {
            return Number(this.$route.query.page) || 1;
        },
    },
    mounted() {
        this.getCurrentPage();
        this.getAllComputers(this.query);
    },
})
</script>