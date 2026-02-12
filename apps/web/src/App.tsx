import { useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";

type SafetyStatus = "GREEN" | "YELLOW" | "RED";

interface WeatherData {
    status: SafetyStatus;
    message: string;
    details: {
        temp: number;
        windSpeed: number;
        description: string;
        precipitation: number;
    };
}

const App = () => {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchSafety = async (lat: number, lon: number) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(
                `http://localhost:3000/api/weather/safety?lat=${lat}&lon=${lon}`,
            );
            setWeather(data);
        } catch (err) {
            setError("No se pudo conectar con el servicio de seguridad.");
        } finally {
            setLoading(false);
        }
    };

    const handleLocationFetch = () => {
        if (!navigator.geolocation) {
            setError("Tu navegador no soporta geolocalización.");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchSafety(pos.coords.latitude, pos.coords.longitude),
            () => {
                setError("Acceso a ubicación denegado.");
                setLoading(false);
            },
        );
    };

    return (
        <div className="mobile-container">
            <header className="app-header">
                <h1 className="logo">Palmetto</h1>
                <p className="subtitle">WEATHER FOR INSTALL</p>
            </header>
            <main className="content-area">
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Analizando riesgos...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={handleLocationFetch}>
                            REINTENTAR
                        </button>{" "}
                    </div>
                ) : !weather ? (
                    <div className="hero-section">
                        <p className="hero-text">
                            Ready for a safe installation?
                        </p>{" "}
                        <button
                            className="btn-primary"
                            onClick={handleLocationFetch}
                        >
                            VERIFICAR SEGURIDAD AHORA
                        </button>
                    </div>
                ) : (
                    <WeatherDisplay
                        weather={weather}
                        onReset={() => setWeather(null)}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
