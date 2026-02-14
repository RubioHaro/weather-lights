import { Loader } from "../components/ui/Loader";
import { ViewLayout } from "../components/ui/ViewLayout";

/**
 * View to display loading state during system initialization.
 * Shows a loader animation while the application is preparing.
 * 
 * @param {Object} props
 * @returns {JSX.Element} The rendered loading view.
 */
export const LoadingView: React.FC<{}> = ({}) => {
    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-primary">
            <ViewLayout
                title="Weather Lights"
                subtitle="Initializing System"
                className="relative z-10"
            >
                <main className="flex-1 flex flex-col items-center justify-center w-full text-center">
                    <Loader />
                    <p className="mt-4 text-[10px] tracking-[0.4em] uppercase animate-pulse opacity-40 font-black text-white">
                        Loading App, Please Wait
                    </p>
                </main>
            </ViewLayout>
        </div>
    );
};
