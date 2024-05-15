export class LoginResponse{

    token: string;
    user: string;
    rol: string;

    constructor(){
        this.rol = '';
        this.user = '';
        this.token = '';
    }
}