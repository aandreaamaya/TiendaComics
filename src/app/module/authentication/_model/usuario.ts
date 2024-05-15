export class Usuario {

    address: string;
    mail: string;
    name: string;
    password: string | undefined | null;
    region_id: number;
    rfc: string;
    rol_id: number;
    surname: string;
    username: string | undefined | null;
      

    constructor(){
    this.address = '';
    this.mail = '';
    this.name = '';
    this.password = '';
    this.region_id = 0;
    this.rfc = '';
    this.rol_id= 0;
    this.surname = '';
    this.username = '';
    }

    
}
