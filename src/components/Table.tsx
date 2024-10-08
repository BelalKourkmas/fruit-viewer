import { Fragment } from "react";

interface ColumnConfig<T> {
    label: string;
    render: (data: T) => React.ReactNode;
    header?: () => React.ReactNode;
    keyFn?: (data: T) => string;
}

interface TableProps<T> {
    data: T[];
    config: ColumnConfig<T>[];
    keyFn: (data: T) => string | number;
}

const Table = <T,>({ data, config, keyFn }: TableProps<T>) => {
    const renderedHeaders = config.map((column, index) => {
        if (column.header) {
            // using a fragment to keep table consistency
            return <Fragment key={index}>{column.header()}</Fragment>;
        }
        return (
            <td key={column.label} className="p-3">
                {column.label}
            </td>
        );
    });

    const renderedRows = data.map((rowData) => {
        const renderedCells = config.map((column, index) => {
            return (
                <td className="p-1 pr-4" key={index}>
                    {column.render(rowData)}
                </td>
            );
        });
        return (
            <tr className="border-b" key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        );
    });

    return (
        <div>
            <table className="table-auto border-spacing-2">
                <thead>
                    <tr>{renderedHeaders}</tr>
                </thead>
                <tbody>{renderedRows}</tbody>
            </table>
        </div>
    );
};

export { Table };
