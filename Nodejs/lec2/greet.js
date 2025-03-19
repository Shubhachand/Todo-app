function greet(){
    console.log("hello i am studying node js and this time i will complete it");
}

function sub(a,b){
  const res =  a>b ? a-b : b-a;
    return res;
}
// greet();
module.exports ={
    greet,
    sub 
}