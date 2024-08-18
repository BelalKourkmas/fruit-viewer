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
        <div className="">
            <div className="flex items-center">
                <div className="inline-block border border-gray-500 px-2 py-1 m-1 cursor-pointer">
                    {button}
                </div>
                <div onClick={toggleOpen} className="cursor-pointer">
                    {title}
                </div>
            </div>
            {isOpen && content}
        </div>
    );
};

export { Accordion };
