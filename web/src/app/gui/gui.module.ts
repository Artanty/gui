import { CommonModule } from '@angular/common';
import { inject, Inject, Injector, NgModule, ɵConsole as Console } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GuiComponent } from './gui.component';
import { eventBusFilterByProject } from './utilites/eventBusFilterByProject';
import { createCustomElement } from '@angular/elements';
import { WrapperComponent } from './components/_remotes/wrapper';
import { SelectComponent } from './components/_remotes/select/select.component';
import { ToggleComponent } from './components/_remotes/toggle/toggle.component';
import { InputComponent } from './components/_remotes/input/input.component';
import { ButtonComponent } from './components/_remotes/button/button.component';
import { InputColorComponent } from './components/_remotes/input-color/input-color.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([]),
    
  ],
  exports: [
    
  ],
  providers: [
  ],
  bootstrap: []
})
export class GuiModule {
  ngDoBootstrap() {}

  constructor(
    private injector: Injector,
  ) {
    console.log('gui module constructor')
    this.register()
  }
  
  private _componentsToElements = [
    { component: SelectComponent, name: 'SelectComponent' },
    { component: ToggleComponent, name: 'ToggleComponent' },
    { component: InputComponent, name: 'InputComponent' },
    { component: ButtonComponent, name: 'ButtonComponent' },
    { component: InputColorComponent, name: 'InputColorComponent' },
    
  ];

  private register() {
    this._componentsToElements.forEach(({ component, name }: { component: any, name: string }) => {
      const injectorWithComponentName = Injector.create({
        providers: [
          { provide: 'componentName', useValue: name },
        ],
        parent: this.injector,
      });
        
      const webComponent = createCustomElement(component, {
        injector: injectorWithComponentName,
      });

      const elementName = this._renameComponentToCustomElement(name);
      customElements.define(elementName, webComponent);
      
      // console.log(`Registered: ${name} as <${elementName}>`);
    });
  }
  /**
   * ButtonComponent -> gui-button
   * InputColorComponent -> gui-input-color
   * */
  private _renameComponentToCustomElement(className: string): string {
    // Remove "Component" suffix if present
    let name = className.replace(/Component$/, '');
    
    // Convert camelCase to kebab-case
    name = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    
    // Add 'gui-' prefix
    return `gui-${name}`;
  }
}


