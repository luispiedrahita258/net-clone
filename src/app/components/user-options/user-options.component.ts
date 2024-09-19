import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss'],
})
export class UserOptionsComponent {

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private popoverCtrl: PopoverController
  ) {}

  // Método para cambiar la contraseña
  async changePassword() {
    try {
      this.navCtrl.navigateForward('/change-password'); // Redirige al usuario a la página de cambio de contraseña
      this.popoverCtrl.dismiss();  // Cerrar el popover
    } catch (error) {
      console.log('Error al cambiar la contraseña: ', error);
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      this.navCtrl.navigateRoot('/auth');
      this.popoverCtrl.dismiss();  // Cerrar el popover
    } catch (error) {
      console.log('Error al cerrar sesión: ', error);
    }
  }
}
