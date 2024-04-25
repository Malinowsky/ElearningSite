import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, filter, map, shareReplay } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent {
  isTeacher$: Observable<boolean> | undefined; 
  isStudent$: Observable<boolean> | undefined; 
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isTeacher$ = this.authService.user.pipe(
      filter(user => user !== null),
      map(user => user!.role === 'teacher')
    );

    this.isStudent$ = this.authService.user.pipe(
      filter(user => user !== null),
      map(user => user!.role === 'student')
    );
  }
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
  }
}