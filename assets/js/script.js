'use strict';

const clearForm = () => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const fillForm = (address) => {
    document.getElementById('endereco').value = address.logradouro;
    document.getElementById('bairro').value = address.bairro;
    document.getElementById('cidade').value = address.localidade;
    document.getElementById('estado').value = address.uf;
}

const isNumber = (number) => /^[0-9]+$/.test(number);

const cepValid = (cep) => cep.length == 8 && isNumber(cep);

const searchCep = async() => {
    clearForm();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValid(cep)) {
        const data = await fetch(url);
        const address = await data.json();
        if(address.hasOwnProperty('erro')) {
            document.getElementById('cep').value = 'CEP não encontrado!';
        } else {
            fillForm(address);
        }
    }else {
        document.getElementById('cep').value = 'CEP incorreto!';
    }
}

document.getElementById('cep').addEventListener('focusout', searchCep);
