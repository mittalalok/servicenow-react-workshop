export function navigateList(listData){
    return { 
        type: 'fetchData', 
        listType: listData.listType, 
        params: listData.params
    };
}