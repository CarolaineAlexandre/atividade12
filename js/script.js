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