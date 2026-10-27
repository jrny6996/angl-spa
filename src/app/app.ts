import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';
import { Recipe } from './recipe/recipe';
import { RTCVidSources } from './rtcvid-sources/rtcvid-sources';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Recipe, RTCVidSources],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angl-spa');
}
