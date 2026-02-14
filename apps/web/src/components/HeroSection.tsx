import type { JSX } from "react";

interface HeroSectionProps {
    onCheckSafety: () => void;
}

/**
 * Component to display the hero section on initial app load.
 * Features a headline and call-to-action button for checking installation safety.
 * 
 * @param {Object} props
 * @param {Function} props.onCheckSafety - Callback function triggered when the safety check button is clicked.
 * @returns {JSX.Element} The rendered hero section component.
 */
const HeroSection = ({ onCheckSafety }: HeroSectionProps): JSX.Element => {
    return (
        <div className="hero-section">
            <p className="hero-text md:text-2xl lg:text-3xl">
                Ready for a safe installation?
            </p>
            <button
                className="btn-primary md:bg-green-600 md:hover:bg-green-700"
                onClick={onCheckSafety}
            >
                CHECK SAFETY NOW
            </button>
        </div>
    );
};

export default HeroSection;
