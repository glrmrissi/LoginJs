function showLoading() {
    const div = document.createElement('div');
    div.classList.add('loading');
    const label = document.createElement("label")
    const img = document.createElement("img")
    img.src = "/assets/img/icons8-carregamento-de-pontos-unscreen.gif"
    document.body.appendChild(div)
    label.appendChild(img)
    div.appendChild(label)

}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading")
    if(loadings.length) {
        loadings[0].remove()
    }
}