import { useState } from "react";

interface DropdownProps {
    label: string;
    options: Option[];
}
interface Option {
    label: string;
    onClick: () => void;
}
// Dropdown options must have unique labels
const Dropdown = ({ label, options }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState("None");

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const renderedOptions = options.map((option: Option) => {
        if (currentSelection !== option.label) {
            return (
                <div key={option.label} onClick={() => handleClick(option)}>
                    {option.label}
                </div>
            );
        }
    });

    const handleClick = (option: Option) => {
        setCurrentSelection(option.label);
        option.onClick();
        setIsOpen(false);
    };

    return (
        <div
            onClick={() => toggleOpen()}
            className="inline-block border border-gray-500 px-2 py-1 cursor-pointer"
        >
            {label} {currentSelection}
            {isOpen && renderedOptions}
        </div>
    );
};
export { Dropdown };
