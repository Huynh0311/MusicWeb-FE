import axios from "../utils/AxiosCustomize";


const getAllPlaylist = () => {
    return axios.get("/playlist/all");
}


const findPlaylistById = (id) => {
    return axios.get(`playlist/findOne/${id}`);
}




export {
   getAllPlaylist,findPlaylistById
}