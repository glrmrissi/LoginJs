function logout() {
    firebase.auth().signOut().then(() => {
        window.location = "../../index.html"
    }).catch(() => {
        alert("Erro no logout")
    })
}