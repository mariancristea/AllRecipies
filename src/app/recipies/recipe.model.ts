export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public grade: number;

constructor(name: string, description: string, imagePath: string, grade: number){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath
        this.grade = grade;
    }
}