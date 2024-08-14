'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "./ui/button";
import useGenerateRecipes from "@/hooks/useGenerateRecipes";
import { Recipe } from "@/types";

interface RecipeWithId extends Recipe {
  id: number;
}

const RecipeSuggestions: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeWithId[]>([]);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  const { recipes: generatedRecipes, isLoading, error, regenerateRecipes } = useGenerateRecipes();

  useEffect(() => {
    if (generatedRecipes.length > 0) {
      const newRecipes = generatedRecipes.map((recipe, index) => ({
        id: index + 1,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
      }));
      setRecipes(newRecipes);
      setHasGenerated(true);
    }
  }, [generatedRecipes]);

  return (
    <Card className="w-full bg-white text-black h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recipe Suggestions</CardTitle>
        <CardDescription>Discover new recipes to try.</CardDescription>
        <Button
          variant="outline"
          onClick={regenerateRecipes}
          className="mt-4 py-2 px-4 bg-white text-green-600 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Recipe"}
        </Button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="mb-4">
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{recipe.description}</p>
              <h4 className="text-md font-medium">Ingredients:</h4>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No recipes available. Click Generate Recipe to get started!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeSuggestions;
