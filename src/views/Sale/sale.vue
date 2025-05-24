<template>
    <main class="w-full">
        <ViewHeader titleHeader="Vendas Registradas" :showButtonRegister="true"  @to-register="navigateTo('/computer-output', 'sale')"/>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Computer } from '../../models/computer.model';
import { QueryParams } from '../../models/query-params.model';
// import { ComputerService } from './computer.service';
import type { PageState } from 'primevue';
import { take } from 'rxjs';

export default defineComponent({
    name: "sale",
    methods: {
        // getAllComputers(query: QueryParams): void {
        //     this.isLoading = true;
        //     this.totalRegistersBeforeReload = this.totalRegisters;

        //     this.computerService.allComputers.subscribe({
        //         next: (response) => {
        //             this.allComputers = response.data;
        //             this.totalRegisters = response.totalRegisters;

        //             const hasRedirected = this.handleVoidPage(this.allComputers, query.PageNumber, this.totalRegistersBeforeReload, query.PageSize);

        //             if (!hasRedirected) {
        //                 this.isLoading = false;
        //                 this.isComputerSearched = false;
        //             }
        //         },
        //         error: () => {
        //             this.isLoading = false;
        //             this.isComputerSearched = false;
        //         }
        //     });
        //     this.computerService.getAllComputers(query);
        // },
        // getComputerBySearch(): void {
        //     this.query.Search = this.searchedComputer.trim();
        //     const query: QueryParams = {
        //         PageNumber: 1,
        //         PageSize: this.query.PageSize,
        //         Search: this.query.Search
        //     }

        //     if (!this.searchedComputer.trim()) {
        //         this.resetSearch();
        //         return;
        //     }

        //     this.computerService.allComputers.pipe(take(1)).subscribe({
        //         next: (response) => {
        //             this.allComputers = response.data;
        //             this.totalRegisters = response.totalRegisters
        //             this.isComputerSearched = true;
        //         },
        //         error: () => {
        //             this.isComputerSearched = false;
        //         }
        //     });
        //     this.computerService.getAllComputers(query);
        // },
        // resetSearch(): void {
        //     this.searchedComputer = '';
        //     this.query.Search = '';
        //     this.isComputerSearched = false;
        //     this.getAllComputers(this.query);
        // },
        // deleteComputer(): void {
        //     if (this.selectedComputer.id) {
        //         this.isLoading = true;
        //         this.isVisibleDeleteDialog = false;
        //         this.computerService.computer.subscribe({
        //             next: () => {
        //                 this.getAllComputers(this.query);
        //             },
        //             error: () => {
        //                 this.isLoading = false;
        //             }
        //         });
        //         this.computerService.deleteComputer(this.selectedComputer.id);
        //     }
        // },
        navigateTo(route: string, type?: string): void {
            if (type) {
                this.$router.push({
                    path: route,
                    query: { 'type': type.toLowerCase() } 
                });
            } else {
                this.$router.push(route);
            }
        },
    },
 
})
</script>