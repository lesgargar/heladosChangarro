//cuenta cuantos duplicados hay en el array
export const countDuplicatesItemArray = (value, array)=>{
    let count = 0;
    array.forEach(arrayValue => {
        if (arrayValue == value){
            count++;
        }
    });
    return count;
}


//elimina los duplicados
export const removeArrayDuplicates = array =>{
    return Array.from(new Set(array))
}

//para quitar elementos (del carrito que sean el mismo product)
export const removeItemArray = (array, item) => {
    const index = array.indexOf(item);

    if(index > -1){
        array.splice(index, 1)
    }
    return array
};