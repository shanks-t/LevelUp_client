export const getProfile = () => {
    return fetch("http://localhost:8000/profile", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
    

