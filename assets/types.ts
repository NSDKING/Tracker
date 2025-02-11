 
// Type for Tracker table
export interface Tracker {
    id: number; // Primary key
    name: string; // Name of the habit or metric
    description: string; // Description of the habit or metric
    type: 'Habit' | 'Metric'; // Type of tracker, can be either 'Habit' or 'Metric'
}

// Type for Achievements table
export interface Achievement {
    id: number; // Primary key
    trackerId: number; // Foreign key referencing Tracker
    achieved: boolean; // Indicates if the achievement has been reached
    date: Date; // Date when the achievement was reached
}

// Type for MetricData table
export interface MetricData {
    id: number; // Primary key
    trackerId: number; // Foreign key referencing Tracker
    value: number; // The logged value for the metric
    date: Date; // Date when the metric was logged
}