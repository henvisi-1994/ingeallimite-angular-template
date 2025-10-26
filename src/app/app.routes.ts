import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DocumentComponent } from './pages/document/document.component';

export const routes: Routes = [
      { path: '', component: DashboardComponent },
      { path: 'document', component: DocumentComponent },

];
