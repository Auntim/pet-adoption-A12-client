import axios from "axios";


export const imageUpload = async imageData => {

    const form = new FormData();
    form.append('image', imageData);

    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbApiKey}`, form);

    return data.data.display_url;

}