

function criarToDo() { 
    let formulario = document.getElementById('to-do-form')

    let toDoList = verificarBD()

    //console.log(formulario.value)

    if(formulario.value == "") {
        alert('Você não pode deixar o To Do vazio!')
    } else { 
        toDoList.push(formulario.value)

        //console.log(toDoList)

        formulario.value = ""

        salvarBD(toDoList)
    }
}

function verificarBD() { 

    let listaBD = JSON.parse(localStorage.getItem('toDoList'))
    //console.log(listaBD)

    if(listaBD == null) {
        listaBD = []
    } else { 
        mostrarToDos()
    } 

    return listaBD
}

function salvarBD(toDoList) {

    //console.log(toDoList)

    localStorage.setItem('toDoList', JSON.stringify(toDoList))

    mostrarToDos()
}

function mostrarToDos() { 
    let listaToDo = document.getElementById('lista-to-dos')

    let lista = JSON.parse(localStorage.getItem('toDoList'))

    if(lista.length > 0) { 
        document.getElementById('aparecer-to-do').innerText = ""
    } else {
        document.getElementById('aparecer-to-do').innerText = "Seu to do irá aparecer aqui quando você cria-lo!"
    }


    listaToDo.innerText = ""



    for (var i = 0; i < lista.length; i++) { 

        let divToDo = document.createElement('div')
        divToDo.innerHTML = "<span>" + lista[i] + "<span>"
        divToDo.className = "m-2"
        //console.log(lista[i])

        let btnGreen = document.createElement('button')
        btnGreen.innerText = "Feito!"
        btnGreen.className = "btn btn-success ml-5 mr-5"
        btnGreen.setAttribute('onclick', 'encerrarToDo(this)')

        divToDo.appendChild(btnGreen)

        listaToDo.appendChild(divToDo)
    }
}

function encerrarToDo(btn) { 
    console.log(btn.parentNode)

    btn.parentNode.remove()

    let lista = JSON.parse(localStorage.getItem('toDoList'))

    //console.log(lista)



    for (var i = 0; i < lista.length; i++) { 
        if(btn.parentNode.firstChild.innerText === lista[i]) { 
            delete lista[i] //lista devia sair daqui com uns nulls
        }
    }
    
    //console.log(lista)

    tratarLista(lista)
}

function tratarLista(lista) { 
    

    //console.log(lista)

    let novaLista = []
    
    for (var i = 0; i < lista.length; i++) { 
        if(lista[i] != null) { 
            novaLista.push(lista[i])
        }
    }

    console.log(novaLista)

    salvarBD(novaLista)
}

function footerPos() { 
    let alturaAparelho = window.screen.availHeight

    let alturaConteudo = 'desconhecida'
    let footer = document.getElementById('foot')
    if(alturaAparelho > alturaConteudo) { 
        footer.className = "bg-warning text-black mt-5 fixed-bottom"

    } else { 
        footer.className = "bg-warning text-black mt-5"
    }
}

