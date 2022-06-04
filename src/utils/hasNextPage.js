import { ITEMS_PER_PAGE } from "./contants";

export default function hasNextPage(action, specificState) {
    let hasNextPage = action.payload.pageInfo.hasNextPage;
    const total = specificState.items.length + action.payload.items.length;
    if (action.payload.items.length === ITEMS_PER_PAGE && total < specificState.totalCount) {
        hasNextPage = true;
    }
    return hasNextPage;
}
