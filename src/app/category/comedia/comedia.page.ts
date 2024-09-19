import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comedia',
  templateUrl: './comedia.page.html',
  styleUrls: ['./comedia.page.scss'],
})
export class ComediaPage implements OnInit {
  comedyMovies: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar las películas de comedia de Firestore
    this.firestoreService.getMovies().subscribe((data) => {
      this.comedyMovies = data.filter((movie) => movie.category === 'Comedia');
    });
  }

  // Función para cerrar sesión
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth']); // Redirige al login después de cerrar sesión
    });
  }
}
