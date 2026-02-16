import "./App.css";
import { useEffect, useState, type JSX } from "react";
import { Semaphore } from "./components/ui/Semaphore";
import { renderView } from "./views/RenderView";
import { AppView } from "./types/ui/AppView";
import { StorageService } from "./services/storage.service";

/**
 * Main application component for Weather Safety Check.
 * Manages the complete user flow from initial hero section through weather safety analysis results.
 * @returns {JSX.Element} The complete application layout with header, content, and semaphore indicator.
 */
const App = (): JSX.Element => {
    const [currentView, setCurrentView] = useState<AppView>(AppView.LOADING);
    const [selectedLocation, setSelectedLocation] = useState<
        { lat: number; lon: number; name: string } | undefined
    >(undefined);

    useEffect(() => {
        const bootSequence = setTimeout(() => {
            const hasData = StorageService.hasInstallations();
            if (hasData) {
                setCurrentView(AppView.SAVED_INSTALLATIONS);
            } else {
                setCurrentView(AppView.ADD_LOCATION);
            }
        }, 2500); // 2.5 seconds

        return () => clearTimeout(bootSequence);
    }, []);

    const showSemaphore =
        currentView === AppView.LOADING;
    return (
        <div className="relative min-h-screen w-full bg-palmetto-dark overflow-hidden">
            {showSemaphore && (
                <div className="animate-in fade-in duration-1000">
                    <Semaphore />
                </div>
            )}

            <div key={currentView} className="relative z-10 view-transition">
                {renderView(currentView, setCurrentView, selectedLocation, setSelectedLocation)}
            </div>
        </div>
    );
};

export default App;
