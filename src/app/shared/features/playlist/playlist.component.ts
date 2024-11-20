import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  playlists: any[] = []; // Guardará las playlists del usuario
  selectedPlaylist: any = null; // Playlist seleccionada
  tracks: any[] = []; // Canciones de la playlist seleccionada

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getUserPlaylists().then((data) => {
      this.playlists = data.items; // Guardamos las playlists
    });
  }

  selectPlaylist(playlist: any) {
    this.selectedPlaylist = playlist;
    this.spotifyService.getPlaylistTracks(playlist.id).then((data) => {
      this.tracks = data.items; // Guardamos las canciones de la playlist seleccionada
    });
  }

  playSong(trackUri: string) {
    this.spotifyService.getAvailableDevices().then((devices) => {
      const activeDevice = devices.devices.find((device: any) => device.is_active);

      if (activeDevice) {
        // Si hay un dispositivo activo, reproducir la canción
        this.spotifyService.playTrack(trackUri).catch((error) => {
          console.error('Error al reproducir la canción:', error);
        });
      } else if (devices.devices.length > 0) {
        // Si no hay dispositivo activo, transfiere la reproducción al primer dispositivo disponible
        const firstDevice = devices.devices[0];
        this.spotifyService.transferPlayback(firstDevice.id).then(() => {
          this.spotifyService.playTrack(trackUri).catch((error) => {
            console.error('Error al reproducir la canción después de transferir la reproducción:', error);
          });
        });
      } else {
        console.error('No hay dispositivos disponibles para la reproducción.');
        alert('Por favor, abre Spotify en un dispositivo y vuelve a intentarlo.');
      }
    });
  }

}
