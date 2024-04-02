import { Icon } from "@iconify/react";

export const SIDENAV_ITEMS = [
    {
        title: "Master Inventory",
        path: "/",
        icon: <Icon icon="lucide:home" color="darkblue" width="24" height="24"/>,
    },
    {
        title: "Warehouses",
        path: "/warehousecs",
        icon: <Icon icon="lucide:rows-3" color="darkblue" width="24" height="24"/>,
    },
    {
        title: "Shipments",
        path: "/shipments",
        icon: <Icon icon="lucide:truck" color="darkblue" width="24" height="24"/>,
    },
    {
        title: "Staff",
        path: "/staff",
        icon: <Icon icon="lucide:users" color="darkblue" width="24" height="24"/>,
    }

];