import { Component, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {

  constructor() { }

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
