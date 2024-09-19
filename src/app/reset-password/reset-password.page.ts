import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) {}

  // Método para restablecer la contraseña
  async onResetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.newPassword.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updatePassword(this.newPassword);
        alert('Contraseña restablecida con éxito');
        this.goToLogin();
      } else {
        alert('No se ha podido autenticar al usuario');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert('Error al restablecer la contraseña: ' + error.message);
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
