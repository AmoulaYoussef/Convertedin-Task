import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PaginatorModule} from 'primeng/paginator';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() rows = 20;
  @Input() totalRecords = 100;
  pageChanges$ = this.route.queryParamMap.pipe(
    map((params: ParamMap) => {
      const page = params.get('page')
      if(!page) {
        this.addPageNo(1)
        return 1;
      }
      else{
        return (+page  - 1) * this.rows || 1
      }
  }),

  );

  constructor(private router: Router, private route:ActivatedRoute) {}

  paginate($event:any){
    this.addPageNo($event.page + 1);
    window.scrollTo(0,0);
  }
  addPageNo(page = 1){
    this.router.navigate([], {queryParams:{page:`${page}`}, queryParamsHandling:"merge"})
  }
}
