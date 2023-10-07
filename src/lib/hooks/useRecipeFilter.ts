import React from 'react';
import { useEffect, useState } from 'react';
import { Ingredient, Recipe } from '../../../types';

export default function useRecipeFilter() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<
    Record<string, Recipe[]>
  >({
    allRecipes: [],
    ingredientMatches: [],
    tagMatches: [],
    titleMatches: [],
    procedureMatches: [],
  });

  useEffect(() => {
    fetchAllRecipes().then((recipes) => {
      setAllRecipes(recipes);
      setFilteredRecipes((prev) => ({ ...prev, allRecipes: recipes }));
    });
  }, []);

  useEffect(() => {
    setFilter(searchTerm);
  }, [searchTerm]);

  function setFilter(searchTerm: string) {
    if (searchTerm === '') {
      setFilteredRecipes((prev) => ({ ...prev, allRecipes }));
      return;
    }

    filterRecipes(searchTerm, allRecipes);
    setFilteredRecipes(filterRecipes(searchTerm, allRecipes));
  }

  async function fetchAllRecipes() {
    const res = await fetch('/api/recipes');
    setIsLoading(false);
    if (!res.ok) throw new Error('error fetching recipes');

    return (await res.json()) as Recipe[];
  }

  function consolidateIngredients(recipe: Recipe) {
    let res: Ingredient[] = [];

    for (let group of recipe.ingredientGroups) {
      res = [...res, ...group.ingredients];
    }

    return res;
  }

  function consolidateSteps(recipe: Recipe) {
    let res: Ingredient[] = [];

    for (let group of recipe.procedureGroups) {
      res = [...res, ...group.procedureSteps];
    }

    return res;
  }

  function filterRecipes(keyword: string, allRecipes: Recipe[]) {
    const searchTerm = keyword.toLowerCase();

    const results: Record<string, Recipe[]> = {
      allRecipes: [],
      ingredientMatches: [],
      tagMatches: [],
      titleMatches: [],
      procedureMatches: [],
    };

    for (let recipe of allRecipes) {
      // test for ingredient matches
      let ingredients = consolidateIngredients(recipe);

      for (let ingredient of ingredients) {
        if (ingredient.description.toLowerCase().includes(searchTerm)) {
          results.ingredientMatches.push(recipe);
          break;
        }
      }

      // test for tag matches
      if (
        recipe.tags?.some(
          (tag) =>
            tag.description.toLowerCase() === searchTerm ||
            tag.tagGroup?.toLowerCase() === searchTerm
        )
      ) {
        results.tagMatches.push(recipe);
      }

      // test for title matches
      if (recipe.title.toLowerCase().includes(searchTerm)) {
        results.titleMatches.push(recipe);
      }

      // test for procedure matches
      const steps = consolidateSteps(recipe);

      for (let step of steps) {
        if (step.description.toLowerCase().includes(searchTerm)) {
          results.procedureMatches.push(recipe);
          break;
        }
      }
    }

    return results;
  }

  return { isLoading, filteredRecipes, searchTerm, setSearchTerm };
}
