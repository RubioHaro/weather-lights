import React, { useEffect, useState, useRef, type JSX } from "react";
import { useLoadScript, type Libraries } from "@react-google-maps/api";
import { ViewLayout } from "../components/ui/ViewLayout";

const libraries: Libraries = ["places"];

/**
 * View to handle installation location setup.
 * Allows users to either use GPS for automatic detection or type an address manually.
 * Uses Google Maps Places Autocomplete for address suggestions.
 *
 * @param {Object} props
 * @param {Function} props.onSave - Callback triggered when a location is successfully determined.
 * @returns {JSX.Element} The rendered loading view.
 */
export const AddLocationView: React.FC<{
    onSave: (location: { lat: number; lon: number; name: string }) => void;
}> = ({ onSave }: { onSave: Function }): JSX.Element => {
    const [manualAddress, setManualAddress] = useState("");
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
        null,
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    useEffect(() => {
        if (!isLoaded || !inputRef.current) return;

        // Initialize Google Places Autocomplete
        autocompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            {
                types: ["address"],
                componentRestrictions: { country: ["us", "mx"] }, // US and Mexico
            },
        );

        autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace();

            if (place?.geometry?.location) {
                const lat = place.geometry.location.lat();
                const lon = place.geometry.location.lng();
                const name =
                    place.name ||
                    place.formatted_address?.split(",")[0] ||
                    "Selected Location";

                onSave({ lat, lon, name });
            }
        });

        return () => {
            if (autocompleteRef.current) {
                google.maps.event.clearInstanceListeners(
                    autocompleteRef.current,
                );
            }
        };
    }, [isLoaded, onSave]);

    const handleAutoLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) =>
                onSave({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                    name: "Current Location",
                }),
            (err) => console.error("Location blocked", err),
        );
    };

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Google Maps...</div>;
    }

    return (
        <div className="relative flex flex-col min-h-screen w-full overflow-hidden text-black">
            <ViewLayout
                title="Weather Lights"
                subtitle="Step 1: Ready for a safe installation? We’re here to help you work safely. Please enter a location or allow GPS access to verify the weather conditions for your upcoming projects."
                className="relative z-10"
                invertLogo={false}
            >
                <main className="flex-1 flex flex-col items-center justify-center w-full gap-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-full flex flex-col gap-3">
                        <h2 className="text-[11px] font-black text-black/70 tracking-[0.2em] uppercase text-center">
                            Let's Start with Your Location
                        </h2>
                        <button
                            onClick={handleAutoLocation}
                            className="w-full py-4 bg-primary text-white font-black rounded-xl transition-all active:scale-[0.98] shadow-lg uppercase tracking-widest text-sm"
                        >
                            Allow Location Access
                        </button>
                        <label className="text-[10px] text-black/40 tracking-wider">
                            A location request will appear in your browser for
                            first-time users.
                        </label>
                    </div>

                    <div className="relative w-full flex items-center justify-center">
                        <div className="absolute w-full h-px bg-black/10"></div>
                        <span className="relative px-4 text-[10px] font-bold text-black tracking-[0.3em]">
                            OR
                        </span>
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <h2 className="text-[11px] font-black text-black/70 tracking-[0.2em] uppercase text-center">
                            Enter Location Manually
                        </h2>

                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={manualAddress}
                                onChange={(e) =>
                                    setManualAddress(e.target.value)
                                }
                                placeholder="Type the installation address (e.g. 123 Solar St)"
                                className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 text-black focus:outline-none focus:border-primary transition-all shadow-sm"
                            />
                        </div>

                        <label className="text-[10px] text-black/40 leading-relaxed italic text-center">
                            Available for locations across the US and Mexico.
                        </label>
                    </div>
                </main>
            </ViewLayout>
        </div>
    );
};
