
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function saveUserToStorage(user: UserData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getUserFromStorage(): UserData | null {
  const userString = localStorage.getItem(STORAGE_KEY);
  if (!userString) return null;
  
  try {
    return JSON.parse(userString);
  } catch (e) {
    console.error("Failed to parse user data from localStorage:", e);
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getUserFromStorage() !== null;
}

export function createDemoAccount(): UserData {
  const demoUser: UserData = {
    firstName: "Ime",
    lastName: "Prezime",
    email: "test@test.com",
    password: "123456",
    interests: []
  };
  
  saveUserToStorage(demoUser);
  return demoUser;
}

export function updateUserData(partialUser: Partial<UserData>) {
  const user = getUserFromStorage();
  if (!user) return null;
  
  const updatedUser = { ...user, ...partialUser };
  saveUserToStorage(updatedUser);
  return updatedUser;
}

// DeepSeek AI API helpers
export async function sendMessageToDeepSeek(message: string, userData: UserData) {
  try {
    // This would be replaced with actual DeepSeek API integration
    // For now, simulate a response
    
    // Prepare user context for the prompt
    const userContext = {
      name: userData.firstName,
      age: userData.age || "unknown",
      weight: userData.weight || "unknown",
      height: userData.height || "unknown",
      interests: userData.interests || []
    };
    
    // For demo purposes, just return simulated responses
    return simulateDeepSeekResponse(message, userContext);
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return "Izvini, nešto je pošlo po zlu, pokušaj ponovo.";
  }
}

// Simulate AI responses for demo purposes
function simulateDeepSeekResponse(message: string, userContext: any): string {
  if (message.includes("Koliko godina")) {
    return "Hvala! Molim te, možeš li mi reći koliko težiš (u kg)?";
  }
  
  if (message.includes("telesna masa") || message.includes("težiš")) {
    return "Odlično! A koliko si visok/a (u cm)?";
  }
  
  if (message.includes("visok")) {
    return "Hvala na informacijama! Sada odaberi 3 oblasti koje te najviše zanimaju:";
  }
  
  if (message.includes("oblasti")) {
    return `Hvala ${userContext.name}! Tvoj profil je sada kompletan. Možeš pregledati sadržaj prilagođen tvojim interesovanjima u odeljcima ispod.`;
  }
  
  return "Zdravo! Ja sam SMARTY, tvoj lični asistent. Kako ti mogu pomoći danas?";
}
