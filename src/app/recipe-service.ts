import { Injectable } from '@angular/core';

export enum Measurements {
  TBS = 'tbs',
  TSP = 'tsp',
  CUP = 'cup',
  WHOLE = 'whole',
}

export type Ingredient = {
  name: string;
  measurement_multiple: number;
  measurement: Measurements;
};

export type RecipeInstructions = {
  steps: string[];
  ingredients: Ingredient[];
};

// mock db

const recipes: Record<string, RecipeInstructions> = {
  'bananna bread': {
    steps: ['combine wet', 'combine dry', 'mix together', 'bake 350*f for 45 min'],
    ingredients: [
      {
        name: 'flour',
        measurement_multiple: 1,
        measurement: Measurements.CUP,
      },
      {
        name: 'bananna',
        measurement_multiple: 2,
        measurement: Measurements.WHOLE,
      },
      {
        name: 'sugar',
        measurement_multiple: 1,
        measurement: Measurements.CUP,
      },
      {
        name: 'eggs',
        measurement_multiple: 2,
        measurement: Measurements.WHOLE,
      },
    ],
  },
  brownies: {
    steps: ['combine wet', 'combine dry', 'mix together', 'bake 375*f for 20 min'],
    ingredients: [
      {
        name: 'flour',
        measurement_multiple: 1,
        measurement: Measurements.CUP,
      },
      {
        name: 'cocoa',
        measurement_multiple: 8,
        measurement: Measurements.TBS,
      },
      {
        name: 'sugar',
        measurement_multiple: 1,
        measurement: Measurements.CUP,
      },
      {
        name: 'eggs',
        measurement_multiple: 2,
        measurement: Measurements.WHOLE,
      },
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  getAllRecipes() {
    return recipes;
  }
}
