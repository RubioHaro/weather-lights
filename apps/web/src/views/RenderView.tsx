import { AddLocationView } from "./AddLocationView";
import { LoadingView } from "./LoadingView";
import { SavedSitesListView } from "./SavedSitesListView";
import { WeatherDashboardView } from "./WeatherDashboardView";
import { AppView } from "../types/ui/AppView";

export const renderView = (
    currentView: AppView,
    setCurrentView: React.Dispatch<React.SetStateAction<AppView>>,
    selectedLocation?: { lat: number; lon: number; name: string },
    setSelectedLocation?: React.Dispatch<React.SetStateAction<{ lat: number; lon: number; name: string } | undefined>>,
) => {

    switch (currentView) {
        case AppView.LOADING:
            return <LoadingView />;
        case AppView.ADD_LOCATION:
            return (
                <AddLocationView
                    onSave={(location) => {
                        setSelectedLocation?.(location);
                        setCurrentView(AppView.DASHBOARD);
                    }}
                />
            );
        case AppView.SAVED_INSTALLATIONS:
            return (
                <SavedSitesListView 
                // onSelect={() => setCurrentView(AppView.DASHBOARD)}
                />
            );
        case AppView.DASHBOARD:
            return (
                <WeatherDashboardView
                    location={selectedLocation}
                // onBack={() =>
                //     setCurrentView(AppView.SAVED_INSTALLATIONS)
                // }
                />
            );
        default:
            return (
                <AddLocationView
                    onSave={(location) => {
                        setSelectedLocation?.(location);
                        setCurrentView(AppView.SAVED_INSTALLATIONS);
                    }}
                />
            );
    }
};
