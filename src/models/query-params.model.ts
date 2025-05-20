export class QueryParams {
    constructor(
        public Search?: string,
        public PageNumber: number = 1,
        public PageSize: number = 4,
        public OrderByProperty?: string,
        public Desc?: boolean
    ) { }
}