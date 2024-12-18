import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spotify-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css'],
})
export class SpotifyPlayerComponent implements OnInit, OnDestroy {
  currentTrack: any;
  intervalId: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.fetchCurrentTrack(); // First call
    this.intervalId = setInterval(() => this.fetchCurrentTrack(), 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchCurrentTrack(): void {
    this.spotifyService.getCurrentTrack().then((track) => {
      this.currentTrack = track?.item; // Update current song
    }).catch((error) => {
      console.error('Error al obtener la canción actual:', error);
    });
  }

  play(): void {
    this.spotifyService.playTrack(this.currentTrack.uri).catch((error) => {
      console.error('Error al reproducir la canción:', error);
    });
  }

  pause(): void {
    this.spotifyService.pauseTrack().catch((error) => {
      console.error('Error al pausar la canción:', error);
    });
  }

  next(): void {
    this.spotifyService.nextTrack().then(() => {
      this.fetchCurrentTrack();
    }).catch((error) => {
      console.error('Error al pasar a la siguiente canción:', error);
    });
  }
  
  previous(): void {
    this.spotifyService.previousTrack().then(() => {
      this.fetchCurrentTrack();
    }).catch((error) => {
      console.error('Error al regresar a la canción anterior:', error);
    });
  }
}
