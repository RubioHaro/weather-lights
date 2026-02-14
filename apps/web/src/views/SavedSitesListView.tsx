import { Semaphore } from "../components/ui/Semaphore";
import { ViewLayout } from "../components/ui/ViewLayout";

/**
 * View to display a list of saved installation sites.
 * Allows users to view and manage their previously saved locations.
 * 
 * @param {Object} props
 * @returns {JSX.Element} The rendered saved sites list view.
 */
export const SavedSitesListView: React.FC<{}> = ({}) => {
    return (
        <>
            <div className="relative flex flex-col min-h-screen overflow-hidden w-full">
                <ViewLayout
                    invertLogo={false}
                    title="Safty is our Priority"
                    subtitle="Step 2: How does the weather look? Check the forecast for your installation location to ensure safe working conditions. "
                >
                    <main className="relative w-full my-auto z-10">
                        {/* <div className="p-2">{renderContent()}</div> */}
                    </main>
                </ViewLayout>
                <Semaphore />
            </div>

            <Semaphore />
        </>
    );
};
