import { Dropdown } from "./Dropdown";
import { CollapseableHeader } from "./CollapseableHeader";

const FruitViewer = () => {
    const groupByOptions = [
        {
            label: "None",
            onClick: () => {
                console.log("group by none");
            },
        },
        {
            label: "Family",
            onClick: () => {
                console.log("group by family");
            },
        },
        {
            label: "Order",
            onClick: () => {
                console.log("group by order");
            },
        },
        {
            label: "Genus",
            onClick: () => {
                console.log("group by genus");
            },
        },
    ];
    return (
        <div>
            <Dropdown label={"Group By:"} options={groupByOptions} />
            <CollapseableHeader />
        </div>
    );
};

export { FruitViewer };
