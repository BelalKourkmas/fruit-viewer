import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropdown } from "react-icons/io";

interface AccordionWithButtonProps {
    title: string;
    content: React.ReactNode;
    button: React.ReactNode;
}

const AccordionWithButton = ({
    title,
    content,
    button,
}: AccordionWithButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hover:bg-cyan-950">
            <div className="flex items-center">
                <div className="inline-block border border-gray-500 px-2 py-1 m-1 cursor-pointer hover:bg-green-700">
                    {button}
                </div>
                <div
                    onClick={toggleOpen}
                    className="flex cursor-pointer items-center"
                >
                    <div className="mr-1">{title}</div>
                    {isOpen ? <IoIosArrowDropdown /> : <IoIosArrowDropleft />}
                </div>
            </div>
            {isOpen && content}
        </div>
    );
};

export { AccordionWithButton };
