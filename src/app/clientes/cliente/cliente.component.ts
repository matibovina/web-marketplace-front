import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  cliente: Cliente;

  constructor(
    private clientesService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {}
}
