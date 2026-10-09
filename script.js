// Listado de Especies Arbóreas Nativas de Chile (D.S. N° 68 / 2009 MINAGRI)
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
    { cientifico: "Aextoxicon punctatum", comun: "Olivecillo" },
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

// Estado global
let registrosIngresados = [];
let chartEstructura = null;
let chartAreaBasal = null;
let chartComparativa = null;

// Datos de Ejemplo Predefinidos
const DATOS_EJEMPLO = [
    { rodal: "Rodal 1", parcela: 1, especie: "Roble", dap: 12.5, corta: "NO" },
    { rodal: "Rodal 1", parcela: 1, especie: "Roble", dap: 18.2, corta: "NO" },
    { rodal: "Rodal 1", parcela: 1, especie: "Roble", dap: 22.0, corta: "SI" },
    { rodal: "Rodal 1", parcela: 1, especie: "Raulí", dap: 14.1, corta: "NO" },
    { rodal: "Rodal 1", parcela: 1, especie: "Coigüe común", dap: 31.4, corta: "SI" },
    { rodal: "Rodal 1", parcela: 2, especie: "Roble", dap: 26.5, corta: "NO" },
    { rodal: "Rodal 1", parcela: 2, especie: "Raulí", dap: 19.8, corta: "NO" },
    { rodal: "Rodal 1", parcela: 2, especie: "Raulí", dap: 28.3, corta: "SI" },
    { rodal: "Rodal 1", parcela: 2, especie: "Canelo", dap: 11.2, corta: "NO" },
    { rodal: "Rodal 1", parcela: 3, especie: "Roble", dap: 34.0, corta: "SI" },
    { rodal: "Rodal 1", parcela: 3, especie: "Coigüe común", dap: 21.5, corta: "NO" },
    { rodal: "Rodal 1", parcela: 3, especie: "Radal", dap: 16.0, corta: "NO" },
    { rodal: "Rodal 1", parcela: 4, especie: "Roble", dap: 23.4, corta: "NO" },
    { rodal: "Rodal 1", parcela: 4, especie: "Raulí", dap: 38.1, corta: "SI" },
    { rodal: "Rodal 1", parcela: 4, especie: "Ulmo", dap: 15.5, corta: "NO" }
];

document.addEventListener("DOMContentLoaded", () => {
    poblarSelectEspecies();
    setupEventListeners();
    procesarYActualizarTodo();
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
    document.getElementById("treeForm").addEventListener("submit", (e) => {
        e.preventDefault();
        agregarArbol();
    });

    document.getElementById("btnCargarEjemplo").addEventListener("click", () => {
        registrosIngresados = JSON.parse(JSON.stringify(DATOS_EJEMPLO));
        procesarYActualizarTodo();
    });

    document.getElementById("btnBorrarTodo").addEventListener("click", () => {
        if (confirm("¿Está seguro de eliminar todos los registros del inventario?")) {
            registrosIngresados = [];
            procesarYActualizarTodo();
        }
    });

    document.getElementById("btnExportarExcel").addEventListener("click", exportarTablaExcel);

    ["rodalName", "numParcelas", "areaParcela", "amplitudClase"].forEach(id => {
        document.getElementById(id).addEventListener("change", procesarYActualizarTodo);
    });
}

function agregarArbol() {
    const rodal = document.getElementById("rodalName").value || "Rodal 1";
    const parcela = parseInt(document.getElementById("parcelaNo").value);
    const especie = document.getElementById("especieSelect").value;
    const dap = parseFloat(document.getElementById("dapInput").value);
    const corta = document.getElementById("cortaSelect").value;

    if (isNaN(dap) || dap <= 0) {
        alert("Por favor ingrese un valor de DAP válido.");
        return;
    }

    registrosIngresados.push({ rodal, parcela, especie, dap, corta });
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
    const numParcelas = Math.max(1, parseInt(document.getElementById("numParcelas").value) || 1);
    const areaParcelaM2 = Math.max(1, parseFloat(document.getElementById("areaParcela").value) || 500);
    const ampClase = Math.max(1, parseFloat(document.getElementById("amplitudClase").value) || 5);

    const factorExpansion = 10000 / (numParcelas * areaParcelaM2);
    document.getElementById("factorExpansiónText").textContent = `${factorExpansion.toFixed(2)} (1 ha / ${numParcelas * areaParcelaM2} m² muestreados)`;

    if (registrosIngresados.length === 0) {
        return { clases: [], especiesEspeciales: [], datos: {}, factorExpansion };
    }

    const contexEspecies = {};
    registrosIngresados.forEach(r => {
        contexEspecies[r.especie] = (contexEspecies[r.especie] || 0) + 1;
    });

    const especiesOrdenadas = Object.keys(contexEspecies).sort((a,b) => contexEspecies[b] - contexEspecies[a]);
    const topEspecies = especiesOrdenadas.slice(0, 3);

    const daps = registrosIngresados.map(r => r.dap);
    const minDap = Math.floor(Math.min(...daps) / ampClase) * ampClase;
    const maxDap = Math.ceil(Math.max(...daps) / ampClase) * ampClase;

    const clases = [];
    for (let c = minDap; c < maxDap; c += ampClase) {
        clases.push({
            min: c,
            max: c + ampClase,
            mc: c + (ampClase / 2)
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

        matriz[claseIdx][columnaEsp].nIni += factorExpansion;
        matriz[claseIdx][columnaEsp].gIni += gArbol * factorExpansion;
        matriz[claseIdx]["Total"].nIni += factorExpansion;
        matriz[claseIdx]["Total"].gIni += gArbol * factorExpansion;

        totalesEspecie[columnaEsp].nIni += factorExpansion;
        totalesEspecie[columnaEsp].gIni += gArbol * factorExpansion;
        totalesEspecie["Total"].nIni += factorExpansion;
        totalesEspecie["Total"].gIni += gArbol * factorExpansion;

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
        tbody.innerHTML = `<tr><td colspan="10">No hay datos suficientes para estructurar la Tabla de Rodal. Complete el ingreso de campo.</td></tr>`;
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

    const res = calcularTablaRodal();
    if (!res.clases || res.clases.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    const ws1Data = [];
    ws1Data.push(["12.3.9 Tabla de rodal inicial y residual, después de la intervención inmediata"]);
    ws1Data.push([]);
    ws1Data.push(["Rodal:", document.getElementById("rodalName").value]);
    ws1Data.push([]);

    const rowH1 = ["Rango (cm) ≤ Ø <", "", "Mc"];
    res.especiesColumnas.forEach(esp => rowH1.push(esp, "", "", ""));
    ws1Data.push(rowH1);

    const rowH2 = ["Min", "Max", "cm"];
    res.especiesColumnas.forEach(() => rowH2.push("N (árb./ha)", "", "G (m²/ha)", ""));
    ws1Data.push(rowH2);

    const rowH3 = ["", "", ""];
    res.especiesColumnas.forEach(() => rowH3.push("Ini.", "Res.", "Ini.", "Res."));
    ws1Data.push(rowH3);

    res.clases.forEach((cl, i) => {
        const row = [cl.min, cl.max, cl.mc];
        res.especiesColumnas.forEach(esp => {
            const c = res.matriz[i][esp];
            row.push(c.nIni, c.nRes, c.gIni, c.gRes);
        });
        ws1Data.push(row);
    });

    const rowTot = ["TOTAL", "", ""];
    res.especiesColumnas.forEach(esp => {
        const t = res.totalesEspecie[esp];
        rowTot.push(t.nIni, t.nRes, t.gIni, t.gRes);
    });
    ws1Data.push(rowTot);

    const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);

    const ws2Data = [["Rodal", "Parcela", "Especie", "DAP (cm)", "Corta"]];
    registrosIngresados.forEach(item => {
        ws2Data.push([item.rodal, item.parcela, item.especie, item.dap, item.corta]);
    });
    const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Hoja1_TablaRodal");
    XLSX.utils.book_append_sheet(wb, ws2, "Hoja2_DatosCampo");

    XLSX.writeFile(wb, `Tabla_de_Rodal_${document.getElementById("rodalName").value || 'Forestal'}.xlsx`);
}
