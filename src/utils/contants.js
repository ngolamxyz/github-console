export const ITEMS_PER_PAGE = 12;

// Due to github api limitation
// https://docs.github.com/en/graphql/overview/resource-limitations
export const MAX_PAGES = Math.floor(1000/ITEMS_PER_PAGE)
