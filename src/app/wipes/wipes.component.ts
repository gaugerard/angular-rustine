import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-wipes',
  templateUrl: './wipes.component.html',
  styleUrls: ['./wipes.component.css']
})
export class WipesComponent implements OnInit {

  user: User;

  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.authentication.getUser().subscribe(rep => this.user = rep);
  }
}
