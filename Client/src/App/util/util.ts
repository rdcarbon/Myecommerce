export function getCookie(key:string)
{
    const b= document.cookie.match("(^|;)\\s*"+ key+ "\\s*=\\s*([^;]+)")
    return b?b.pop():"";
}
export const currencyformat=(amount:number):string=>{
    return "$"+(amount/100).toFixed(2)
    
}