import React from 'react';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import './Results.css';

interface ResultsProps {
  mealPlan: any;
}

const Results: React.FC<ResultsProps> = ({ mealPlan }) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 15;
    doc.text('Meal Plan', 10, y);
    y += 10;

    mealPlan.days.forEach((day: any) => {
      doc.text(day.day, 10, y);
      y += 7;
      day.meals.forEach((meal: any) => {
        doc.text(`- ${meal.name}`, 15, y);
        y += 7;
      });
    });

    doc.save('meal-plan.pdf');
  };

  const handleExportCSV = () => {
    const csvData = mealPlan.days.flatMap((day: any) => 
      day.meals.map((meal: any) => ({ Day: day.day, Meal: meal.name }))
    );
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'meal-plan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mealPlan) {
    return (
      <div className="results-card">
        <h2>Results</h2>
        <p>Generate a meal plan to see the results.</p>
      </div>
    );
  }

  return (
    <div className="results-card">
      <h2>Results</h2>
      <div className="export-buttons">
        <button onClick={handleExportPDF}>Export as PDF</button>
        <button onClick={handleExportCSV}>Export as CSV</button>
      </div>
      <div className="meal-plan">
        {mealPlan.days.map((day: any) => (
          <div key={day.day} className="day-plan">
            <h3>{day.day}</h3>
            <ul>
              {day.meals.map((meal: any) => (
                <li key={meal.name}>{meal.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
