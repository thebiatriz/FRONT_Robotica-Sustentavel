import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Drawer from "primevue/drawer";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";
import Select from "primevue/select";
import Skeleton from "primevue/skeleton";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";

import type { App } from "vue";

export function setPrimeVueComponents(app: App) {
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Column', Column);
    app.component('DataTable', DataTable);
    app.component('Dialog', Dialog);
    app.component('Drawer', Drawer)
    app.component('InputText', InputText);
    app.component('Menu', Menu);
    app.component('Paginator', Paginator);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component("Select", Select);
    app.component('Skeleton', Skeleton);
    app.component('Toast', Toast);
    app.component('Toolbar', Toolbar);
}