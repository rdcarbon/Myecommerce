import axios, { AxiosError, AxiosResponse } from "axios";
//import { toast } from "react-toastify";
const axiosInstance=axios.create({
baseURL:"http://localhost:5000/api/"
})
axiosInstance.defaults.withCredentials=true;
const responseBody=(response:AxiosResponse)=> response.data;
axiosInstance.interceptors.response.use(
   async response=>response,
    (error:AxiosError)=>
        {
            const {data,status}=error.response as AxiosResponse;
            switch (status){
                case 400:
                    if (data.errors){
                        const modelStateErrors: string[]=[];
                        for (const key in data.errors){
                            if (data.errors[key]){
                             modelStateErrors.push(data.errors[key])   
                            }
                        }
                        throw modelStateErrors.flat();
                    }
                    // toast.error(data.title);
                    break;
                case 401:
                    // toast.error(data.title);
                    break;
                case 500:
                    //toast.error(data.title);
                    // window.location.href = './server-error';
                    
                    break;
                // case 404:
                //     //toast.error(data.title)
                //     window.location.pathname='./not-found';
                //     break;
                
                default:
                    break;
            }
            return Promise.reject(error.response);
    }
)
const requests={
    get:(url:string)=>axiosInstance.get(url).then(responseBody),
    post:(url:string,body:object)=>axiosInstance.post(url,body).then(responseBody),
    put:(url:string,body:object)=> axiosInstance.put(url,body).then(responseBody),
    delete:(url:string)=>axiosInstance.delete(url).then(responseBody),
}
const Catalog={
    list:()=>requests.get('products'),
    details:(id:number)=>requests.get(`products/${id}`)
}

const TestErrors={
    get400Error:()=>requests.get('buggy/bad-request'),
    get401Error:()=>requests.get('buggy/unauthorized'),

    get404Error:()=>requests.get('buggy/not-found'),
    get500Error:()=>requests.get('buggy/server-error'),
    getValidationError:()=>requests.get('buggy/validation-error')
}
const Basket={
    get:()=>requests.get("basket"),
    addItem:(productId:number,quantity=1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number,quantity=1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
    updateItem:(productId:number,quantity=1)=>requests.put(`basket?productId=${productId}&quantity=${quantity}`,{})

}    
const agent={
    Catalog,
    TestErrors,
    Basket
}
export default agent;
