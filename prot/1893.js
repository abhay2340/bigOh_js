const calculator=(yourFunction,...values)=>{
        return yourFunction(...values);
}


const temperatureConveter=(tempInCelcius)=>{
  return  ((9/5)*tempInCelcius+32);
}

const calculateArea=(length,breadth)=>{
    return length*breadth;
}

console.log(calculator(calculateArea,2,3))

