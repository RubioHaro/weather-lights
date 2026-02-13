import type { JSX } from "react";

interface SemaphoreProps {
    className?: string;
    imgClassName?: string;
    alt?: string;
    src?: string;
}

/**
 * Component to display semaphore illustration.
 * 
 * @param {Object} props
 * @param {string} [props.className] - Optional Tailwind CSS classes for container.
 * @param {string} [props.imgClassName] - Optional classes to control the image.
 * @param {string} [props.alt] - Alternative text for the semaphore image.
 * @param {string} [props.src] - Source URL for the semaphore image (defaults to "/semaphore.png").
 * @returns {JSX.Element} The rendered semaphore component.
 */
export const Semaphore = ({
    alt = "Palmetto Semaphore",
    src = "/semaphore.png",
}: SemaphoreProps): JSX.Element => {
    return (
        <img
            src={src}
            alt={alt}
            draggable={false}
            className="select-none pointer-events-none w-full
                        md:hidden
                        z-0 absolute left-0 -bottom-5 opacity-80"
        />
        
    );
};
