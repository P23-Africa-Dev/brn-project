
type Props = {
    options: string[];
    selected: string[];
    onChange: (value: string[]) => void;
    max: number;
    tabIndex?: number;
};

export default function TagSelector({ options, selected, onChange, max }: Props) {
    const toggle = (tag: string) => {
        if (selected.includes(tag)) {
            onChange(selected.filter((t) => t !== tag));
        } else if (selected.length < max) {
            onChange([...selected, tag]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((tag) => {
                const isSelected = selected.includes(tag);
                const limitReached = selected.length >= max && !isSelected;

                return (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => toggle(tag)}
                        disabled={limitReached}
                        className={`rounded-full border px-3 py-1 text-sm transition-all duration-150 ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-800'} ${limitReached ? 'cursor-not-allowed opacity-50 blur-[1px]' : ''}`}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    );
}
