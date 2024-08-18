import { useState } from "react";
import { Table } from "./Table";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

// Extend the ColumnConfig interface to include the sortValue function
interface SortableColumnConfig<T> {
    label: string;
    render: (data: T) => React.ReactNode;
    header?: () => React.ReactNode;
    sortValue?: (data: T) => string | number;
}

interface SortableTableProps<T> {
    data: T[];
    config: SortableColumnConfig<T>[];
    keyFn: (data: T) => string | number;
}

const SortableTable = <T,>({ config, data, keyFn }: SortableTableProps<T>) => {
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    const handleClick = (label: string) => {
        if (sortBy === label) {
            if (sortOrder === null) {
                setSortOrder("asc");
                setSortBy(label);
            } else if (sortOrder === "asc") {
                setSortOrder("desc");
            } else {
                setSortOrder(null);
                setSortBy(null);
            }
        } else {
            setSortOrder("asc");
            setSortBy(label);
        }
    };

    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        } else {
            return {
                ...column,
                header: () => (
                    <th
                        className="cursor-pointer hover:bg-gray-800 rounded-lg"
                        onClick={() => handleClick(column.label)}
                    >
                        <div className="flex items-center">
                            {getIcons(column.label, sortBy, sortOrder)}
                            {column.label}
                        </div>
                    </th>
                ),
            };
        }
    });

    let sortedData = data;
    if (sortOrder && sortBy) {
        const { sortValue } = config.find((column) => column.label === sortBy)!;
        sortedData = [...data].sort((a, b) => {
            const valueA = sortValue!(a);
            const valueB = sortValue!(b);

            const reverseOrder = sortOrder === "asc" ? 1 : -1;

            if (typeof valueA === "string" && typeof valueB === "string") {
                return valueA.localeCompare(valueB) * reverseOrder;
            } else {
                return ((valueA as number) - (valueB as number)) * reverseOrder;
            }
        });
    }

    const getIcons = (
        label: string,
        sortBy: string | null,
        sortOrder: "asc" | "desc" | null
    ) => {
        if (label !== sortBy) {
            return (
                <div>
                    <IoIosArrowUp />
                    <IoIosArrowDown />
                </div>
            );
        }
        if (sortOrder === "asc" && sortBy === label) {
            return (
                <div>
                    <IoIosArrowUp />
                </div>
            );
        } else if (sortOrder === "desc" && sortBy === label) {
            return (
                <div>
                    <IoIosArrowDown />
                </div>
            );
        }
    };

    return <Table config={updatedConfig} data={sortedData} keyFn={keyFn} />;
};

export { SortableTable };
