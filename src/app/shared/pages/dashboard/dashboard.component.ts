import { Component } from '@angular/core';
import { SpotifyPlayerComponent } from '../../features/spotify-player/spotify-player.component';
import { CalendarComponent } from '../../features/calendar/calendar.component';
import { HabitTrackerComponent } from '../../features/habit-tracker/habit-tracker.component';
import { PlaylistComponent } from '../../features/playlist/playlist.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SpotifyPlayerComponent, CalendarComponent, HabitTrackerComponent, PlaylistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
