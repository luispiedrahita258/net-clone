import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app'; // Importa firebase

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  newPassword: string = '';
  confirmPassword: string = '';
  currentPassword: string = ''; // Añadir campo para la contraseña actual

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) {}

  async goBackToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  async changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const credentials = firebase.auth.EmailAuthProvider.credential(
          user.email!,
          this.currentPassword // Solicitar la contraseña actual
        );

        // Reautenticar al usuario
        await user.reauthenticateWithCredential(credentials);

        // Si la reautenticación es exitosa, cambiar la contraseña
        await user.updatePassword(this.newPassword);
        alert('Contraseña actualizada exitosamente');
        this.navCtrl.navigateRoot('/home'); // Redirigir a la página principal
      } else {
        alert('No se pudo autenticar al usuario');
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error desconocido';
      alert('Error al cambiar la contraseña: ' + errorMessage);
    }
  }
}
