// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// User data interface
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: string;
  weight?: string;
  height?: string;
  interests: string[];
}

// Local storage helpers
export const STORAGE_KEY = "smarty_user";

export function saveUserToStorage(user: UserData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getUserFromStorage(): UserData | null {
  const userString = localStorage.getItem(STORAGE_KEY);
  if (!userString) return null;
  
  try {
    return JSON.parse(userString);
  } catch (e) {
    console.error("Failed to parse user data:", e);
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getUserFromStorage() !== null;
}

export function createDemoAccount(): UserData {
  const demoUser: UserData = {
    firstName: "Demo",
    lastName: "User",
    email: "demo@test.com",
    password: "demo123",
    interests: []
  };
  
  saveUserToStorage(demoUser);
  return demoUser;
}

export function updateUserData(partialUser: Partial<UserData>): UserData | null {
  const user = getUserFromStorage();
  if (!user) return null;
  
  const updatedUser = { ...user, ...partialUser };
  saveUserToStorage(updatedUser);
  return updatedUser;
}

export const sendMessageToGemini = async (message: string, userData: UserData): Promise<string> => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBjIA5D2Y7YQN7JVxbxvZV2LnVDZt7E0qY', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: message }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    // Prilagodi u zavisnosti od strukture odgovora!
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Nema odgovora.";
    return reply;
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    return "Trenutno imam problema sa komunikacijom. Molim pokušajte kasnije.";
  }
};