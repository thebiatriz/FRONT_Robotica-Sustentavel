import navbar from "../components/Navbar/navbar.vue";
import viewHeader from "../components/ViewHeader/view-header.vue"
import deleteDialog from "../components/DeleteDialog/delete-dialog.vue";

import type { App } from "vue";

export function setComponents(app: App) {
    app.component("Navbar", navbar);
    app.component("ViewHeader", viewHeader);
    app.component("DeleteDialog", deleteDialog);
}