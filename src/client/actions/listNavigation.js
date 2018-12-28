export function navigateList(listData){
  return {
    type: 'fetchData',
    listType: listData.listType,
    params: listData.params
  };
}

export function goToSelection( selectionId, candidateId ) {
  return {
    type: 'go_to_selection',
    data: { candidateId: candidateId, selectionId:  selectionId }
  };
}
