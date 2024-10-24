let input1="{{{"
let input2="{{{{}}}}}}}}}}}}"


let validator=(input)=>{
    let count=0;
    // let stack=[];
     for( char of input){
         if(char=='{'){
              count++;
         }
         else{
        count--;
         }
         console.log("count "+ count)
     }
     if(count%2==0){
        return Math.abs(count/2);
     }
     else return -1;
}
console.log(validator(input1))
console.log(validator(input2))
