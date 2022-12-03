function consultaCep(){
    var $cep = document.getElementById("cep").value.replace(/\D/g,'');
    var url = "https://viacep.com.br/ws/" + $cep + '/json/';
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = function (e){
        document.getElementById('return').innerHTML = "API OFFLINE OU CEP INVÁLIDO"
    }

    request.onload = ()=> {
        var response = JSON.parse(request.responseText);
        if(response.erro === true){
            document.getElementById('return').innerHTML = 'CEP NÃO ENCONTRADO';
        } else{
            document.getElementById('return').innerHTML = 'CEP: ' + response.cep + '<br>' +
                                                        'Lougradouro: ' + response.lougadouro + '<br>' +                                              'Bairro: ' + response.bairro + '<br>' +
                                                        'Localidade: ' + response.localidade + '/' + response.uf;
        }      
             
    }

request.send();
}

let listaCep = [
    { id: 1, tarefa: '',feita: false },
    { id: 2, tarefa: '', feita: false },
    { id: 3, tarefa: '', feita: false }
];

const somaId = listaCep.reduce((acumulador, item) => {
    return acumulador + item.id;
}, 0);

function addCep(cep) {
    listaCep.push(cep);
    renderizarCep();
}

function removerCep(id) {
    listaCep = listaCep.filter(cep => cep.id !== id);
    renderizarCep();
}



renderizarTarefas();

const btnAdicionar = document.getElementById('btnAdicionar');
btnAdicionar.addEventListener('click', function () {
    const cep = document.getElementById('cep').value;
    if(cep ==""){
        alert("Por favor digite o cep que será adicionado!!")
    }
    else{
        addTarefa(
        {
            id: listaCep.length + 1,
            cep: cep,
            feita: false
        });
    }
    
});

function renderizarCep() {
    let listaUl = document.getElementById('listaUl');
    listaUl.innerHTML = '';
    listaTarefas.map(tarefa => {
        let li = document.createElement('li');
        li.classList.add('my-3');
        li.innerHTML = tarefa.cep + "";
        li.innerHTML += ` <button type="button" 
                        class="btn btn-sm btn-danger" 
                        onclick="removerCep(${cep.id})">
                        Remover
                        </button>`;
        listaUl.appendChild(li);
    });
}

renderizarCep();