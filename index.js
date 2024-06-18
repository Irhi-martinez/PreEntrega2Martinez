// Clase para representar un crédito
class Credito {
    constructor(monto, interes, plazo) {
        this.monto = monto;
        this.interes = interes;
        this.plazo = plazo;
        this.amortizacion = [];
    }

    // Método para calcular el crédito y la tabla de amortización
    calcularCredito() {
        const n = this.plazo;
        const tasaMensual = this.interes / 100 / 12;
        const cuotaMensual = (this.monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
        const totalPagar = cuotaMensual * n;

        let saldoRestante = this.monto;
        for (let i = 0; i < n; i++) {
            let interesMensual = saldoRestante * tasaMensual;
            let capitalMensual = cuotaMensual - interesMensual;
            saldoRestante -= capitalMensual;
            this.amortizacion.push(new Amortizacion(i + 1, cuotaMensual, capitalMensual, interesMensual, saldoRestante));
        }

        return {
            cuotaMensual: cuotaMensual.toFixed(2),
            totalPagar: totalPagar.toFixed(2),
            amortizacion: this.amortizacion
        };
    }
}

// Clase para representar una fila de la tabla de amortización
class Amortizacion {
    constructor(mes, cuota, capital, interes, saldo) {
        this.mes = mes;
        this.cuota = cuota.toFixed(2);
        this.capital = capital.toFixed(2);
        this.interes = interes.toFixed(2);
        this.saldo = saldo.toFixed(2);
    }
}

// Función para capturar entradas
function capturarEntradas() {
    const monto = parseFloat(document.getElementById('monto').value);
    const interes = parseFloat(document.getElementById('interes').value);
    const plazo = parseInt(document.getElementById('plazo').value);

    if (isNaN(monto) || isNaN(interes) || isNaN(plazo) || monto <= 0 || interes <= 0 || plazo <= 0) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    const credito = new Credito(monto, interes, plazo);
    const resultado = credito.calcularCredito();
    mostrarResultado(resultado);
}

// Función para mostrar el resultado
function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p>Cuota Mensual: $${resultado.cuotaMensual}</p>
        <p>Total a Pagar: $${resultado.totalPagar}</p>
        <h3>Amortización:</h3>
        <table>
            <tr>
                <th>Mes</th>
                <th>Cuota</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Saldo</th>
            </tr>
            ${resultado.amortizacion.map(amort => `
                <tr>
                    <td>${amort.mes}</td>
                    <td>${amort.cuota}</td>
                    <td>${amort.capital}</td>
                    <td>${amort.interes}</td>
                    <td>${amort.saldo}</td>
                </tr>
            `).join('')}
        </table>
    `;
}
