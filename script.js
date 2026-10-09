// Especies Arbóreas Nativas de Chile (D.S. N° 68 / 2009 MINAGRI)
const ESPECIES_NATIVAS_DS68 = [
    { cientifico: "Nothofagus obliqua", comun: "Roble" },
    { cientifico: "Nothofagus alpina", comun: "Raulí" },
    { cientifico: "Nothofagus dombeyi", comun: "Coigüe común" },
    { cientifico: "Nothofagus pumilio", comun: "Lape / Lenga" },
    { cientifico: "Nothofagus antarctica", comun: "Ñirre" },
    { cientifico: "Nothofagus glauca", comun: "Hualo" },
    { cientifico: "Nothofagus alessandrii", comun: "Ruil" },
    { cientifico: "Nothofagus nitida", comun: "Coigüe de Chiloé" },
    { cientifico: "Araucaria araucana", comun: "Pehuén / Araucaria" },
    { cientifico: "Fitzroya cupressoides", comun: "Alerce" },
    { cientifico: "Austrocedrus chilensis", comun: "Ciprés de la Cordillera" },
    { cientifico: "Pilgerodendron uviferum", comun: "Ciprés de las Guaitecas" },
    { cientifico: "Drimys winteri", comun: "Canelo" },
    { cientifico: "Laurelia sempervirens", comun: "Laurel" },
    { cientifico: "Laureliopsis philippiana", comun: "Tepa" },
    { cientifico: "Eucryphia cordifolia", comun: "Ulmo" },
    { cientifico: "Aextoxicon punctatum", comun: "Olivillo" },
    { cientifico: "Gevuina avellana", comun: "Avellano" },
    { cientifico: "Lomatia hirsuta", comun: "Radal" },
    { cientifico: "Cryptocarya alba", comun: "Peumo" },
    { cientifico: "Lithraea caustica", comun: "Litre" },
    { cientifico: "Quillaja saponaria", comun: "Quillay" },
    { cientifico: "Maytenus boaria", comun: "Maitén" },
    { cientifico: "Acacia caven", comun: "Espino" },
    { cientifico: "Podocarpus salignus", comun: "Mañío de hoja larga" },
    { cientifico: "Saxegothaea conspicua", comun: "Mañío hembra / Macho" },
    { cientifico: "Luma apiculata", comun: "Arrayán" },
    { cientifico: "Myrceugenia exsucca", comun: "Pitra" },
    { cientifico: "Crinodendron patagua", comun: "Patagua" },
    { cientifico: "Persea lingue", comun: "Lingue" },
    { cientifico: "Beilschmiedia miersii", comun: "Belloto del norte" },
    { cientifico: "Beilschmiedia berteroana", comun: "Belloto del sur" }
];

// Datos de Ejemplo Predefinidos para Demostración
const EJEMPLO_PARAMETROS = {
    rodalName: "Rodal R-01 (San Francisco)",
    superficieRodal: 14.80,
    tipoForestal: "Roble-Raulí-Coigüe",
    estructuraRodal: "Irregular",
    estadoDesarrollo: "Fustal",
    tipoMuestreo: "Sistemático Aleatorio",
    numParcelas: 4,
    areaParcela: 500,
    formaParcela: "Circular",
    amplitudClase: 5
};

const EJEMPLO_REGISTROS = [
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Roble", dap: 12.5, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Roble", dap: 18.2, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Roble", dap: 22.0, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Raulí", dap: 14.1, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Coigüe común", dap: 31.4, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Roble", dap: 26.5, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Raulí", dap: 19.8, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Raulí", dap: 28.3, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Canelo", dap: 11.2, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 3, especie: "Roble", dap: 34.0, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 3, especie: "Coigüe común", dap: 21.5, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 3, especie: "Radal", dap: 16.0, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 4, especie: "Roble", dap: 23.4, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 4, especie: "Raulí", dap: 38.1, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 4, especie: "Ulmo", dap: 15.5, corta: "NO" }
];

// Estado global de la aplicación
let parametrosValidados = null;
let registrosIngresados = [];
let chartEstructura = null;
let chartAreaBasal = null;
let chartComparativa = null;

document.addEventListener("DOMContentLoaded", () => {
    poblarSelectEspecies();
    setupEventListeners();
    actualizarEstadoInterfaz(false);
});

function poblarSelectEspecies() {
    const select = document.getElementById("especieSelect");
    select.innerHTML = "";
    ESPECIES_NATIVAS_DS68.forEach(esp => {
        const option = document.createElement("option");
        option.value = esp.comun;
        option.textContent = `${esp.comun} (${esp.cientifico})`;
        select.appendChild(option);
    });
}

function setupEventListeners() {
    // Formulario de Parámetros
    document.getElementById("formParametros").addEventListener("submit", (e) => {
        e.preventDefault();
        validarGuardarParametros();
    });

    // Cargar Ejemplo
    document.getElementById("btnCargarEjemplo").addEventListener("click", cargarEjemploCompleto);

    // Formulario de Ingreso de Campo
    document.getElementById("treeForm").addEventListener("submit", (e) => {
        e.preventDefault();
        agregarArbol();
    });

    // Limpiar Todo
    document.getElementById("btnBorrarTodo").addEventListener("click", () => {
        if (confirm("¿Desea eliminar todos los registros de árboles del inventario?")) {
            registrosIngresados = [];
            procesarYActualizarTodo();
        }
    });

    // Exportar Excel
    document.getElementById("btnExportarExcel").addEventListener("click", exportarTablaExcel);
}

function validarGuardarParametros() {
    const rodalName = document.getElementById("rodalName").value.trim();
    const superficieRodal = parseFloat(document.getElementById("superficieRodal").value);
    const tipoForestal = document.getElementById("tipoForestal").value;
    const estructuraRodal = document.getElementById("estructuraRodal").value;
    const estadoDesarrollo = document.getElementById("estadoDesarrollo").value;
    const tipoMuestreo = document.getElementById("tipoMuestreo").value;
    const numParcelas = parseInt(document.getElementById("numParcelas").value);
    const areaParcela = parseFloat(document.getElementById("areaParcela").value);
    const formaParcela = document.getElementById("formaParcela").value;
    const amplitudClase = parseFloat(document.getElementById("amplitudClase").value);

    if (!rodalName || !superficieRodal || !tipoForestal || !estructuraRodal || 
        !estadoDesarrollo || !tipoMuestreo || !numParcelas || !areaParcela || !formaParcela || !amplitudClase) {
        alert("Por favor complete TODOS los parámetros obligatorios del Rodal.");
        return;
    }

    parametrosValidados = {
        rodalName, superficieRodal, tipoForestal, estructuraRodal,
        estadoDesarrollo, tipoMuestreo, numParcelas, areaParcela,
        formaParcela, amplitudClase
    };

    actualizarEstadoInterfaz(true);
    renderizarResumenParametros();
    procesarYActualizarTodo();
    alert("✅ Parámetros del Rodal validados exitosamente. Ahora puede ingresar datos de campo y generar la Tabla de Rodal.");
}

function cargarEjemploCompleto() {
    document.getElementById("rodalName").value = EJEMPLO_PARAMETROS.rodalName;
    document.getElementById("superficieRodal").value = EJEMPLO_PARAMETROS.superficieRodal;
    document.getElementById("tipoForestal").value = EJEMPLO_PARAMETROS.tipoForestal;
    document.getElementById("estructuraRodal").value = EJEMPLO_PARAMETROS.estructuraRodal;
    document.getElementById("estadoDesarrollo").value = EJEMPLO_PARAMETROS.estadoDesarrollo;
    document.getElementById("tipoMuestreo").value = EJEMPLO_PARAMETROS.tipoMuestreo;
    document.getElementById("numParcelas").value = EJEMPLO_PARAMETROS.numParcelas;
    document.getElementById("areaParcela").value = EJEMPLO_PARAMETROS.areaParcela;
    document.getElementById("formaParcela").value = EJEMPLO_PARAMETROS.formaParcela;
    document.getElementById("amplitudClase").value = EJEMPLO_PARAMETROS.amplitudClase;

    parametrosValidados = { ...EJEMPLO_PARAMETROS };
    registrosIngresados = JSON.parse(JSON.stringify(EJEMPLO_REGISTROS));

    actualizarEstadoInterfaz(true);
    renderizarResumenParametros();
    procesarYActualizarTodo();
}

function actualizarEstadoInterfaz(habilitado) {
    const statusBadge = document.getElementById("statusParametros");
    const lockWarning = document.getElementById("lockWarningCampo");
    
    const inputsCampo = ["parcelaNo", "especieSelect", "dapInput", "cortaSelect", "btnAgregarArbol", "btnBorrarTodo", "btnExportarExcel"];

    if (habilitado) {
        statusBadge.textContent = "Validado";
        statusBadge.className = "badge badge-success";
        lockWarning.style.display = "none";
        inputsCampo.forEach(id => document.getElementById(id).removeAttribute("disabled"));
    } else {
        statusBadge.textContent = "Incompleto";
        statusBadge.className = "badge badge-warning";
        lockWarning.style.display = "block";
        inputsCampo.forEach(id => document.getElementById(id).setAttribute("disabled", "true"));
    }
}

function renderizarResumenParametros() {
    const container = document.getElementById("resumenParametrosRodal");
    if (!parametrosValidados) return;

    const p = parametrosValidados;
    const supMuestreadaHa = (p.numParcelas * p.areaParcela) / 10000;
    const intenMuestreoPct = (supMuestreadaHa / p.superficieRodal) * 100;

    container.innerHTML = `
        <div class="info-rodal-grid">
            <div class="info-rodal-item"><span class="label">Rodal:</span><strong>${p.rodalName} (${p.superficieRodal} ha)</strong></div>
            <div class="info-rodal-item"><span class="label">Tipo Forestal (Art. 19 D.S. 259):</span><strong>${p.tipoForestal}</strong></div>
            <div class="info-rodal-item"><span class="label">Estructura / Estado:</span><strong>${p.estructuraRodal} | ${p.estadoDesarrollo}</strong></div>
            <div class="info-rodal-item"><span class="label">Diseño de Muestreo:</span><strong>${p.tipoMuestreo} (${p.formaParcela})</strong></div>
            <div class="info-rodal-item"><span class="label">Parcelas / Superficie:</span><strong>${p.numParcelas} parc. de ${p.areaParcela} m²</strong></div>
            <div class="info-rodal-item"><span class="label">Intensidad Muestreo:</span><strong>${supMuestreadaHa.toFixed(3)} ha (${intenMuestreoPct.toFixed(2)}%)</strong></div>
        </div>
    `;
}

function agregarArbol() {
    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal antes de ingresar árboles.");
        return;
    }

    const parcela = parseInt(document.getElementById("parcelaNo").value);
    const especie = document.getElementById("especieSelect").value;
    const dap = parseFloat(document.getElementById("dapInput").value);
    const corta = document.getElementById("cortaSelect").value;

    if (isNaN(dap) || dap <= 0) {
        alert("Por favor ingrese un valor válido de DAP.");
        return;
    }

    registrosIngresados.push({
        rodal: parametrosValidados.rodalName,
        parcela,
        especie,
        dap,
        corta
    });

    document.getElementById("dapInput").value = "";
    document.getElementById("dapInput").focus();
    procesarYActualizarTodo();
}

function eliminarArbol(index) {
    registrosIngresados.splice(index, 1);
    procesarYActualizarTodo();
}

function procesarYActualizarTodo() {
    renderizarTablaIngresos();
    const resultadoRodal = calcularTablaRodal();
    renderizarTablaRodal(resultadoRodal);
    actualizarGraficos(resultadoRodal);
}

function renderizarTablaIngresos() {
    const tbody = document.getElementById("tbodyIngresos");
    tbody.innerHTML = "";
    document.getElementById("totalRegistrosCount").textContent = registrosIngresados.length;

    registrosIngresados.forEach((item, index) => {
        const g = (Math.PI / 40000) * Math.pow(item.dap, 2);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.rodal}</td>
            <td>${item.parcela}</td>
            <td><strong>${item.especie}</strong></td>
            <td>${item.dap.toFixed(1)}</td>
            <td>${g.toFixed(4)}</td>
            <td><span style="color: ${item.corta === 'SI' ? '#c62828' : '#2e7d32'}; font-weight:bold;">${item.corta === 'SI' ? 'Corta' : 'Residual'}</span></td>
            <td><button class="btn btn-danger btn-sm" onclick="eliminarArbol(${index})">❌</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function calcularTablaRodal() {
    if (!parametrosValidados) {
        document.getElementById("factorExpansionText").textContent = "--";
        return { clases: [], especiesEspeciales: [], datos: {}, factorExpansion: 0 };
    }

    const { numParcelas, areaParcela, amplitudClase } = parametrosValidados;
    const factorExpansion = 10000 / (numParcelas * areaParcela);
    document.getElementById("factorExpansionText").textContent = `${factorExpansion.toFixed(2)} (1 ha / ${(numParcelas * areaParcela)} m² muestreados)`;

    if (registrosIngresados.length === 0) {
        return { clases: [], especiesEspeciales: [], datos: {}, factorExpansion };
    }

    // Identificar las 3 especies más frecuentes
    const contexEspecies = {};
    registrosIngresados.forEach(r => {
        contexEspecies[r.especie] = (contexEspecies[r.especie] || 0) + 1;
    });

    const especiesOrdenadas = Object.keys(contexEspecies).sort((a,b) => contexEspecies[b] - contexEspecies[a]);
    const topEspecies = especiesOrdenadas.slice(0, 3);

    const daps = registrosIngresados.map(r => r.dap);
    const minDap = Math.floor(Math.min(...daps) / amplitudClase) * amplitudClase;
    const maxDap = Math.ceil(Math.max(...daps) / amplitudClase) * amplitudClase;

    const clases = [];
    for (let c = minDap; c < maxDap; c += amplitudClase) {
        clases.push({
            min: c,
            max: c + amplitudClase,
            mc: c + (amplitudClase / 2)
        });
    }

    const especiesColumnas = [...topEspecies, "Otras", "Total"];
    
    const matriz = clases.map(() => {
        const rowObj = {};
        especiesColumnas.forEach(esp => {
            rowObj[esp] = { nIni: 0, nRes: 0, gIni: 0, gRes: 0 };
        });
        return rowObj;
    });

    const totalesEspecie = {};
    especiesColumnas.forEach(esp => {
        totalesEspecie[esp] = { nIni: 0, nRes: 0, gIni: 0, gRes: 0 };
    });

    registrosIngresados.forEach(arb => {
        const gArbol = (Math.PI / 40000) * Math.pow(arb.dap, 2);
        
        let claseIdx = clases.findIndex(cl => arb.dap >= cl.min && arb.dap < cl.max);
        if (claseIdx === -1) {
            claseIdx = clases.length - 1;
        }

        const columnaEsp = topEspecies.includes(arb.especie) ? arb.especie : "Otras";

        // Inicial
        matriz[claseIdx][columnaEsp].nIni += factorExpansion;
        matriz[claseIdx][columnaEsp].gIni += gArbol * factorExpansion;
        matriz[claseIdx]["Total"].nIni += factorExpansion;
        matriz[claseIdx]["Total"].gIni += gArbol * factorExpansion;

        totalesEspecie[columnaEsp].nIni += factorExpansion;
        totalesEspecie[columnaEsp].gIni += gArbol * factorExpansion;
        totalesEspecie["Total"].nIni += factorExpansion;
        totalesEspecie["Total"].gIni += gArbol * factorExpansion;

        // Residual
        if (arb.corta === "NO") {
            matriz[claseIdx][columnaEsp].nRes += factorExpansion;
            matriz[claseIdx][columnaEsp].gRes += gArbol * factorExpansion;
            matriz[claseIdx]["Total"].nRes += factorExpansion;
            matriz[claseIdx]["Total"].gRes += gArbol * factorExpansion;

            totalesEspecie[columnaEsp].nRes += factorExpansion;
            totalesEspecie[columnaEsp].gRes += gArbol * factorExpansion;
            totalesEspecie["Total"].nRes += factorExpansion;
            totalesEspecie["Total"].gRes += gArbol * factorExpansion;
        }
    });

    return {
        clases,
        topEspecies,
        especiesColumnas,
        matriz,
        totalesEspecie,
        factorExpansion
    };
}

function renderizarTablaRodal(res) {
    const thead = document.getElementById("theadRodal");
    const tbody = document.getElementById("tbodyRodal");
    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (!res.clases || res.clases.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10">No hay datos suficientes para estructurar la Tabla de Rodal. Complete los parámetros e ingrese árboles de campo.</td></tr>`;
        return;
    }

    const tr1 = document.createElement("tr");
    tr1.innerHTML = `<th rowspan="2" colspan="2">Rango (cm)<br>≤ Ø <</th><th rowspan="2">Mc</th>`;
    res.especiesColumnas.forEach(esp => {
        tr1.innerHTML += `<th colspan="4">${esp}</th>`;
    });
    thead.appendChild(tr1);

    const tr2 = document.createElement("tr");
    res.especiesColumnas.forEach(() => {
        tr2.innerHTML += `<th colspan="2" class="sub-header">N (árb./ha)</th><th colspan="2" class="sub-header">G (m²/ha)</th>`;
    });
    thead.appendChild(tr2);

    const tr3 = document.createElement("tr");
    tr3.innerHTML = `<th>Min</th><th>Max</th><th>cm</th>`;
    res.especiesColumnas.forEach(() => {
        tr3.innerHTML += `<th>Ini.</th><th>Res.</th><th>Ini.</th><th>Res.</th>`;
    });
    thead.appendChild(tr3);

    res.clases.forEach((cl, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${cl.min}</td>
            <td>${cl.max}</td>
            <td>${cl.mc.toFixed(1)}</td>
        `;

        res.especiesColumnas.forEach(esp => {
            const cell = res.matriz[i][esp];
            tr.innerHTML += `
                <td>${cell.nIni > 0 ? cell.nIni.toFixed(0) : '-'}</td>
                <td>${cell.nRes > 0 ? cell.nRes.toFixed(0) : '-'}</td>
                <td>${cell.gIni > 0 ? cell.gIni.toFixed(2) : '-'}</td>
                <td>${cell.gRes > 0 ? cell.gRes.toFixed(2) : '-'}</td>
            `;
        });
        tbody.appendChild(tr);
    });

    const trTotal = document.createElement("tr");
    trTotal.className = "total-row";
    trTotal.innerHTML = `<td colspan="3"><strong>TOTAL RODAL</strong></td>`;
    res.especiesColumnas.forEach(esp => {
        const tot = res.totalesEspecie[esp];
        trTotal.innerHTML += `
            <td><strong>${tot.nIni.toFixed(0)}</strong></td>
            <td><strong>${tot.nRes.toFixed(0)}</strong></td>
            <td><strong>${tot.gIni.toFixed(2)}</strong></td>
            <td><strong>${tot.gRes.toFixed(2)}</strong></td>
        `;
    });
    tbody.appendChild(trTotal);
}

function actualizarGraficos(res) {
    if (!res.clases || res.clases.length === 0) return;

    const labelsClases = res.clases.map(c => `${c.min}-${c.max} cm`);
    
    const dataNIni = res.clases.map((_, i) => res.matriz[i]["Total"].nIni);
    const dataNRes = res.clases.map((_, i) => res.matriz[i]["Total"].nRes);

    if (chartEstructura) chartEstructura.destroy();
    chartEstructura = new Chart(document.getElementById("chartEstructuraDiametrica"), {
        type: 'bar',
        data: {
            labels: labelsClases,
            datasets: [
                { label: 'N° Inicial (árb./ha)', data: dataNIni, backgroundColor: '#81c784' },
                { label: 'N° Residual (árb./ha)', data: dataNRes, backgroundColor: '#2e7d32' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Árboles / ha' } } }
        }
    });

    const especiesLabels = res.especiesColumnas.filter(e => e !== "Total");
    const dataGPorEspecie = especiesLabels.map(esp => res.totalesEspecie[esp].gIni);

    if (chartAreaBasal) chartAreaBasal.destroy();
    chartAreaBasal = new Chart(document.getElementById("chartAreaBasalEspecie"), {
        type: 'doughnut',
        data: {
            labels: especiesLabels,
            datasets: [{
                data: dataGPorEspecie,
                backgroundColor: ['#2e7d32', '#1565c0', '#ff8f00', '#78909c']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    const totGlobal = res.totalesEspecie["Total"];
    if (chartComparativa) chartComparativa.destroy();
    chartComparativa = new Chart(document.getElementById("chartComparativaManejo"), {
        type: 'bar',
        data: {
            labels: ['Densidad (árb./ha)', 'Área Basal (m²/ha)'],
            datasets: [
                { label: 'Inicial', data: [totGlobal.nIni, totGlobal.gIni], backgroundColor: '#90caf9' },
                { label: 'Corta (Extraído)', data: [totGlobal.nIni - totGlobal.nRes, totGlobal.gIni - totGlobal.gRes], backgroundColor: '#e57373' },
                { label: 'Residual (Remanente)', data: [totGlobal.nRes, totGlobal.gRes], backgroundColor: '#66bb6a' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

function exportarTablaExcel() {
    if (typeof XLSX === 'undefined') {
        alert("La librería SheetJS no está disponible.");
        return;
    }

    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal.");
        return;
    }

    const res = calcularTablaRodal();
    if (!res.clases || res.clases.length === 0) {
        alert("No hay datos suficientes para exportar.");
        return;
    }

    const p = parametrosValidados;
    const ws1Data = [];

    // Encabezado normativo
    ws1Data.push(["12.3.9 TABLA DE RODAL INICIAL Y RESIDUAL (INVENTARIO Y MANEJO FORESTAL)"]);
    ws1Data.push([]);
    ws1Data.push(["Identificador Rodal:", p.rodalName, "", "Superficie Rodal (ha):", p.superficieRodal]);
    ws1Data.push(["Tipo Forestal (Art. 19 D.S. 259):", p.tipoForestal, "", "Estructura:", p.estructuraRodal]);
    ws1Data.push(["Estado de Desarrollo:", p.estadoDesarrollo, "", "Diseño Muestreo:", p.tipoMuestreo]);
    ws1Data.push(["N° Parcelas:", p.numParcelas, "", "Superficie Parcela (m²):", p.areaParcela]);
    ws1Data.push(["Forma Parcela:", p.formaParcela, "", "Amplitud Clase (cm):", p.amplitudClase]);
    ws1Data.push([]);

    // Header Fila 1 Especies
    const rowH1 = ["Rango (cm) ≤ Ø <", "", "Mc"];
    res.especiesColumnas.forEach(esp => rowH1.push(esp, "", "", ""));
    ws1Data.push(rowH1);

    // Header Fila 2 N y G
    const rowH2 = ["Min", "Max", "cm"];
    res.especiesColumnas.forEach(() => rowH2.push("N (árb./ha)", "", "G (m²/ha)", ""));
    ws1Data.push(rowH2);

    // Header Fila 3 Ini / Res
    const rowH3 = ["", "", ""];
    res.especiesColumnas.forEach(() => rowH3.push("Ini.", "Res.", "Ini.", "Res."));
    ws1Data.push(rowH3);

    // Filas de clases
    res.clases.forEach((cl, i) => {
        const row = [cl.min, cl.max, cl.mc];
        res.especiesColumnas.forEach(esp => {
            const c = res.matriz[i][esp];
            row.push(c.nIni, c.nRes, c.gIni, c.gRes);
        });
        ws1Data.push(row);
    });

    // Totales
    const rowTot = ["TOTAL RODAL", "", ""];
    res.especiesColumnas.forEach(esp => {
        const t = res.totalesEspecie[esp];
        rowTot.push(t.nIni, t.nRes, t.gIni, t.gRes);
    });
    ws1Data.push(rowTot);

    const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);

    // Hoja 2: Registros de Campo
    const ws2Data = [
        ["PARÁMETROS DEL RODAL:"],
        ["Rodal", p.rodalName],
        ["Tipo Forestal", p.tipoForestal],
        ["Estructura", p.estructuraRodal],
        ["Estado Desarrollo", p.estadoDesarrollo],
        ["Superficie (ha)", p.superficieRodal],
        [],
        ["DETALLE DE REGISTROS DE CAMPO:"],
        ["Rodal", "Parcela", "Especie", "DAP (cm)", "Área Basal Individual g (m²)", "Intervención (Corta)"]
    ];

    registrosIngresados.forEach(item => {
        const g = (Math.PI / 40000) * Math.pow(item.dap, 2);
        ws2Data.push([item.rodal, item.parcela, item.especie, item.dap, g, item.corta]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Hoja1_TablaRodal");
    XLSX.utils.book_append_sheet(wb, ws2, "Hoja2_DatosCampo");

    XLSX.writeFile(wb, `Tabla_Rodal_${p.rodalName.replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`);
}
