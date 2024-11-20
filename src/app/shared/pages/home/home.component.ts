import { Component } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public spotifyService: SpotifyService){}

}
