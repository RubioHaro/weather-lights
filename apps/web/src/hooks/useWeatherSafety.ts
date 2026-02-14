import { useState } from "react";
import axios from "axios";

/**
 * @typedef {('GREEN' | 'YELLOW' | 'RED')} SafetyStatus - The safety status levels for weather conditions.
 */
export type SafetyStatus = "GREEN" | "YELLOW" | "RED";

/**
 * @typedef {Object} WeatherData
 * @property {SafetyStatus} status - The safety status of the current weather.
 * @property {string} message - A descriptive message about the safety status.
 * @property {Object} details - Detailed weather information.
 * @property {number} details.temp - Temperature in Fahrenheit.
 * @property {number} details.windSpeed - Wind speed in mph.
 * @property {string} details.description - Description of weather conditions.
 * @property {number} details.precipitation - Precipitation amount in mm.
 */
export interface WeatherData {
    status: SafetyStatus;
    message: string;
    details: {
        temp: number;
        windSpeed: number;
        description: string;
        precipitation: number;
    };
}

/**
 * @typedef {Object} UseWeatherSafetyReturn
 * @property {boolean} loading - Indicates if a safety check request is in progress.
 * @property {WeatherData|null} weather - The current weather and safety data.
 * @property {string|null} error - Error message if the request failed.
 * @property {Function} fetchSafety - Function to fetch safety data from the API.
 * @property {Function} resetWeather - Function to reset the weather state.
 */
interface UseWeatherSafetyReturn {
    loading: boolean;
    weather: WeatherData | null;
    error: string | null;
    fetchSafety: (lat: number, lon: number) => Promise<void>;
    resetWeather: () => void;
}

const API_ENDPOINT = "http://localhost:3000/api/weather/safety";

/**
 * Custom hook for managing weather safety data and API interactions.
 * Handles loading states, error management, and weather data retrieval.
 * @returns {UseWeatherSafetyReturn} Object containing weather state and control functions.
 */
export const useWeatherSafety = (): UseWeatherSafetyReturn => {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchSafety = async (lat: number, lon: number) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(
                `${API_ENDPOINT}?lat=${lat}&lon=${lon}`,
            );
            setWeather(data);
        } catch (err) {
            setError("An error occurred while fetching weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetWeather = () => {
        setWeather(null);
        setError(null);
    };

    return {
        loading,
        weather,
        error,
        fetchSafety,
        resetWeather,
    };
};
