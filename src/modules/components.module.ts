import navbar from "../components/Navbar/navbar.vue";

import type { App } from "vue";

export function setComponents(app: App) {
    app.component("navbar", navbar);
}