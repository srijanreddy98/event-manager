import { NgModule } from '@angular/core';
import { CalendarModule, Sidebar } from 'primeng/primeng';
import { SidebarModule } from 'primeng/primeng';
import { TabMenuModule, MenuModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
@NgModule({
    imports: [
        CalendarModule, SidebarModule, TabMenuModule, MenuModule,
        ButtonModule
    ],
    exports: [
        CalendarModule, SidebarModule, TabMenuModule, MenuModule,
        ButtonModule
    ],

})
export class PrimengModule { }
