import type { Installation } from "../types/installation";

/**
 * Service to manage local persistence of solar installation sites.
 * Acts as a mock repository to simulate database operations.
 */
export class StorageService {
  private static readonly STORAGE_KEY = 'palmetto_weather_lights_sites';

  /**
   * Retrieves all saved installations from the browser's local storage.
   * @returns {Installation[]} Array of saved installation objects.
   */
  static getInstallations(): Installation[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from storage', error);
      return [];
    }
  }

  /**
   * Persists a new installation site.
   * @param {Omit<Installation, 'id'>} siteData - Site information without the ID.
   * @returns {Installation} The newly created installation object.
   */
  static saveInstallation(siteData: Omit<Installation, 'id'>): Installation {
    const installations = this.getInstallations();
    
    const newInstallation: Installation = {
      ...siteData,
      id: crypto.randomUUID(), // Unique ID.
    };

    const updated = [...installations, newInstallation];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    
    return newInstallation;
  }

  /**
   * Checks if the user has at least one installation saved.
   * Aligns with the "Have at least 1 Location" logic in the user flow.
   * @returns {boolean}
   */
  static hasInstallations(): boolean {
    return this.getInstallations().length > 0;
  }
}