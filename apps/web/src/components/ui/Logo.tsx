interface LogoProps {
    className?: string;
    imgClassName?: string;
    tagline?: string;
    showTagline?: boolean;
    alt?: string;
    src?: string;
    invert?: boolean;
}

/**
 * Component to display Palmetto brand identity with logo and tagline.
 * 
 * @param {Object} props
 * @param {string} [props.className] - Optional Tailwind CSS classes for the container.
 * @param {string} [props.imgClassName] - Optional classes to control the image dimensions and behavior.
 * @param {string} [props.tagline] - Secondary brand text to display below the logo.
 * @param {boolean} [props.showTagline] - Flag to toggle the visibility of the tagline.
 * @param {string} [props.alt] - Alternative text for the logo image.
 * @param {string} [props.src] - Source URL for the logo image (defaults to "/logo.png").
 * @param {boolean} [props.invert] - Whether to invert the logo colors.
 * @returns {JSX.Element} The rendered logo component.
 */
export const Logo = ({
    className = "",
    imgClassName = "w-[20rem]",
    tagline = "WEATHER FOR INSTALL",
    showTagline = true,
    alt = "Palmetto Logo",
    src = "/logo.png",
    invert = true,
}: LogoProps) => {
    return (
        <div
            className={`flex flex-col items-center gap-2 group transition-all ${className}`}
        >
            <img
                src={src}
                alt={alt}
                draggable={false}
                className={`
                    ${imgClassName} 
                    ${invert ? "invert brightness-0" : ""}
                    select-none pointer-events-none 
                    transition-transform duration-300 ease-out
                    group-hover:scale-105 
                `}
            />

            {showTagline && (
                <p className="text-[15px] tracking-[0.4em] font-medium opacity-90 select-none">
                    {tagline}
                </p>
            )}
        </div>
    );
};
