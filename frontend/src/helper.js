export const getCart = () => {
    return new Promise((resolve, reject) => {
        const cart = window.localStorage.getItem('cart');
        resolve(cart);
    })
}
// @Marked as bug ?  
export const storeCart = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
}