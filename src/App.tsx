import { useState } from 'react';
import './App.css';
import MealPlanner from './components/MealPlanner';
import Results from './components/Results';

function App() {
  const [mealPlan, setMealPlan] = useState<any>(null);

  const handleGenerateMealPlan = (plan: any) => {
    setMealPlan(plan);
  };

  return (
    <div className="app-container">
      <MealPlanner onGenerateMealPlan={handleGenerateMealPlan} />
      <Results mealPlan={mealPlan} />
    </div>
  );
}

export default App;
