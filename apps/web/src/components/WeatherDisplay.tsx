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
                NUEVA CONSULTA
            </button>
        </div>
    );
};

export default WeatherDisplay;
