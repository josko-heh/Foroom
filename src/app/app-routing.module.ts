import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { CategoryComponent } from './category/category.component';
import { ThreadComponent } from './category/thread/thread.component';


const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', loadChildren: () => AuthModule },
    { path: 'register', loadChildren: () => RegisterModule },
    { path: 'categories/:id', component: CategoryComponent, children: [
            { path: 'threads/:id', component: ThreadComponent }
        ]
    },
    { path: '**', component: MainPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
