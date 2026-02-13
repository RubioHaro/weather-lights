import type { JSX } from "react";

/**
 * Component to display an animated loading indicator.
 * Shows a three-dot bouncing animation to indicate loading state.
 * 
 * @param {Object} props
 * @param {string} [props.color] - Tailwind background color class for the dots.
 * @param {string} [props.className] - Additional classes for the container.
 * @returns {JSX.Element} The rendered loader component.
 */
export const Loader = ({
    color = "bg-white",
    className = "",
}: {
    color?: string;
    className?: string;
}): JSX.Element => {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex flex-row gap-2 justify-center items-center ${className}`}
        >
            <div className={`w-4 h-4 rounded-full animate-bounce [animation-delay:-0.3s] ${color}`}></div>
            <div className={`w-4 h-4 rounded-full animate-bounce [animation-delay:-0.15s] ${color}`}></div>
            <div className={`w-4 h-4 rounded-full animate-bounce ${color}`}></div>
            <span className="sr-only">Loading App, please wait...</span>
        </div>
    );
};
