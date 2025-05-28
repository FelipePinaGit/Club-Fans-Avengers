import { Avenger, AvengerFormData } from '../types';

// Replace with your actual API URL
const API_URL = 'http://localhost:3000/api/avengers';

export const fetchAvengers = async (): Promise<Avenger[]> => {
  try {
    const response = await fetch(`${API_URL}/`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching avengers:', error);
    throw error;
  }
};

export const createAvenger = async (avengerData: AvengerFormData): Promise<Avenger> => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avengerData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating avenger:', error);
    throw error;
  }
};