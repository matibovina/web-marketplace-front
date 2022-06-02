import { Router } from '@angular/router';
import { AuthService } from './../usuarios/auth.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {



  constructor(public authService:AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout():void{
    swal.fire('Logout' , 'Sesion cerrada con exito', 'success');
    this.authService.logout();
    this.router.navigate(['/productos']);
  }


}
