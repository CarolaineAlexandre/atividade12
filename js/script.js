let id = 0 

        let listaCEP = [
            { id: id++, cep:'13330-090', logradouro:'Rua Pedro de Toledo', bairro: 'Centro', cidade: 'Indaiatuba', uf: 'SP'},
            { id: id++, cep:'04961-990', logradouro:' Rua Hum', bairro: 'Capela do Socorro', cidade: 'São Paulo', uf: 'SP'},
        ];

        document.getElementById("cep").style.color = "blue";

        const somaId = listaCEP.reduce((acumulador, item) => {
            return acumulador + item.id;
        }, 0);

        function addCEP(cep) {
            listaCEP.push(cep);
            renderizarCEP();
        }

        function removerTarefa(id) {
            listaCEP = listaCEP.filter(cep => cep.id !== id);
            renderizarCEP();
        }

        function renderizarCEP() {
            let listaUl = document.getElementById('listaUl');
            listaUl.innerHTML = '';
            listaCEP.map(cep => {
                let li = document.createElement('li');
                li.classList.add('my-3');
                li.innerHTML = cep.cep + " - "+ cep.logradouro + " - " + cep.bairro + " - " + cep.cidade + " / " + cep.uf;
                li.innerHTML += ` <button type="button" 
                                class="btn btn-sm btn-danger" 
                                onclick="removerTarefa(${cep.id})">
                                Remover
                                </button>`;
                listaUl.appendChild(li);
            });
        }

        renderizarCEP();

        const btnAdicionar = document.getElementById('btnAdicionar');
        btnAdicionar.addEventListener('click', function () {
            const buscar = document.getElementById('cep').value
            if(buscar.length < 8 || buscar.length > 8){
                alert("Digite um CEP válido (somente números)")
            }
            else{
                fetch('https://viacep.com.br/ws/'+ buscar + '/json/')
                .then(response => response.json())
                .then(data=> {
                if(data.erro == true){
                    alert('CEP não encontrado')
                }
                else{
                addCEP(
                {
                    id: id++,
                    cep: data.cep,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    uf: data.uf
                });
                }
               
             })

            }
            

        });