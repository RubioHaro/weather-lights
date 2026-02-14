import type { JSX } from "react";

interface EmptyStateProps {
    onAdd: () => void;
}

/**
 * Component to display an empty state when no sites are saved.
 * Prompts users to add their first installation site.
 * 
 * @param {Object} props
 * @param {Function} props.onAdd - Callback function triggered when the add site button is clicked.
 * @returns {JSX.Element} The rendered empty state component.
 */
const EmptyState = ({ onAdd }: EmptyStateProps): JSX.Element => {
    return (
        <div className="empty-state">
            <h2>No saved sites</h2>
            <p>
                You haven't added any sites yet. Start by adding a site to check
                its weather safety.
            </p>
            <button className="btn-primary" onClick={onAdd}>
                Add Site
            </button>
        </div>
    );
};

export default EmptyState;
