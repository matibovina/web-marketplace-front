import { Cliente } from "../clientes/cliente";

export class Usuario {
    id:number;
    email:string;
    username:string;
    password:string;
    enabled:boolean;
    cliente:Cliente;
    roles:string[]=[];
}
