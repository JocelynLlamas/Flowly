import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private accessToken: string | null = null;

  constructor() { }

  getAuthUrl(): string {
    const clientId = 'c5d2cd256063424a968cf415d52bd852'; // Reemplázalo con tu Client ID de Spotify
    const redirectUri = 'http://localhost:4200/callback'; // URI donde Spotify redirige después de la autenticación
    const scopes = [
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'playlist-read-private',
      'playlist-read-collaborative',
      'streaming',
    ];
  
    const queryParams = new URLSearchParams({
      response_type: 'token',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      show_dialog: 'true', // Opcional: muestra siempre la ventana de autorización
    });
  
    return `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
  }
  

  // Configurar el token de acceso
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string {
    if (!this.accessToken) {
      throw new Error('El token de acceso no está configurado.');
    }
    return this.accessToken;
  }

  // Obtener la canción actual
  getCurrentTrack(): Promise<any> {
    return fetch('https://api.spotify.com/v1/me/player', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error al obtener la canción actual:', error);
        throw error;
      });
  }

  // Reproducir canción
  playTrack(uri: string): Promise<void> {
    const body = {
      uris: [uri], // URIs de canciones
    };

    return fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al reproducir la canción: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Error al reproducir la canción:', error);
        throw error;
      });
  }

  // Pausar reproducción
  pauseTrack(): Promise<void> {
    return fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok && response.status !== 204) {
          throw new Error(`Error al pausar la reproducción: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Error al pausar la reproducción:', error);
        throw error;
      });
  }

  // Canción siguiente
  nextTrack(): Promise<void> {
    return fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al pasar a la siguiente canción: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Error al pasar a la siguiente canción:', error);
        throw error;
      });
  }

  // Canción anterior
  previousTrack(): Promise<void> {
    return fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al regresar a la canción anterior: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Error al regresar a la canción anterior:', error);
        throw error;
      });
  }

  getUserPlaylists(): Promise<any> {
    return fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener las playlists: ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener las playlists:', error);
        throw error;
      });
  }

  getPlaylistTracks(playlistId: string): Promise<any> {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener las canciones de la playlist: ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener las canciones de la playlist:', error);
        throw error;
      });
  }

  getAvailableDevices(): Promise<any> {
    return fetch('https://api.spotify.com/v1/me/player/devices', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener los dispositivos disponibles: ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error al obtener los dispositivos:', error);
        throw error;
      });
  }

  transferPlayback(deviceId: string): Promise<void> {
    const body = {
      device_ids: [deviceId], // El ID del dispositivo al que deseas transferir la reproducción
      play: true, // Indica si debe comenzar a reproducirse automáticamente (opcional)
    };

    return fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al transferir la reproducción: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Error al transferir la reproducción:', error);
        throw error;
      });
  }


}
