// var consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
//     .then(resposta => resposta.json())
//     .then(r => {
//         if (r.erro) {
//             throw Error('Este CEP não existe!')
//         } else
//             console.log(r)})
//         .catch(erro => console.log(erro))
//         .finally(mensagem => console.log('Processamento concluído'));

// console.log(consultaCep);

// Outra forma de construir um código assíncrono: o async await, que funciona de forma semelhante 
// ao then mas o código fica mais “bonito”.Esse “embelezamento” em códigos é o que chamamos de syntax sugar.

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if (consultaCepConvertida.erro) {
            throw Error('Este CEP não existe!');
        }
        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')
        var bairro = document.getElementById('bairro')

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;


        console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP Inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

// O async/await apesar de ser uma opção mais "legível" ao .then() é importante frisar que não são logicamente 
// equivalentes: o async/await faz o processamento de forma sequencial, Promises com .then() são processadas em 
// paralelo, o que faz com que este método seja mais rápido. O async/await simplifica a escrita e a interpretação
// do código, mas não é tão flexível e só funciona com uma Promise por vez.

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value))