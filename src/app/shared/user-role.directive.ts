import { Directive, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Role } from 'src/app/models/Role';

@Directive({ selector: '[appUserRole]' })
export class UserRoleDirective implements OnInit, OnChanges {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: UsersService,
    private viewContainer: ViewContainerRef
  ) { }

  @Input() appUserRole: string;

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let hasAccess = false;
    if (this.authService.getToken()) {

      hasAccess = this.appUserRole === Role.Admin;
    }
    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
