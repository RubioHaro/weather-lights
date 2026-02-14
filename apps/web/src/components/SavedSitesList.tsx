import type { Installation } from "../types/installation";

/**
 * Component to display a list of saved installation sites.
 * Shows saved locations with their coordinates and allows checking weather safety for each.
 * 
 * @param {Object} props
 * @param {Installation[]} props.sites - Array of saved installation sites.
 * @param {Function} props.onCheck - Callback function triggered when checking safety for a site.
 * @returns {JSX.Element} The rendered saved sites list component.
 */
const SavedSitesList = ({
    sites,
    onCheck,
}: {
    sites: Installation[];
    onCheck: (lat: number, lon: number) => void;
}) => {
    return (
        <div className="saved-sites-list">
            <h2 className="text-2xl font-bold mb-4">Saved Sites</h2>
            <ul className="space-y-4">
                {sites.map((site) => (
                    <li key={site.id} className="saved-site-item">
                        <div className="site-info">
                            <span className="site-name">{site.name}</span>
                            <span className="site-coords">
                                ({site.lat.toFixed(2)}, {site.lon.toFixed(2)})
                            </span>
                        </div>
                        <button
                            className="btn-primary"
                            onClick={() => onCheck(site.lat, site.lon)}
                        >
                            Check Safety
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedSitesList;
