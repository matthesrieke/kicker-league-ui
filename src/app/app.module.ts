import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './views/landing-page/landing-page.component';

import { MatSidenavModule, MatMenuModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatTableModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './views/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NavigationBarComponent } from './views/navigation-bar/navigation-bar.component';
import { RankingsComponent } from './views/rankings/rankings.component';
import { MatchesComponent } from './views/matches/matches.component';
import { SubmitMatchComponent } from './views/submit-match/submit-match.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';


registerLocaleData(localeDe);

const appRoutes: Routes = [
  { path: 'rankings', component: RankingsComponent },
  { path: 'matches',      component: MatchesComponent },
  { path: 'matches/:id',      component: MatchesComponent },
  { path: 'submit-match',      component: SubmitMatchComponent },
  { path: '',
    redirectTo: '/rankings',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavComponent,
    NavigationBarComponent,
    RankingsComponent,
    MatchesComponent,
    SubmitMatchComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-DE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
