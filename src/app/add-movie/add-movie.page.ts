import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage {
  movie = {
    title: '',
    category: '',
    imageUrl: '',
    synopsis: ''
  };

  constructor(private firestoreService: FirestoreService, private navCtrl: NavController) {}

  // Método para añadir una película
  addMovie() {
    this.firestoreService.addMovie(this.movie).then(() => {
      alert('Película añadida exitosamente');
      this.navCtrl.navigateRoot('/home');  // Redirigir a la página principal
    }).catch(error => {
      console.error('Error al añadir la película:', error);
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }

}
