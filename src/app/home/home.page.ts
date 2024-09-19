import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, PopoverController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../auth/auth.service';  // Importamos el servicio AuthService
import { UserOptionsComponent } from '../components/user-options/user-options.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = []; // Lista para almacenar las películas filtradas
  actionMovies: any[] = [];
  comedyMovies: any[] = [];
  dramaMovies: any[] = [];
  favorites: string[] = []; // Lista para almacenar los favoritos
  currentUserId: string = ''; // ID del usuario actual
  currentIndices: { [key: string]: number } = { accion: 0, comedia: 0, drama: 0 };
  movieCount: number = 5; // Número de películas visibles al mismo tiempo
  isAdmin: boolean = false; // Variable para verificar si el usuario es admin

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private firestoreService: FirestoreService,
    private authService: AuthService // Inyectamos el AuthService
  ) {}

  ngOnInit() {
    this.firestoreService.getMovies().subscribe((data) => {
      this.movies = data;
      this.filteredMovies = data;
      this.actionMovies = this.movies.filter(movie => movie.category === 'Acción');
      this.comedyMovies = this.movies.filter(movie => movie.category === 'Comedia');
      this.dramaMovies = this.movies.filter(movie => movie.category === 'Drama');
    });

    // Obtener el ID del usuario actual y cargar sus favoritos
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.firestoreService.getUserFavorites(this.currentUserId).subscribe(userData => {
          if (userData && userData.favorites) {
            this.favorites = userData.favorites;
          }
        });

        // Verificar si el usuario es admin
        this.authService.getUserRole(this.currentUserId).then(role => {
          if (role === 'admin') {
            this.isAdmin = true;
          }
        });
      }
    });
  }

  // Este método filtra las películas según lo que el usuario escriba
  filterMovies(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredMovies = this.movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchTerm);
      });

      this.actionMovies = this.filteredMovies.filter(movie => movie.category === 'Acción');
      this.comedyMovies = this.filteredMovies.filter(movie => movie.category === 'Comedia');
      this.dramaMovies = this.filteredMovies.filter(movie => movie.category === 'Drama');
    } else {
      this.filteredMovies = [...this.movies];
      this.actionMovies = this.movies.filter(movie => movie.category === 'Acción');
      this.comedyMovies = this.movies.filter(movie => movie.category === 'Comedia');
      this.dramaMovies = this.movies.filter(movie => movie.category === 'Drama');
    }
  }

  // Funcionalidad añadida para favoritos

  toggleFavorite(movieId: string) {
    if (!this.currentUserId) {
      console.error('El userId no está disponible. Por favor, inicia sesión.');
      return; // Evitar que se ejecute la función si no hay un userId
    }

    if (this.isFavorite(movieId)) {
      this.firestoreService.removeMovieFromFavorites(this.currentUserId, movieId);
    } else {
      this.firestoreService.addMovieToFavorites(this.currentUserId, movieId);
    }
  }

  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  getMoviesByCategory(category: string): any[] {
    if (category === 'accion') {
      return this.actionMovies;
    } else if (category === 'comedia') {
      return this.comedyMovies;
    } else if (category === 'drama') {
      return this.dramaMovies;
    }
    return [];
  }

  prevSlide(category: string) {
    const movies = this.getMoviesByCategory(category);
    const maxScroll = Math.max(movies.length - this.movieCount, 0);
    if (this.currentIndices[category] > 0) {
      this.currentIndices[category]--;
    }
    this.updateCarousel(category);
  }

  nextSlide(category: string) {
    const movies = this.getMoviesByCategory(category);
    const maxScroll = Math.max(movies.length - this.movieCount, 0);
    if (this.currentIndices[category] < maxScroll) {
      this.currentIndices[category]++;
    }
    this.updateCarousel(category);
  }

  updateCarousel(category: string) {
    const container = document.getElementById(`${category}Carousel`) as HTMLElement;
    if (container) {
      container.style.transform = `translateX(-${this.currentIndices[category] * (100 / this.movieCount)}%)`;
    }
  }

  goToMovieDetail(movie: any) {
    this.navCtrl.navigateForward('/movie-detail', {
      queryParams: {
        movie: JSON.stringify(movie), // Pasar los detalles de la película como un string JSON
      },
    });
  }

  async presentUserOptions(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: UserOptionsComponent,
      event,
      translucent: true,
    });
    await popover.present();
  }
}
