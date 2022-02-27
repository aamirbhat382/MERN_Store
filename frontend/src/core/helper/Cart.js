export const addToCart  = (item)=>{
    console.log(item)
    if(typeof Window !== undefined){
        if(localStorage.getItem('cart') === null ){
           let _cart = localStorage.setItem('cart',JSON.stringify(item))
        }

    }
}