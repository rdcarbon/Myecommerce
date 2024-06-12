export interface MetaData{
    currentPage:number;
    totalPages:number;
    pageSize: number;
    totalCount: number;
}
export class PaginatedResponse<T>{
    items:T;
    metaData: MetaData;
    constructor(items:T,metaData:MetaData){
        this.items=items;
        this.metaData=metaData;
        //const {currentPage,totalPages}=metaData
       // this.metaData.currentPage=currentPage<totalPages?currentPage:1;
    }
}