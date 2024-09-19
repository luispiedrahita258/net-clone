import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';  // Importamos firebase para autenticación con proveedores externos

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Mensaje de error para mostrar en la interfaz

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController) {}

  // Método para iniciar sesión con correo y contraseña
  async onLogin() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Por favor, ingresa tu correo y contraseña';  // Validación de campos vacíos
      return;
    }

    try {
      const user = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('User logged in: ', user);
      this.navCtrl.navigateRoot('/home');  // Redirigir a la página principal
    } catch (error) {
      this.handleLoginError(error);
    }
  }

  // Manejar errores de inicio de sesión
  handleLoginError(error: any) {
    switch (error.code) {
      case 'auth/user-not-found':
        this.errorMessage = 'Correo no registrado';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Contraseña incorrecta';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Correo inválido';
        break;
      default:
        this.errorMessage = 'Ocurrió un error contraseña incorrecta. Inténtalo de nuevo';
    }
    console.error('Login error: ', error);
  }

  // Método para iniciar sesión con Google
  async onLoginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const user = await this.afAuth.signInWithPopup(provider);  // Iniciar sesión con Google
      console.log('User logged in with Google: ', user);
      this.navCtrl.navigateRoot('/home');  // Redirigir a la página principal
    } catch (error) {
      console.error('Error al iniciar sesión con Google: ', error);
    }
  }

  // Método para iniciar sesión con Facebook
  async onLoginWithFacebook() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const user = await this.afAuth.signInWithPopup(provider);  // Iniciar sesión con Facebook
      console.log('User logged in with Facebook: ', user);
      this.navCtrl.navigateRoot('/home');  // Redirigir a la página principal
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook: ', error);
    }
  }

  // Método para redirigir a la página de registro
  goToSignup() {
    this.navCtrl.navigateRoot('/signup');
  }
}
