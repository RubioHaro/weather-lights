const statusConfig = {
    GREEN: {
        bg: "bg-palmetto-green",
        label: "GO",
        shadow: "shadow-green-500/50",
    },
    YELLOW: {
        bg: "bg-palmetto-yellow",
        label: "WAIT",
        shadow: "shadow-yellow-500/50",
    },
    RED: { bg: "bg-palmetto-red", label: "NO GO", shadow: "shadow-red-500/50" },
};

export const StatusBadge = ({
    status,
}: {
    status: "GREEN" | "YELLOW" | "RED";
}) => {
    const config = statusConfig[status];
    return (
        <div
            className={`
      w-32 h-32 rounded-full flex items-center justify-center 
      text-white font-bold text-2xl shadow-xl animate-pulse
      ${config.bg} ${config.shadow}
    `}
        >
            {config.label}
        </div>
    );
};
