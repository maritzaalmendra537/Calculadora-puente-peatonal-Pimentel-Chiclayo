let grafico;

function calcular() {
  const X1 = parseFloat(document.getElementById('x1').value);
  const X2 = parseFloat(document.getElementById('x2').value);
  const X3 = parseFloat(document.getElementById('x3').value);
  const X4 = parseFloat(document.getElementById('x4').value);
  const X5 = parseFloat(document.getElementById('x5').value);
  const X6 = parseFloat(document.getElementById('x6').value);
  const X8 = parseFloat(document.getElementById('x8').value);
  const X9 = parseFloat(document.getElementById('x9').value);

  if ([X1, X2, X3, X4, X5, X6, X8, X9].some(isNaN)) {
    document.getElementById('resultado').innerText = "⚠️ Completa todos los campos.";
    return;
  }

  // Cálculo del valor final Y
  const Y = 
    -2425.73 +
    1.513 * (X1 ** 2) * X5 -
    1.068 * (X3 ** 2) * X5 -
    0.841 * (X3 ** 3) +
    0.835 * (X2 ** 2) * X5 -
    0.826 * (X5 ** 3) -
    0.795 * (X5 ** 2) * X8 +
    0.782 * (X2 ** 2) * X6 -
    0.746 * X5 * X6 * X9 -
    0.717 * X2 * (X5 ** 2) +
    0.677 * X4 * (X5 ** 2);

  // Mostrar valor de Y
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `✅ % estimado de aplicación de normas: ${Y.toFixed(2)} %`;

  // Evaluación del diseño estructural
  let descripcion = "";
  if (Y >= 80) {
    descripcion = "✅ El diseño estructural del puente es adecuado. Cumple con las normativas vigentes y garantiza seguridad peatonal.";
  } else if (Y >= 50) {
    descripcion = "⚠️ El diseño es funcional pero presenta observaciones. Se recomienda revisar aspectos técnicos y reforzar criterios normativos.";
  } else if (Y >= 0) {
    descripcion = "❌ El diseño es débil y requiere modificaciones. La estructura no cumple plenamente con los criterios técnicos esperados.";
  } else {
    descripcion = "❌ El diseño estructural es deficiente. Existe incumplimiento normativo grave y alto riesgo para los usuarios. Replantear urgentemente.";
  }

  const divDescripcion = document.createElement("div");
  divDescripcion.style.marginTop = "1.5rem";
  divDescripcion.style.fontSize = "1.1rem";
  divDescripcion.style.color = Y < 50 ? "#b00020" : "#007f5f";
  divDescripcion.innerText = descripcion;
  resultadoDiv.appendChild(divDescripcion);

  // Contribuciones por término
  const contribuciones = {
    "X1²·X5": 1.513 * (X1 ** 2) * X5,
    "X3²·X5": -1.068 * (X3 ** 2) * X5,
    "X3³": -0.841 * (X3 ** 3),
    "X2²·X5": 0.835 * (X2 ** 2) * X5,
    "X5³": -0.826 * (X5 ** 3),
    "X5²·X8": -0.795 * (X5 ** 2) * X8,
    "X2²·X6": 0.782 * (X2 ** 2) * X6,
    "X5·X6·X9": -0.746 * X5 * X6 * X9,
    "X2·X5²": -0.717 * X2 * (X5 ** 2),
    "X4·X5²": 0.677 * X4 * (X5 ** 2)
  };

  const labels = Object.keys(contribuciones);
  const data = Object.values(contribuciones).map(v => parseFloat(v.toFixed(2)));

  // Eliminar gráfica anterior si existe
  if (grafico) grafico.destroy();

  // Crear nueva gráfica
  const ctx = document.getElementById('grafico').getContext('2d');
  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Contribución al valor de Y',
        data: data,
        backgroundColor: data.map(v => v >= 0 ? 'rgba(0, 123, 255, 0.7)' : 'rgba(255, 99, 132, 0.7)'),
        borderColor: data.map(v => v >= 0 ? 'rgba(0, 123, 255, 1)' : 'rgba(255, 99, 132, 1)'),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}
