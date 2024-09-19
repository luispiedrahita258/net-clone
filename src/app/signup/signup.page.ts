import { Component } from '@angular/core'; // Asegúrate de importar Component
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth
import { NavController } from '@ionic/angular'; // Importar NavController
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar AngularFirestore

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore // Agregamos el servicio de Firestore
  ) {}

  // Método para registrar un nuevo usuario
  async onSignup() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;

      if (user) {
        // Guardar el usuario en Firestore
        await this.firestore.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email
        });
        console.log('Usuario registrado y guardado en Firestore:', user);
        this.navCtrl.navigateRoot('/home'); // Redirigir a la página principal
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Error al registrar usuario: ' + error.message);
      } else {
        alert('Error desconocido al registrar usuario');
      }
    }
  }

  // Método para volver a la página de login
  goToLogin() {
    this.navCtrl.navigateRoot('/auth'); // Redirigir a la página de login
  }
}
