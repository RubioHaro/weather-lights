const METRICS_CONFIG = [
    { label: "Wind", key: "windSpeed", unit: "mph" },
    { label: "Temperature", key: "temp", unit: "°F" },
    { label: "Rain", key: "precipitation", unit: "mm" },
    { label: "Description", key: "description", unit: "" },
] as const;

interface WeatherData {
    status: "GREEN" | "YELLOW" | "RED";
    message: string;
    details: {
        temp: number;
        windSpeed: number;
        description: string;
        precipitation: number;
    };
}

/**
 * Component to display weather information and safety status.
 * Shows weather metrics, safety color code (GREEN/YELLOW/RED), and recommendations.
 * 
 * @param {Object} props
 * @param {WeatherData} props.weather - The weather safety data to display.
 * @param {Function} props.onReset - Callback function triggered when resetting to initial state.
 * @returns {JSX.Element} The rendered weather display component.
 */
const WeatherDisplay = ({
    weather,
    onReset,
}: {
    weather: WeatherData;
    onReset: () => void;
}) => {
    const signal =
        weather.status === "GREEN"
            ? "GO"
            : weather.status === "RED"
              ? "NO GO"
              : "WAIT";

    return (
        <div className={`safety-card ${weather.status.toLowerCase()}`}>
            <div className="status-signal">{signal}</div>
            <h2 className="status-message">{weather.message}</h2>

            <div className="details-grid">
                {METRICS_CONFIG.map((config) => (
                    <div key={config.key} className="detail-item">
                        <span className="label">{config.label}</span>
                        <span className="value">
                            {
                                weather.details[
                                    config.key as keyof typeof weather.details
                                ]
                            }{" "}
                            {config.unit}
                        </span>
                    </div>
                ))}
            </div>
            <button className="btn-secondary" onClick={onReset}>
                NEW CHECK
            </button>
        </div>
    );
};

export default WeatherDisplay;
