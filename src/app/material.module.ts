import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule, MatSelectModule} from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule } from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    MatTabsModule, MatButtonModule, MatAutocompleteModule,
     MatFormFieldModule, MatInputModule, MatSelectModule,
      MatProgressBarModule, MatTableModule, MatExpansionModule,
    MatToolbarModule, MatCardModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatGridListModule, MatSidenavModule,
    MatListModule, MatIconModule, MatSnackBarModule,
    MatChipsModule, MatDialogModule, MatStepperModule,
    MatButtonToggleModule, MatDatepickerModule,
    MatCheckboxModule
    ],
  exports: [
    MatTabsModule, MatButtonModule, MatAutocompleteModule,
     MatFormFieldModule, MatInputModule, MatSelectModule,
     MatProgressBarModule, MatTableModule, MatExpansionModule,
    MatToolbarModule, MatCardModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatGridListModule, MatSidenavModule,
    MatButtonToggleModule, MatDialogModule, MatListModule,
    MatIconModule, MatSnackBarModule, MatChipsModule,
    MatStepperModule, MatDatepickerModule,
    MatCheckboxModule
    ],

})
export class MaterialModule { }
