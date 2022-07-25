export const imageUpload =async (image) => {
        const fd = new FormData();
        fd.append('file',image)
        fd.append("upload_preset","qj04mxee")
        fd.append("api_key", "372336693865194");

        let data = await fetch("https://api.cloudinary.com/v1_1/dibuevfps/image/upload",{
            method:'POST',
            body:fd
        }).then((r)=>r.json())
    return data.url;
}

export const imagesUpload =async (images) => {
    let arrImg=[];
    for (const val of images) {
        const fd = new FormData();
        fd.append('file',val)
        fd.append("upload_preset","qj04mxee")
        fd.append("api_key", "372336693865194");

        let data = await fetch("https://api.cloudinary.com/v1_1/dibuevfps/image/upload",{
            method:'POST',
            body:fd
        }).then((r)=>r.json())
        arrImg.push(data.url)
    }
    return arrImg;
}