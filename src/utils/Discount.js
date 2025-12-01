 export const  priceWithDiscount = (price,discount=1)=>{
    console.log("price",price);
    console.log ("discount",discount);
   
    
    const discountAmount = Math.ceil(Number(price)*Number(discount) /100)
    const actualPrice = Number(price) - Number(discountAmount)
    return actualPrice
}
