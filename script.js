// Especies Arbóreas Nativas de Chile (D.S. N° 68 / 2009 MINAGRI) y Ecuaciones Volumétricas
const ESPECIES_NATIVAS_DS68 = [
    { cientifico: "Nothofagus obliqua", comun: "Roble", ecuacion: "V = 0.0000632 * (DAP^1.921) * (H^0.985)", fForma: 0.60, fuente: "INFOR / CONAF (Ecuación de volumen fustal para Nothofagus obliqua)" },
    { cientifico: "Nothofagus alpina", comun: "Raulí", ecuacion: "V = 0.0000589 * (DAP^1.945) * (H^0.970)", fForma: 0.62, fuente: "INFOR (Modelos alométricos para Raulí en renovales)" },
    { cientifico: "Nothofagus dombeyi", comun: "Coigüe común", ecuacion: "V = 0.0000512 * (DAP^2.012) * (H^0.950)", fForma: 0.58, fuente: "CONAF (Ecuación volumétrica para Coigüe en bosque nativo adulto)" },
    { cientifico: "Nothofagus pumilio", comun: "Lape / Lenga", ecuacion: "V = 0.0000670 * (DAP^1.890) * (H^1.010)", fForma: 0.55, fuente: "INFOR (Tarifas de volumen fustal para Lenga en la Patagonia)" },
    { cientifico: "Nothofagus antarctica", comun: "Ñirre", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma fustal estándar f = 0.50 para Bosque Achaparrado" },
    { cientifico: "Nothofagus glauca", comun: "Hualo", ecuacion: "V = 0.0000610 * (DAP^1.930) * (H^0.970)", fForma: 0.57, fuente: "INFOR (Modelos de biomasa y volumen para Roble-Hualo)" },
    { cientifico: "Nothofagus alessandrii", comun: "Ruil", ecuacion: "V = g * H * 0.55", fForma: 0.55, fuente: "Factor de forma fustal f = 0.55 (Especie protegida)" },
    { cientifico: "Nothofagus nitida", comun: "Coigüe de Chiloé", ecuacion: "V = 0.0000530 * (DAP^1.990) * (H^0.960)", fForma: 0.58, fuente: "INFOR (Ecuación de volumen para Siempreverde insular)" },
    { cientifico: "Araucaria araucana", comun: "Pehuén / Araucaria", ecuacion: "V = g * H * 0.65", fForma: 0.65, fuente: "Factor de forma cilíndrico alto f = 0.65 para Araucaria (Donoso, 1993)" },
    { cientifico: "Fitzroya cupressoides", comun: "Alerce", ecuacion: "V = g * H * 0.60", fForma: 0.60, fuente: "Factor de forma fustal f = 0.60 para Alerce (Monumento Natural)" },
    { cientifico: "Austrocedrus chilensis", comun: "Ciprés de la Cordillera", ecuacion: "V = 0.0000720 * (DAP^1.850) * (H^0.990)", fForma: 0.55, fuente: "INFOR (Estudio volumétrico de Ciprés de la Cordillera)" },
    { cientifico: "Pilgerodendron uviferum", comun: "Ciprés de las Guaitecas", ecuacion: "V = g * H * 0.55", fForma: 0.55, fuente: "Factor de forma f = 0.55 (Zonas húmedas australes)" },
    { cientifico: "Drimys winteri", comun: "Canelo", ecuacion: "V = 0.0000550 * (DAP^1.980) * (H^0.940)", fForma: 0.56, fuente: "INFOR / U. de Chile (Modelos volumétricos para Canelo)" },
    { cientifico: "Laurelia sempervirens", comun: "Laurel", ecuacion: "V = 0.0000600 * (DAP^1.910) * (H^0.970)", fForma: 0.58, fuente: "CONAF (Ecuación fustal Tipo Siempreverde)" },
    { cientifico: "Laureliopsis philippiana", comun: "Tepa", ecuacion: "V = 0.0000570 * (DAP^1.950) * (H^0.960)", fForma: 0.57, fuente: "INFOR (Modelos volumétricos para Tepa)" },
    { cientifico: "Eucryphia cordifolia", comun: "Ulmo", ecuacion: "V = 0.0000640 * (DAP^1.900) * (H^0.980)", fForma: 0.60, fuente: "INFOR (Ecuaciones de biomasa y volumen de Ulmo)" },
    { cientifico: "Aextoxicon punctatum", comun: "Olivillo", ecuacion: "V = 0.0000580 * (DAP^1.930) * (H^0.960)", fForma: 0.56, fuente: "CONAF / INFOR (Ecuación Tipo Bosque Olivillo)" },
    { cientifico: "Gevuina avellana", comun: "Avellano", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Lomatia hirsuta", comun: "Radal", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Cryptocarya alba", comun: "Peumo", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Lithraea caustica", comun: "Litre", ecuacion: "V = g * H * 0.45", fForma: 0.45, fuente: "Factor de forma f = 0.45" },
    { cientifico: "Quillaja saponaria", comun: "Quillay", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "CONAF" },
    { cientifico: "Maytenus boaria", comun: "Maitén", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Acacia caven", comun: "Espino", ecuacion: "V = g * H * 0.45", fForma: 0.45, fuente: "INFOR" },
    { cientifico: "Podocarpus salignus", comun: "Mañío de hoja larga", ecuacion: "V = g * H * 0.58", fForma: 0.58, fuente: "Factor de forma f = 0.58" },
    { cientifico: "Saxegothaea conspicua", comun: "Mañío hembra / Macho", ecuacion: "V = g * H * 0.58", fForma: 0.58, fuente: "Factor de forma f = 0.58" },
    { cientifico: "Luma apiculata", comun: "Arrayán", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Myrceugenia exsucca", comun: "Pitra", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Crinodendron patagua", comun: "Patagua", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Persea lingue", comun: "Lingue", ecuacion: "V = g * H * 0.55", fForma: 0.55, fuente: "Factor de forma f = 0.55" },
    { cientifico: "Beilschmiedia miersii", comun: "Belloto del norte", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" },
    { cientifico: "Beilschmiedia berteroana", comun: "Belloto del sur", ecuacion: "V = g * H * 0.50", fForma: 0.50, fuente: "Factor de forma f = 0.50" }
];

// Datos de Ejemplo Predefinidos
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
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Roble", dap: 12.5, altura: 10.5, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Roble", dap: 18.2, altura: 14.0, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Roble", dap: 22.0, altura: 16.5, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Raulí", dap: 14.1, altura: 12.0, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 1, especie: "Coigüe común", dap: 31.4, altura: 21.0, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Roble", dap: 26.5, altura: 18.0, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Raulí", dap: 19.8, altura: 15.2, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Raulí", dap: 28.3, altura: 19.0, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 2, especie: "Canelo", dap: 11.2, altura: 9.5, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 3, especie: "Roble", dap: 34.0, altura: 22.5, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 3, especie: "Coigüe común", dap: 21.5, altura: 16.0, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 3, especie: "Radal", dap: 16.0, altura: 11.0, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 4, especie: "Roble", dap: 23.4, altura: 17.2, corta: "NO" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 4, especie: "Raulí", dap: 38.1, altura: 24.0, corta: "SI" },
    { rodal: "Rodal R-01 (San Francisco)", parcela: 4, especie: "Ulmo", dap: 15.5, altura: 13.0, corta: "NO" }
];

// Estado global de la aplicación
let parametrosValidados = null;
let registrosIngresados = [];
let alturasPromedioEspecie = {};
let chartEstructura = null;
let chartVolumen = null;
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
    document.getElementById("formParametros").addEventListener("submit", (e) => {
        e.preventDefault();
        validarGuardarParametros();
    });

    document.getElementById("btnCargarEjemplo").addEventListener("click", cargarEjemploCompleto);

    document.getElementById("treeForm").addEventListener("submit", (e) => {
        e.preventDefault();
        agregarArbol();
    });

    document.getElementById("btnBorrarTodo").addEventListener("click", () => {
        if (confirm("¿Desea eliminar todos los registros de árboles del inventario?")) {
            registrosIngresados = [];
            procesarYActualizarTodo();
        }
    });

    document.getElementById("btnExportarExcel").addEventListener("click", exportarTablaExcel);

    // Eventos de Importación de Archivos
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", procesarArchivoSubido);

    document.getElementById("btnDescargarPlantillaExcel").addEventListener("click", descargarPlantillaExcel);
    document.getElementById("btnDescargarPlantillaTxt").addEventListener("click", descargarPlantillaTxt);

    // Drag & Drop
    const dropzone = document.getElementById("dropzoneContainer");
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("dragover"); });
    dropzone.addEventListener("dragleave", () => { dropzone.classList.remove("dragover"); });
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (!parametrosValidados) {
            alert("Debe validar los parámetros del rodal antes de cargar archivos.");
            return;
        }
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            procesarArchivoSubido();
        }
    });
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
    const lockWarningAlt = document.getElementById("lockWarningAltura");
    const lockWarningImport = document.getElementById("lockWarningImport");

    const inputsCampo = ["fileInput", "parcelaNo", "especieSelect", "dapInput", "alturaInput", "cortaSelect", "btnAgregarArbol", "btnBorrarTodo", "btnExportarExcel"];

    if (habilitado) {
        statusBadge.textContent = "Validado";
        statusBadge.className = "badge badge-success";
        lockWarning.style.display = "none";
        lockWarningAlt.style.display = "none";
        lockWarningImport.style.display = "none";
        inputsCampo.forEach(id => document.getElementById(id).removeAttribute("disabled"));
    } else {
        statusBadge.textContent = "Incompleto";
        statusBadge.className = "badge badge-warning";
        lockWarning.style.display = "block";
        lockWarningAlt.style.display = "block";
        lockWarningImport.style.display = "block";
        inputsCampo.forEach(id => document.getElementById(id).setAttribute("disabled", "true"));
    }
}

// PROCESAMIENTO DE ARCHIVOS SUBIDOS (EXCEL / TXT / CSV)
function procesarArchivoSubido() {
    const fileInput = document.getElementById("fileInput");
    const feedback = document.getElementById("importFeedback");
    const file = fileInput.files[0];

    if (!file) return;

    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal.");
        return;
    }

    const fileName = file.name.toLowerCase();
    feedback.innerHTML = `<p style="color:#0288d1;">⏳ Procesando archivo: <strong>${file.name}</strong>...</p>`;

    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.SheetNames[0];
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { defval: "" });
                importarArrayNormalizado(jsonData, file.name);
            } catch (err) {
                feedback.innerHTML = `<div class="alert alert-warning">❌ Error al leer archivo Excel: ${err.message}</div>`;
            }
        };
        reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith(".txt") || fileName.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const parseado = parsearTextoPlano(text);
                importarArrayNormalizado(parseado, file.name);
            } catch (err) {
                feedback.innerHTML = `<div class="alert alert-warning">❌ Error al leer archivo de texto: ${err.message}</div>`;
            }
        };
        reader.readAsText(file);
    } else {
        feedback.innerHTML = `<div class="alert alert-warning">⚠️ Formato no soportado. Suba un archivo .xlsx, .xls, .txt o .csv</div>`;
    }
}

function parsearTextoPlano(texto) {
    const lineas = texto.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lineas.length < 2) return [];

    // Detectar delimitador (tabulador, coma, punto y coma)
    const primeraFila = lineas[0];
    let delim = '\t';
    if (primeraFila.includes(';')) delim = ';';
    else if (primeraFila.includes(',')) delim = ',';

    const headers = primeraFila.split(delim).map(h => h.trim());
    const result = [];

    for (let i = 1; i < lineas.length; i++) {
        const cols = lineas[i].split(delim).map(c => c.trim());
        if (cols.length >= 3) {
            const rowObj = {};
            headers.forEach((h, idx) => {
                rowObj[h] = cols[idx] !== undefined ? cols[idx] : "";
            });
            result.push(rowObj);
        }
    }
    return result;
}

function importarArrayNormalizado(dataArray, nombreArchivo) {
    const feedback = document.getElementById("importFeedback");
    if (!dataArray || dataArray.length === 0) {
        feedback.innerHTML = `<div class="alert alert-warning">⚠️ El archivo no contiene filas o datos legibles.</div>`;
        return;
    }

    let contadorValidos = 0;
    let contadorErrores = 0;

    dataArray.forEach(row => {
        // Normalización de claves (case insensitive)
        const keys = Object.keys(row);
        const findKey = (name) => keys.find(k => k.trim().toLowerCase() === name.toLowerCase());

        const keyParcela = findKey("parcela") || findKey("num_parcela") || findKey("p");
        const keyEspecie = findKey("especie") || findKey("esp") || findKey("nombre_especie");
        const keyDap = findKey("dap") || findKey("dap_cm") || findKey("diametro");
        const keyAltura = findKey("altura") || findKey("h") || findKey("altura_m");
        const keyCorta = findKey("corta") || findKey("intervencion") || findKey("cortar");

        const parcela = parseInt(row[keyParcela]) || 1;
        let especieRaw = String(row[keyEspecie] || "").trim();
        const dap = parseFloat(String(row[keyDap]).replace(',', '.'));
        const altura = row[keyAltura] ? parseFloat(String(row[keyAltura]).replace(',', '.')) : null;
        let cortaRaw = String(row[keyCorta] || "NO").trim().toUpperCase();

        // Mapeo Inteligente de Nombre de Especie
        let especieEncontrada = ESPECIES_NATIVAS_DS68.find(e => 
            e.comun.toLowerCase() === especieRaw.toLowerCase() || 
            e.cientifico.toLowerCase() === especieRaw.toLowerCase()
        );

        const especieFinal = especieEncontrada ? especieEncontrada.comun : (especieRaw || "Roble");
        const cortaFinal = (cortaRaw === "SI" || cortaRaw === "S" || cortaRaw === "1" || cortaRaw === "CORTA") ? "SI" : "NO";

        if (!isNaN(dap) && dap > 0) {
            registrosIngresados.push({
                rodal: parametrosValidados.rodalName,
                parcela,
                especie: especieFinal,
                dap,
                altura: (!isNaN(altura) && altura > 0) ? altura : null,
                corta: cortaFinal
            });
            contadorValidos++;
        } else {
            contadorErrores++;
        }
    });

    feedback.innerHTML = `
        <div class="alert alert-success">
            ✅ <strong>Importación exitosa desde ${nombreArchivo}:</strong> Se cargaron <strong>${contadorValidos}</strong> árboles correctamente.
            ${contadorErrores > 0 ? `<br><small>(${contadorErrores} filas fueron omitidas por formato o DAP inválido)</small>` : ''}
        </div>
    `;

    document.getElementById("fileInput").value = "";
    procesarYActualizarTodo();
}

// DESCARGA DE PLANTILLAS
function descargarPlantillaExcel() {
    const wsData = [
        ["Parcela", "Especie", "Dap", "Altura", "Corta"],
        [1, "Roble", 18.5, 14.0, "NO"],
        [1, "Raulí", 22.0, 16.5, "SI"],
        [1, "Coigüe común", 31.4, 20.0, "NO"],
        [2, "Roble", 25.8, 17.5, "NO"],
        [2, "Canelo", 12.0, 10.0, "NO"]
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parcelas_Campo");
    XLSX.writeFile(wb, "Plantilla_Ingreso_Parcelas_Forestales.xlsx");
}

function descargarPlantillaTxt() {
    const contenido = "Parcela\tEspecie\tDap\tAltura\tCorta\n" +
                      "1\tRoble\t18.5\t14.0\tNO\n" +
                      "1\tRaulí\t22.0\t16.5\tSI\n" +
                      "1\tCoigüe común\t31.4\t20.0\tNO\n" +
                      "2\tRoble\t25.8\t17.5\tNO\n" +
                      "2\tCanelo\t12.0\t10.0\tNO";

    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Plantilla_Ingreso_Parcelas_Forestales.txt";
    link.click();
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
            <div class="info-rodal-item"><span class="label">Tipo Forestal:</span><strong>${p.tipoForestal}</strong></div>
            <div class="info-rodal-item"><span class="label">Estructura / Estado:</span><strong>${p.estructuraRodal} | ${p.estadoDesarrollo}</strong></div>
            <div class="info-rodal-item"><span class="label">Diseño Muestreo:</span><strong>${p.tipoMuestreo} (${p.formaParcela})</strong></div>
            <div class="info-rodal-item"><span class="label">Parcelas / Superficie:</span><strong>${p.numParcelas} parc. de ${p.areaParcela} m²</strong></div>
            <div class="info-rodal-item"><span class="label">Intensidad Muestreo:</span><strong>${supMuestreadaHa.toFixed(3)} ha (${intenMuestreoPct.toFixed(2)}%)</strong></div>
        </div>
    `;
}

function agregarArbol() {
    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal.");
        return;
    }

    const parcela = parseInt(document.getElementById("parcelaNo").value);
    const especie = document.getElementById("especieSelect").value;
    const dap = parseFloat(document.getElementById("dapInput").value);
    const altura = parseFloat(document.getElementById("alturaInput").value) || null;
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
        altura,
        corta
    });

    document.getElementById("dapInput").value = "";
    document.getElementById("alturaInput").value = "";
    document.getElementById("dapInput").focus();
    procesarYActualizarTodo();
}

function eliminarArbol(index) {
    registrosIngresados.splice(index, 1);
    procesarYActualizarTodo();
}

function procesarYActualizarTodo() {
    actualizarConfiguracionAlturas();
    renderizarTablaIngresos();
    const resultadoRodal = calcularTablaRodal();
    renderizarTablaRodal(resultadoRodal);
    renderizarAnexoFormulas(resultadoRodal);
    actualizarGraficos(resultadoRodal);
}

function actualizarConfiguracionAlturas() {
    const container = document.getElementById("containerAlturasEspecie");
    container.innerHTML = "";

    if (registrosIngresados.length === 0) {
        container.innerHTML = "<p><em>No hay registros de campo ingresados o importados aún.</em></p>";
        return;
    }

    const especiesPresentes = [...new Set(registrosIngresados.map(r => r.especie))];

    especiesPresentes.forEach(espNombre => {
        const arbolesEspecie = registrosIngresados.filter(r => r.especie === espNombre);
        const alturasValidas = arbolesEspecie.map(r => r.altura).filter(h => h !== null && !isNaN(h) && h > 0);
        
        let altPromedio = 15.0;
        if (alturasValidas.length > 0) {
            altPromedio = alturasValidas.reduce((a,b) => a+b, 0) / alturasValidas.length;
        } else if (alturasPromedioEspecie[espNombre]) {
            altPromedio = alturasPromedioEspecie[espNombre];
        }

        alturasPromedioEspecie[espNombre] = parseFloat(altPromedio.toFixed(1));

        const infoEspecieObj = ESPECIES_NATIVAS_DS68.find(e => e.comun === espNombre) || {
            ecuacion: "V = g * H * 0.50",
            fuente: "Factor de forma f = 0.50"
        };

        const divCard = document.createElement("div");
        divCard.className = "especie-altura-card";
        divCard.innerHTML = `
            <div><strong>🌳 ${espNombre}</strong></div>
            <div class="form-group">
                <label>Altura Promedio H (m):</label>
                <input type="number" step="0.1" min="1" value="${alturasPromedioEspecie[espNombre]}" onchange="actualizarAlturaEspecieManual('${espNombre}', this.value)">
            </div>
            <div style="font-size:0.78rem; color:#424242; margin-top:0.2rem;">
                <strong>Ecuación:</strong> ${infoEspecieObj.ecuacion}<br>
                <strong>Fuente:</strong> ${infoEspecieObj.fuente}
            </div>
        `;
        container.appendChild(divCard);
    });
}

function actualizarAlturaEspecieManual(especie, valor) {
    const v = parseFloat(valor);
    if (!isNaN(v) && v > 0) {
        alturasPromedioEspecie[especie] = v;
        procesarYActualizarTodo();
    }
}

function calcularVolumenArbol(dap, alturaM, especieNombre) {
    const espObj = ESPECIES_NATIVAS_DS68.find(e => e.comun === especieNombre);
    const g = (Math.PI / 40000) * Math.pow(dap, 2);
    const H = alturaM;

    if (!espObj) return g * H * 0.50;

    const eq = espObj.ecuacion;
    if (eq.includes("DAP^")) {
        if (especieNombre === "Roble") return 0.0000632 * Math.pow(dap, 1.921) * Math.pow(H, 0.985);
        else if (especieNombre === "Raulí") return 0.0000589 * Math.pow(dap, 1.945) * Math.pow(H, 0.970);
        else if (especieNombre === "Coigüe común") return 0.0000512 * Math.pow(dap, 2.012) * Math.pow(H, 0.950);
        else if (especieNombre === "Lape / Lenga") return 0.0000670 * Math.pow(dap, 1.890) * Math.pow(H, 1.010);
        else if (especieNombre === "Hualo") return 0.0000610 * Math.pow(dap, 1.930) * Math.pow(H, 0.970);
        else if (especieNombre === "Coigüe de Chiloé") return 0.0000530 * Math.pow(dap, 1.990) * Math.pow(H, 0.960);
        else if (especieNombre === "Ciprés de la Cordillera") return 0.0000720 * Math.pow(dap, 1.850) * Math.pow(H, 0.990);
        else if (especieNombre === "Canelo") return 0.0000550 * Math.pow(dap, 1.980) * Math.pow(H, 0.940);
        else if (especieNombre === "Laurel") return 0.0000600 * Math.pow(dap, 1.910) * Math.pow(H, 0.970);
        else if (especieNombre === "Tepa") return 0.0000570 * Math.pow(dap, 1.950) * Math.pow(H, 0.960);
        else if (especieNombre === "Ulmo") return 0.0000640 * Math.pow(dap, 1.900) * Math.pow(H, 0.980);
        else if (especieNombre === "Olivillo") return 0.0000580 * Math.pow(dap, 1.930) * Math.pow(H, 0.960);
    }

    const f = espObj.fForma || 0.50;
    return g * H * f;
}

function renderizarTablaIngresos() {
    const tbody = document.getElementById("tbodyIngresos");
    tbody.innerHTML = "";
    document.getElementById("totalRegistrosCount").textContent = registrosIngresados.length;

    registrosIngresados.forEach((item, index) => {
        const g = (Math.PI / 40000) * Math.pow(item.dap, 2);
        const H = item.altura || alturasPromedioEspecie[item.especie] || 15.0;
        const v = calcularVolumenArbol(item.dap, H, item.especie);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.rodal}</td>
            <td>${item.parcela}</td>
            <td><strong>${item.especie}</strong></td>
            <td>${item.dap.toFixed(1)}</td>
            <td>${H.toFixed(1)} ${item.altura ? '' : '<small>(prom)</small>'}</td>
            <td>${g.toFixed(4)}</td>
            <td>${v.toFixed(4)}</td>
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
            rowObj[esp] = { nIni: 0, nRes: 0, gIni: 0, gRes: 0, vIni: 0, vRes: 0 };
        });
        return rowObj;
    });

    const totalesEspecie = {};
    especiesColumnas.forEach(esp => {
        totalesEspecie[esp] = { nIni: 0, nRes: 0, gIni: 0, gRes: 0, vIni: 0, vRes: 0 };
    });

    registrosIngresados.forEach(arb => {
        const gArbol = (Math.PI / 40000) * Math.pow(arb.dap, 2);
        const H = arb.altura || alturasPromedioEspecie[arb.especie] || 15.0;
        const vArbol = calcularVolumenArbol(arb.dap, H, arb.especie);

        let claseIdx = clases.findIndex(cl => arb.dap >= cl.min && arb.dap < cl.max);
        if (claseIdx === -1) {
            claseIdx = clases.length - 1;
        }

        const columnaEsp = topEspecies.includes(arb.especie) ? arb.especie : "Otras";

        matriz[claseIdx][columnaEsp].nIni += factorExpansion;
        matriz[claseIdx][columnaEsp].gIni += gArbol * factorExpansion;
        matriz[claseIdx][columnaEsp].vIni += vArbol * factorExpansion;

        matriz[claseIdx]["Total"].nIni += factorExpansion;
        matriz[claseIdx]["Total"].gIni += gArbol * factorExpansion;
        matriz[claseIdx]["Total"].vIni += vArbol * factorExpansion;

        totalesEspecie[columnaEsp].nIni += factorExpansion;
        totalesEspecie[columnaEsp].gIni += gArbol * factorExpansion;
        totalesEspecie[columnaEsp].vIni += vArbol * factorExpansion;

        totalesEspecie["Total"].nIni += factorExpansion;
        totalesEspecie["Total"].gIni += gArbol * factorExpansion;
        totalesEspecie["Total"].vIni += vArbol * factorExpansion;

        if (arb.corta === "NO") {
            matriz[claseIdx][columnaEsp].nRes += factorExpansion;
            matriz[claseIdx][columnaEsp].gRes += gArbol * factorExpansion;
            matriz[claseIdx][columnaEsp].vRes += vArbol * factorExpansion;

            matriz[claseIdx]["Total"].nRes += factorExpansion;
            matriz[claseIdx]["Total"].gRes += gArbol * factorExpansion;
            matriz[claseIdx]["Total"].vRes += vArbol * factorExpansion;

            totalesEspecie[columnaEsp].nRes += factorExpansion;
            totalesEspecie[columnaEsp].gRes += gArbol * factorExpansion;
            totalesEspecie[columnaEsp].vRes += vArbol * factorExpansion;

            totalesEspecie["Total"].nRes += factorExpansion;
            totalesEspecie["Total"].gRes += gArbol * factorExpansion;
            totalesEspecie["Total"].vRes += vArbol * factorExpansion;
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
        tbody.innerHTML = `<tr><td colspan="12">No hay datos suficientes para estructurar la Tabla de Rodal. Complete los parámetros e ingrese o importe árboles de campo.</td></tr>`;
        return;
    }

    const tr1 = document.createElement("tr");
    tr1.innerHTML = `<th rowspan="2" colspan="2">Rango (cm)<br>≤ Ø <</th><th rowspan="2">Mc</th>`;
    res.especiesColumnas.forEach(esp => {
        const altProm = alturasPromedioEspecie[esp] ? ` (H=${alturasPromedioEspecie[esp]}m)` : '';
        tr1.innerHTML += `<th colspan="6">${esp}${altProm}</th>`;
    });
    thead.appendChild(tr1);

    const tr2 = document.createElement("tr");
    res.especiesColumnas.forEach(() => {
        tr2.innerHTML += `
            <th colspan="2" class="sub-header">N (árb./ha)</th>
            <th colspan="2" class="sub-header">G (m²/ha)</th>
            <th colspan="2" class="sub-header">V (m³/ha)</th>
        `;
    });
    thead.appendChild(tr2);

    const tr3 = document.createElement("tr");
    tr3.innerHTML = `<th>Min</th><th>Max</th><th>cm</th>`;
    res.especiesColumnas.forEach(() => {
        tr3.innerHTML += `<th>Ini.</th><th>Res.</th><th>Ini.</th><th>Res.</th><th>Ini.</th><th>Res.</th>`;
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
                <td>${cell.vIni > 0 ? cell.vIni.toFixed(2) : '-'}</td>
                <td>${cell.vRes > 0 ? cell.vRes.toFixed(2) : '-'}</td>
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
            <td><strong>${tot.vIni.toFixed(2)}</strong></td>
            <td><strong>${tot.vRes.toFixed(2)}</strong></td>
        `;
    });
    tbody.appendChild(trTotal);
}

function renderizarAnexoFormulas(res) {
    const tbody = document.getElementById("tbodyFormulasFuentes");
    tbody.innerHTML = "";

    const especiesPresentes = [...new Set(registrosIngresados.map(r => r.especie))];

    if (especiesPresentes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No hay especies registradas en el inventario.</td></tr>`;
        return;
    }

    especiesPresentes.forEach(espNombre => {
        const espObj = ESPECIES_NATIVAS_DS68.find(e => e.comun === espNombre) || {
            cientifico: espNombre,
            comun: espNombre,
            ecuacion: "V = g * H * 0.50",
            fuente: "Factor de forma f = 0.50 (Estándar genérico)"
        };

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${espObj.comun}</strong><br><em>(${espObj.cientifico})</em></td>
            <td><code>${espObj.ecuacion}</code></td>
            <td>DAP (cm), Altura H (m), Área Basal g (m²)</td>
            <td>${espObj.fuente}</td>
        `;
        tbody.appendChild(tr);
    });
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
    const dataVPorEspecie = especiesLabels.map(esp => res.totalesEspecie[esp].vIni);

    if (chartVolumen) chartVolumen.destroy();
    chartVolumen = new Chart(document.getElementById("chartVolumenEspecie"), {
        type: 'doughnut',
        data: {
            labels: especiesLabels,
            datasets: [{
                data: dataVPorEspecie,
                backgroundColor: ['#2e7d32', '#0288d1', '#f57f17', '#78909c']
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
            labels: ['Volumen Bruto (m³/ha)'],
            datasets: [
                { label: 'Volumen Inicial', data: [totGlobal.vIni], backgroundColor: '#90caf9' },
                { label: 'Volumen Corta (Extraído)', data: [totGlobal.vIni - totGlobal.vRes], backgroundColor: '#e57373' },
                { label: 'Volumen Residual', data: [totGlobal.vRes], backgroundColor: '#66bb6a' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Volumen m³/ha' } } }
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
    ws1Data.push(["12.3.9 TABLA DE RODAL INICIAL, RESIDUAL Y VOLUMETRÍA FORESTAL"]);
    ws1Data.push([]);
    ws1Data.push(["Identificador Rodal:", p.rodalName, "", "Superficie Rodal (ha):", p.superficieRodal]);
    ws1Data.push(["Tipo Forestal (Art. 19 D.S. 259):", p.tipoForestal, "", "Estructura:", p.estructuraRodal]);
    ws1Data.push(["Estado de Desarrollo:", p.estadoDesarrollo, "", "Diseño Muestreo:", p.tipoMuestreo]);
    ws1Data.push(["N° Parcelas:", p.numParcelas, "", "Superficie Parcela (m²):", p.areaParcela]);
    ws1Data.push(["Forma Parcela:", p.formaParcela, "", "Amplitud Clase (cm):", p.amplitudClase]);
    ws1Data.push([]);

    const rowH1 = ["Rango (cm) ≤ Ø <", "", "Mc"];
    res.especiesColumnas.forEach(esp => {
        const altP = alturasPromedioEspecie[esp] ? ` (H=${alturasPromedioEspecie[esp]}m)` : '';
        rowH1.push(`${esp}${altP}`, "", "", "", "", "");
    });
    ws1Data.push(rowH1);

    const rowH2 = ["Min", "Max", "cm"];
    res.especiesColumnas.forEach(() => rowH2.push("N (árb./ha)", "", "G (m²/ha)", "", "V (m³/ha)", ""));
    ws1Data.push(rowH2);

    const rowH3 = ["", "", ""];
    res.especiesColumnas.forEach(() => rowH3.push("Ini.", "Res.", "Ini.", "Res.", "Ini.", "Res."));
    ws1Data.push(rowH3);

    res.clases.forEach((cl, i) => {
        const row = [cl.min, cl.max, cl.mc];
        res.especiesColumnas.forEach(esp => {
            const c = res.matriz[i][esp];
            row.push(c.nIni, c.nRes, c.gIni, c.gRes, c.vIni, c.vRes);
        });
        ws1Data.push(row);
    });

    const rowTot = ["TOTAL RODAL", "", ""];
    res.especiesColumnas.forEach(esp => {
        const t = res.totalesEspecie[esp];
        rowTot.push(t.nIni, t.nRes, t.gIni, t.gRes, t.vIni, t.vRes);
    });
    ws1Data.push(rowTot);

    const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);

    const ws2Data = [
        ["PARÁMETROS DEL RODAL:"],
        ["Rodal", p.rodalName],
        ["Tipo Forestal", p.tipoForestal],
        ["Estructura", p.estructuraRodal],
        ["Superficie (ha)", p.superficieRodal],
        [],
        ["DETALLE DE REGISTROS DE CAMPO Y VOLUMETRÍA INDIVIDUAL:"],
        ["Rodal", "Parcela", "Especie", "DAP (cm)", "Altura H (m)", "Área Basal g (m²)", "Volumen Ind. v (m³)", "Intervención (Corta)"]
    ];

    registrosIngresados.forEach(item => {
        const g = (Math.PI / 40000) * Math.pow(item.dap, 2);
        const H = item.altura || alturasPromedioEspecie[item.especie] || 15.0;
        const v = calcularVolumenArbol(item.dap, H, item.especie);
        ws2Data.push([item.rodal, item.parcela, item.especie, item.dap, H, g, v, item.corta]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);

    const ws3Data = [
        ["ANEXO TÉCNICO: MEMORIA DE ECUACIONES DE VOLUMEN Y FUENTES BIBLIOGRÁFICAS"],
        [],
        ["Especie Arbórea Nativa", "Nombre Científico", "Ecuación de Volumen V (m³)", "Variables", "Fuente Bibliográfica / Referencia Técnica"]
    ];

    const especiesPresentes = [...new Set(registrosIngresados.map(r => r.especie))];
    especiesPresentes.forEach(espNombre => {
        const espObj = ESPECIES_NATIVAS_DS68.find(e => e.comun === espNombre) || {
            cientifico: espNombre,
            comun: espNombre,
            ecuacion: "V = g * H * 0.50",
            fuente: "Factor de forma f = 0.50"
        };
        ws3Data.push([espObj.comun, espObj.cientifico, espObj.ecuacion, "DAP (cm), Altura H (m), g (m²)", espObj.fuente]);
    });

    const ws3 = XLSX.utils.aoa_to_sheet(ws3Data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Hoja1_TablaRodal_Volumen");
    XLSX.utils.book_append_sheet(wb, ws2, "Hoja2_DatosCampo");
    XLSX.utils.book_append_sheet(wb, ws3, "Hoja3_Anexo_Formulas_Fuentes");

    XLSX.writeFile(wb, `Tabla_Rodal_Volumen_${p.rodalName.replace(/[^a-zA-Z0-9]/g, "_")}.xlsx`);
}
