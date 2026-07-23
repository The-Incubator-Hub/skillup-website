import { useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { animateAccordion } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function FaqAccordion({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(0);
    const baseId = useId();

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <FaqItem
                    key={`${baseId}-${index}`}
                    id={`${baseId}-${index}`}
                    item={item}
                    open={openIndex === index}
                    highlighted={index === 0}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
    );
}

function FaqItem({ id, item, open, highlighted, onToggle }) {
    const panelRef = useRef(null);
    const first = useRef(true);

    const handleToggle = () => {
        onToggle();
        requestAnimationFrame(() => {
            if (panelRef.current) {
                animateAccordion(panelRef.current, !open);
            }
        });
    };

    // The panel starts at its natural height for the initially-open item,
    // collapsed for the rest; GSAP drives every change after that.
    const initialStyle = first.current ? { height: open ? 'auto' : 0, opacity: open ? 1 : 0 } : undefined;

    return (
        <div
            className={cn(
                'rounded-lg border px-6',
                highlighted ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50',
            )}
        >
            <h3>
                <button
                    type="button"
                    id={`${id}-trigger`}
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    onClick={handleToggle}
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skillup-blue/40"
                >
                    {item.question}
                    <ChevronDown
                        className={cn('h-5 w-5 flex-shrink-0 text-slate-500 transition-transform duration-300', open && 'rotate-180')}
                        aria-hidden="true"
                    />
                </button>
            </h3>
            <div
                ref={panelRef}
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-trigger`}
                className="overflow-hidden"
                style={initialStyle}
            >
                <p className="pb-5 pt-1 text-sm leading-6 text-gray-600">{item.answer}</p>
            </div>
        </div>
    );
}
