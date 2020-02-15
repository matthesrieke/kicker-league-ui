export interface PageableResponse<T> {

    total: number;
    page: number;
    size: number;
    data: T[];

}