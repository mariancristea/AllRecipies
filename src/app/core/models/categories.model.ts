export class Categories {    

    public name: string;
    public value: number;
    public checked: boolean

    constructor(name: string, checked: boolean, value?: number) {
        this.name = name;
        this.value = value;
        this.checked = checked;
    }
}