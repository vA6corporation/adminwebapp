import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./businesses/businesses.routes').then(m => m.routes)
    },
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.routes)
    },
    {
        path: 'certificates',
        loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule)
    },
    {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
    },
    {
        path: 'workers',
        loadChildren: () => import('./workers/workers.module').then(m => m.WorkersModule)
    },
    {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
    }
];
