import { NgModule } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatButtonModule} from '@angular/material/button'; 

const MaterialComponent=[MatAutocompleteModule,
                        MatFormFieldModule,
                        MatInputModule,
                      MatButtonToggleModule,
                    MatSidenavModule,
                  MatToolbarModule,
                  MatGridListModule,
                MatButtonModule]
@NgModule({
  imports: [MaterialComponent
    
  ],
  exports:[MaterialComponent]
})
export class MaterialModule { }
