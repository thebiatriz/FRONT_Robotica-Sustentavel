export class Views {
    static Home(): Promise<any> {
        return import ("./Home/home.vue");
    }

    static Computer(): Promise<any> {
        return import ("./Computer/computer.vue");
    }

    static ComputerForm(): Promise<any> {
        return import ("./Computer/computer-form.vue");
    }
}