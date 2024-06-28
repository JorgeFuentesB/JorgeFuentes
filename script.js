const cajas = [
  { numero: 1, nombre: "Caja 1", tarjetas: [] },
  { numero: 2, nombre: "Caja 2", tarjetas: [] },
  { numero: 3, nombre: "Caja 3", tarjetas: [] },
  { numero: 4, nombre: "Caja 4", tarjetas: [] },
  { numero: 5, nombre: "Caja 5", tarjetas: [] },
  { numero: 6, nombre: "Caja 6", tarjetas: [] },
  { numero: 7, nombre: "Caja 7", tarjetas: [] },
];

let cajaSeleccionada = null;

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".servicios button");
  const formContainers = document.querySelectorAll(".form-container");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetFormId = button.getAttribute("data-target") + "-container";
      formContainers.forEach((container) => {
        if (container.id === targetFormId) {
          container.classList.remove("hidden");
        } else {
          container.classList.add("hidden");
        }
      });
    });
  });
  document
    .getElementById("form-seleccionar-caja")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      cajaSeleccionada = parseInt(
        document.getElementById("seleccionar-caja").value
      );
      alert(`Caja ${cajaSeleccionada} seleccionada.`);
    });

  document
    .getElementById("form-cargar-monto")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const numeroTarjeta = document.getElementById(
        "numero-tarjeta-cargar"
      ).value;
      const montoCarga = parseFloat(
        document.getElementById("monto-carga").value
      );
      cargarMonto(numeroTarjeta, montoCarga);
    });

  document
    .getElementById("form-habilitar-tarjeta")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const numeroTarjeta = document.getElementById(
        "numero-habilitar-tarjeta"
      ).value;
      const estadoTarjeta = document.getElementById("estado-tarjeta").value;
      actualizarEstadoTarjeta(numeroTarjeta, estadoTarjeta);
    });

  document
    .getElementById("form-registrar-tarjeta")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const numeroTarjeta = document.getElementById(
        "numero-tarjeta-registrar"
      ).value;
      const fecha = document.getElementById("fecha-tarjeta-registrar").value;
      const numeroChip = document.getElementById(
        "numero-chip-tarjeta-registrar"
      ).value;
      const saldoAnterior = parseFloat(
        document.getElementById("saldo-anterior-registrar").value
      );
      const estado = document.getElementById("estado-registrar").value;
      registrarTarjeta(numeroTarjeta, fecha, numeroChip, estado, saldoAnterior);
    });

  // document.getElementById("consultar-tarjetas-habilitadas-deshabilitadas").addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     consultarTarjetaHabilitadaDeshabilitada();

  // });

  // document.getElementById("consultar-tarjetas-fecha").addEventListener("submit", function (event) {
  //     event.preventDefault();

  //     consultarTarjetasFecha();

  // });

  // document.getElementById("consultar-promedio-saldo-anterior").addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     consultarSaldoAnterior();
});
// document
//   .getElementById("consultar-monto-cargas")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     consultarMontoCargas();
//   });

// document.getElementById("consultar-total-cargas-habilitadas").addEventListener("submit", function (event) {
//     event.preventDefault();
//     consultarTotalCargasHabilitada();

// });

// document.getElementById("consultar-total-cargas-deshabilitadas").addEventListener("submit", function (event) {
//     event.preventDefault();
//     cconsultarTotalCargasDeshabilitada();

// });

function cargarMonto(numeroTarjeta, montoCarga) {
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }

  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const tarjeta = caja.tarjetas.find(
    (tarjeta) => tarjeta.numero === numeroTarjeta
  );

  if (!tarjeta) {
    alert("Tarjeta no encontrada.");
    return;
  }

  tarjeta.saldoAnterior += tarjeta.montoCarga;
  tarjeta.montoCarga = montoCarga;

  alert(`Monto Cargado a la tarjeta ${numeroTarjeta}.`);
}
function actualizarEstadoTarjeta(numeroTarjeta, estado) {
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }

  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const tarjeta = caja.tarjetas.find(
    (tarjeta) => tarjeta.numero === numeroTarjeta
  );

  if (!tarjeta) {
    alert("Tarjeta no encontrada.");
    return;
  }

  tarjeta.estado = estado;
  alert(`Estado de la tarjeta ${numeroTarjeta} actualizado a ${estado}.`);
}

function registrarTarjeta(
  numeroTarjeta,
  fecha,
  numeroChip,
  saldoAnterior,
  estado
) {
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }
  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  if (caja.tarjetas.find((tarjeta) => tarjeta.numero === numeroTarjeta)) {
    alert("La tarjeta ya esta registrada en esta caja");
    return;
  }
  const nuevaTarjeta = {
    numero: numeroTarjeta,
    fecha: fecha,
    numeroChip: numeroChip,
    saldoAnterior: saldoAnterior,
    estado: estado,
    montoCarga: 0,
  };

  caja.tarjetas.push(nuevaTarjeta);
  alert(`Tarjeta ${numeroTarjeta} registrada en la caja ${cajaSeleccionada}.`);
}
function consultarTarjetaHabilitadaDeshabilitada() {
  document
    .getElementById("consultar-tarjetas-habilitadas-deshabilitadas")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      consultarTarjetaHabilitadaDeshabilitada();
    });

  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }
  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const tarjetaHabilitadaDeshabilitada = caja.tarjetas.filter(
    (tarjeta) =>
      tarjeta.estado === "habilitada" || tarjeta.estado === "deshabilitada"
  );
  let mensaje = `Tarjetas habilitadas/deshabilitadas en la caja ${cajaSeleccionada}:\n`;
  mensaje += tarjetaHabilitadaDeshabilitada
    .map((t) => `Número: ${t.numero}, Estado: ${t.estado}`)
    .join("\n");
  alert(mensaje);
}

function consultarTarjetasFecha() {
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }
  const fechaConsulta = document.getElementById("fecha-inicio").value;
  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const tarjetasPorFecha = caja.tarjetas.filter(
    (tarjeta) => tarjeta.fecha === fechaConsulta
  );

  if (tarjetasPorFecha.length === 0) {
    alert(
      `No hay tarjetas registradas en la fecha ${fechaConsulta} en la caja ${cajaSeleccionada}.`
    );
    return;
  }
}
console.log(tarjeta.saldoAnterior);
function consultarSaldoAnterior() {
    let totalSaldoAnterior = 0;

    cajas.forEach((caja) => {
      caja.tarjetas.forEach((tarjeta) => {
        if (tarjeta.saldoAnterior !== undefined) {
          totalSaldoAnterior += tarjeta.saldoAnterior;
        }
      });
    });
  
    console.log({ totalSaldoAnterior });
    alert(`El total de todos los saldos anteriores es: ${totalSaldoAnterior}`);
  }

function promedioSaldoAnterior(params) {
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }

  const cajaActual = cajas.find((caja) => {
    return cajaSeleccionada == caja.numero;
  });
  const tarjetasCaja = cajaActual.tarjetas;
  console.log({ tarjetasCaja });

  const totalSaldoAnterior = tarjetasCaja.reduce((total, tarjeta) => {
    return total + tarjeta.saldoAnterior;
  }, 0);
  const promedioSaldoAnterior = totalSaldoAnterior / tarjetasCaja.length;
  console.log({ totalSaldoAnterior });

  alert(
    `Saldo anteriores en la caja ${cajaSeleccionada} promedio de ellos es: ${promedioSaldoAnterior}`
  );
}

function consultarMontoCargas() {
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }

  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const montoTotalCargas = caja.tarjetas.reduce((total, tarjeta) => {
    total + tarjeta.montoCarga;
  }, 0);

  alert(
    `Monto total de cargas en la caja ${cajaSeleccionada}: ${montoTotalCargas}`
  );
}

function montoCargasTarjetasHabilitadas() {
  //todo
  // document.getElementById("consultar-total-cargas-habilitadas").addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     consultarTotalCargasHabilitada();
  // });

  console.log({ cajaSeleccionada });
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }

  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const montoTotalCargas = caja.tarjetas.reduce(
    (total, tarjeta) => total + tarjeta.estado == 1,
    0
  );

  alert(
    `Monto total de tarjetas habilitadas en la caja ${cajaSeleccionada}: ${montoTotalCargas}`
  );
}

function montoCargasTarjetasDeshabilitadas() {
  //todo
  console.log({ cajaSeleccionada });
  if (cajaSeleccionada === null) {
    alert("Por favor selecciona una caja primero.");
    return;
  }

  const caja = cajas.find((caja) => caja.numero === cajaSeleccionada);
  const montoTotalCargas = caja.tarjetas.reduce(
    (total, tarjeta) => total + tarjeta.estado == 0,
    0
  );

  alert(
    `Monto total de tarjetas habilitadas en la caja ${cajaSeleccionada}: ${montoTotalCargas}`
  );
}
