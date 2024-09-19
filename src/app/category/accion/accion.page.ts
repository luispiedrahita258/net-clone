import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar el servicio de autenticación
import { NavController } from '@ionic/angular'; // Importar el servicio de navegación

@Component({
  selector: 'app-accion',
  templateUrl: './accion.page.html',
  styleUrls: ['./accion.page.scss'],
})
export class AccionPage implements OnInit {
  actionMovies: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth, // Inyectar el servicio de autenticación
    private navCtrl: NavController // Inyectar el servicio de navegación
  ) {}

  ngOnInit() {
    // Cargar las películas de acción de Firestore
    this.firestoreService.getMovies().subscribe((data) => {
      this.actionMovies = data.filter(movie => movie.category === 'Acción');
    });
  }

  // Implementar la función logout
  logout() {
    this.afAuth.signOut().then(() => {
      // Redirigir al usuario a la página de login o home después de cerrar sesión
      this.navCtrl.navigateRoot('/auth');
    });
  }
}
