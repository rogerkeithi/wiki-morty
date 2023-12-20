let pageIndex = 1;
var favoritos = [];

const buscaInfosLista = async () => {
    const stringWithoutFirst2Characters = localStorage.getItem('lista').slice(1);
    const response = await fetch('https://rickandmortyapi.com/api/character/'+stringWithoutFirst2Characters);
    listaJson = await response.json();
    for (var i = 0; i < listaJson.length; i++) {
        const idChar = listaJson[i].id;
        localStorage.setItem(i,idChar);
        localStorage.setItem('lenght',i);
        localStorage.setItem('nome'+idChar,listaJson[i].name);
        localStorage.setItem('img'+idChar,listaJson[i].image);
        localStorage.setItem('gender'+idChar,listaJson[i].gender);
        localStorage.setItem('origin'+idChar,listaJson[i].origin.name);
        localStorage.setItem('species'+idChar,listaJson[i].species);
        localStorage.setItem('status'+idChar,listaJson[i].status);
    }
}

function buscaInfosLocal(){
    console.log('chamou')
    const modalContent = document.querySelector(".modal-content-1");
    modalContent.innerHTML = '';
    for (var i = 0; i <= localStorage.getItem('lenght'); i++) {
        console.log('pinto')
        const idChar = localStorage.getItem(i);

        if(idChar != 0){
            const div = document.createElement("div");
            div.className = 'item-list';
            div.setAttribute('onclick',"openModalCharacter("+idChar+")")
            div.style.cursor = 'pointer';

            const img = document.createElement("img");
            img.setAttribute('src', localStorage.getItem('img'+idChar));

            const status = localStorage.getItem('status'+idChar);

            const span = document.createElement("span");
            span.textContent = localStorage.getItem('nome'+idChar);

            if(status === 'Dead'){   
                img.style.filter = 'grayscale(100%)';
                span.style.color = '#F00'
                span.style.fontWeight = 'bold';
            }

            div.appendChild(img);
            div.appendChild(span);
            modalContent.appendChild(div);
        }
    }
}

const openModalCharacter = async (id) => {

    const modal = document.getElementById("modal");

    const modalContentList = document.querySelector('.modal-content-lista');
    modalContentList.style.display = 'none'
    const modalContentChar = document.querySelector('.modal-content-character');
    modalContentChar.style.display = 'block';  

    const modalContent = document.querySelector(".modal-content-2");
    modalContent.innerHTML = '';

    const img = document.createElement("img");
    img.setAttribute('src', localStorage.getItem('img'+id));

    const h1Name = document.querySelector(".h1-name-char");
    h1Name.textContent = localStorage.getItem('nome'+id);

    modalContent.appendChild(img);
    img.style.border = '5px solid #333';

    const status = localStorage.getItem('status'+id);
    if(status === 'Dead'){  
        img.style.filter = 'grayscale(100%)';
        h1Name.style.color = '#F00'
    }
    else{
        h1Name.style.color = '#fff'
    }
    const ulChar = document.createElement("ul");
    ulChar.className = 'char-list';

    const liChar1 = document.createElement("li");
    liChar1.innerHTML = '<span style="color: #97ce4c">Gender: </span>' + localStorage.getItem('gender'+id);
    ulChar.appendChild(liChar1);

    const liChar2 = document.createElement("li");
    liChar2.innerHTML = '<span style="color: #97ce4c">Origin: </span>' + localStorage.getItem('origin'+id);
    ulChar.appendChild(liChar2);

    const liChar3 = document.createElement("li");
    liChar3.innerHTML = '<span style="color: #97ce4c">Species: </span>' + localStorage.getItem('species'+id);
    ulChar.appendChild(liChar3);
    
    const liChar4 = document.createElement("li");
    liChar4.innerHTML = '<span style="color: #97ce4c">Status: </span>' + localStorage.getItem('status'+id);
    ulChar.appendChild(liChar4);
    modalContent.appendChild(ulChar);

    document.querySelector('.btn-excluir').setAttribute('onclick','excludeCharacterList('+id+')')
    document.querySelector('.btn-editar').setAttribute('onclick','editCharacter('+id+')')
}

const excludeCharacterList = async (id) => {
    for (var i = 0; i <= localStorage.getItem('lenght'); i++) {
        const indexId = localStorage.getItem(i);
        if(indexId == id){
            localStorage.setItem(i,0);
        }
    }
    localStorage.removeItem('nome'+id);
    localStorage.removeItem('img'+id);
    localStorage.removeItem('gender'+id);
    localStorage.removeItem('origin'+id);
    localStorage.removeItem('species'+id);
    localStorage.removeItem('status'+id);
    await buscaInfosLocal();
    const modalContentChar = document.querySelector('.modal-content-character');
    modalContentChar.style.display = 'none'
    const modalContentLista = document.querySelector('.modal-content-lista');
    modalContentLista.style.display = 'block'; 
    
}

function editCharacter(id){
    const modalContentChar = document.querySelector('.modal-content-character');
    modalContentChar.style.display = 'none'
    const modalContentEdit = document.querySelector('.modal-content-edit');
    modalContentEdit.style.display = 'block';  

    const inputName = document.querySelector('#inputName');
    inputName.value = localStorage.getItem('nome'+id);
    
    const inputGender = document.querySelector('#inputGender');
    inputGender.value = localStorage.getItem('gender'+id);
    
    const inputOrigin = document.querySelector('#inputOrigin');
    inputOrigin.value = localStorage.getItem('origin'+id);
    
    const inputSpecies = document.querySelector('#inputSpecies');
    inputSpecies.value = localStorage.getItem('species'+id);
    
    const inputStatus = document.querySelector('#inputStatus');
    inputStatus.value = localStorage.getItem('status'+id);
    
    const formEdit = document.querySelector('.form-edit');

    formEdit.setAttribute('onsubmit','saveChanges('+id+')');
}

const saveChanges = async(id) =>{
    const inputName = document.querySelector('#inputName').value;
    localStorage.setItem('nome'+id, inputName);
    
    const inputGender = document.querySelector('#inputGender').value;
    localStorage.setItem('gender'+id, inputGender);
    
    const inputOrigin = document.querySelector('#inputOrigin').value;
    localStorage.setItem('origin'+id, inputOrigin);
    
    const inputSpecies = document.querySelector('#inputSpecies').value;
    localStorage.setItem('species'+id, inputSpecies);
    
    const inputStatus = document.querySelector('#inputStatus').value;
    localStorage.setItem('status'+id, inputStatus);
    
    await buscaInfosLocal();

    const modalContentEdit = document.querySelector('.modal-content-edit');
    modalContentEdit.style.display = 'none'; 

    openModalCharacter(id);
}

window.addEventListener("load", async (event) => {
    await buscaInfosLocal();
});

const getListCharacters = async (i) => {
    const response = await fetch('https://rickandmortyapi.com/api/character/?page='+i);
    const responseJson = await response.json();

    const ul = document.createElement("ul")
    ul.className = 'lista';
    
    const listaPersonagens = document.querySelector(".lista-personagens");

    for (var i = 0; i < 19; i++) {
        const li = document.createElement("li")
        li.innerText = responseJson.results[i].name;
        li.setAttribute('onclick', "showBlock("+responseJson.results[i].id+")");
        li.style.cursor = 'pointer';
        ul.appendChild(li);
    }

    listaPersonagens.appendChild(ul);
}

const showBlock = async (id) => {
    const response = await fetch('https://rickandmortyapi.com/api/character/'+id);
    const myJson = await response.json();

    const h2 = document.getElementsByTagName("h2");
    h2.item(0).textContent = myJson.name;
    h2.item(0).style.display = 'block';

    var opacity = 0;
    const img = document.getElementsByClassName("image-persongem");
    img.item(0).setAttribute('src', myJson.image);
    img.item(0).style.opacity = opacity;
    img.item(0).style.display = 'block';
    var intervalID = setInterval(function() {
          
        if (opacity < 1) {
            opacity = opacity + 0.1
            img.item(0).style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 100);
    var tamanho = 200;
    var right = 100;
    var top = 70;
    img.item(0).addEventListener(
        "mouseenter",
        (event) => {
            var intervalID = setInterval(function() {
                if (tamanho < 250) {
                    tamanho = tamanho + 2
                    right = right - 1.1
                    top = top - 1.1
                    event.target.style.top = top+"px";
                    event.target.style.right = right+"px";
                    event.target.style.width = tamanho+"px";
                    event.target.style.height = tamanho+"px";
                } else {
                    clearInterval(intervalID);
                }
            }, 3);
        },
        false
      );
      img.item(0).addEventListener(
        "mouseleave",
        (event) => {
            var intervalID = setInterval(function() {
                if (tamanho > 200) {
                    tamanho = tamanho - 2
                    right = right + 1.1
                    top = top + 1.1
                    event.target.style.top = top+"px";
                    event.target.style.right = right+"px";
                    event.target.style.width = tamanho+"px";
                    event.target.style.height = tamanho+"px";
                } else {
                    clearInterval(intervalID);
                }
            }, 5);
        },
        false
    );

    const btn = document.getElementsByClassName("btn-favoritar");
    btn.item(0).setAttribute("onclick", "favoritar("+ myJson.id +")");
    btn.item(0).style.display = 'inline';

    const btn2 = document.getElementsByClassName("btn-salvar");
    btn2.item(0).setAttribute("onclick", "salvarFavoritos()");
    btn2.item(0).style.display = 'inline';
}

const proximaPagina = async () => {
    if(pageIndex == 1){
        const voltarPaginaButtonDisabled = document.getElementsByClassName("voltar-pagina-disabled");
        voltarPaginaButtonDisabled.item(0).style.display = 'none';
    }
    const voltarPaginaButton = document.getElementsByClassName("voltar-pagina");
    voltarPaginaButton.item(0).style.display = 'inline';
    const list = document.getElementsByClassName("lista");
    list.item(0).remove();
    pageIndex++;
    getListCharacters(pageIndex);
}
const voltarPagina = async () => {
    if(pageIndex > 2){
        const list = document.getElementsByClassName("lista");
        list.item(0).remove();
        pageIndex--;
        getListCharacters(pageIndex);
    }
    else{
        const list = document.getElementsByClassName("lista");
        list.item(0).remove();
        pageIndex--;
        getListCharacters(pageIndex);
        const voltarPaginaButton = document.getElementsByClassName("voltar-pagina");
        voltarPaginaButton.item(0).style.display = 'none';
        const voltarPaginaButtonDisabled = document.getElementsByClassName("voltar-pagina-disabled");
        voltarPaginaButtonDisabled.item(0).style.display = 'inline';
    }
}

function favoritar(id){
    if(favoritos.length == 0){
        favoritos.push(0);
    }
    if(!favoritos.includes(id)){
        favoritos.push(id);
        const divListaPreSave = document.getElementsByClassName("lista-pre-save");
        divListaPreSave.item(0).style.display = 'block';
        const imgPersonagem = document.getElementsByClassName("image-persongem");
        const imgUrl = imgPersonagem.item(0).getAttribute('src');
        const imgOnList = document.createElement("img");
        imgOnList.setAttribute('src', imgUrl);
        imgOnList.id = 'imgOnList'+id;
        imgOnList.setAttribute('onclick', 'removeCharFromList('+id+')');
        imgOnList.className = 'img-on-list';
        divListaPreSave.item(0).appendChild(imgOnList);
        if(favoritos.length == 13){
            document.querySelector('.btn-favoritar').setAttribute('disabled', '');
        }
    }else{
        console.log('O personagem já está na lista');
    }
}

function removeCharFromList(id){
    if(favoritos.length <= 13){
        document.querySelector('.btn-favoritar').disabled = false;
    }
    const index = favoritos.indexOf(id);
    favoritos.splice(index, 1);
    document.getElementById('imgOnList'+id).remove();

    if(favoritos.length == 1){
        const divListaPreSave = document.querySelector(".lista-pre-save");
        divListaPreSave.style.display = 'none';
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const salvarFavoritos = async () => {
    localStorage.setItem('lista',favoritos)
    await buscaInfosLista();
    alert('List saved successfully');
    await buscaInfosLocal();
}

const abrirModal = async() =>{
    const response = await fetch('https://rickandmortyapi.com/api/character/'+favoritos);

    const modal = document.getElementById("modal");
    const modalContentLista = document.querySelector('.modal-content-lista');
    const modalContentCharacter = document.querySelector('.modal-content-character');
    const modalContentEdit = document.querySelector('.modal-content-edit');
    modal.style.display = 'inline';  
    modalContentLista.style.display = 'block';  
    modalContentCharacter.style.display = 'none';  
    modalContentEdit.style.display = 'none';
}

function voltarModalLista(){
    const modalChar = document.querySelector('.modal-content-character');
    modalChar.style.display = 'none';
    const modalLista = document.querySelector('.modal-content-lista');
    modalLista.style.display = 'block';
}

function voltarModalCharacter(){
    const modalEdit = document.querySelector('.modal-content-edit');
    modalEdit.style.display = 'none';
    const modalChar = document.querySelector('.modal-content-character');
    modalChar.style.display = 'block';
}

function fecharModal(modalName){
    const modal = document.getElementById("modal");

    modal.style.display = 'none';
}