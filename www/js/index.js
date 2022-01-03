var appestaciona = {};

appestaciona.app = {

  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function () {
    FastClick.attach(document.body);
  }

};

let vagas = [
  {
    lugar: 1,
    ocupado: false,
    preco: 500
  },
  {
    lugar: 2,
    ocupado: false,
    preco: 500
  }, {
    lugar: 3,
    ocupado: false,
    preco: 1500
  }, {
    lugar: 4,
    ocupado: false,
    preco: 2500
  }, {
    lugar: 5,
    ocupado: false,
    preco: 500
  }, {
    lugar: 6,
    ocupado: false,
    preco: 1000
  }, {
    lugar: 7,
    ocupado: false,
    preco: 1000
  }, {
    lugar: 8,
    ocupado: false,
    preco: 500
  }, {
    lugar: 9,
    ocupado: false,
    preco: 1500
  }, {
    lugar: 10,
    ocupado: false,
    preco: 500
  },
]

let vaga_selecionada = -1

let info_reserva = {
  nome_cliente: "",
  telefone_cliente: "",
  matricula_carro: "",
  marca_carro: "",
  cor_carro: "",
  data_reserva: "",
  numero_horas: 0,
  lugar_reservado: 0,
  total_pagar: 0
}

function listar_vagas() {
  let output = ''
  $.each(vagas, (i, vaga) => {
    let ocupado = vaga.ocupado == true ? "Ocupado" : "Livre"
    if (vaga.ocupado == false) {
      output += `
      <li>
        <a onclick="reservar_vaga(${i})" href="#">
          Lugar: ${vaga.lugar} - Estado: ${ocupado} - Preço: ${vaga.preco} AOA
        </a>
      </li>
    `
    } else {
      output += `
      <li>
        <a>
          Lugar: ${vaga.lugar} - Estado: ${ocupado} - Preço: ${vaga.preco} AOA
        </a>
      </li>
    `
    }
  })
  $("#lista_vagas").html(output)
}

function reservar_vaga(i) {
  minha_vaga = vagas[i]
  vaga_selecionada = i

  $("#lugar_reserva").text(`Lugar a reservar ${minha_vaga.lugar}`)
  $("#lugar_reserva_preco").text(`Preço do lugar ${minha_vaga.preco} AOA`)

  window.location.href = "#pg_reservar_lugar"
}

function mostrar_vaga(){
  $("#h_nome").text(`Nome do cliente: ${info_reserva.nome_cliente}`)
  $("#h_matricula").text(`Matricula do carro: ${info_reserva.matricula_carro}`)
  $("#h_marca").text(`Marca do carro: ${info_reserva.marca_carro}`)
  $("#h_data").text(`Data de reserva: ${info_reserva.data_reserva}`)
  $("#h_numero_hora").text(`Número de horas: ${info_reserva.numero_horas}`)
  $("#h_total").text(`Total a pagar: ${info_reserva.total_pagar} AOA`)

  listar_vagas()
  window.location.href = "#pg_ver_vaga"
}

$(document).ready(function () {

  listar_vagas()

  $('body').on('submit', '#form_reserva', (e) => {
    e.preventDefault()

    info_reserva.nome_cliente = $("#nome_cliente").val()
    info_reserva.telefone_cliente = $("#telefone_cliente").val()
    info_reserva.matricula_carro = $("#matricula_carro").val()
    info_reserva.marca_carro = $("#marca_carro").val()
    info_reserva.cor_carro = $("#cor_carro").val()
    info_reserva.data_reserva = $("#data_reserva").val()
    info_reserva.numero_horas = parseInt($("#numero_horas").val())

    info_reserva.total_pagar = info_reserva.numero_horas * vagas[vaga_selecionada].preco
    info_reserva.lugar_reservado = vaga_selecionada

    vagas[vaga_selecionada].ocupado = true
    alert(`Vaga ${info_reserva.lugar_reservado} reservada com sucesso!`)
    $("#form_reserva")[0].reset()
    mostrar_vaga()
  })
})
