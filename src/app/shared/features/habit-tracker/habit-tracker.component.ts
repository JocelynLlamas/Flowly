import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css'
})
export class HabitTrackerComponent {
  habits = [
    { name: 'Ejercicio', done: false },
    { name: 'Beber agua', done: false },
    { name: 'Leer', done: false },
  ];
}
