import type { JSX } from "react";

interface ErrorStateProps {
    error: string;
    onRetry: () => void;
}

/**
 * Component to display an error state with retry action.
 * Shown when the weather safety API request fails.
 * 
 * @param {Object} props
 * @param {string} props.error - The error message to display.
 * @param {Function} props.onRetry - Callback function triggered when the retry button is clicked.
 * @returns {JSX.Element} The rendered error state component.
 */
const ErrorState = ({ error, onRetry }: ErrorStateProps): JSX.Element => {
    return (
        <div className="error-state">
            <p>{error}</p>
            <button onClick={onRetry}>RETRY</button>
        </div>
    );
};

export default ErrorState;
