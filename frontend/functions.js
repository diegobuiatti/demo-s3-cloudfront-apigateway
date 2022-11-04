// Atualize essa variável com o ENDPOINT da sua API
var ENDPOINT_URL = "https://l40g9s97t9.execute-api.us-west-2.amazonaws.com/test/";
/**
 * Busca as novas informações do backend
 */
function criar() {
    var data = {
      nome: $('#nome').val(),
      idade: $('#idade').val(),
      jogo: $('#jogo').val(),
      pontuacao: $('#pontuacao').val(),
    }
    var settings = {
        url: ENDPOINT_URL,
        type: "POST",
        dataType: "json",
        crossDomain: true,
        data: JSON.stringify(data)
    };
    // faz a requisição via AJAX
    $.ajax(settings).done(function(response) {
        // http 200 ok
        if (response.success) {
            // resposta ok
            var tbody = $("#dynamodb-data").children('tbody');
            // percorre o resultado
            tbody.append(`<tr>\
                <td>${response.data.id}</td>
                <td>${data.nome}</td>
                <td>${data.idade}</td>
                <td>${data.jogo}</td>
                <td class='last'>${data.pontuacao}</td>
            </tr>`);
            $('#nome').val('')
            $('#idade').val('')
            $('#jogo').val('')
            $('#pontuacao').val('')
        } else {
            // API retornou erro
            console.error(response.message);
            alert("Houve uma falha ao obter os dados...")
        }
    }).fail(function(err) {
        // http diferente de 200
        console.error(err)
        alert("Falha ao comunicar com o backend...")
    });
}

function atualizar() {
    var settings = {
        url: ENDPOINT_URL,
        method: "GET",
        dataType: "json"
    };
    // faz a requisição via AJAX
    $.ajax(settings).done(function(response) {
        // http 200 ok
        if (response.success) {
            // resposta ok
            var tbody = $("#dynamodb-data").children('tbody');
            // limpa o conteúdo do TBODY
            tbody.empty();
            // percorre o resultado
            response.data?.result?.forEach(item => {
                // adiciona novas linhas ao TBODY
                tbody.append(`<tr>\
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.idade}</td>
                    <td>${item.jogo}</td>
                    <td class='last'>${item.pontuacao}</td>
                </tr>`);
            });
        } else {
            // API retornou erro
            console.error(response.message);
            alert("Houve uma falha ao obter os dados...")
        }
    }).fail(function(err) {
        // http diferente de 200
        console.error(err)
        alert("Falha ao comunicar com o backend...")
    });
}

$(document).ready(function() {
    /**
     * Função que atualiza os dados ao clicar em atualizar
     */
    $("#atualizar").click(function() {
        atualizar();
    });

    $("#form-create").submit(function(ev) {
        ev.preventDefault();
        criar();
    });

    // chama a função de atualizar ao inicializar o código
    atualizar();
    setTimeout(atualizar, 500)
});
