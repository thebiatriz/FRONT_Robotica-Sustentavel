export class Views {
    static Home(): Promise<any> {
        return import ("./Home/home.vue");
    }
}