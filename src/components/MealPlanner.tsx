import React, { useState, useEffect, useRef } from 'react';
import { generateMealPlan } from '../api';
import './MealPlanner.css';

interface MealPlannerProps {
  onGenerateMealPlan: (plan: any) => void;
}

const MealPlanner: React.FC<MealPlannerProps> = ({ onGenerateMealPlan }) => {
  // Photo Upload State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Settings State
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);
  const [weeksToGenerate, setWeeksToGenerate] = useState<number>(2);
  const [foodStyles, setFoodStyles] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [isVeganVegetarian, setIsVeganVegetarian] = useState<boolean>(false);

  // Food style options
  const foodStyleOptions = [
    'Italian',
    'Mexican',
    'Asian',
    'Mediterranean',
    'American',
    'French',
    'Indian',
    'Thai',
    'Japanese',
    'Korean',
    'Chinese',
    'Greek',
    'Spanish',
    'Middle Eastern'
  ];

  // Dietary restriction options
  const dietaryRestrictionOptions = [
    'Nuts',
    'Dairy',
    'Gluten',
    'Shellfish',
    'Soy',
    'Eggs',
    'Fish',
    'Peanuts',
    'Sesame',
    'Mustard'
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('mealPlannerSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setMealsPerDay(parsedSettings.mealsPerDay || 3);
        setWeeksToGenerate(parsedSettings.weeksToGenerate || 2);
        setFoodStyles(parsedSettings.foodStyles || []);
        setDietaryRestrictions(parsedSettings.dietaryRestrictions || []);
        setIsVeganVegetarian(parsedSettings.isVeganVegetarian || false);
      } catch (e) {
        console.error('Failed to parse saved settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      mealsPerDay,
      weeksToGenerate,
      foodStyles,
      dietaryRestrictions,
      isVeganVegetarian
    };
    localStorage.setItem('mealPlannerSettings', JSON.stringify(settings));
  }, [mealsPerDay, weeksToGenerate, foodStyles, dietaryRestrictions, isVeganVegetarian]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // Handle checkbox changes for food styles
  const handleFoodStyleChange = (style: string) => {
    if (foodStyles.includes(style)) {
      setFoodStyles(foodStyles.filter(s => s !== style));
    } else {
      setFoodStyles([...foodStyles, style]);
    }
  };

  // Handle checkbox changes for dietary restrictions
  const handleDietaryRestrictionChange = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const settings = {
        mealsPerDay,
        weeksToGenerate,
        foodStyles,
        dietaryRestrictions,
        isVeganVegetarian,
      };
      const plan = await generateMealPlan(selectedImage, settings);
      onGenerateMealPlan(plan);
    } catch (error) {
      console.error('Failed to generate meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meal-planner-card">
      <h1>Meal Planner</h1>
      <div className="meal-planner-content">
        <div className="photo-upload-section">
          <h2>Photo Upload</h2>
          <div className="file-input-container">
            <label htmlFor="file-input" className="file-input-label">
              Choose File
            </label>
            <input
              id="file-input"
              ref={inputRef}
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <div className="file-name">{selectedImage.name}</div>
            )}
          </div>
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={handleRemoveImage}>Remove</button>
            </div>
          )}
        </div>

        <div className="settings-container">
          <h2>Settings & Preferences</h2>
          
          {/* Meals per day */}
          <div className="setting-group">
            <label htmlFor="mealsPerDay">Meals per day: {mealsPerDay}</label>
            <input
              type="range"
              id="mealsPerDay"
              min="1"
              max="5"
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(parseInt(e.target.value))}
            />
            <div className="slider-values">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Weeks to generate */}
          <div className="setting-group">
            <label htmlFor="weeksToGenerate">Weeks to generate: {weeksToGenerate}</label>
            <input
              type="range"
              id="weeksToGenerate"
              min="1"
              max="4"
              value={weeksToGenerate}
              onChange={(e) => setWeeksToGenerate(parseInt(e.target.value))}
            />
            <div className="slider-values">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>

          {/* Food style preferences */}
          <div className="setting-group">
            <h3>Food Style Preferences</h3>
            <div className="checkbox-grid">
              {foodStyleOptions.map((style) => (
                <label key={style} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={foodStyles.includes(style)}
                    onChange={() => handleFoodStyleChange(style)}
                  />
                  {style}
                </label>
              ))}
            </div>
          </div>

          {/* Dietary restrictions */}
          <div className="setting-group">
            <h3>Dietary Restrictions / Allergies</h3>
            <div className="checkbox-grid">
              {dietaryRestrictionOptions.map((restriction) => (
                <label key={restriction} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={dietaryRestrictions.includes(restriction)}
                    onChange={() => handleDietaryRestrictionChange(restriction)}
                  />
                  {restriction}
                </label>
              ))}
            </div>
          </div>

          {/* Vegan/Vegetarian toggle */}
          <div className="setting-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={isVeganVegetarian}
                onChange={(e) => setIsVeganVegetarian(e.target.checked)}
              />
              Vegan/Vegetarian
            </label>
          </div>

          <button onClick={handleGenerate} disabled={!selectedImage || loading}>
            {loading ? (
              <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <span>Generating...</span>
              </div>
            ) : (
              'Generate Meal Plan'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;