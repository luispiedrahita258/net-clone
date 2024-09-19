import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  // Método para registrar un usuario
  async register(email: string, password: string, name: string, role: string = 'user') {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        // Guarda los datos del usuario en Firestore incluyendo el rol
        await this.firestore.collection('users').doc(result.user.uid).set({
          uid: result.user.uid,
          email: result.user.email,
          name: name,
          role: role  // Asignamos el rol del usuario
        });
      }
      this.router.navigate(['/home']);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error("Error en el login:", error);
    }
  }

  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/auth']);
  }

  // Método para obtener el estado de autenticación del usuario
  getAuthState() {
    return this.afAuth.authState;
  }

// Método para obtener el rol del usuario
async getUserRole(userId: string): Promise<string | null> {
  const userRef = this.firestore.collection('users').doc(userId);
  const userDoc = await userRef.get().toPromise();

  const userData = userDoc?.data() as { role?: string }; // Definir el tipo explícitamente
  return userData?.role ?? null;  // Si userData.role es undefined, se devuelve null
}


}
