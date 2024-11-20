import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  // templateUrl: './callback.component.html',
  template: '<p>Autenticando...</p>',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    // Capturar el token de la URL
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    if (token) {
      // Configurar el token en el servicio de Spotify
      this.spotifyService.setAccessToken(token);

      // Redirigir a la página principal
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Token no encontrado');
    }
  }
}
