import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthServiceService } from '../../services/auth/auth.service.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
    private authService: AuthServiceService) { }

  @Input() set appHasPermission(permission: string[]) {
    if(this.authService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

}

//Revisar el video#20 por el min 01:04:12 
