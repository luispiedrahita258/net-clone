import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drama',
  templateUrl: './drama.page.html',
  styleUrls: ['./drama.page.scss'],
})
export class DramaPage implements OnInit {
  dramaMovies: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    // Cargar las películas de drama de Firestore
    this.firestoreService.getMovies().subscribe((data) => {
      this.dramaMovies = data.filter((movie) => movie.category === 'Drama');
    });
  }

  // Función para cerrar sesión
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth']); // Redirige al login después de cerrar sesión
    });
  }
}
