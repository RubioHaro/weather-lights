import type { JSX } from "react";
import type { Installation } from "../types/installation";
import { useEffect, useState } from "react";
import { Semaphore } from "../components/ui/Semaphore";
import { ViewLayout } from "../components/ui/ViewLayout";
import { Loader } from "../components/ui/Loader";
import { useWeatherSafety } from "../hooks/useWeatherSafety";
import { StorageService } from "../services/storage.service";

/**
 * View to display weather dashboard with installation status and safety conditions.
 *
 * @param {Object} props
 * @param {Object} [props.location] - Optional location data passed from AddLocationView
 * @returns {JSX.Element} The rendered weather dashboard view.
 */
export const WeatherDashboardView: React.FC<{
    location?: { lat: number; lon: number; name: string };
}> = ({ location }): JSX.Element => {
    const { loading, weather, error, fetchSafety } = useWeatherSafety();
    const [installation, setInstallation] = useState<Installation | null>(null);

    useEffect(() => {
        // If location is passed as prop, use it directly
        if (location) {
            setInstallation({
                id: crypto.randomUUID(),
                name: location.name,
                lat: location.lat,
                lon: location.lon,
            });
            fetchSafety(location.lat, location.lon);
        } else {
            // Otherwise, load the first installation from storage
            const installations = StorageService.getInstallations();
            if (installations.length > 0) {
                const firstInstallation = installations[0];
                setInstallation(firstInstallation);
                fetchSafety(firstInstallation.lat, firstInstallation.lon);
            }
        }
    }, [location]);

    // Map API status to UI status
    const getStatusLabel = (): "GO" | "WA" | "BAD" => {
        if (!weather) return "GO";
        switch (weather.status) {
            case "GREEN":
                return "GO";
            case "YELLOW":
                return "WA";
            case "RED":
                return "BAD";
            default:
                return "GO";
        }
    };

    const getStatusColor = () => {
        const status = getStatusLabel();
        switch (status) {
            case "GO":
                return "text-green-700";
            case "WA":
                return "text-yellow-600";
            case "BAD":
                return "text-red-700";
        }
    };

    const formatPrecipitation = (precip: number): string => {
        return precip > 0 ? `${precip}mm` : "None";
    };

    return (
        <>
            <div className="relative flex flex-col min-h-screen overflow-hidden w-full">
                <ViewLayout
                    invertLogo={false}
                    title="Safety is our Priority"
                    subtitle={`Step 2: How does the weather look? Check the forecast for ${installation?.name || "your installation location"} to ensure safe working conditions.`}
                >
                    <main className="relative w-full my-auto z-10">
                        <div className="flex flex-col gap-6 p-4 max-w-md mx-auto bg-[#F2F4F0] min-h-screen font-sans text-slate-800">
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader color="bg-secondary" className="scale-150" />
                                    <p className="text-lg font-semibold text-secondary">Loading weather data...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                                    <p className="font-semibold">Error</p>
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            {!loading && !error && weather && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#E9EDE5] p-4 rounded-[2.5rem] flex flex-col gap-3 shadow-sm border border-white/20 text-left">
                                        <h3 className="text-secondary font-black leading-tight text-lg uppercase selection:bg-primary/80 selection:text-white">
                                            Installation
                                            <br />
                                            Status
                                        </h3>
                                        <div className="relative rounded-3xl overflow-hidden aspect-square pointer-events-none select-none">
                                            <img
                                                src="/PalmettoApp.png"
                                                alt="Solar Installation"
                                                className="object-cover h-full w-full"
                                            />
                                            <div className="absolute top-2 left-2 bg-white rounded-full p-2 px-3 shadow-md">
                                                <span className={`${getStatusColor()} font-black text-xs`}>
                                                    {getStatusLabel()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conditions Card */}
                                    <div className="bg-[#E9EDE5] p-4 rounded-[2.5rem] flex flex-col justify-between shadow-sm border border-white/20 selection:bg-[#F2F4F0]/80 text-[#6B7A5F]">
                                        <div>
                                            <h3 className="font-black text-lg uppercase leading-tight text-right">
                                                {weather.status === "GREEN" ? "Safe" : weather.status === "YELLOW" ? "Caution" : "Unsafe"}
                                                <br />
                                                Conditions
                                            </h3>
                                            <ul className="mt-4 space-y-1 font-medium text-sm text-left">
                                                <li>Wind: {weather.details.windSpeed}mph</li>
                                                <li>Rain: {formatPrecipitation(weather.details.precipitation)}</li>
                                                <li>Temp: {Math.round(weather.details.temp)}°F</li>
                                            </ul>
                                        </div>
                                        <a className="text-[10px] text-right underline cursor-pointer">
                                            Report issue
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* HOURLY FORECAST - Mock data for now */}
                            {!loading && weather && (
                                <>
                                    <section>
                                        <h2 className="text-center font-bold text-xl mb-4 tracking-tighter">
                                            HOURLY
                                        </h2>
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            <HourlyCard 
                                                time="14:00" 
                                                status={getStatusLabel()} 
                                                temp={weather.details.temp}
                                                windSpeed={weather.details.windSpeed}
                                                precipitation={weather.details.precipitation}
                                            />
                                            <HourlyCard 
                                                time="16:00" 
                                                status={getStatusLabel()}
                                                temp={weather.details.temp}
                                                windSpeed={weather.details.windSpeed}
                                                precipitation={weather.details.precipitation}
                                            />
                                            <HourlyCard
                                                time="19:00"
                                                status="WA"
                                                reason="High Wind"
                                                temp={weather.details.temp}
                                                windSpeed={15}
                                                precipitation={0}
                                            />
                                            <HourlyCard
                                                time="20:00"
                                                status="BAD"
                                                reason="Heavy Storm"
                                                temp={weather.details.temp - 5}
                                                windSpeed={35}
                                                precipitation={25}
                                            />
                                        </div>
                                    </section>

                                    {/* OTHER DAY FOOTER */}
                                    <section className="flex items-center justify-between mt-4">
                                        <h2 className="font-bold text-lg">Other Day</h2>
                                        <div className="flex gap-2">
                                            <div className="bg-[#E9EDE5] px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
                                                <span className="text-palmetto-green font-bold text-xs">
                                                    GO
                                                </span>
                                                <span className="text-xs font-medium text-[#6B7A5F]">
                                                    Tomorrow
                                                </span>
                                            </div>
                                            <div className="bg-[#E9EDE5] px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
                                                <span className="text-palmetto-red font-bold text-xs">
                                                    BAD
                                                </span>
                                                <span className="text-xs font-medium text-[#6B7A5F]">
                                                    Weekend
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    </main>
                </ViewLayout>
                <Semaphore />
            </div>

            <Semaphore />
        </>
    );
};

const HourlyCard = ({
    time,
    status,
    reason,
    temp,
    windSpeed,
    precipitation,
}: {
    time: string;
    status: "GO" | "WA" | "BAD";
    reason?: string;
    temp: number;
    windSpeed: number;
    precipitation: number;
}) => {
    const statusStyles = {
        GO: {
            text: "text-green-600",
            border: "border-green-600",
            bg: "bg-green-600/10",
            icon: "",
            msg: "Good conditions",
        },
        WA: {
            text: "text-yellow-500",
            border: "border-yellow-500",
            bg: "bg-yellow-500/10",
            icon: "⚠️ Warning: ",
            msg: reason || "Caution advised",
        },
        BAD: {
            text: "text-red-300",
            border: "border-red-600",
            bg: "bg-red-600",
            icon: "🚫 Alert: ",
            msg: reason || "Unsafe conditions",
        },
    };

    const style = statusStyles[status];

    const formatPrecipitation = (precip: number): string => {
        return precip > 0 ? `${precip}mm` : "None";
    };

    return (
        <div className="bg-[#E9EDE5] p-4 rounded-[2rem] min-w-[130px] flex flex-col gap-2 border border-white/20 shadow-sm transition-transform active:scale-95">
            <div className="flex justify-between items-center">
                <div
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${style.border} ${style.text} ${style.bg}`}
                >
                    {status}
                </div>
                <span className={`font-black text-sm ${style.text}`}>
                    {time}
                </span>
            </div>

            <div className="text-[11px] text-[#6B7A5F] space-y-0.5 mt-1">
                <p>Wind: {windSpeed}mph</p>
                <p>Rain: {formatPrecipitation(precipitation)}</p>
                <p>Temp: {Math.round(temp)}°F</p>
            </div>

            <p
                className={`text-[9px] font-bold mt-2 leading-tight ${style.text}`}
            >
                {style.icon}
                {style.msg}
            </p>
        </div>
    );
};
