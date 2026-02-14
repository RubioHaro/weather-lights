import WeatherDisplay from "./WeatherDisplay";
import type { WeatherData } from "../hooks/useWeatherSafety";
import type { JSX } from "react";

interface ResultsSectionProps {
    weather: WeatherData;
    onReset: () => void;
}

/**
 * Component to display weather safety analysis results.
 * Shows detailed weather metrics and safety recommendations.
 * 
 * @param {Object} props
 * @param {WeatherData} props.weather - The weather safety data to display.
 * @param {Function} props.onReset - Callback function triggered when resetting to initial state.
 * @returns {JSX.Element} The rendered results section component.
 */
const ResultsSection = ({ weather, onReset }: ResultsSectionProps): JSX.Element => {
    return <WeatherDisplay weather={weather} onReset={onReset} />;
};

export default ResultsSection;
