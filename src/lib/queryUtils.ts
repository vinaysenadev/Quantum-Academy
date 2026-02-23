import { Prisma } from "@prisma/client";

export const getPageNumber = (page?: string) => {
    return page ? parseInt(page) : 1;
};

export type QueryParams = {
    [key: string]: string | undefined;
};

export const buildQuery = <T extends Record<string, any>>(
    queryParams: QueryParams,
    mapping: Record<string, (value: string) => any>
) => {
    const query: any = {};
    for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
            if (mapping[key]) {
                Object.assign(query, mapping[key](value));
            } else if (key === "search") {
                // Default search behavior if not overridden in mapping
            }
        }
    }
    return query;
};
