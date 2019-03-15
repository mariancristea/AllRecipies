export class Categories {    
    public code: string;
    public name: string;
    public checked: boolean

    constructor(code: string, name: string, checked: boolean) {
        this.code = code;
        this.name = name;
        this.checked = checked;
    }
}