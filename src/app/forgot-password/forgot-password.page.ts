import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) {}

  // Método para validar si el correo existe en Firebase y redirigir a la página de restablecer contraseña
  async validateEmail() {
    try {
      const signInMethods = await this.afAuth.fetchSignInMethodsForEmail(this.email);

      if (signInMethods.length > 0) {
        // Si existen métodos de inicio de sesión para este correo, redirigir a la página de restablecer contraseña
        this.navCtrl.navigateRoot(`/reset-password/${this.email}`);
      } else {
        alert('El correo no está registrado.');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Error al verificar el correo: ' + error.message);
      } else {
        alert('Error desconocido');
      }
    }
  }

  // Método para redirigir a la página de login
  goToLogin() {
    this.navCtrl.navigateRoot('/auth');
  }
}
