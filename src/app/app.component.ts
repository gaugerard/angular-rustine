import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WipeService } from './wipe.service';
import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-Rustine';

  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public wipeService: WipeService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    
    window.addEventListener('scroll', () => {
      var scrolled = window.scrollY;
      var divTop = document.getElementById('toTop');
    
      if (scrolled > 50) {
        divTop.setAttribute('class', 'topVisible');
      } else {
        divTop.setAttribute('class', 'topInvisible');
      }
    });
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  backToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

}
