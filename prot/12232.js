function sumNestedArray(arr){
    return arr.flat().reduce((sum,item)=>sum+item,0);
}

console.log(sumNestedArray([1,2,[4,5]]));