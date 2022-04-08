

window.addEventListener("load", ()=>{
    // apakah sudah ada token di localstorage
    const token = localStorage.getItem("_wa_bot")
    if(!token){
        fetch("/api/request_token", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : "fadliselaz",
                password : "@Fadli_selaz131313"
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                localStorage.setItem("_wa_bot", data.token)
            }
        })
        .catch(err => console.error(err))
    }

})

const handleSubmit = (event)=>{
    event.preventDefault()

    const token = localStorage.getItem("_wa_bot")

    fetch("/api/send_message", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({
            to : event.target.to.value,
            text : event.target.text.value
        })
    })
    .then(res => {
        if(res.status == 200){
            alert("Message berhasil di kirim")
            window.location.reload()
        }
    })
    .catch(err =>{
        console.error(err)
        alert("Terjadi kesalahan")
    })


}