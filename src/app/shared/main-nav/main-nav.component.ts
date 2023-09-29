import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  cartProducts: any[] = [];
  hidden = false;
  constructor(private service: ProductsService) { }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  count!: number;
  private breakpointObserver = inject(BreakpointObserver);
  ngOnInit(): void {
    this.service.dataEmitter.subscribe((value) => {
      this.count = value;
    })
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
