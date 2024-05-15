export class Category{
    category_id: number = 0;
    category: string = "";
    acronym: string = "";
    status: number = 0;

    constructor(category_id: number, category: string, acronym: string, status: number){
        this.category_id = category_id;
        this.category = category;
        this.acronym = acronym;
        this.status = status;
    }
}
