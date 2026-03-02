import apiRequest from '../lib/apiRequest'


export const singlePageLoader = async ({request, params}) => {
    const res = await apiRequest("/posts/"+params.id);
    return res.data;
}
export const listPageLoader = async ({request, params}) => {
    const query = request.url.split("?", []);
    const postPromise =  apiRequest("/posts?/"+query);
    return  {
        postResponse: postPromise
    }
    
}