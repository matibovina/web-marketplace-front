import { Cliente } from "../clientes/cliente";

export class Usuario {
    id:number;
    email:string;
    confirmEmail:string;
    username:string;
    nombre:string;
    apellidos:string;
    password:string;
    confirmPassword:string;
    enabled:boolean;
    cliente:Cliente;
    roles:string[]=[];
}
