const uploadImage = (image, accessToken)=>{
    const formData = new FormData();
    formData.append("image", image);

    try {
        return fetch("/v1/api/images", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData
        })
            .then((res) => res.json())
            .then(result => {
                return result.imagePath
            })
    }
    catch (e) {
        console.log(e.message);
        throw e
    }
}

module.exports = {uploadImage}
