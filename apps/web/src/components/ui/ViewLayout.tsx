import { Logo } from "./Logo";

/**
 * Layout component for application views.
 * Ensures consistent padding, animations, and branding across the app flow.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered within the view.
 * @param {string} [props.title] - Optional title for the view header.
 * @param {string} [props.subtitle] - Optional subtitle (tagline) for the header.
 * @param {boolean} [props.showLogo] - Whether to display the Palmetto Logo.
 * @param {boolean} [props.invertLogo] - Whether to invert the logo colors.
 * @param {string} [props.className] - Additional Tailwind classes for the main container.
 * @returns {JSX.Element} The rendered view layout component.
 */
export const ViewLayout = ({
    children,
    title,
    subtitle,
    showLogo = true,
    invertLogo = true,
    className = "",
}: {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    invertLogo?: boolean;
    className?: string;
}) => {
    return (
        <div
            className={`
      flex flex-col min-h-[80vh] w-full max-w-md mx-auto 
      animate-in fade-in slide-in-from-bottom-4 duration-500 
      ${className}
    `}
        >
            {showLogo && (
                <header className="flex flex-col items-center py-auto pt-20">
                    <Logo imgClassName="w-48" showTagline={false} invert={invertLogo} />
                </header>
            )}

            <main className="flex-1 flex flex-col gap-6 px-4">
                {(title || subtitle) && (
                    <div className="text-center mb-4 selection:bg-primary/80 selection:text-white">
                        {title && (
                            <h2 className="text-2xl font-bold tracking-tight">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-sm opacity-60 mt-1 uppercase tracking-widest">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {children}
            </main>
        </div>
    );
};
