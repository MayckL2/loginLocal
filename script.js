// realiza login e guarda no localStorage
function logar() {
    // PEGA NOME E SENHA DIGITADOS NO LOGIN
    let nome = document.querySelector('#name').value
    let senha = document.querySelector('#senha').value

    // VERIFICA SE O ADM ESTA SENDO LOGADO
    let adm = JSON.parse(localStorage.getItem('adm'))
    if (adm.nome == nome && adm.senha == senha) {
        localStorage.setItem('logado', adm.nome)
        window.location.replace('pages/adm.html')
    } else {
        // VERIFICA EM TODOS OS USUARIOS SE NOME E SENHA CONSIDEM DENTRO DO ARRAY DE USUARIOS
        let ids = parseInt(localStorage.getItem('id'))
        for (let i = 0; i <= ids; i++) {
            let dado = JSON.parse(localStorage.getItem('user' + i))

            if (dado.nome === nome && dado.senha === senha) {
                localStorage.setItem('logado', dado.nome)
                window.location.replace('pages/home.html')
            }
        }
        // VERIFICA SE LOGIN FOI EFETUADO DEPOIS DO LOOP
        // SE NAO, EXIBE ALERTA DE ERRO
        if (localStorage.getItem('logado') == '') {
            alert('Nome ou senha invalidos!')
        }
    }
}

// RENDERIZA FORMULARIO DE CADASTRO
function formCadastro() {
    document.querySelector('#formLogin').style.display = 'none'
    document.querySelector('#formCadastro').style.display = 'flex'
}

// RENDERIZA FORMULARIO DE LOGIN
function formLogin() {
    document.querySelector('#formLogin').style.display = 'flex'
    document.querySelector('#formCadastro').style.display = 'none'
}

// REALIZA CADASTRO NO LOCALSTORAGE
function cadastrar() {
    let name = document.querySelector('#nameCad').value
    let idade = document.querySelector('#idade').value
    let senha = document.querySelector('#senhaCad').value
    let confSenha = document.querySelector('#confSenha').value

    // VERIFICA SE SENHAS SAO IGUAIS
    if (senha == confSenha) {

        // VERIFICA SE LOCALSTORAGE(ID) JA EXISTE
        if (localStorage.getItem('id')) {
            localStorage.setItem('id', (parseInt(localStorage.getItem('id')) + 1))
        } else {
            localStorage.setItem('id', 0)
        }

        // CRIA OBJETO COM DADOS CADASTRADOS
        const users = {
            id: localStorage.getItem('id'),
            nome: name,
            idade: idade,
            senha: confSenha
        }

        // SALTA OBJETO COM DADOS NO LOCALSTORAGE
        localStorage.setItem('user' + localStorage.getItem('id'), JSON.stringify(users))

        alert('cadastrado com sucesso!')

        // LIMPA FORMULARIO DE CADASTRO
        document.querySelector('#formularioCad').reset()

        // CHAMA FORMULARIO DE LOGIN APOS O CADATRAMENTO
        formLogin()
    } else {
        alert('senhas diferentes')
    }
}

// DESLOGA USUARIO E MANDA DE VOLTA PARA O LOGIN
function deslogar() {
    // LIMPA O NOME DELE DO LOCALSTORAGE
    localStorage.setItem('logado', '')
    // MANDAD DE VOLTA PARA O LOGIN
    window.location.replace('../index.html')
}

// VERIFICAR SE USUARIO ESTA LOGADO
function verificaLogin() {
    // SE O USUARIO NAO ESTIVER LOGADO, ELE É MANDADO DE VOLTA PARA O LOGIN
    if (localStorage.getItem('logado') == '') {
        window.location.replace('../index.html')
    }
}

// CADASTRA ADM SEMPRE QUE PAGINA FOR CARREGADA PARA NAO PRECISAR DE CADASTRO
localStorage.setItem('adm', JSON.stringify({ nome: 'mayck', senha: '123' }))

// EXIBE TODOS OS USUARIOS NA TELA DO ADM
function exibeUsers() {
    let users = document.querySelector('#usuarios')
    // LIMPA USUARIOS EXIBIDOS PARA NAO DUPLICAR DADOS
    users.innerHTML = ''
    
    let ids = parseInt(localStorage.getItem('id'))
    for (let i = 0; i <= ids; i++) {
        let dado = JSON.parse(localStorage.getItem('user' + i))

        // SE O LOCALSTORAGE ESTIVER VAZIO NADA ACONTECERA
        if (dado != null) {

            users.innerHTML += `
            <div class='grid grid-cols-4 gap-0'>
            <p class='flex justify-center'>${dado.id}°</p>
            <p class='flex justify-center'>Nome: ${dado.nome}</p>
            <p class='flex justify-center'>Idade: ${dado.idade}</p>
            <button class='bg-red-500 hover:bg-red-700 px-2
            text-white' onclick='apagaUser(${dado.id})'>Apagar</button>
            <div/>
            `
        }
    }
    // SE NENHUM USUARIO FOR ENCONTRADO
    if(users.innerHTML == ''){
        users.innerHTML = 'NENHUM USUARIO CADASTRADO...'
    }

}

// APAGAR USUARIO
function apagaUser(e) {
    if(confirm('Certeza que deseja apagar este usuario?') == true){
        localStorage.removeItem('user' + e)
        
        // RECARREGA USUARIOS A SEREM MOSTRADOS
        exibeUsers()
    }
}

// APAGA TODOS OS DADOS DO LOCALSTORAGE
function apagarTudo(){
    if(confirm('Certeza que deseja apagar todos os dados?') == true){
        localStorage.clear()

        // RECARREGA USUARIOS A SEREM MOSTRADOS
        exibeUsers()
    }
}