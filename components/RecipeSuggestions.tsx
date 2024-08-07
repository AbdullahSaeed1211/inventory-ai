"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const RecipeSuggestions: React.FC = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish.",
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "Spicy and flavorful chicken curry.",
    },
    {
      id: 3,
      title: "Vegetable Stir-Fry",
      description: "A healthy and quick vegetable stir-fry.",
    },
  ]);

  const handleGenerateRecipe = () => {
    const newRecipe = {
      id: recipes.length + 1,
      title: "New Recipe",
      description: "A new and exciting recipe.",
    };
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <Card className="w-full bg-white text-black">
      <CardHeader>
        <CardTitle>Recipe Suggestions</CardTitle>
        <CardDescription>
          Discover new recipes to try.
        </CardDescription>
        <Button
          variant="outline"
          onClick={handleGenerateRecipe}
          className="mt-4 py-2 px-4 bg-white text-green-600 rounded">
          Generate Recipe
        </Button>
      </CardHeader>
      <CardContent>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="mb-4">
            <h3 className="text-lg font-semibold">{recipe.title}</h3>
            <p className="text-sm text-gray-700">{recipe.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecipeSuggestions;
