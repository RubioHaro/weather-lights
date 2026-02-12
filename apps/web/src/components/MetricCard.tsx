export const MetricCard = ({
    label,
    value,
    unit,
}: {
    label: string;
    value: string | number;
    unit?: string;
}) => (
    <div className="bg-white/10 border border-white/20 p-4 rounded-xl flex flex-col backdrop-blur-sm">
        <span className="text-xs uppercase opacity-60 font-semibold tracking-wider">
            {label}
        </span>
        <span className="text-xl font-bold mt-1">
            {value}{" "}
            <span className="text-sm font-normal opacity-80">{unit}</span>
        </span>
    </div>
);
