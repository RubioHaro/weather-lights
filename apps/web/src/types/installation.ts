/**
 * Represents a solar installation site within the Palmetto ecosystem.
 * Used to track locations for safety verification.
 * * @typedef {Object} Installation
 * @property {string} id - Unique identifier for the installation.
 * @property {string} name - The nickname or label for the site (e.g., "North Roof Project").
 * @property {number} lat - Geographic latitude for precise weather lookup.
 * @property {number} lon - Geographic longitude for precise weather lookup.
 * @property {string} [address] - Optional physical address for display purposes.
 */
export interface Installation {
    id: string;
    name: string;
    lat: number;
    lon: number;
    address?: string;
}
