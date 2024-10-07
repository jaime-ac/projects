//funcionalidades da página inicial

//o botão de 'Cadastrar' direciona a página de cadastro do usuário
function AcessoCadastrar(){

    window.location.href = 'telaCadastro.html'

}

//o botão de 'Login' direciona a página de login de usuário
function AcessoLogar(){

    window.location.href = 'telaLogin.html'

}

//Mostrar textos na página inicial sobre a empresa
let botaoServicos = document.getElementById('botaoServicos')
let botaoAgendamento = document.getElementById('botaoAgendamento')
let botaoSobre = document.getElementById('botaoSobre')

let sobre = document.getElementById('sobre')
let servicos = document.getElementById('servicos')
let agendamento = document.getElementById('agendamento')

function Sobre(){

    sobre.style.display = 'block'
    botaoSobre.style.backgroundColor = 'darkgreen'

    agendamento.style.display = 'none'
    agendamento.style.backgroundColor = 'transparent'

    servicos.style.display = 'none'
    servicos.style.backgroundColor = 'transparent'

}

function Servicos(){

    servicos.style.display = 'block'
    botaoServicos.style.backgroundColor = 'darkgreen'

    agendamento.style.display = 'none'
    agendamento.style.backgroundColor = 'transparent'

    sobre.style.display = 'none'
    sobre.style.backgroundColor = 'transparent'

}

function Agendamento(){

    agendamento.style.display = 'block'
    botaoAgendamento.style.backgroundColor = 'darkgreen'

    sobre.style.display = 'none'
    sobre.style.backgroundColor = 'transparent'
    
    servicos.style.display = 'none'
    servicos.style.backgroundColor = 'transparent'

}

//PARTE DE CADASTRO DO USUÁRIO
//Dados da Parte de Identificação
let nomePessoa = document.getElementById("nomeUsuario")
let generoPessoa = document.getElementById("generoUsuario")
let cpfPessoa = document.getElementById("cpfUsuario")
let nascimentoPessoa = document.getElementById("nascimentoUsuario")

//Dados da Parte de Contato e Endereço
let emailPessoa = document.getElementById("emailUsuario")
let telefonePessoa = document.getElementById("telefoneUsuario")
let bairroPessoa = document.getElementById("bairroUsuario")
let senhaPessoa = document.getElementById("senhaUsuario")

let validaCampos = true
let validaNascimento = true
let validaCpf = true
let validaEmail = false

let vetorNascimento
let vetorEmail

let listaUsuarios = []

let usuario = {

    nome: '',
    genero: '',
    cpf: '',
    nascimento: '',
    email: '',
    telefone: '',
    bairro: '',
    senha: '',

}

//função para cadastrar o usuário usando as funções criadas abaixo desta função para validar alguns dados
function Cadastrar(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))

    if (listaUsuarios == null){

        //alert(listaUsuarios)

        listaUsuarios = []

        if(VerificacaoCampos() == false){

            alert("ERRO: todos os campos devem ser preenchidos!")

        }else if(ValidaNascimento() == false){

            alert("ERRO: o usuário dever ter mais de 15 anos para poder cadastrar!")

        }else if(ValidaCpf() == false){

            alert("ERRO: o CPF digitado é inválido, digite o CPF sem pontos e hífen!")

        }else if(ValidaEmail() == false){

            alert("ERRO: E-mail inválido!")

        }else if((senhaPessoa.value).length < 6){
        
            alert('ERRO: a senha precisa ter no minímo 6 caracteres!') 
        
        }else{

            RealizarCadastro()
            window.location.href = 'telaLogin.html'

        }

    }else{

        if(VerificacaoCampos() == false){

            alert("ERRO: todos os campos devem ser preenchidos!")

        }else if(ValidaNascimento() == false){

            alert("ERRO: o usuário dever ter mais de 15 anos para poder cadastrar!")

        }else if(ValidaCpf() == false){

            alert("ERRO: o CPF digitado é inválido, digite o CPF sem pontos e hífen!")

        }else if(ValidaEmail() == false){

            alert("ERRO: E-mail inválido!")

        }else if((senhaPessoa.value).length < 6){
        
            alert('ERRO: a senha precisa ter no minímo 6 caracteres!') 
        
        }else{

            RealizarCadastro()
            window.location.href = 'telaLogin.html'

        }

    }
    
}

//função para pegar os dados dos inputs e preencher o objeto, depois adicionar o objeto ao vetor de objetos de usuários
function RealizarCadastro(){

    let usuario = {

        nome: nomePessoa.value,
        genero: generoPessoa.value,
        cpf: cpfPessoa.value,
        nascimento: nascimentoPessoa.value,
        email: emailPessoa.value,
        telefone: telefonePessoa.value,
        bairro: bairroPessoa.value,
        senha: senhaPessoa.value,
    
    }

    listaUsuarios.push(usuario)
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    alert('Cadastrado bem sucedido!')

}

//FUNÇÕES DE VALIDAÇÕES DOS DADOS
//função para verificar se algum campo não foi preenchido
function VerificacaoCampos(){

    if (nomePessoa.value == '' || generoPessoa.value == '0' || cpfPessoa.value == '' || nascimentoPessoa.value == '' || emailPessoa.value == '' || telefonePessoa.value == '' || bairroPessoa.value == '0' || senhaPessoa.value == ''){

        validaCampos = false

    }

    return validaCampos

}

//função para validar a data de nascimento
function ValidaNascimento(){

    vetorNascimento = (nascimentoPessoa.value).split('-')

    if(vetorNascimento[0] > (2024 - 15)){

        validaNascimento = false

    }

    return validaNascimento

}

//função para validar o cpf digitado
function ValidaCpf(){

   if((cpfPessoa.value).length !== 11 || isNaN(cpfPessoa.value)){

      validaCpf = false

    }

    return validaCpf

}

//função para validar o e-mail
function ValidaEmail(){

    vetorEmail = (emailPessoa.value).split(' ')
    for (let i = 0; i < (emailPessoa.value).length; i++){

        if(emailPessoa.value[i] == '@'){

            validaEmail = true

        }

    }

    return validaEmail

}

//PARTE DE LOGIN DO USUÁRIO E DO ADMINISTRADOR
//Verificação da página de Login do Usuário
let usuarioLogin = document.getElementById('username')
let senhaLogin = document.getElementById('password')
let usuarioLogado
let posicaoUsuario
let loginFeito = false
let loginAdm = false

//Criação dos dados de login do Administrador
let adm
let administrador = [{nomeAdm: 'Administrador', senhaAdm: 'SAgrupo03'}]

function Login(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))

    for (let i = 0; i < listaUsuarios.length; i++){

        if(usuarioLogin.value == listaUsuarios[i].cpf && senhaLogin.value == listaUsuarios[i].senha){

            //verificação do login do usuário comum
            loginFeito = true
            posicaoUsuario = i
            usuarioLogado = listaUsuarios[i].nome

        }else if(usuarioLogin.value == administrador[0].nomeAdm && senhaLogin.value == administrador[0].senhaAdm){

            //verificação do login do administrador
            loginAdm = true
            adm = administrador[0].nomeAdm

        }
        // else{

        //     alert("Atenção: usuário não cadastrado no sistema!!!")

        // }

    }

    if(loginFeito == true){ //login do usuário

        alert('Login bem sucedido!')
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
        localStorage.setItem('posicaoUserLogado', JSON.stringify(posicaoUsuario))
        window.location.href = 'telaPerfil.html'
        
    }else if(loginAdm == true){ //login do administrador (o adm só pode logar quando tem pelo menos 1 usuário cadastrado)
        
        alert("Bem-Vindo Administrador!")
        localStorage.setItem('admLogado', JSON.stringify(adm))
        window.location.href = 'telaAdministrador.html'

    }else{

        alert('Dados de login inválidos!')

    }

}

//PARTE DA TELA DE PERFIL DO USUÁRIO
//função para deslogar ou terminar a seção
function Sair(){

    localStorage.setItem('usuarioLogado', JSON.stringify(''))
    loginFeito = false
    posicaoUsuario = ''
    window.location.href = 'telaPaginaInicial.html'

}

//função exclusão da conta
let excluirConta = document.getElementById('botaoExcluirConta')
function Exclusao(){

    excluirConta.style.display = 'block'

}

//função confirmação da exclusão da conta
function ExcluirConta(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    listaUsuarios.splice(posicaoUsuario, 1) //exclui o usuário na posição logado
    loginFeito = false
    posicaoUsuario = ''
    usuarioLogado = ''

    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

    window.location.href = 'telaLogin.html'

}

//Para fazer aparecer os serviços
let agendarClinicoGeral = document.getElementById('consultaClinicoGeral')

function AgendarConsulta(){

    agendarClinicoGeral.style.display = 'block'

}

//Pegando o id dos campos de dados do usuário para poder fazer o preenchimento
let nomePerfilPessoa = document.getElementById('nomePerfil')
let cpfPerfilPessoa = document.getElementById('cpfPerfil')
let generoPerfilPessoa = document.getElementById('generoPerfil')
let nascimentoPerfilPessoa = document.getElementById('nascimentoPerfil')
let emailPerfilPessoa = document.getElementById('emailPerfil')
let telefonePerfilPessoa = document.getElementById('telefonePerfil')
let bairroPerfilPessoa = document.getElementById('bairroPerfil')
let senhaPerfilPessoa = document.getElementById('senhaPerfil')

//Função para preencher os dados do usuário na sua página de perfil
function CarregarDadosPerfil(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))

    nomePerfilPessoa.innerHTML = listaUsuarios[posicaoUsuario].nome
    cpfPerfilPessoa.innerHTML = listaUsuarios[posicaoUsuario].cpf
    generoPerfilPessoa.value = listaUsuarios[posicaoUsuario].genero
    nascimentoPerfilPessoa.value = listaUsuarios[posicaoUsuario].nascimento
    emailPerfilPessoa.value = listaUsuarios[posicaoUsuario].email
    telefonePerfilPessoa.value = listaUsuarios[posicaoUsuario].telefone
    bairroPerfilPessoa.value = listaUsuarios[posicaoUsuario].bairro
    senhaPerfilPessoa.value = listaUsuarios[posicaoUsuario].senha

}

//PARTE DE EDIÇÃO DOS DADOS NO PERFIL DO USUÁRIO
//Pegando id das imagens ilustrativas de edição
let trocarImgGen = document.getElementById('imagEditGen')
let trocarImgNasc = document.getElementById('imagEditNasc')
let trocarImgEmail = document.getElementById('imagEditEmail')
let trocarImgContato = document.getElementById('imagEditContato')
let trocarImgBairro = document.getElementById('imagEditBairro')
let trocarImgSenha = document.getElementById('imagEditSenha')

//função para editar gênero do usuário
function EditarGenero(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    if (generoPerfilPessoa.disabled == false){
        
        trocarImgGen.src = "ImgEdit.svg"
        generoPerfilPessoa.disabled = true
        listaUsuarios[posicaoUsuario].genero = generoPerfilPessoa.value
        generoPerfilPessoa.style.color = "#4F4F4F"
        generoPerfilPessoa.style.border = "0"
        
    }else{
        
        trocarImgGen.src = "ImgSave.svg"
        generoPerfilPessoa.disabled = false
        generoPerfilPessoa.style.color = "black"
        generoPerfilPessoa.style.border = "solid 2px darkcyan"
        
    }
    
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
}

//função para editar a data de nascimento do usuário
function EditarNascimento(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    if (nascimentoPerfilPessoa.disabled == false){
        
        trocarImgNasc.src = "ImgEdit.svg"
        nascimentoPerfilPessoa.disabled = true
        listaUsuarios[posicaoUsuario].nascimento = nascimentoPerfilPessoa.value
        nascimentoPerfilPessoa.style.color = "#4F4F4F"
        nascimentoPerfilPessoa.style.border = "0"
        
    }else{
        
        trocarImgNasc.src = "ImgSave.svg"
        nascimentoPerfilPessoa.disabled = false
        nascimentoPerfilPessoa.style.color = "black"
        nascimentoPerfilPessoa.style.border = "solid 2px darkcyan"
        
    }
    
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

}

//função para editar email do usuário
function EditarEmail(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    if (emailPerfilPessoa.disabled == false){
        
        trocarImgEmail.src = "ImgEdit.svg"
        emailPerfilPessoa.disabled = true
        listaUsuarios[posicaoUsuario].email = emailPerfilPessoa.value
        emailPerfilPessoa.style.color = "#4F4F4F"
        emailPerfilPessoa.style.border = "0"
        
    }else{
        
        trocarImgEmail.src = "ImgSave.svg"
        emailPerfilPessoa.disabled = false
        emailPerfilPessoa.style.color = "black"
        emailPerfilPessoa.style.border = "solid 2px darkcyan"
        
    }
    
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

}

//função para editar contato celular do usuário
function EditarTelefone(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    if (telefonePerfilPessoa.disabled == false){
        
        trocarImgContato.src = "ImgEdit.svg"
        telefonePerfilPessoa.disabled = true
        listaUsuarios[posicaoUsuario].telefone = telefonePerfilPessoa.value
        telefonePerfilPessoa.style.color = "#4F4F4F"
        telefonePerfilPessoa.style.border = "0"
        
    }else{
        
        trocarImgContato.src = "ImgSave.svg"
        telefonePerfilPessoa.disabled = false
        telefonePerfilPessoa.style.color = "black"
        telefonePerfilPessoa.style.border = "solid 2px darkcyan"
        
    }
    
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

}

//função para editar bairro do usuário
function EditarBairro(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    if (bairroPerfilPessoa.disabled == false){
        
        trocarImgBairro.src = "ImgEdit.svg"
        bairroPerfilPessoa.disabled = true
        listaUsuarios[posicaoUsuario].bairro = bairroPerfilPessoa.value
        bairroPerfilPessoa.style.color = "#4F4F4F"
        bairroPerfilPessoa.style.border = "0"
        
    }else{
        
        trocarImgBairro.src = "ImgSave.svg"
        bairroPerfilPessoa.disabled = false
        bairroPerfilPessoa.style.color = "black"
        bairroPerfilPessoa.style.border = "solid 2px darkcyan"
        
    }
    
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

}

//função para editar senha do usuário
function EditarSenha(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    
    if (senhaPerfilPessoa.disabled == false){
        
        trocarImgSenha.src = "ImgEdit.svg"
        senhaPerfilPessoa.disabled = true
        listaUsuarios[posicaoUsuario].senha = senhaPerfilPessoa.value
        senhaPerfilPessoa.style.color = "#4F4F4F"
        senhaPerfilPessoa.style.border = "0"
        
    }else{
        
        trocarImgSenha.src = "ImgSave.svg"
        senhaPerfilPessoa.disabled = false
        senhaPerfilPessoa.style.color = "black"
        senhaPerfilPessoa.style.border = "solid 2px darkcyan"
        
    }
    
    localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

}

//PÁGINA DE AGENDAMENTO DE CONSULTA
//função para voltar para tela do perfil quando estiver na página de agendamento
function VoltarPerfil(){

    window.location.href = 'telaPerfil.html' 

}


//função para direcionar o usuário a página de agendamento de Clínico Geral (esse botão está na página de perfil)
function AcessoClinicoGeral(){

    window.location.href = 'telaClinicoGeral.html'

}

//PARTE DO ADMINISTRADOR
//função para preencher os dados do administrador na sua página de perfil
let nomeAdministrador = document.getElementById('nomeAdministrador')
let senhaAdministrador = document.getElementById('senhaAdministrador')

function DadosAdministrador(){

    //adm = JSON.parse(localStorage.getItem('admLogado'))
    nomeAdministrador.innerHTML = administrador[0].nomeAdm
    senhaAdministrador.innerHTML = administrador[0].senhaAdm

}

//Função de habilitar as semanas do mês
let mostrarSemanaUm = document.getElementById('containerSemanaUm')
let mostrarSemanaDois = document.getElementById('containerSemanaDois')
let mostrarSemanaTres = document.getElementById('containerSemanaTres')
let mostrarSemanaQuatro = document.getElementById('containerSemanaQuatro')
let mostrarSemanaCinco = document.getElementById('containerSemanaCinco')

//semana um
let botaoHabilitarSemanaUm = document.getElementById('habilitarSemanaUm')
let botaoDesabilitarSemanaUm = document.getElementById('desabilitarSemanaUm')
function HabilitarSemanaUm(){
    
    alert("Semana 1 habilitado com sucesso!")
    botaoHabilitarSemanaUm.style.backgroundColor = 'darkgreen'
    botaoDesabilitarSemanaUm.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaUm', JSON.stringify('habilitar'))

}
function DesabilitarSemanaUm(){

    alert("Semana 1 desabilitado com sucesso!")
    botaoDesabilitarSemanaUm.style.backgroundColor = 'darkred'
    botaoHabilitarSemanaUm.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaUm', JSON.stringify('desabilitar'))
    
}
//semana dois
let botaoHabilitarSemanaDois = document.getElementById('habilitarSemanaDois')
let botaoDesabilitarSemanaDois = document.getElementById('desabilitarSemanaDois')
function HabilitarSemanaDois(){
    
    alert("Semana 2 habilitado com sucesso!")
    botaoHabilitarSemanaDois.style.backgroundColor = 'darkgreen'
    botaoDesabilitarSemanaDois.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaDois', JSON.stringify('habilitar'))

}
function DesabilitarSemanaDois(){

    alert("Semana 2 desabilitado com sucesso!")
    botaoDesabilitarSemanaDois.style.backgroundColor = 'darkred'
    botaoHabilitarSemanaDois.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaDois', JSON.stringify('desabilitar'))
    
}
//semana três
let botaoHabilitarSemanaTres = document.getElementById('habilitarSemanaTres')
let botaoDesabilitarSemanaTres = document.getElementById('desabilitarSemanaTres')
function HabilitarSemanaTres(){
    
    alert("Semana 3 habilitado com sucesso!")
    botaoHabilitarSemanaTres.style.backgroundColor = 'darkgreen'
    botaoDesabilitarSemanaTres.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaTres', JSON.stringify('habilitar'))

}
function DesabilitarSemanaTres(){

    alert("Semana 3 desabilitado com sucesso!")
    botaoDesabilitarSemanaTres.style.backgroundColor = 'darkred'
    botaoHabilitarSemanaTres.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaTres', JSON.stringify('desabilitar'))
    
}
//semana quatro
let botaoHabilitarSemanaQuatro = document.getElementById('habilitarSemanaQuatro')
let botaoDesabilitarSemanaQuatro = document.getElementById('desabilitarSemanaQuatro')
function HabilitarSemanaQuatro(){
    
    alert("Semana 4 habilitado com sucesso!")
    botaoHabilitarSemanaQuatro.style.backgroundColor = 'darkgreen'
    botaoDesabilitarSemanaQuatro.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaQuatro', JSON.stringify('habilitar'))

}
function DesabilitarSemanaQuatro(){

    alert("Semana 4 desabilitado com sucesso!")
    botaoDesabilitarSemanaQuatro.style.backgroundColor = 'darkred'
    botaoHabilitarSemanaQuatro.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaQuatro', JSON.stringify('desabilitar'))
    
}
//semana cinco
let botaoHabilitarSemanaCinco = document.getElementById('habilitarSemanaCinco')
let botaoDesabilitarSemanaCinco = document.getElementById('desabilitarSemanaCinco')
function HabilitarSemanaCinco(){
    
    alert("Semana 5 habilitado com sucesso!")
    botaoHabilitarSemanaCinco.style.backgroundColor = 'darkgreen'
    botaoDesabilitarSemanaCinco.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaCinco', JSON.stringify('habilitar'))

}
function DesabilitarSemanaCinco(){

    alert("Semana 5 desabilitado com sucesso!")
    botaoDesabilitarSemanaCinco.style.backgroundColor = 'darkred'
    botaoHabilitarSemanaCinco.style.backgroundColor = 'darkcyan'
    localStorage.setItem('SemanaCinco', JSON.stringify('desabilitar'))
    
}

//Exibe as semanas do calendário para o ADM para que ele possa habilitá-las ou não
function Calendario(){

    //alert('entrou')

    if(selectOpcaoBairro.value == "0" || selectOpcaoServico.value == "0"){

        alert("Selecione todas as opções acima antes de clicar!")

    }else{

        mostrarContainerSemanas.style.visibility = 'visible'
        mostrarContainerAgendamento.style.visibility = 'hidden'

    }

}

//variaveis para controlar as semanas
let semanaUm, semanaDois, semanaTres, semanaQuatro, semanaCinco

function ClinicoGeralAgronomica(){

    //console.log("entrou")

    let vetorMedicoAgronomica = [{servico: 'Clínico Geral', nome: 'Dr. João Pereira', especialidade: 'Medicina da Família e Comunidade', dias: 'Seg - Qua - Sex', horario: '08:00 às 12:00'}]

    localStorage.setItem('medicos', JSON.stringify(vetorMedicoAgronomica))
    
    //console.log(vetorMedicoAgronomica)

    //preenchendo os dados do médico de Clínico Geral da Agronômica
    let nomeMedicoAgronomica = document.getElementById('nomeMedico')
    let especialidadeMedicoAgronomica = document.getElementById('especialidadeMedico')
    let diasMedicoAgronomica = document.getElementById('diasMedico')
    let horarioMedicoAgronomica = document.getElementById('horarioMedico')
    
    nomeMedicoAgronomica.innerHTML = vetorMedicoAgronomica[0].nome
    especialidadeMedicoAgronomica.innerHTML = vetorMedicoAgronomica[0].especialidade
    diasMedicoAgronomica.innerHTML = vetorMedicoAgronomica[0].dias
    horarioMedicoAgronomica.innerHTML = vetorMedicoAgronomica[0].horario

    //a parte de habilitar ou não as semanas é do administrador, mas ela só é executada nessa parte após a ação do ADM
    //habilitando ou desabilitando a semana um
    semanaUm = JSON.parse(localStorage.getItem('SemanaUm'))

    if(semanaUm == 'habilitar'){

        mostrarSemanaUm.style.display = 'block'
        
    }else if(semanaUm == 'desabilitar'){
        
        mostrarSemanaUm.style.display = 'none'

    }
    //habilitando ou desabilitando a semana dois
    semanaDois = JSON.parse(localStorage.getItem('SemanaDois'))

    if(semanaDois == 'habilitar'){

        mostrarSemanaDois.style.display = 'block'
        
    }else if(semanaDois == 'desabilitar'){
        
        mostrarSemanaDois.style.display = 'none'

    }
    //habilitando ou desabilitando a semana três
    semanaTres = JSON.parse(localStorage.getItem('SemanaTres'))

    if(semanaTres == 'habilitar'){

        mostrarSemanaTres.style.display = 'block'
        
    }else if(semanaTres == 'desabilitar'){
        
        mostrarSemanaTres.style.display = 'none'

    }
    //habilitando ou desabilitando a semana quatro
    semanaQuatro = JSON.parse(localStorage.getItem('SemanaQuatro'))

    if(semanaQuatro == 'habilitar'){

        mostrarSemanaQuatro.style.display = 'block'
        
    }else if(semanaQuatro == 'desabilitar'){
        
        mostrarSemanaQuatro.style.display = 'none'

    }
    //habilitando ou desabilitando a semana cinco
    semanaCinco = JSON.parse(localStorage.getItem('SemanaCinco'))

    if(semanaCinco == 'habilitar'){

        mostrarSemanaCinco.style.display = 'block'
        
    }else if(semanaCinco == 'desabilitar'){
        
        mostrarSemanaCinco.style.display = 'none'

    }

}

//PARTE DO AGENDAMENTO
//função para preencher os dados de agendamento das consultas em um vetor de objetos de pacientes agendados
let listaPacientesDia02 = []

let pacientes = {
    
    ficha: '',
    nomePaciente: '',
    cpfPaciente: '',
    medico: '',
    data: '',
    hora: ''
    
}

function PreencherDadosConsulta(){

    listaUsuarios = JSON.parse(localStorage.getItem('usuariosCadastrados'))
    posicaoUsuario = JSON.parse(localStorage.getItem('posicaoUserLogado'))
    vetorMedicoAgronomica = JSON.parse(localStorage.getItem('medicos'))
        
    pacientes.nomePaciente = listaUsuarios[posicaoUsuario].nome
    pacientes.cpfPaciente = listaUsuarios[posicaoUsuario].cpf
    pacientes.ficha = ficha
    pacientes.medico = vetorMedicoAgronomica[0].nome
    pacientes.hora = vetorMedicoAgronomica[0].horario
    pacientes.data = diaDois.value

    listaPacientesDia02.push(pacientes)
    localStorage.setItem('pacientesAgendados', JSON.stringify(listaPacientesDia02))
    alert(`SUA CONSULTA FOI AGENDADA COM SUCESSO!\n\nPor favor, verifique seu histórico de consultas na sua página de perfil.\nE compareça no dia e horário de atendimento definido no seu histórico.`)

}

let diaDois = document.getElementById('dia2')

let ficha = 0

//função para realizar os agendamentos no dia 02/08
function AgendamentoDia2(){

    let escolhaUsuario 

    escolhaUsuario = Number(prompt("VOCÊ DESEJA AGENDAR SUA CONSULTA PARA ESSE DIA?\n\n1 - Sim\n2 - Não\n\nDigite sua escolha:"))

    switch (escolhaUsuario){

        case 1:

            listaPacientesDia02 = JSON.parse(localStorage.getItem('pacientesAgendados'))
            usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

            if (listaPacientesDia02 == null){
                
                //alert(listaPacientesDia02)
                
                listaPacientesDia02 = []
                
                PreencherDadosConsulta()

                ficha++
                
            }else{

                //alert("entrou no else")

                for (let i = 0; i < listaPacientesDia02.length; i++){

                    //alert("já possui consulta agendada")

                    if(usuarioLogado == listaPacientesDia02[i].nomePaciente){

                        alert(`ATENÇÃO:\n${usuarioLogado}, Você já possui uma consulta agendada nesta data, por favor verifique seu histórico de consultas!`)

                        break

                    }else{

                        PreencherDadosConsulta()

                    }
                }
                
            }

            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
            localStorage.setItem('pacientesAgendados', JSON.stringify(listaPacientesDia02))

            break

        case 2:

            alert("Seu agendamento para o dia selecionado não foi realizado!")
            break

        default:
            alert("A opção selecionada não existe, escolha uma opção válida!")
            break
    }
    
}

//mostrar o menu de escolhas para visualizar os agendamentos ou adionar uma semana ao calendário
let selecionarBairro = document.getElementById('selecionarBairro')
let selecionarDia = document.getElementById('selecionarDia')
let selecionarServico = document.getElementById('selecionarServico')

let selectOpcaoBairro = document.getElementById('escolherBairroAdm')
let selectOpcaoServico = document.getElementById('escolherServicoAdm')
let selectOpcaoDia = document.getElementById('escolherDiaAdm')

let listaAgendamentos = document.getElementById('botaoAgendamentos')
let listaCalendario = document.getElementById('botaoCalendario')

let mostrarContainerSemanas = document.getElementById('containerSemanas')
let mostrarContainerAgendamento = document.getElementById('containerAgendamento')

//adiciona as três opções de select (bairro, serviço e dia) para o adm para exibir a lista de agendamentos
function ConsultarAgendamentos(){
    
    selecionarBairro.style.visibility="visible"
    selecionarServico.style.visibility = 'visible'
    selecionarDia.style.visibility = 'visible'
    selectOpcaoBairro.value = "0"
    selectOpcaoServico.value = "0"
    selectOpcaoDia.value = "0"
    listaAgendamentos.style.visibility = 'visible'
    listaCalendario.style.visibility = 'hidden'
    
}
//adiciona as duas opções de select (bairro e serviço) para o adm para poder exibir as semanas do calendário
function HabilitarSemanas(){
    
    selecionarBairro.style.visibility="visible"
    selecionarServico.style.visibility = 'visible'
    selecionarDia.style.visibility = 'hidden'
    selectOpcaoBairro.value = "0"
    selectOpcaoServico.value = "0"
    listaAgendamentos.style.visibility = 'hidden'
    listaCalendario.style.visibility = 'visible'
}

//Fazer aparecer a lista de agendamentos para o Administrador
let agendamentosAdm = document.getElementById('pacientes')
let historicoAgendamentoAdm = ``

function Agendamentos(){

    if(selectOpcaoBairro.value == "0" || selectOpcaoServico.value == "0" || selectOpcaoDia.value == "0"){

        alert("Selecione todas as opções acima antes de clicar!")

    }else{

        // alert('entrou no else')

        if(selectOpcaoBairro.value == "Agronômica" && selectOpcaoServico.value == "clinicoGeral" && selectOpcaoDia.value == "2"){

            // alert("entrou na opção 2")

            mostrarContainerSemanas.style.visibility = 'hidden'
            mostrarContainerAgendamento.style.visibility = 'visible'
    
            listaPacientesDia02 = JSON.parse(localStorage.getItem('pacientesAgendados'))
    
            if (listaPacientesDia02 == null){
    
                alert("Não existe nenhum agendamento marcado para esse dia!!!")
        
            }else{
    
                for(let i = 0; i < listaPacientesDia02.length; i++){
        
                    historicoAgendamentoAdm += `Senha: ${ficha}\nPaciente: ${listaPacientesDia02[i].nomePaciente}\nCPF: ${listaPacientesDia02[i].cpfPaciente}\nMédico: ${listaPacientesDia02[i].medico}\nData: ${listaPacientesDia02[i].data}/08/2024\nHora: ${listaPacientesDia02[i].hora}`+"<br><br>"
        
                }
    
            }
    
            agendamentosAdm.innerHTML = historicoAgendamentoAdm

        }else if(selectOpcaoBairro.value == "Agronômica" && selectOpcaoServico.value == "clinicoGeral" && selectOpcaoDia.value == "5"){

            // alert("entrou na opção 5")

            alert("Não existe lista de agendamento para esse dia!")

        }

    }

}

//Mostrar o histórico de consulta do usuário logado
let historicoUsuario = document.getElementById('labelHistorico')

let mostrarHistoricoUsuario = ``
let mensagem = 'Histórico de consulta vázio!'

function HistoricoConsultas(){

    listaPacientesDia02 = JSON.parse(localStorage.getItem('pacientesAgendados'))
    //mostrarHistoricoUsuario = JSON.parse(localStorage.getItem('historicoUsuarioLogado'))
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

    if (listaPacientesDia02 == null){

        alert('Você não tem nenhuma consulta agendada!')
        
    }else{
        
        //alert("entrou aqui")

        for(let i = 0; i < listaPacientesDia02.length; i++){
    
            if(usuarioLogado == listaPacientesDia02[i].nomePaciente){

                //alert("encontrou")
    
                mostrarHistoricoUsuario += `Senha: ${ficha}\nPaciente: ${listaPacientesDia02[i].nomePaciente}\nCPF: ${listaPacientesDia02[i].cpfPaciente}\nMédico: ${listaPacientesDia02[i].medico}\nData: ${listaPacientesDia02[i].data}/08/2024\nHora: ${listaPacientesDia02[i].hora}`+"<br><br>"
    
            }
    
        }

    }

    historicoUsuario.innerHTML = mostrarHistoricoUsuario

    //localStorage.setItem('consultaUsuarioLogado', JSON.stringify(mostrarHistoricoUsuario))

}