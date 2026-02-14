import { AddLocationView } from "./AddLocationView";
import { LoadingView } from "./LoadingView";
import { SavedSitesListView } from "./SavedSitesListView";
import { WeatherDashboardView } from "./WeatherDashboardView";
import { AppView } from "../types/ui/AppView";

export const renderView = (
    currentView: AppView,
    setCurrentView: React.Dispatch<React.SetStateAction<AppView>>,
) => {

    switch (currentView) {
        case AppView.LOADING:
            return <LoadingView />;
        case AppView.ADD_LOCATION:
            return (
                <AddLocationView
                    onSave={() => setCurrentView(AppView.DASHBOARD)}
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
                // onBack={() =>
                //     setCurrentView(AppView.SAVED_INSTALLATIONS)
                // }
                />
            );
        default:
            <AddLocationView
                onSave={() => setCurrentView(AppView.SAVED_INSTALLATIONS)}
            />;
    }
};
