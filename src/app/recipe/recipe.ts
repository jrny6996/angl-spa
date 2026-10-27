import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RecipeService } from '../recipe-service';
import { CounterService } from '../counter-service';
@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe {
  recipeService = inject(RecipeService);
  recipes = this.recipeService.getAllRecipes();
  counterService = inject(CounterService);
  active: WritableSignal<string> = signal('');
  recipeNames = Object.keys(this.recipes);
  open = false;
  handleChange = (e: Event) => {
    //@ts-ignore
    this.active.set(e.target.value);
    this.open = true;
  };

  getIngredients() {
    return this.recipes?.[this.active()].ingredients ?? [];
  }
  getSteps() {
    return this.recipes?.[this.active()].steps ?? [];
  }
}
