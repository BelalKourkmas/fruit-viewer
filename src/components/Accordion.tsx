import React, { useState } from "react";

interface AccordionProps {
    title: string;
    content: React.ReactNode;
    button: React.ReactNode;
}

const Accordion = ({ title, content, button }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <tr>
            <td onClick={toggleOpen} className="cursor-pointer">
                {title}
            </td>
            <td className="ml-2 cursor-pointer">{button}</td>
            {isOpen && content}
        </tr>
    );
};

export { Accordion };
