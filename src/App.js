import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { trainingPlan } from './trainingPlanData';

function App() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(0);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(2024, 0, 1);
    const dayOfWeek = today.getDay();
    const daysSinceStart = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
    const weeksPassed = Math.floor(daysSinceStart / 7);
    
    setCurrentWeek(((weeksPassed % 12) + 1));
    setCurrentDay(dayOfWeek === 0 ? 6 : dayOfWeek - 1);
  }, []);

  const nextDay = () => {
    if (currentDay === 6) {
      setCurrentWeek((prev) => (prev % 12) + 1);
      setCurrentDay(0);
    } else {
      setCurrentDay((prev) => prev + 1);
    }
  };

  const prevDay = () => {
    if (currentDay === 0) {
      setCurrentWeek((prev) => ((prev - 2 + 12) % 12) + 1);
      setCurrentDay(6);
    } else {
      setCurrentDay((prev) => prev - 1);
    }
  };

  const currentTraining = trainingPlan[currentWeek] && trainingPlan[currentWeek][weekDays[currentDay]];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Week {currentWeek} - {weekDays[currentDay]}</span>
            <Calendar className="w-5 h-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <select 
              value={currentWeek} 
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className="mr-2 p-2 border rounded"
            >
              {Array.from({length: 12}, (_, i) => i + 1).map(week => (
                <option key={week} value={week}>Week {week}</option>
              ))}
            </select>
            <select 
              value={currentDay} 
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {weekDays.map((day, index) => (
                <option key={day} value={index}>{day}</option>
              ))}
            </select>
          </div>
          {currentTraining ? (
            <div className="mb-4">
              <p className="font-semibold">{currentTraining.session}</p>
              {currentTraining.distance && <p>Distance: {currentTraining.distance}</p>}
              {currentTraining.details && <p>Details: {currentTraining.details}</p>}
              {currentTraining.pace && <p>Pace: {currentTraining.pace}</p>}
              {currentTraining.time && <p>Time: {currentTraining.time}</p>}
              {currentTraining.intensity && <p>Intensity: {currentTraining.intensity}</p>}
            </div>
          ) : (
            <p>No training data available for this day.</p>
          )}
          <div className="flex justify-between">
            <Button onClick={prevDay}><ChevronLeft /></Button>
            <Button onClick={nextDay}><ChevronRight /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;