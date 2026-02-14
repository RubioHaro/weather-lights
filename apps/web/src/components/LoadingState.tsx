import type { JSX } from "react";

/**
 * Component to display a loading state with spinner animation.
 * Shown while the weather safety analysis is being performed.
 * 
 * @param {Object} props
 * @returns {JSX.Element} The rendered loading state component.
 */
const LoadingState = (): JSX.Element => {
    return (
        <div className="loading-state">
            <div className="spinner"></div>
            <p>Risk Analysts...</p>
        </div>
    );
};

export default LoadingState;
