// function debounce(func, delay) {
//     let timer;
//     return function(...args) {
//       const context = this;
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         func.apply( context,args);
//       }, delay);
//     };
//   }
  
//   const handleSearch = (event) => {
//     console.log('Search query:', event.target.value);
//   };
  
//   const debouncedSearch = debounce(handleSearch, 300);
  
//   document.getElementById('searchInput').addEventListener('input', debouncedSearch);
  
//   function throttle(func, limit) {
//     let inThrottle;
//     return function(...args) {
//       const context = this;
//       if (!inThrottle) {
//         func.apply(context, args);
//         inThrottle = true;
//         setTimeout(() => (inThrottle = false), limit);
//       }
//     };
//   }
  
//   // Example usage: scroll event
//   const handleScroll = () => {
//     console.log('Scroll event:', window.scrollY);
//   };
  
//   const throttledScroll = throttle(handleScroll, 2000);
  
//   window.addEventListener('scroll', throttledScroll);
  
let firstdiv=document.getElementsByClassName("first")
console.log(firstdiv[0])
// console.log(firstdiv.nextSibling)
// alert( document.body.previousSibling )
let age=2;
for( ele of firstdiv){
//  console.log( ele.nodeName);
//  console.log(ele.innerHTML)
console.log(ele.attributes)
 ele.innerHTML=`<strong>hey how you doing ${age}</strong>`
 console.log(ele.innerText)
 Object.assign(ele.style, {
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '25%',
  height: '50px',
  width: '500px',
  display: 'flex',          
  justifyContent: 'center',
  alignItems: 'center',
});
}
let styl=getComputedStyle(ele)
console.log(styl)

let div=document.createElement('div')
let text=document.createTextNode('Here i am')
let h1=document.createAttribute("id")
div.appendChild(text)
div.setAttribute("id","name");
console.log(div)



document.getElementById("list").addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    console.log("List item clicked: " + event.target.textContent);
  }
});


let some={
  name:"John",
  caller:function(func,value){
    

  }
}
