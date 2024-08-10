import { useEffect, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { Recipe, InventoryItem } from "@/types";

type ErrorType = string | null;

const useGenerateRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);

  const fetchInventoryData = useCallback(async (): Promise<InventoryItem[]> => {
    try {
      const inventorySnapshot = await getDocs(query(collection(firestore, 'inventory')));
      const inventoryItems = inventorySnapshot.docs.map(doc => doc.data()) as InventoryItem[];
      return inventoryItems;
    } catch (err) {
      console.error('Error fetching inventory:', err);
      throw new Error('Failed to fetch inventory data.');
    }
  }, []);

  const handleGenerateRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: "application/json" }
      });

      const inventoryData = await fetchInventoryData();
      // Properly format ingredients text
      const ingredientsText = inventoryData
        .map(item => `${item.name}: ${item.quantity} ${item.unit || ''}`)
        .filter(ingredient => !ingredient.startsWith('undefined')) // Filter out any undefined units
        .join(', ');

      const promptText = `
        Generate 3 different recipes using the following JSON format:
        {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "title": { "type": "string" },
              "description": { "type": "string" },
              "ingredients": { "type": "array", "items": { "type": "string" } }
            }
          }
        }
        Ingredients: ${ingredientsText}
      `;

      const result = await model.generateContent(promptText);

      // Check if candidates is defined and has at least one entry
      const candidates = result.response?.candidates;
      if (candidates && candidates.length > 0) {
        const generatedText = candidates[0]?.content?.parts[0]?.text;

        // Log the result for debugging
        console.log('Generated Text:', generatedText);

        if (typeof generatedText === 'string') {
          try {
            const parsedRecipes: Recipe[] = JSON.parse(generatedText);
            setRecipes(parsedRecipes);
          } catch (parseError) {
            console.error('Error parsing recipe JSON:', parseError);
            throw new Error('Failed to parse recipe JSON.');
          }
        } else {
          setRecipes([]);
          throw new Error('Recipe generation failed: response is not a string.');
        }
      } else {
        setRecipes([]);
        throw new Error('No candidates were returned in the response.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [fetchInventoryData]);

  return { recipes, isLoading, error, regenerateRecipes: handleGenerateRecipes };
};

export default useGenerateRecipes;
