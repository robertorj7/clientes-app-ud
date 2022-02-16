import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'clientes-app';

  ngAfterViewInit(): void {
    window.addEventListener('DOMContentLoaded', event => {      
      const sidebarToggle = document.body.querySelector('#sidebarToggle');
      if (sidebarToggle) {          
          sidebarToggle.addEventListener('click', event => {
              event.preventDefault();
              document.body.classList.toggle('sb-sidenav-toggled');              
          });
      }
  
  });
  }
}
