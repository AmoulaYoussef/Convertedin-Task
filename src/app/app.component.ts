import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent, HeaderComponent } from '@convertedin/shared';
import { CommonModule } from '@angular/common';

const styleSheets = {
  portalLtr: '/assets/css/portal-ltr.css',
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    BreadcrumbComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Convertedin-Task';
  mainCssFile: any;
  ngOnInit(): void {
    // this.loadAssets('en', 'ltr');
  }
  
  loadAssets(lang: string, dir: string) {
    this.createLinkTag('mainCssFile');
    document.dir = dir;
    document.documentElement.lang = lang;
    this.loadCssFile();
  }

  createLinkTag(id: string) {
    var head = document.head;
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = id;
    head.appendChild(link);
  }

  loadCssFile() {
    if (!document.getElementById("mainCssFile")) {
      this.createLinkTag('mainCssFile');
    }
    this.mainCssFile = document.getElementById('mainCssFile');
    this.mainCssFile?.setAttribute('href', styleSheets.portalLtr);
  }

}
