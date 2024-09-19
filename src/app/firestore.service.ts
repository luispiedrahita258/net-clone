import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importar firebase

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  // Añadir un nuevo usuario a la colección "users"
  addUser(user: any): Promise<any> {
    return this.firestore.collection('users').add(user);
  }

  // Añadir una nueva película a la colección "movies"
  addMovie(movie: any): Promise<any> {
    return this.firestore.collection('movies').add(movie);
  }

  // Obtener las películas desde la colección "movies"
  getMovies(): Observable<any[]> {
    return this.firestore.collection('movies').valueChanges();
  }

  // Obtener los datos de un usuario por ID
  getUserById(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  // Añadir película a favoritos del usuario
  addMovieToFavorites(userId: string, movieId: string): Promise<void> {
    if (!userId) {
      return Promise.reject(new Error('userId no puede estar vacío'));
    }
    return this.firestore.collection('users').doc(userId).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(movieId) // Usamos FieldValue de firebase
    });
  }

  // Eliminar película de favoritos del usuario
  removeMovieFromFavorites(userId: string, movieId: string): Promise<void> {
    if (!userId) {
      return Promise.reject(new Error('userId no puede estar vacío'));
    }
    return this.firestore.collection('users').doc(userId).update({
      favorites: firebase.firestore.FieldValue.arrayRemove(movieId) // Usamos FieldValue de firebase
    });
  }

  // Obtener favoritos del usuario
  getUserFavorites(userId: string): Observable<any> {
    if (!userId) {
      return new Observable(observer => {
        observer.error(new Error('userId no puede estar vacío'));
      });
    }
    return this.firestore.collection('users').doc(userId).valueChanges();
  }
}
