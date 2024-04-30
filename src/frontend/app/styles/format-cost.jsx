export const formatCost = (cost) => {
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}