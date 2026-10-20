"use strict";

// =====================================================================
// Tabla de Distribución t-Student (dos colas al 95% de confianza)
// =====================================================================
const TABLA_T_STUDENT_95 = {
    1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571,
    6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
    11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131,
    16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
    21: 2.080, 22: 2.074, 23: 2.069, 24: 2.064, 25: 2.060,
    26: 2.056, 27: 2.052, 28: 2.048, 29: 2.045, 30: 2.042,
    40: 2.021, 60: 2.000, 120: 1.980, 1000: 1.960
};

function obtenerTStudent(gradosLibertad) {
    if (gradosLibertad <= 0) return 2.000;
    if (TABLA_T_STUDENT_95[gradosLibertad]) return TABLA_T_STUDENT_95[gradosLibertad];
    if (gradosLibertad > 30 && gradosLibertad < 40) return 2.030;
    if (gradosLibertad > 40 && gradosLibertad < 60) return 2.010;
    if (gradosLibertad > 60) return 1.980;
    return 2.000;
}

// =====================================================================
// FUNCIONES DE VOLUMEN — Compendio de Funciones Dendrométricas del Bosque Nativo
// =====================================================================
// Se incluyen las funciones de volumen de árboles individuales cuya ecuación
// reproduce la tabla de volumen impresa en la misma página del compendio
// (tolerancia 1 % o ±0,001 m³) y que usan DAP y altura total (o solo DAP).
// Se excluyeron las que requieren altura de comienzo de copa, altura comercial
// o altura no informada, y las que no coinciden con su propia tabla.
// Campos: pagina = página impresa del compendio; dlu = diámetro límite de
// utilización (cm); tablaD = rango de DAP de la tabla impresa.
const REFERENCIA_COMPENDIO = "Drake, F.; Emanuelli, P.; Acuña, E. (2003). Compendio de Funciones Dendrométricas del Bosque Nativo. CONAF – GTZ, Proyecto Conservación y Manejo Sustentable del Bosque Nativo. Santiago de Chile. ISBN 956-7982-03-1.";

// Funciones de volumen de árboles individuales transcritas de:
// Drake, F.; Emanuelli, P.; Acuña, E. (2003). Compendio de Funciones Dendrométricas del Bosque Nativo.
// CONAF - GTZ, Proyecto Conservación y Manejo Sustentable del Bosque Nativo. Santiago de Chile.
// Cada función fue verificada contra la tabla de volumen impresa en su misma página del compendio.
// D = DAP (cm), H = altura (m), V = volumen (m³). 'pagina' = página impresa del compendio.
const FUNCIONES_VOLUMEN = [
    {"id": "C23a", "pagina": 23, "titulo": "Alerce (Fitzroya cupressoides)", "especies": ["Alerce"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,0153415 + 0,0000602163 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1987", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Provincia de Valdivia", "tablaD": [10, 60], "fn": (D, H) => - 0.0153415 + 0.0000602163 * D**2*H },
    {"id": "C23b", "pagina": 23, "titulo": "Alerce (Fitzroya cupressoides)", "especies": ["Alerce"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,00002032 · D²H + 0,00000713 · D³", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1987", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Provincia de Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.00002032 * D**2*H + 0.00000713 * D**3 },
    {"id": "C24a", "pagina": 24, "titulo": "Alerce (Fitzroya cupressoides)", "especies": ["Alerce"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,0859142 + 0,0000988347 · D² − 0,00104059 · D · H + 0,0000465418 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1987", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9859", "localidad": "Provincia de Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.0859142 + 0.0000988347 * D**2 - 0.00104059 * D * H + 0.0000465418 * D**2*H },
    {"id": "C24b", "pagina": 24, "titulo": "Alerce (Fitzroya cupressoides)", "especies": ["Alerce"], "region": "X", "estado": "Sin Información", "ecuacion": "V = exp(− 10,291067 + 0,974113 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Kawas", "anio": "1978", "n": "27 árboles", "rangoD": "Sin información", "r2": "0,9880", "localidad": "Provincia de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 10.291067 + 0.974113 * Math.log (D**2*H))) },
    {"id": "C25a", "pagina": 25, "titulo": "Alerce (Fitzroya cupressoides)", "especies": ["Alerce"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,063254 + 0,000045 · D²H − 8,99 · 10⁻¹⁰ · (D²H)² + 9,297 · 10⁻¹⁵ · (D²H)³", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "85 árboles", "rangoD": "12 - 63 cm", "r2": "0,9660", "localidad": "Reserva Nacional Valdivia", "tablaD": [15, 60], "fn": (D, H) => - 0.063254 + 0.000045 * D**2*H - 8.99 * 1e-10 * (D**2*H)**2 + 9.297 * 1e-15 * (D**2*H)**3 },
    {"id": "C25b", "pagina": 25, "titulo": "Alerce (Fitzroya cupressoides)", "especies": ["Alerce"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,387862 + 0,000073 · D²H − 1,692089 · 10⁻¹⁰ · (D²H)² + 1,560314 · 10⁻¹⁵ · (D²H)³", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "51 árboles", "rangoD": "22,2 - 63 cm", "r2": "0,9505", "localidad": "Reserva Nacional Valdivia", "tablaD": [25, 60], "fn": (D, H) => - 0.387862 + 0.000073 * D**2*H - 1.692089 * 1e-10 * (D**2*H)**2 + 1.560314 * 1e-15 * (D**2*H)**3 },
    {"id": "C26a", "pagina": 26, "titulo": "Alerce (Fitzroya cupressoides) - Ciprés (Pilgerodendron uviferum)", "especies": ["Alerce", "Ciprés de las Guaitecas"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,000608051 + 0,000081064 · D² + 0,00061803 · D · H + 0,0000199 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1987", "n": "Sin información", "rangoD": "20 - 120 cm", "r2": "0,7479", "localidad": "Cordillera de los Andes. Provincia", "tablaD": [20, 120], "fn": (D, H) => -0.000608051 + 0.000081064 * D**2 + 0.00061803 * D * H + 0.0000199 * D**2*H },
    {"id": "C26b", "pagina": 26, "titulo": "Olivillo (Amomyrtus meli) - Tepa (Aextoxicum punctatum) - Tineo (Saxegothaea conspicua) - Ulmo (Podocarpus nubigena)", "especies": ["Alerce", "Avellano", "Canelo", "Coigüe de Chiloé", "Luma", "Mañío de hojas cortas", "Mañío de hojas punzantes", "Meli", "Olivillo", "Tepa", "Tineo", "Ulmo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000019 · D²H + 0,00024 · D²", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "1262 árboles", "rangoD": "6,5 - 98 cm", "r2": "0,9649", "localidad": "Reserva Nacional Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.000019 * D**2*H + 0.00024 * D**2 },
    {"id": "C27a", "pagina": 27, "titulo": "Olivillo (Amomyrtus meli) - Tepa (Aextoxicum punctatum) - Tineo (Saxegothaea conspicua) - Ulmo (Podocarpus nubigena)", "especies": ["Alerce", "Avellano", "Canelo", "Coigüe de Chiloé", "Luma", "Mañío de hojas cortas", "Mañío de hojas punzantes", "Meli", "Olivillo", "Tepa", "Tineo", "Ulmo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000019 · D²H + 0,000191 · D²", "usaH": true, "dlu": 15, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "1262 árboles", "rangoD": "15 - 98 cm", "r2": "0,9612", "localidad": "Reserva Nacional Valdivia", "tablaD": [15, 60], "fn": (D, H) => 0.000019 * D**2*H + 0.000191 * D**2 },
    {"id": "C28a", "pagina": 28, "titulo": "Araucaria (Araucaria araucana)", "especies": ["Araucaria"], "region": "VIII-IX", "estado": "Bosque Adulto", "ecuacion": "V = 0,00003544 · D²H + 0,00015692 · D²", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "UACH (1984), citado por Sandoval (1996)", "anio": "1984", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Cordillera Nahuelbuta", "tablaD": [15, 105], "fn": (D, H) => 0.00003544 * D**2*H + 0.00015692 * D**2 },
    {"id": "C28b", "pagina": 28, "titulo": "Araucaria (Araucaria araucana)", "especies": ["Araucaria"], "region": "IX", "estado": "Bosque Adulto", "ecuacion": "V = − 0,97089 + 0,000658 · D²", "usaH": false, "dlu": 0, "corteza": "con corteza", "altura": "No usa altura", "fuente": "JICA", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Reserva Forestal", "tablaD": [40, 105], "fn": (D, H) => -0.97089 + 0.000658*D**2 },
    {"id": "C29a", "pagina": 29, "titulo": "Arrayán (Myrceugenia apiculata)", "especies": ["Arrayán"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,0381 + 0,4731 · (D/100)² · (− 5,081+0,7704 · H)", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UCH", "anio": "1988", "n": "48 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Isla de Chiloé", "tablaD": [10, 60], "fn": (D, H) => 0.0381 + 0.4731*(D/100)**2*(-5.081+0.7704*H) },
    {"id": "C29b", "pagina": 29, "titulo": "Avellano (Gevuina avellana)", "especies": ["Avellano"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,0000799 + 0,000033318 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Peñaloza", "anio": "1985", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => 0.0000799 + 0.000033318 * D**2*H },
    {"id": "C30a", "pagina": 30, "titulo": "Avellano (Gevuina avellana)", "especies": ["Avellano"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000025 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "29 árboles", "rangoD": "11,2 - 27,2 cm", "r2": "0,8206", "localidad": "Reserva Nacional Valdivia", "tablaD": [12, 26], "fn": (D, H) => 0.000025 * D**2*H },
    {"id": "C30b", "pagina": 30, "titulo": "Avellano (Gevuina avellana) - Ulmo (Eucryphia cordifolia)", "especies": ["Avellano", "Ulmo"], "region": "VIII-IX", "estado": "Renoval", "ecuacion": "V = 0,00004057 · D²H + 0,00009389 · D²", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1984", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Cordillera Nahuelbuta", "tablaD": [10, 45], "fn": (D, H) => 0.00004057 * D**2*H + 0.00009389 * D**2 },
    {"id": "C31a", "pagina": 31, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,06524 + 0,00062 · D²", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Gunckel", "anio": "1980", "n": "27 árboles", "rangoD": "Sin información", "r2": "0,9584", "localidad": "Reserva Forestal Valdivia", "tablaD": [15, 60], "fn": (D, H) => - 0.06524 + 0.00062 * D**2 },
    {"id": "C31b", "pagina": 31, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,03 + 0,00063 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Gunckel", "anio": "1980", "n": "27 árboles", "rangoD": "Sin información", "r2": "0,9467", "localidad": "Reserva Forestal Valdivia", "tablaD": [10, 60], "fn": (D, H) => - 0.03 + 0.00063 * D**2 },
    {"id": "C32a", "pagina": 32, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,03588 + 0,00075 · D²", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Gunckel", "anio": "1980", "n": "27 árboles", "rangoD": "Sin información", "r2": "0,9351", "localidad": "Reserva Forestal Valdivia", "tablaD": [10, 60], "fn": (D, H) => - 0.03588 + 0.00075 * D**2 },
    {"id": "C32b", "pagina": 32, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Sin Información", "ecuacion": "V = (D/100)² · (− 0,73691 + 0,33301 · H)", "usaH": true, "dlu": 5, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UCH", "anio": "1988", "n": "272 árboles", "rangoD": "Sin información", "r2": "0,7193", "localidad": "Isla de Chiloé", "tablaD": [10, 60], "fn": (D, H) => (D/100)**2 * (- 0.73691 + 0.33301 * H) },
    {"id": "C33a", "pagina": 33, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Sin Información", "ecuacion": "V = exp(− 9,285) · D^2,015 · H^0,73", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Terranova S.A", "anio": "1990", "n": "88 árboles", "rangoD": "10 - 75 cm", "r2": "0,9821", "localidad": "Hacienda Chaihuín y Hacienda", "tablaD": [10, 60], "fn": (D, H) => Math.exp(-9.285)* D**2.015 * H**0.73 },
    {"id": "C33b", "pagina": 33, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,02266 + 0,00003103 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1980", "n": "27 árboles", "rangoD": "Sin información", "r2": "0,9860", "localidad": "Reserva Forestal Valdivia", "tablaD": [15, 60], "fn": (D, H) => -0.02266 + 0.00003103 * D**2*H },
    {"id": "C34a", "pagina": 34, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Sin Información", "ecuacion": "V = (D/100)² · (− 0,51886+0,31913 · H)", "usaH": true, "dlu": 5, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Niebuhr", "anio": "1988", "n": "278 árboles", "rangoD": "Sin información", "r2": "0,8048", "localidad": "Río Maullín - Lago Llanquihue", "tablaD": [10, 60], "fn": (D, H) => (D/100)**2*(-0.51886+0.31913*H) },
    {"id": "C34b", "pagina": 34, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Sin Información", "ecuacion": "V = 0,01222 + 0,0000315502 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Gunckel", "anio": "1980", "n": "27 árboles", "rangoD": "Sin información", "r2": "0,9821", "localidad": "Reserva Forestal Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.01222 + 0.0000315502 * D**2*H },
    {"id": "C35a", "pagina": 35, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Renoval", "ecuacion": "V = exp(− 10,121633 + 0,963638 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Kawas", "anio": "1978", "n": "37 árboles", "rangoD": "Sin información", "r2": "0,9565", "localidad": "Provincia de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 10.121633 + 0.963638 * Math.log (D**2*H))) },
    {"id": "C35b", "pagina": 35, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,0114 + 0,00063 · D²", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Tapia", "anio": "1982", "n": "47 árboles", "rangoD": "Sin información", "r2": "0,9139", "localidad": "Predio Quitaluto, Reserva Forestal Valdivia", "tablaD": [10, 60], "fn": (D, H) => - 0.0114 + 0.00063 * D**2 },
    {"id": "C36a", "pagina": 36, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,0000096543 · D²H + 0,00035 · D²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "170 árboles", "rangoD": "11 - 77 cm", "r2": "0,9560", "localidad": "Reserva Nacional Valdivia", "tablaD": [15, 60], "fn": (D, H) => 0.0000096543 * D**2*H + 0.00035 * D**2 },
    {"id": "C36b", "pagina": 36, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000007357 · D²H + 0,000371 · D²", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "117 árboles", "rangoD": "20,3 - 77 cm", "r2": "0,9541", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 60], "fn": (D, H) => 0.000007357 * D**2*H + 0.000371 * D**2 },
    {"id": "C37b", "pagina": 37, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "XII", "estado": "Sin Información", "ecuacion": "V = − 0,3767 + 0,0002 · D² + 0,0198 · H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Quiroz", "anio": "1990", "n": "38 árboles", "rangoD": "Sin información", "r2": "0,9409", "localidad": "Cordillera de la Costa", "tablaD": [20, 60], "fn": (D, H) => - 0.3767 + 0.0002 * D**2 + 0.0198 * H },
    {"id": "C38a", "pagina": 38, "titulo": "Canelo (Drimys winteri)", "especies": ["Canelo"], "region": "XII", "estado": "Sin Información", "ecuacion": "V = − 0,1185 + 0,0005 · D² + 0,0091 · H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Quiroz", "anio": "1990", "n": "35 árboles", "rangoD": "Sin información", "r2": "0,9409", "localidad": "Cordillera de la Costa", "tablaD": [15, 60], "fn": (D, H) => - 0.1185 + 0.0005 * D**2 + 0.0091 * H },
    {"id": "C39a", "pagina": 39, "titulo": "Ciprés de la Guaitecas (Pilgerodendron uvifera)", "especies": ["Ciprés de las Guaitecas"], "region": "X", "estado": "Sin Información", "ecuacion": "V = 0,0026518 + 0,0000206 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Cruz y Lara", "anio": "1981", "n": "47 árboles", "rangoD": "Sin información", "r2": "0,9848", "localidad": "Comuna de Quellón", "tablaD": [10, 60], "fn": (D, H) => 0.0026518 + 0.0000206 * D**2*H },
    {"id": "C40b", "pagina": 40, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 9,049) · D^1,95 · H^0,749", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "Terranova S.A", "anio": "1990", "n": "108 árboles", "rangoD": "15 - 110 cm", "r2": "0,9841", "localidad": "Hacienda Chaihuin y Hacienda Venecia", "tablaD": [20, 110], "fn": (D, H) => Math.exp (- 9.049) * D**1.95 * H**0.749 },
    {"id": "C41a", "pagina": 41, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Sin Información", "ecuacion": "V = − 0,001846 + 0,000037 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Maureira", "anio": "1995", "n": "30 árboles", "rangoD": "Sin información", "r2": "0,9216", "localidad": "Morrompulli", "tablaD": [10, 60], "fn": (D, H) => - 0.001846 + 0.000037 * D**2*H },
    {"id": "C42a", "pagina": 42, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,006066 + 0,000032 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura total (m)", "fuente": "UACH", "anio": "1995", "n": "30 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Las Palmas", "tablaD": [10, 60], "fn": (D, H) => - 0.006066 + 0.000032 * D**2*H },
    {"id": "C42b", "pagina": 42, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,05476487 + 0,00073611 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "INFOR", "anio": "1991", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Area Neltume", "tablaD": [10, 60], "fn": (D, H) => - 0.05476487 + 0.00073611 * D**2 },
    {"id": "C43a", "pagina": 43, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,01210478 + 0,000029462 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Cubillos", "anio": "1988", "n": "40 árboles", "rangoD": "Sin información", "r2": "0,9800", "localidad": "Panguipuli - Neltume", "tablaD": [10, 60], "fn": (D, H) => 0.01210478 + 0.000029462 * D**2*H },
    {"id": "C43b", "pagina": 43, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Renoval", "ecuacion": "V = exp(− 10,312929 + 0,991795 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Kawas", "anio": "1978", "n": "36 árboles", "rangoD": "Sin información", "r2": "0,9860", "localidad": "Provincia de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp (- 10.312929 + 0.991795 * Math.log (D**2*H)) },
    {"id": "C44a", "pagina": 44, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,004656537 + 0,000032538 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Lavanderos", "anio": "1997", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9898", "localidad": "Predio Los Troncos", "tablaD": [10, 60], "fn": (D, H) => 0.004656537 + 0.000032538 * D**2*H },
    {"id": "C44b", "pagina": 44, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "XI", "estado": "Renoval", "ecuacion": "V = − 0,000751218791 + 0,0000386766673 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Delgado", "anio": "1986", "n": "86 árboles", "rangoD": "Sin información", "r2": "0,9800", "localidad": "Laguna Pedro Aguirre", "tablaD": [10, 60], "fn": (D, H) => - 0.000751218791 + 0.0000386766673 * D**2*H },
    {"id": "C45a", "pagina": 45, "titulo": "Coihue (Nothofagus dombeyi)", "especies": ["Coigüe"], "region": "XI", "estado": "Renoval", "ecuacion": "V = exp(− 10,0257 + 0,968963 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Ferrando", "anio": "1994", "n": "31 árboles", "rangoD": "Sin información", "r2": "0,9799", "localidad": "Predio El Canelo", "tablaD": [10, 60], "fn": (D, H) => Math.exp (- 10.0257 + 0.968963 * Math.log (D**2*H)) },
    {"id": "C45b", "pagina": 45, "titulo": "Coihue (Nothofagus dombeyi) - Coihue de Magallanes (Nothofagus betuloides)", "especies": ["Coigüe", "Coigüe de Magallanes"], "region": "X", "estado": "Renoval", "ecuacion": "V = (D/100)² · (− 2,96307+0,4779 · H)", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UCH", "anio": "1988", "n": "38 árboles", "rangoD": "Sin información", "r2": "0,7960", "localidad": "Río Maullín - Llanquihue", "tablaD": [10, 60], "fn": (D, H) => (D/100)**2*(-2.96307+0.4779*H) },
    {"id": "C46a", "pagina": 46, "titulo": "Coihue (Nothofagus dombeyi) - Mañio (Podocarpus nubigena) - Roble (Nothofagus obliqua)", "especies": ["Coigüe", "Mañío de hojas punzantes", "Roble"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 10,367 + 0,997323 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nabil", "anio": "1978", "n": "96 árboles", "rangoD": "Sin información", "r2": "0,9663", "localidad": "Zona Costera de la Provincia", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 10.367 + 0.997323 * Math.log (D**2*H))) },
    {"id": "C46b", "pagina": 46, "titulo": "Coihue de Chiloé (Nothofagus nítida)", "especies": ["Coigüe de Chiloé"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,0000077273 · D²H + 0,000527 · D²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "187 árboles", "rangoD": "12,5 - 88,2 cm", "r2": "0,9756", "localidad": "Reserva Nacional Valdivia", "tablaD": [15, 60], "fn": (D, H) => 0.0000077273 * D**2*H + 0.000527 * D**2 },
    {"id": "C47a", "pagina": 47, "titulo": "Coihue de Chiloé (Nothofagus nítida)", "especies": ["Coigüe de Chiloé"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000007308044 · D²H + 0,0005 · D²", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "150 árboles", "rangoD": "20 - 88,2 cm", "r2": "0,9662", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 60], "fn": (D, H) => 0.000007308044 * D**2*H + 0.0005 * D**2 },
    {"id": "C48b", "pagina": 48, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,034547117 + 0,0000317108 · D²H", "usaH": true, "dlu": 10, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "El Ranchillo", "tablaD": [10, 50], "fn": (D, H) => 0.034547117 + 0.0000317108 * D**2*H },
    {"id": "C49a", "pagina": 49, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,00639217 + 0,0000309905 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Barrales", "anio": "1993", "n": "44 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "El Colorado", "tablaD": [10, 60], "fn": (D, H) => 0.00639217 + 0.0000309905 * D**2*H },
    {"id": "C49b", "pagina": 49, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,01110888 + 0,0000409735 · D²H", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "Barrales", "anio": "1993", "n": "44 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "El Colorado", "tablaD": [10, 60], "fn": (D, H) => 0.01110888 + 0.0000409735 * D**2*H },
    {"id": "C50a", "pagina": 50, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,00731631 + 0,0000311403 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Barrales", "anio": "1993", "n": "44 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "El Colorado", "tablaD": [10, 60], "fn": (D, H) => 0.00731631 + 0.0000311403 * D**2*H },
    {"id": "C50b", "pagina": 50, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,00976343 + 0,0000406346 · D²H", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "Barrales", "anio": "1993", "n": "44 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "El Colorado", "tablaD": [10, 60], "fn": (D, H) => 0.00976343 + 0.0000406346 * D**2*H },
    {"id": "C51a", "pagina": 51, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,0048874 + 0,000035024 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Valladares", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9799", "localidad": "El Colorado", "tablaD": [10, 60], "fn": (D, H) => 0.0048874 + 0.000035024 * D**2*H },
    {"id": "C53a", "pagina": 53, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,3939 − 0,03501 · D + 0,00142 · D²", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Pérez", "anio": "1985", "n": "29 árboles", "rangoD": "Sin información", "r2": "0,9600", "localidad": "Constitución", "tablaD": [10, 60], "fn": (D, H) => 0.3939 - 0.03501 * D + 0.00142 * D**2 },
    {"id": "C55a", "pagina": 55, "titulo": "Hualo (Nothofagus glauca)", "especies": ["Hualo"], "region": "VII", "estado": "Renoval", "ecuacion": "V = exp(− 9,519438 + 0,9152567 · ln(D²H)", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "198 árboles", "rangoD": "7 - 60 cm", "r2": "0,9574", "localidad": "Precordillera Andina", "tablaD": [10, 60], "fn": (D, H) => Math.exp(- 9.519438 + 0.9152567 * Math.log (D**2*H)) },
    {"id": "C55b", "pagina": 55, "titulo": "Laurel (Laurelia sempervirens) - Tepa (Laurelia philippiana) - Trevo (Dasyphyllum diacanthoides)", "especies": ["Laurel", "Tepa", "Trevo"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = − 0,0000799 + 0,000033318 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Peñaloza", "anio": "1985", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => - 0.0000799 + 0.000033318 * D**2*H },
    {"id": "C56b", "pagina": 56, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 10,6026 − 0,00000044665 · D³ + 0,8021 · ln(D²H) + 0,6757 · ln(D))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Ferrando", "anio": "1994", "n": "301 árboles", "rangoD": "Sin información", "r2": "0,9700", "localidad": "Predio El Canelo", "tablaD": [10, 60], "fn": (D, H) => Math.exp (- 10.6026 - 0.00000044665 * D**3 + 0.8021 * Math.log (D**2*H) + 0.6757 * Math.log (D)) },
    {"id": "C57a", "pagina": 57, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Renoval", "ecuacion": "V = 0,016092 + 0,00003 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Ferrando", "anio": "1994", "n": "108 árboles", "rangoD": "Sin información", "r2": "0,8800", "localidad": "Predio El Canelo", "tablaD": [10, 60], "fn": (D, H) => 0.016092 + 0.00003 * D**2*H },
    {"id": "C57b", "pagina": 57, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Envejecimiento", "ecuacion": "V = − 0,2667224 − 0,0000005079614 · D³ + 0,000048 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Ferrando", "anio": "1994", "n": "66 árboles", "rangoD": "Sin información", "r2": "0,8500", "localidad": "Predio El Canelo", "tablaD": [30, 130], "fn": (D, H) => -0.2667224 - 0.0000005079614 * D**3 + 0.000048 * D**2*H },
    {"id": "C58a", "pagina": 58, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Bosque Adulto", "ecuacion": "V = D² · (0,000286 + 0,0000215 · H)", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Alvarez y Grosse", "anio": "1978", "n": "44 árboles", "rangoD": "15 - 100 cm", "r2": "0,9637", "localidad": "Alto Mañihuales", "tablaD": [15, 100], "fn": (D, H) => D**2 * (0.000286 + 0.0000215 * H) },
    {"id": "C58b", "pagina": 58, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Bosque Adulto", "ecuacion": "V = 0,00893 + 0,0000159 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Alvarez y Grosse", "anio": "1978", "n": "44 árboles", "rangoD": "5 - 100 cm", "r2": "0,9324", "localidad": "Alto Mañihuales", "tablaD": [10, 95], "fn": (D, H) => 0.00893 + 0.0000159 * D**2*H },
    {"id": "C59a", "pagina": 59, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Bosque Adulto", "ecuacion": "V = − 0,0078 + 0,000871 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Alvarez y Grosse", "anio": "1978", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Alto Mañihuales", "tablaD": [10, 60], "fn": (D, H) => - 0.0078 + 0.000871 * D**2 },
    {"id": "C59b", "pagina": 59, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XI", "estado": "Bosque Adulto", "ecuacion": "V = 0,085 + 0,0000193 · D³", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Manosalva", "anio": "1995", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9460", "localidad": "Cerro La Virgen", "tablaD": [10, 100], "fn": (D, H) => 0.085 + 0.0000193 * D**3 },
    {"id": "C60a", "pagina": 60, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Sin Información", "ecuacion": "V = 0,001109 · D^1,89411", "usaH": false, "dlu": 0, "corteza": "con corteza", "altura": "No usa altura", "fuente": "Mosqueda", "anio": "1995", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9598", "localidad": "Comuna de Río Rubens", "tablaD": [10, 60], "fn": (D, H) => 0.001109 * D**1.89411 },
    {"id": "C60b", "pagina": 60, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Sin Información", "ecuacion": "V = 0,001126 · D^1,84682", "usaH": false, "dlu": 0, "corteza": "con corteza", "altura": "No usa altura", "fuente": "Mosqueda", "anio": "1995", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9598", "localidad": "Comuna de Río Rubens", "tablaD": [10, 60], "fn": (D, H) => 0.001126 * D**1.84682 },
    {"id": "C61a", "pagina": 61, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Sin Información", "ecuacion": "V = 0,001863 · D · H − 0,015086 · D", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "Mosqueda", "anio": "1995", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9498", "localidad": "Comuna de Río Rubens", "tablaD": [10, 60], "fn": (D, H) => 0.001863 * D * H - 0.015086 * D },
    {"id": "C62a", "pagina": 62, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Bosque Adulto", "ecuacion": "V = 0,030311892 + 0,00003272319 · D²H", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura total (m)", "fuente": "Schmidt y Urzúa", "anio": "1982", "n": "523 árboles", "rangoD": "12 - 82 cm", "r2": "Sin información", "localidad": "Reserva Forestal", "tablaD": [15, 60], "fn": (D, H) => 0.030311892 + 0.00003272319 * D**2*H },
    {"id": "C62b", "pagina": 62, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Bosque Adulto", "ecuacion": "V = 0,247641 − 0,01494661 · D + 0,0007925322 · D²", "usaH": false, "dlu": 0, "corteza": "con corteza", "altura": "No usa altura", "fuente": "Schmidt y Urzúa", "anio": "1982", "n": "523 árboles", "rangoD": "25 - 80 cm", "r2": "Sin información", "localidad": "Reserva Forestal de Skiring", "tablaD": [10, 60], "fn": (D, H) => 0.247641 - 0.01494661 * D + 0.0007925322 * D**2 },
    {"id": "C63b", "pagina": 63, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Bosque Adulto", "ecuacion": "V = 0,06061936 + 0,0000280696 · D²H", "usaH": true, "dlu": 10, "corteza": "con corteza", "altura": "Altura total (m)", "fuente": "Schmidt y Urzúa", "anio": "1982", "n": "523 árboles", "rangoD": "12 - 82 cm", "r2": "Sin información", "localidad": "Reserva Forestal de Skiring", "tablaD": [15, 60], "fn": (D, H) => 0.06061936 + 0.0000280696 * D**2*H },
    {"id": "C64a", "pagina": 64, "titulo": "Lenga (Nothofagus pumilio)", "especies": ["Lenga"], "region": "XII", "estado": "Bosque Adulto", "ecuacion": "V = 0,03744712 − 0,001943534 · D + 0,0005492494 · D²", "usaH": false, "dlu": 10, "corteza": "con corteza", "altura": "No usa altura", "fuente": "Schmidt y Urzúa", "anio": "1982", "n": "523 árboles", "rangoD": "12 - 82 cm", "r2": "Sin información", "localidad": "Reserva Forestal de Skiring", "tablaD": [15, 60], "fn": (D, H) => 0.03744712 - 0.001943534 * D + 0.0005492494 * D**2 },
    {"id": "C65b", "pagina": 65, "titulo": "Lenga (Nothofagus pumilio) - Coihue (Nothofagus dombeyi)", "especies": ["Coigüe", "Lenga"], "region": "XI", "estado": "Sin Información", "ecuacion": "V = 0,002874 + 0,00003998067 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Vera", "anio": "1985", "n": "115 árboles", "rangoD": "Sin información", "r2": "0,9866", "localidad": "Reserva Forestal Coyhaique", "tablaD": [10, 60], "fn": (D, H) => 0.002874 + 0.00003998067 * D**2*H },
    {"id": "C66a", "pagina": 66, "titulo": "Lingue (Persea lingue)", "especies": ["Lingue"], "region": "VIII-IX", "estado": "Sin Información", "ecuacion": "V = 0,00005084 · D²H + 0,000000468 · D²H²", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1984", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Cordillera de Nahuelbuta", "tablaD": [15, 60], "fn": (D, H) => 0.00005084 * D**2*H + 0.000000468 * D**2*H**2 },
    {"id": "C66b", "pagina": 66, "titulo": "Lingue (Persea lingue)", "especies": ["Lingue"], "region": "IX", "estado": "Bosque Adulto", "ecuacion": "V = − 0,041488 + 0,000448 · D² + 0,003063 · H", "usaH": true, "dlu": 10, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Santelices", "anio": "1989", "n": "22 árboles", "rangoD": "DAP > 30 cm", "r2": "0,9604", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => - 0.041488 + 0.000448 * D**2 + 0.003063 * H },
    {"id": "C67a", "pagina": 67, "titulo": "Lingue (Persea lingue)", "especies": ["Lingue"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = exp(− 9,8164928 + 1,7003591 · ln(D) + 1,0726914 · ln(H))", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Corti", "anio": "1996", "n": "18 árboles", "rangoD": "Sin información", "r2": "0,9918", "localidad": "Loncoche", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 9.8164928 + 1.7003591 * Math.log (D) + 1.0726914 * Math.log (H))) },
    {"id": "C67b", "pagina": 67, "titulo": "Lingue (Persea lingue)", "especies": ["Lingue"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,003155 + 0,000475 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Santelices", "anio": "1989", "n": "22 árboles", "rangoD": "Sin información", "r2": "0,9565", "localidad": "Jauja", "tablaD": [10, 50], "fn": (D, H) => 0.003155 + 0.000475 * D**2 },
    {"id": "C68a", "pagina": 68, "titulo": "Luma (Amomyrtus luma)", "especies": ["Luma"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000028 · D²H + 7,0473 · 10⁻¹⁰ · D²H² − 2,583 · 10⁻¹⁴ · D²H²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "49 árboles", "rangoD": "10,6 - 41,1 cm", "r2": "0,9832", "localidad": "Reserva Nacional Valdivia", "tablaD": [10, 40], "fn": (D, H) => 0.000028 * D**2*H + 7.0473 * 1e-10 * D**2*H**2 - 2.583 * 1e-14 * D**2*H**2 },
    {"id": "C68b", "pagina": 68, "titulo": "Mañio de hojas cortas (Saxegothaea conspicua)", "especies": ["Mañío de hojas cortas"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000013 · D²H + 0,0000267 · D²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "83 árboles", "rangoD": "10,30 - 58 cm", "r2": "0,9766", "localidad": "Reserva Nacional Valdivia", "tablaD": [10, 55], "fn": (D, H) => 0.000013 * D**2*H + 0.0000267 * D**2 },
    {"id": "C69a", "pagina": 69, "titulo": "Mañio de hojas cortas (Saxegothaea conspicua)", "especies": ["Mañío de hojas cortas"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000025 · D²H", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "48 árboles", "rangoD": "21 - 58 cm", "r2": "0,9627", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 55], "fn": (D, H) => 0.000025 * D**2*H },
    {"id": "C69b", "pagina": 69, "titulo": "Mañio de hojas cortas (Saxegothaea conspicua)", "especies": ["Mañío de hojas cortas"], "region": "X", "estado": "Sin Información", "ecuacion": "V = exp(− 9,915425 + 0,939798 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Kawas", "anio": "1978", "n": "30 árboles", "rangoD": "Sin información", "r2": "0,9841", "localidad": "Provincia de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 9.915425 + 0.939798 * Math.log (D**2*H))) },
    {"id": "C70a", "pagina": 70, "titulo": "Mañio de hojas punzantes (Podocarpus nubigena)", "especies": ["Mañío de hojas punzantes"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,00004375 · D²H + 0,00009836 · D²", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1987", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Provincia de Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.00004375 * D**2*H + 0.00009836 * D**2 },
    {"id": "C70b", "pagina": 70, "titulo": "Mañio de hojas punzantes (Podocarpus nubigena)", "especies": ["Mañío de hojas punzantes"], "region": "X", "estado": "Sin Información", "ecuacion": "V = 0,114037 + 0,000864 · D²", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Santelices", "anio": "1989", "n": "30 árboles", "rangoD": "Sin información", "r2": "0,9781", "localidad": "Area de Cumleufu, Cordilera de la Costa", "tablaD": [10, 45], "fn": (D, H) => 0.114037 + 0.000864 * D**2 },
    {"id": "C71a", "pagina": 71, "titulo": "Mañio de hojas punzantes (Podocarpus nubigena)", "especies": ["Mañío de hojas punzantes"], "region": "X", "estado": "Sin Información", "ecuacion": "V = 0,09988 + 0,000019 · D³", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Santelices", "anio": "1989", "n": "26 árboles", "rangoD": "Sin información", "r2": "0,9781", "localidad": "Provincia de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => 0.09988 + 0.000019 * D**3 },
    {"id": "C71b", "pagina": 71, "titulo": "Mañio de hojas punzantes (Podocarpus nubigena)", "especies": ["Mañío de hojas punzantes"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,07139 + 0,000007722589697 · D²H + 0,000539 · D²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "112 árboles", "rangoD": "11,3 - 79 cm", "r2": "0,9589", "localidad": "Reserva Nacional Valdivia", "tablaD": [15, 60], "fn": (D, H) => - 0.07139 + 0.000007722589697 * D**2*H + 0.000539 * D**2 },
    {"id": "C72a", "pagina": 72, "titulo": "Mañio de hojas punzantes (Podocarpus nubigena)", "especies": ["Mañío de hojas punzantes"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 8,895) · D^1,893 · H^0,735", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Terranova S.A", "anio": "1990", "n": "81 árboles", "rangoD": "15 a 60 cm", "r2": "0,9643", "localidad": "Hacienda Chaihuín y Hacieda", "tablaD": [15, 60], "fn": (D, H) => Math.exp(-8.895)* D**1.893 * H**0.735 },
    {"id": "C72b", "pagina": 72, "titulo": "Maqui (Aristotelia chilensis)", "especies": ["Maqui"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,0381 + 0,4731 · (D/100)² · (− 5,0851+0,7704 · H)", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "JICA", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 35], "fn": (D, H) => 0.0381 + 0.4731*(D/100)**2*(-5.0851+0.7704*H) },
    {"id": "C73a", "pagina": 73, "titulo": "Maqui (Aristotelia chilensis)", "especies": ["Maqui"], "region": "X", "estado": "Sin Información", "ecuacion": "V = exp(− 6,85116 + 1,6647 · ln(D))", "usaH": false, "dlu": 10, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "UCH", "anio": "1988", "n": "24 árboles", "rangoD": "Sin información", "r2": "0,8100", "localidad": "Río Maullín - Lago Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 6.85116 + 1.6647 * Math.log(D))) },
    {"id": "C73b", "pagina": 73, "titulo": "Maqui (Aristotelia chilensis)", "especies": ["Maqui"], "region": "X", "estado": "Sin Información", "ecuacion": "V = exp(− 7,79199 + 2,0737 · ln(D))", "usaH": false, "dlu": 10, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "UCH", "anio": "1988", "n": "24 árboles", "rangoD": "Sin información", "r2": "0,8987", "localidad": "Río Maullín - Lago Llanquihue - Seno de Reloncaví", "tablaD": [10, 40], "fn": (D, H) => Math.exp((- 7.79199 + 2.0737 * Math.log (D))) },
    {"id": "C74a", "pagina": 74, "titulo": "Melí (Amomyrtus meli)", "especies": ["Meli"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000025 · D²H + 1,4085 · 10⁻¹⁰ · (D²H)² − 1,28933 · 10⁻¹⁵ · (D²H)³", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "99 árboles", "rangoD": "11,7 - 82,8 cm", "r2": "0,9705", "localidad": "Reserva Nacional Valdivia", "tablaD": [15, 60], "fn": (D, H) => 0.000025 * D**2*H + 1.4085 * 1e-10 * (D**2*H)**2 - 1.28933 * 1e-15 * (D**2*H)**3 },
    {"id": "C74b", "pagina": 74, "titulo": "Melí (Amomyrtus meli)", "especies": ["Meli"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000015 · D²H + 3,676738 · 10⁻¹⁰ · (D²H)² − 2,719 · 10⁻¹⁵ · (D²H)³", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "79 árboles", "rangoD": "21,2 - 82,8 cm", "r2": "0,9623", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 60], "fn": (D, H) => 0.000015 * D**2*H + 3.676738 * 1e-10 * (D**2*H)**2 - 2.719 * 1e-15 * (D**2*H)**3 },
    {"id": "C75a", "pagina": 75, "titulo": "Ñirre (Nothofagus antarctica)", "especies": ["Ñirre"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = (D/100)² · (− 2,96307+0,4779 · H)", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Dominante (m)", "fuente": "UCH", "anio": "1988", "n": "38 árboles", "rangoD": "Sin información", "r2": "0,7958", "localidad": "Río Maullín - Lago Llanquihue", "tablaD": [10, 60], "fn": (D, H) => (D/100)**2*(-2.96307+0.4779*H) },
    {"id": "C75b", "pagina": 75, "titulo": "Olivillo (Aextoxicon punctatum)", "especies": ["Olivillo"], "region": "VIII-IX", "estado": "Bosque Adulto", "ecuacion": "V = 0,00003915 · D²H + 0,0000802 · D²", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1984", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Cordillera Nahuelbuta", "tablaD": [10, 45], "fn": (D, H) => 0.00003915 * D**2*H + 0.0000802 * D**2 },
    {"id": "C76b", "pagina": 76, "titulo": "Olivillo (Aextoxicum punctatum)", "especies": ["Olivillo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 9,064) · D^1,918 · H^0,771", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Terranova S.A", "anio": "1990", "n": "46 árboles", "rangoD": "20 a 80 cm", "r2": "0,9761", "localidad": "Hacienda Chaihuin y Hacienda Venecia", "tablaD": [20, 70], "fn": (D, H) => Math.exp(-9.064)* D**1.918 * H**0.771 },
    {"id": "C77a", "pagina": 77, "titulo": "Olivillo (Aextoxicom punctatum)", "especies": ["Olivillo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,2129 + 0,000014 · (D²H) + 0,000459 · D²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "104 árboles", "rangoD": "11,2 - 88,5 cm", "r2": "0,9387", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 60], "fn": (D, H) => - 0.2129 + 0.000014 * (D**2*H) + 0.000459 * D**2 },
    {"id": "C77b", "pagina": 77, "titulo": "Olivillo (Aextoxicom punctatum)", "especies": ["Olivillo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000018 · (D²H) + 0,000243 · D²", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "93 árboles", "rangoD": "21,5 - 88,5 cm", "r2": "0,9631", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 60], "fn": (D, H) => 0.000018 * (D**2*H) + 0.000243 * D**2 },
    {"id": "C78a", "pagina": 78, "titulo": "Peumo (Cryptocarya alba) - Maqui (Aristotelia chilensis)", "especies": ["Maqui", "Peumo"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,01270452 + 0,000031284 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "JICA", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 60], "fn": (D, H) => 0.01270452 + 0.000031284 * D**2*H },
    {"id": "C78b", "pagina": 78, "titulo": "Radal (Lomatia hirsuta)", "especies": ["Radal"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,007019 + 0,00002229 · D³", "usaH": false, "dlu": 10, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Corti", "anio": "1996", "n": "18 árboles", "rangoD": "Sin información", "r2": "0,9208", "localidad": "Loncoche", "tablaD": [10, 45], "fn": (D, H) => 0.007019 + 0.00002229 * D**3 },
    {"id": "C79a", "pagina": 79, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "VII", "estado": "Renoval", "ecuacion": "V = exp(− 9,50235389 + 0,9044538 · ln(D²H)", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "40 árboles", "rangoD": "10 - 53 cm", "r2": "0,9351", "localidad": "Precordillera Andina", "tablaD": [10, 50], "fn": (D, H) => Math.exp(- 9.50235389 + 0.9044538 * Math.log (D**2*H)) },
    {"id": "C79b", "pagina": 79, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = − 0,02322 + 0,0006986 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Cubillos", "anio": "1988", "n": "36 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Maquehua", "tablaD": [10, 60], "fn": (D, H) => - 0.02322 + 0.0006986 * D**2 },
    {"id": "C81a", "pagina": 81, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "VIII-IX-X", "estado": "Renoval", "ecuacion": "V = 0,00762 + 0,000028017 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "INFOR", "anio": "1991", "n": "156 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Maquehua - Jauja - Melipeuco", "tablaD": [10, 60], "fn": (D, H) => 0.00762 + 0.000028017 * D**2*H },
    {"id": "C81b", "pagina": 81, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,01411 + 0,00002689 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Cubillos", "anio": "1988", "n": "13 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => 0.01411 + 0.00002689 * D**2*H },
    {"id": "C82a", "pagina": 82, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,0137104 + 0,000028899 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "26 árboles", "rangoD": "Sin información", "r2": "0,9930", "localidad": "Sector Plazuela", "tablaD": [10, 60], "fn": (D, H) => 0.0137104 + 0.000028899 * D**2*H },
    {"id": "C82b", "pagina": 82, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,074 + 0,003 · D + 0,001 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Herrera y May", "anio": "1976", "n": "15 árboles", "rangoD": "Sin información", "r2": "0,9448", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => - 0.074 + 0.003 * D + 0.001 * D**2 },
    {"id": "C83a", "pagina": 83, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,0017 + 0,000031623 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "JICA - INFOR", "anio": "1992", "n": "105 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 60], "fn": (D, H) => - 0.0017 + 0.000031623 * D**2*H },
    {"id": "C83b", "pagina": 83, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,069372 − 0,005363 · D + 0,000748 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Avilés", "anio": "1993", "n": "Sin información", "rangoD": "Sin información", "r2": "0,7569", "localidad": "Jauja", "tablaD": [15, 60], "fn": (D, H) => - 0.069372 - 0.005363 * D + 0.000748 * D**2 },
    {"id": "C84a", "pagina": 84, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,0286 + 0,000726 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Cubillos", "anio": "1988", "n": "21 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Melipeuco", "tablaD": [10, 60], "fn": (D, H) => - 0.0286 + 0.000726 * D**2 },
    {"id": "C84b", "pagina": 84, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,00085 + 0,00002888329 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Cubillos", "anio": "1988", "n": "21 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Melipeuco", "tablaD": [10, 60], "fn": (D, H) => - 0.00085 + 0.00002888329 * D**2*H },
    {"id": "C85a", "pagina": 85, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,03616 + 0,00070162 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Cubillos", "anio": "1988", "n": "13 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => - 0.03616 + 0.00070162 * D**2 },
    {"id": "C85b", "pagina": 85, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,000802 + 0,000033316 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Puente et al", "anio": "1981", "n": "41 árboles", "rangoD": "Sin información", "r2": "0,9643", "localidad": "Casas Viejas", "tablaD": [10, 60], "fn": (D, H) => - 0.000802 + 0.000033316 * D**2*H },
    {"id": "C86a", "pagina": 86, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "IX-X", "estado": "Renoval", "ecuacion": "V = 0,01086 + 0,00003028 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Puente et al", "anio": "1981", "n": "95 árboles", "rangoD": "Sin información", "r2": "0,9761", "localidad": "Jauja - Casas Viejas - Pirihueico", "tablaD": [10, 60], "fn": (D, H) => 0.01086 + 0.00003028 * D**2*H },
    {"id": "C86b", "pagina": 86, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Sin Información", "ecuacion": "V = exp(− 9,915295 + 0,937855 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Barria", "anio": "1996", "n": "35 árboles", "rangoD": "Sin información", "r2": "0,9759", "localidad": "Provincia de Valdivia", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 9.915295 + 0.937855 * Math.log (D**2*H))) },
    {"id": "C87a", "pagina": 87, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = exp(− 10,1509 + 0,975675185 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Hernández", "anio": "1996", "n": "32 árboles", "rangoD": "Sin información", "r2": "0,9888", "localidad": "Riñihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 10.1509 + 0.975675185 * Math.log (D**2*H))) },
    {"id": "C87b", "pagina": 87, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,00207 + 0,00003 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "INFOR", "anio": "1991", "n": "75 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Neltume", "tablaD": [10, 60], "fn": (D, H) => 0.00207 + 0.00003 * D**2*H },
    {"id": "C88a", "pagina": 88, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,00978 + 0,00002795 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "INFOR", "anio": "1988", "n": "11 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Llancacura", "tablaD": [10, 60], "fn": (D, H) => - 0.00978 + 0.00002795 * D**2*H },
    {"id": "C88b", "pagina": 88, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,03655 + 0,00002 · D³", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "INFOR", "anio": "1991", "n": "75 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Neltume", "tablaD": [10, 60], "fn": (D, H) => 0.03655 + 0.00002 * D**3 },
    {"id": "C89a", "pagina": 89, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,0218 + 0,0005626 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "INFOR", "anio": "1988", "n": "11 árboles", "rangoD": "Sin información", "r2": "0,9025", "localidad": "Llancacura", "tablaD": [10, 60], "fn": (D, H) => - 0.0218 + 0.0005626 * D**2 },
    {"id": "C89b", "pagina": 89, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,00265 + 0,00002795 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Cubillos", "anio": "1988", "n": "36 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Maquehua", "tablaD": [10, 60], "fn": (D, H) => 0.00265 + 0.00002795 * D**2*H },
    {"id": "C90a", "pagina": 90, "titulo": "Raulí (Nothofagus alpina)", "especies": ["Raulí"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,01337 + 0,0000299306 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Puente et al", "anio": "1981", "n": "28 árboles", "rangoD": "Sin información", "r2": "0,9880", "localidad": "Pirihueico", "tablaD": [10, 60], "fn": (D, H) => 0.01337 + 0.0000299306 * D**2*H },
    {"id": "C90b", "pagina": 90, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,015958742 + 0,000034608 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Predio Agua Fría", "tablaD": [10, 60], "fn": (D, H) => 0.015958742 + 0.000034608 * D**2*H },
    {"id": "C92b", "pagina": 92, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VII", "estado": "Renoval", "ecuacion": "V = exp(− 9,77474858 + 0,94166084 · ln(D²H)", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "266 árboles", "rangoD": "7 - 63 cm", "r2": "0,9735", "localidad": "Precordillera Andina", "tablaD": [10, 50], "fn": (D, H) => Math.exp(- 9.77474858 + 0.94166084 * Math.log (D**2*H)) },
    {"id": "C93a", "pagina": 93, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = 0,015958742 + 0,000034608 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Agua Fría (Forestal Millalemu)", "tablaD": [10, 45], "fn": (D, H) => 0.015958742 + 0.000034608 * D**2*H },
    {"id": "C93b", "pagina": 93, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = 0,072208359 + 0,000026103 · D²H", "usaH": true, "dlu": 10, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "El Durazno (Forestal Millalemu)", "tablaD": [10, 50], "fn": (D, H) => 0.072208359 + 0.000026103 * D**2*H },
    {"id": "C94a", "pagina": 94, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = − 0,032038365 + 0,00002631 · D²H", "usaH": true, "dlu": 20, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Agua Fría (Forestal Millalemu)", "tablaD": [10, 50], "fn": (D, H) => - 0.032038365 + 0.00002631 * D**2*H },
    {"id": "C94b", "pagina": 94, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = 0,073548424 + 0,000026413 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nuñez", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "El Ranchillo", "tablaD": [10, 50], "fn": (D, H) => 0.073548424 + 0.000026413 * D**2*H },
    {"id": "C95a", "pagina": 95, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = 0,003041611 + 0,0000352 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Agua Fría (Forestal Millalemu)", "tablaD": [10, 50], "fn": (D, H) => 0.003041611 + 0.0000352 * D**2*H },
    {"id": "C95b", "pagina": 95, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = 0,003041611 + 0,0000352 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Predio Agua Fría", "tablaD": [10, 60], "fn": (D, H) => 0.003041611 + 0.0000352 * D**2*H },
    {"id": "C96a", "pagina": 96, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = − 0,032038365 + 0,00002631 · D²H", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Predio Agua Fría", "tablaD": [15, 60], "fn": (D, H) => - 0.032038365 + 0.00002631 * D**2*H },
    {"id": "C96b", "pagina": 96, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = − 0,073996 + 0,000848 · D²", "usaH": false, "dlu": 0, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "Rodríguez", "anio": "1979", "n": "Sin información", "rangoD": "Sin información", "r2": "0,9400", "localidad": "San Fabián", "tablaD": [10, 60], "fn": (D, H) => - 0.073996 + 0.000848 * D**2 },
    {"id": "C97a", "pagina": 97, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = − 0,02359 + 3,10046 · 10⁻⁵ · D²H − 1,9394 · 10⁻¹⁰ · (D²H)²", "usaH": true, "dlu": 10, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Emanuelli, Quappe y González", "anio": "2003", "n": "62 árboles", "rangoD": "9,3 - 50,2 cm", "r2": "0,9854", "localidad": "Nacimiento", "tablaD": [10, 50], "fn": (D, H) => - 0.02359 + 3.10046 * 1e-5 * D**2*H - 1.9394 * 1e-10 * (D**2*H)**2 },
    {"id": "C98b", "pagina": 98, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII", "estado": "Renoval", "ecuacion": "V = − 0,03272 + 0,000035978 · D²H − 2,8597 · 10⁻¹⁰ · (D²H)²", "usaH": true, "dlu": 10, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Emanuelli, Quappe y González", "anio": "2003", "n": "152 árboles", "rangoD": "10,0 - 50,2 cm", "r2": "0,9734", "localidad": "Nacimiento, Quilleco", "tablaD": [15, 50], "fn": (D, H) => - 0.03272 + 0.000035978 * D**2*H - 2.8597 * 1e-10 * (D**2*H)**2 },
    {"id": "C99a", "pagina": 99, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "VIII-IX", "estado": "Renoval", "ecuacion": "V = 0,0000351 · D²H + 0,0002135 · D² + 0,007392 · H − 0,08867", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Cordillera de Nahuelbuta", "tablaD": [10, 50], "fn": (D, H) => 0.0000351 * D**2*H + 0.0002135 * D**2 + 0.007392 * H - 0.08867 },
    {"id": "C99b", "pagina": 99, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,20643883 + 0,000033279 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Nueva Etruria", "tablaD": [20, 60], "fn": (D, H) => - 0.20643883 + 0.000033279 * D**2*H },
    {"id": "C100a", "pagina": 100, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,002512368 + 0,000031228 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Nueva Etruria", "tablaD": [10, 60], "fn": (D, H) => - 0.002512368 + 0.000031228 * D**2*H },
    {"id": "C100b", "pagina": 100, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,025957030 + 0,000030292 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Nueva Etruria", "tablaD": [10, 60], "fn": (D, H) => 0.025957030 + 0.000030292 * D**2*H },
    {"id": "C101a", "pagina": 101, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,00032298 + 0,000032138 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "24 árboles", "rangoD": "Sin información", "r2": "0,9742", "localidad": "Sector Plazuela", "tablaD": [10, 60], "fn": (D, H) => 0.00032298 + 0.000032138 * D**2*H },
    {"id": "C101b", "pagina": 101, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,00729 + 0,00003146 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "JICA", "anio": "1993", "n": "89 árboles", "rangoD": "Sin información", "r2": "0,9975", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 60], "fn": (D, H) => - 0.00729 + 0.00003146 * D**2*H },
    {"id": "C102a", "pagina": 102, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,000347 + 0,00003273 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Puente et al", "anio": "1981", "n": "39 árboles", "rangoD": "Sin información", "r2": "0,9761", "localidad": "Jauja - Pirihueico", "tablaD": [10, 60], "fn": (D, H) => 0.000347 + 0.00003273 * D**2*H },
    {"id": "C102b", "pagina": 102, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,07112 + 0,00003389 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Puente et al", "anio": "1981", "n": "15 árboles", "rangoD": "Sin información", "r2": "0,9742", "localidad": "Pirihueico", "tablaD": [15, 60], "fn": (D, H) => - 0.07112 + 0.00003389 * D**2*H },
    {"id": "C103a", "pagina": 103, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,03695309 + 0,00075407 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Cubillos", "anio": "1988", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Area de Neltume", "tablaD": [10, 60], "fn": (D, H) => - 0.03695309 + 0.00075407 * D**2 },
    {"id": "C103b", "pagina": 103, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "X", "estado": "Renoval", "ecuacion": "V = 0,02582821 + 0,000028502 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Grosse y Cubillos", "anio": "1991", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Area Neltume", "tablaD": [10, 60], "fn": (D, H) => 0.02582821 + 0.000028502 * D**2*H },
    {"id": "C104a", "pagina": 104, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 10,8038017 + 1,071131157 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Corti", "anio": "1996", "n": "33 árboles", "rangoD": "Sin información", "r2": "0,9978", "localidad": "Predio Aillapán", "tablaD": [10, 60], "fn": (D, H) => Math.exp (- 10.8038017 + 1.071131157 * Math.log (D**2*H)) },
    {"id": "C104b", "pagina": 104, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 10,51381 + 1,010275 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Kawas", "anio": "1978", "n": "30 árboles", "rangoD": "Sin información", "r2": "0,9860", "localidad": "Provincias de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp (- 10.51381 + 1.010275 * Math.log (D**2*H)) },
    {"id": "C105a", "pagina": 105, "titulo": "Roble (Nothofagus obliqua)", "especies": ["Roble"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,03695309 + 0,00075407 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Grosse y Cubillos", "anio": "1991", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Area Neltume", "tablaD": [10, 60], "fn": (D, H) => - 0.03695309 + 0.00075407 * D**2 },
    {"id": "C105b", "pagina": 105, "titulo": "Roble (Nothofagus obliqua) - Coihue (Nothofagus dombeyi)", "especies": ["Coigüe", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,00184197 + 0,000031492 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Nueva Etruria", "tablaD": [10, 60], "fn": (D, H) => - 0.00184197 + 0.000031492 * D**2*H },
    {"id": "C106a", "pagina": 106, "titulo": "Roble (Nothofagus obliqua) - Coihue (Nothofagus dombeyi)", "especies": ["Coigüe", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,024623404 + 0,000030644 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Real", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Nueva Etruria", "tablaD": [10, 60], "fn": (D, H) => 0.024623404 + 0.000030644 * D**2*H },
    {"id": "C107a", "pagina": 107, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,00697549 + 0,0000322071 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Donoso", "anio": "1988", "n": "54 árboles", "rangoD": "Sin información", "r2": "0,9722", "localidad": "Radal 7 Tazas", "tablaD": [10, 45], "fn": (D, H) => 0.00697549 + 0.0000322071 * D**2*H },
    {"id": "C107b", "pagina": 107, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,012742 + 0,0000300718 · D²H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Donoso", "anio": "1988", "n": "80 árboles", "rangoD": "Sin información", "r2": "0,9880", "localidad": "Radal 7 Tazas", "tablaD": [10, 45], "fn": (D, H) => 0.012742 + 0.0000300718 * D**2*H },
    {"id": "C108a", "pagina": 108, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "VII", "estado": "Renoval", "ecuacion": "V = 0,00697549 + 0,0000322071 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Donoso", "anio": "1988", "n": "54 árboles", "rangoD": "Sin información", "r2": "0,9722", "localidad": "Radal 7 Tazas", "tablaD": [10, 60], "fn": (D, H) => 0.00697549 + 0.0000322071 * D**2*H },
    {"id": "C110a", "pagina": 110, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,02031 + 0,00003509 · D²H − 0,00008074 · D² − 0,000635 · H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "134 árboles", "rangoD": "Sin información", "r2": "0,9742", "localidad": "Provincia de Malleco", "tablaD": [10, 55], "fn": (D, H) => 0.02031 + 0.00003509 * D**2*H - 0.00008074 * D**2 - 0.000635 * H },
    {"id": "C110b", "pagina": 110, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,005 + 0,00003151 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "134 árboles", "rangoD": "Sin información", "r2": "0,9742", "localidad": "Provincia de Malleco", "tablaD": [10, 60], "fn": (D, H) => 0.005 + 0.00003151 * D**2*H },
    {"id": "C111a", "pagina": 111, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,01789 + 0,00003611 · D²H − 0,0001299 · D² − 0,001196 · H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "134 árboles", "rangoD": "Sin información", "r2": "0,9742", "localidad": "Provincia de Malleco", "tablaD": [10, 55], "fn": (D, H) => 0.01789 + 0.00003611 * D**2*H - 0.0001299 * D**2 -0.001196 * H },
    {"id": "C111b", "pagina": 111, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,0094 + 0,00003413 · D²H − 0,0000635 · D²", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "134 árboles", "rangoD": "Sin información", "r2": "0,9742", "localidad": "Provincia de Malleco", "tablaD": [10, 55], "fn": (D, H) => 0.0094 + 0.00003413 * D**2*H - 0.0000635 * D**2 },
    {"id": "C112a", "pagina": 112, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Bosque Adulto", "ecuacion": "V = − 0,0086 + 0,0000309589 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "UACH", "anio": "1982", "n": "333 árboles", "rangoD": "Sin información", "r2": "0,9835", "localidad": "Provincia de Malleco", "tablaD": [10, 60], "fn": (D, H) => - 0.0086 + 0.0000309589 * D**2*H },
    {"id": "C112b", "pagina": 112, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Bosque Adulto", "ecuacion": "V = − 0,00416 + 0,000031545 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "JICA", "anio": "1993", "n": "116 árboles", "rangoD": "10 - 55 cm", "r2": "Sin información", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 60], "fn": (D, H) => - 0.00416 + 0.000031545 * D**2*H },
    {"id": "C113a", "pagina": 113, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = 0,001 · D² − 0,001 · D − 0,026", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Herrera y May", "anio": "1976", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => 0.001 * D**2 - 0.001 * D - 0.026 },
    {"id": "C113b", "pagina": 113, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "IX", "estado": "Renoval", "ecuacion": "V = − 0,315 + 0,037 · D", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Herrera y May", "anio": "1976", "n": "11 árboles", "rangoD": "Sin información", "r2": "0,9880", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => - 0.315 + 0.037 * D },
    {"id": "C114a", "pagina": 114, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina)", "especies": ["Raulí", "Roble"], "region": "X", "estado": "Renoval", "ecuacion": "V = − 0,02484 + 0,0000344272 · D²H", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "INFOR", "anio": "1993", "n": "75 árboles", "rangoD": "Sin información", "r2": "0,9448", "localidad": "Area Neltume", "tablaD": [10, 60], "fn": (D, H) => - 0.02484 + 0.0000344272 * D**2*H },
    {"id": "C114b", "pagina": 114, "titulo": "Roble (Nothofagus obliqua) - Raulí (Nothofagus alpina) - Hualo (Nothofagus glauca)", "especies": ["Hualo", "Raulí", "Roble"], "region": "VII", "estado": "Bosque Adulto", "ecuacion": "V = 0,012742 + 0,0000300718 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Donoso", "anio": "1988", "n": "80 árboles", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Radal 7 tazas", "tablaD": [10, 60], "fn": (D, H) => 0.012742 + 0.0000300718 * D**2*H },
    {"id": "C115a", "pagina": 115, "titulo": "Tamarugo (Prosopis tamarugo)", "especies": ["Tamarugo"], "region": "I", "estado": "Sin Información", "ecuacion": "V = 0,00089458 + 0,0002675789 · D² + 0,0000162092 · D²H", "usaH": true, "dlu": 10, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Alvarez de Araya", "anio": "1994", "n": "37 árboles", "rangoD": "Sin información", "r2": "0,7276", "localidad": "Reserva Nacional Pampa del Tamarugal", "tablaD": [10, 40], "fn": (D, H) => 0.00089458 + 0.0002675789 * D**2 + 0.0000162092 * D**2*H },
    {"id": "C115b", "pagina": 115, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "IX", "estado": "Sin Información", "ecuacion": "V = 0,01270452 + 0,000031284 · D²H", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "JICA - INFOR", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 60], "fn": (D, H) => 0.01270452 + 0.000031284 * D**2*H },
    {"id": "C116a", "pagina": 116, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 9,307) · D^1,994 · H^0,805", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "Terranova S.A", "anio": "1990", "n": "90 árboles", "rangoD": "15 - 80 cm", "r2": "0,9332", "localidad": "Hacienda Chaihuin", "tablaD": [10, 60], "fn": (D, H) => Math.exp(-9.307)* D**1.994 * H**0.805 },
    {"id": "C117a", "pagina": 117, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,04220197 + 0,00067576 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "INFOR", "anio": "1991", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9409", "localidad": "Area de Neltume", "tablaD": [10, 60], "fn": (D, H) => - 0.04220197 + 0.00067576 * D**2 },
    {"id": "C118a", "pagina": 118, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = (D/100)² · (− 0,7363118+0,33301 · H)", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Corvalán", "anio": "1987", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Provincia de Llanquihue", "tablaD": [10, 60], "fn": (D, H) => (D/100)**2*(-0.7363118+0.33301*H) },
    {"id": "C118b", "pagina": 118, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,04220197 + 0,00067576 · D²", "usaH": false, "dlu": 0, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "Grosse y Cubillos", "anio": "1991", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9409", "localidad": "Area de Neltume", "tablaD": [10, 60], "fn": (D, H) => - 0.04220197 + 0.00067576 * D**2 },
    {"id": "C119a", "pagina": 119, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000024 · (D²H) + 0,000152 · D²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "110 árboles", "rangoD": "11,28 - 69 cm", "r2": "0,9781", "localidad": "Reserva Nacional Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.000024 * (D**2*H) + 0.000152 * D**2 },
    {"id": "C119b", "pagina": 119, "titulo": "Tepa (Laurelia philippiana)", "especies": ["Tepa"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,00003 · (D²H) − 9,258 · 10⁻¹¹ · (D²H)²", "usaH": true, "dlu": 20, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "84 árboles", "rangoD": "21,8 - 69 cm", "r2": "0,9237", "localidad": "Reserva Nacional Valdivia", "tablaD": [20, 60], "fn": (D, H) => 0.00003 * (D**2*H) - 9.258 * 1e-11 * (D**2*H)**2 },
    {"id": "C120b", "pagina": 120, "titulo": "Tepa (Laurelia philippiana) - Trevo (Dasyphyllum diacanthoides)", "especies": ["Tepa", "Trevo"], "region": "IX", "estado": "Bosque Adulto", "ecuacion": "V = 0,01270452 + 0,000031284 · D²H", "usaH": true, "dlu": 0, "corteza": "con corteza", "altura": "Altura Total (m)", "fuente": "JICA", "anio": "1992", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Reserva Forestal Malleco", "tablaD": [10, 60], "fn": (D, H) => 0.01270452 + 0.000031284 * D**2*H },
    {"id": "C121a", "pagina": 121, "titulo": "Tiaca (Caldcluvia paniculata) - Avellano (Gevuina avellana)", "especies": ["Avellano", "Tiaca"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 7,9911 + 2,13606 · ln(D))", "usaH": false, "dlu": 10, "corteza": "corteza no especificada", "altura": "No usa altura", "fuente": "UCH", "anio": "1988", "n": "48 árboles", "rangoD": "Sin información", "r2": "0,9801", "localidad": "Río Maullín - Lago Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 7.9911 + 2.13606 * Math.log (D))) },
    {"id": "C122a", "pagina": 122, "titulo": "Tineo (Weimania trichosperma)", "especies": ["Tineo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = − 0,1052 + 0,00004606 · D²H + 0,0001776 · D² + 0,0002609 · H", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1985", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Provincia de Valdivia", "tablaD": [15, 60], "fn": (D, H) => - 0.1052 + 0.00004606 * D**2*H + 0.0001776 * D**2 + 0.0002609 * H },
    {"id": "C122b", "pagina": 122, "titulo": "Tineo (Weinmannia trichosperma)", "especies": ["Tineo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 9,097) · D^1,968 · H^0,732", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Terranova S.A", "anio": "1990", "n": "20 árboles", "rangoD": "20 a 75 cm", "r2": "0,984064", "localidad": "Hacienda Chaihuín", "tablaD": [20, 75], "fn": (D, H) => Math.exp(-9.097)* D**1.968 * H**0.732 },
    {"id": "C123a", "pagina": 123, "titulo": "Tineo (Weimania trichosperma)", "especies": ["Tineo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 7,79199 + 2,07237 · ln(D))", "usaH": false, "dlu": 10, "corteza": "sin corteza", "altura": "No usa altura", "fuente": "UCH", "anio": "1988", "n": "11 árboles", "rangoD": "Sin información", "r2": "0,9444", "localidad": "Río Maullín-Lago Llanquihue-Seno", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 7.79199 + 2.07237 * Math.log (D))) },
    {"id": "C123b", "pagina": 123, "titulo": "Tineo (Weimania trichosperma)", "especies": ["Tineo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = exp(− 10,269013 + 0,99643 · ln(D²H))", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Kawas", "anio": "1978", "n": "35 árboles", "rangoD": "Sin información", "r2": "0,9841", "localidad": "Provincia de Osorno y Llanquihue", "tablaD": [10, 60], "fn": (D, H) => Math.exp((- 10.269013 + 0.99643 * Math.log (D**2*H))) },
    {"id": "C124a", "pagina": 124, "titulo": "Tineo (Weimania trichosperma)", "especies": ["Tineo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = 0,000038 · (D²H) − 1,07637 · 10⁻¹⁰ · (D²H)²", "usaH": true, "dlu": 10, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Emanuelli", "anio": "1999", "n": "99 árboles", "rangoD": "11,7 - 79,6 cm", "r2": "0,9732", "localidad": "Reserva Nacional Valdivia", "tablaD": [10, 60], "fn": (D, H) => 0.000038 * (D**2*H) - 1.07637 * 1e-10 * (D**2*H)**2 },
    {"id": "C124b", "pagina": 124, "titulo": "Trevo (Dasyphyllun diacanthoides)", "especies": ["Trevo"], "region": "VIII-IX", "estado": "Bosque Adulto", "ecuacion": "V = 0,00005084 · D²H + 0,000000468 · D²H²", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Sandoval", "anio": "1984", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Cordillera Nahuelbuta", "tablaD": [10, 50], "fn": (D, H) => 0.00005084 * D**2*H + 0.000000468 * D**2*H**2 },
    {"id": "C125a", "pagina": 125, "titulo": "Trevo (Dasyphyllum diacanthoides)", "especies": ["Trevo"], "region": "IX", "estado": "Bosque Adulto", "ecuacion": "V = − 0,0000799 + 0,000033318 · D²H", "usaH": true, "dlu": 0, "corteza": "sin corteza", "altura": "Altura Total (m)", "fuente": "Nuñez y Peñaloza", "anio": "1985", "n": "50 árboles", "rangoD": "Sin información", "r2": "0,9604", "localidad": "Jauja", "tablaD": [10, 60], "fn": (D, H) => - 0.0000799 + 0.000033318 * D**2*H },
    {"id": "C126b", "pagina": 126, "titulo": "Ulmo (Eucryphia cordifolia) - Tineo (Weimania trichosperma)", "especies": ["Tineo", "Ulmo"], "region": "X", "estado": "Bosque Adulto", "ecuacion": "V = (D/100)² · (1,7972+0,3529 · (− 0,1895+0,6633 · H))", "usaH": true, "dlu": 0, "corteza": "corteza no especificada", "altura": "Altura Total (m)", "fuente": "Corvalan", "anio": "1987", "n": "Sin información", "rangoD": "Sin información", "r2": "Sin información", "localidad": "Isla Grande de Chiloé", "tablaD": [10, 60], "fn": (D, H) => (D/100)**2*(1.7972+0.3529*(-0.1895+0.6633*H)) },
];

const FUNCION_POR_ID = Object.fromEntries(FUNCIONES_VOLUMEN.map(f => [f.id, f]));

// =====================================================================
// Catálogo de especies arbóreas nativas (nombre común, científico, alias de importación)
// =====================================================================
const ESPECIES_NATIVAS = [
    { comun: "Roble", cientifico: "Nothofagus obliqua", alias: ["pellin", "hualle", "roble pellin"] },
    { comun: "Raulí", cientifico: "Nothofagus alpina", alias: ["nothofagus nervosa"] },
    { comun: "Coigüe", cientifico: "Nothofagus dombeyi", alias: ["coihue", "coigue comun", "coihue comun"] },
    { comun: "Coigüe de Chiloé", cientifico: "Nothofagus nitida", alias: ["coihue de chiloe"] },
    { comun: "Coigüe de Magallanes", cientifico: "Nothofagus betuloides", alias: ["coihue de magallanes", "guindo"] },
    { comun: "Lenga", cientifico: "Nothofagus pumilio", alias: ["lape", "lape / lenga"] },
    { comun: "Ñirre", cientifico: "Nothofagus antarctica", alias: ["nire"] },
    { comun: "Hualo", cientifico: "Nothofagus glauca", alias: ["roble maulino", "roble colorado"] },
    { comun: "Ruil", cientifico: "Nothofagus alessandrii", alias: [] },
    { comun: "Araucaria", cientifico: "Araucaria araucana", alias: ["pehuen", "pehuen / araucaria"] },
    { comun: "Alerce", cientifico: "Fitzroya cupressoides", alias: ["lahuan"] },
    { comun: "Ciprés de la Cordillera", cientifico: "Austrocedrus chilensis", alias: [] },
    { comun: "Ciprés de las Guaitecas", cientifico: "Pilgerodendron uviferum", alias: ["cipres guaitecas"] },
    { comun: "Canelo", cientifico: "Drimys winteri", alias: ["foye"] },
    { comun: "Laurel", cientifico: "Laurelia sempervirens", alias: [] },
    { comun: "Tepa", cientifico: "Laureliopsis philippiana", alias: ["laurelia philippiana"] },
    { comun: "Ulmo", cientifico: "Eucryphia cordifolia", alias: ["muermo"] },
    { comun: "Olivillo", cientifico: "Aextoxicon punctatum", alias: ["aextoxicum punctatum"] },
    { comun: "Tineo", cientifico: "Weinmannia trichosperma", alias: ["tenio"] },
    { comun: "Tiaca", cientifico: "Caldcluvia paniculata", alias: [] },
    { comun: "Trevo", cientifico: "Dasyphyllum diacanthoides", alias: ["palo santo", "tayu"] },
    { comun: "Mañío de hojas cortas", cientifico: "Saxegothaea conspicua", alias: ["manio hembra", "manio hembra / macho"] },
    { comun: "Mañío de hojas punzantes", cientifico: "Podocarpus nubigena", alias: ["manio macho", "podocarpus nubigenus"] },
    { comun: "Mañío de hojas largas", cientifico: "Podocarpus salignus", alias: ["manio de hoja larga"] },
    { comun: "Luma", cientifico: "Amomyrtus luma", alias: [] },
    { comun: "Meli", cientifico: "Amomyrtus meli", alias: [] },
    { comun: "Arrayán", cientifico: "Luma apiculata", alias: ["myrceugenia apiculata"] },
    { comun: "Avellano", cientifico: "Gevuina avellana", alias: [] },
    { comun: "Radal", cientifico: "Lomatia hirsuta", alias: [] },
    { comun: "Lingue", cientifico: "Persea lingue", alias: [] },
    { comun: "Maqui", cientifico: "Aristotelia chilensis", alias: [] },
    { comun: "Peumo", cientifico: "Cryptocarya alba", alias: [] },
    { comun: "Litre", cientifico: "Lithraea caustica", alias: [] },
    { comun: "Quillay", cientifico: "Quillaja saponaria", alias: [] },
    { comun: "Maitén", cientifico: "Maytenus boaria", alias: [] },
    { comun: "Espino", cientifico: "Vachellia caven", alias: ["acacia caven"] },
    { comun: "Pitra", cientifico: "Myrceugenia exsucca", alias: [] },
    { comun: "Patagua", cientifico: "Crinodendron patagua", alias: [] },
    { comun: "Belloto del norte", cientifico: "Beilschmiedia miersii", alias: [] },
    { comun: "Belloto del sur", cientifico: "Beilschmiedia berteroana", alias: [] },
    { comun: "Tamarugo", cientifico: "Prosopis tamarugo", alias: [] }
];

const FACTOR_FORMA_DEFECTO = 0.50;

const REGIONES_COMPENDIO = {
    "I": "I – Tarapacá (incluye actual Arica y Parinacota)",
    "II": "II – Antofagasta", "III": "III – Atacama", "IV": "IV – Coquimbo", "V": "V – Valparaíso",
    "RM": "Región Metropolitana", "VI": "VI – O'Higgins", "VII": "VII – Maule",
    "VIII": "VIII – Biobío (incluye actual Ñuble)", "IX": "IX – La Araucanía",
    "X": "X – Los Lagos (incluye actual Los Ríos)", "XI": "XI – Aysén", "XII": "XII – Magallanes"
};

function normalizarTexto(s) {
    return String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase().replace(/[º°]/g, "").replace(/\s+/g, " ").trim();
}

const INDICE_ESPECIES = new Map();
ESPECIES_NATIVAS.forEach(e => {
    [e.comun, e.cientifico, ...e.alias].forEach(n => INDICE_ESPECIES.set(normalizarTexto(n), e));
});

function buscarEspecie(nombre) {
    return INDICE_ESPECIES.get(normalizarTexto(nombre)) || null;
}

function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function fmtNum(x, dec) {
    return Number(x).toLocaleString("es-CL", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// =====================================================================
// Datos de Ejemplo Predefinidos
// =====================================================================
const EJEMPLO_PARAMETROS = {
    rodalName: "Rodal R-01 (San Francisco)",
    superficieRodal: 14.80,
    regionCompendio: "IX",
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
    { parcela: 1, especie: "Roble", dap: 12.55, corta: "NO" },
    { parcela: 1, especie: "Roble", dap: 18.20, corta: "NO" },
    { parcela: 1, especie: "Roble", dap: 22.04, corta: "SI" },
    { parcela: 1, especie: "Raulí", dap: 14.12, corta: "NO" },
    { parcela: 1, especie: "Coigüe", dap: 31.45, corta: "SI" },
    { parcela: 2, especie: "Roble", dap: 26.50, corta: "NO" },
    { parcela: 2, especie: "Raulí", dap: 19.82, corta: "NO" },
    { parcela: 2, especie: "Raulí", dap: 28.30, corta: "SI" },
    { parcela: 2, especie: "Canelo", dap: 11.25, corta: "NO" },
    { parcela: 3, especie: "Roble", dap: 34.00, corta: "SI" },
    { parcela: 3, especie: "Coigüe", dap: 21.58, corta: "NO" },
    { parcela: 3, especie: "Radal", dap: 16.05, corta: "NO" },
    { parcela: 4, especie: "Roble", dap: 23.40, corta: "NO" },
    { parcela: 4, especie: "Raulí", dap: 38.10, corta: "SI" },
    { parcela: 4, especie: "Ulmo", dap: 15.52, corta: "NO" }
];

// =====================================================================
// Estado global
// =====================================================================
let parametrosValidados = null;
let registrosIngresados = [];
let alturasPromedioEspecie = {};
let funcionEspecie = {};          // especie -> id de función del compendio, o "FF" (factor de forma)
let funcionElegidaManual = {};    // especie -> true si el usuario la eligió
let factorFormaEspecie = {};      // especie -> factor de forma (solo especies sin función)
let chartEstructura = null;
let chartVolumen = null;
let chartComparativa = null;

document.addEventListener("DOMContentLoaded", () => {
    poblarSelectEspecies();
    poblarSelectRegiones();
    setupEventListeners();
    actualizarEstadoInterfaz(false);
});

function poblarSelectEspecies() {
    const select = document.getElementById("especieSelect");
    select.innerHTML = "";
    ESPECIES_NATIVAS.forEach(esp => {
        const option = document.createElement("option");
        option.value = esp.comun;
        const nFun = funcionesParaEspecie(esp.comun).length;
        option.textContent = `${esp.comun} (${esp.cientifico})${nFun ? "" : " — sin función en compendio"}`;
        select.appendChild(option);
    });
}

function poblarSelectRegiones() {
    const select = document.getElementById("regionCompendio");
    Object.entries(REGIONES_COMPENDIO).forEach(([v, t]) => {
        const o = document.createElement("option");
        o.value = v; o.textContent = t;
        select.appendChild(o);
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
    document.getElementById("btnExportarPDF").addEventListener("click", exportarInformePDFApaisadoOficio);

    // Tabla de registros: cambiar intervención o eliminar (delegación de eventos)
    const tbodyIngresos = document.getElementById("tbodyIngresos");
    tbodyIngresos.addEventListener("change", (e) => {
        const el = e.target;
        if (el.matches("select[data-rol='corta']")) {
            const idx = parseInt(el.dataset.idx, 10);
            if (registrosIngresados[idx]) {
                registrosIngresados[idx].corta = el.value === "SI" ? "SI" : "NO";
                procesarYActualizarTodo();
            }
        }
    });
    tbodyIngresos.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-rol='eliminar']");
        if (btn) eliminarArbol(parseInt(btn.dataset.idx, 10));
    });

    // Sección 3: altura, función de volumen y factor de forma (delegación de eventos)
    const contAlturas = document.getElementById("containerAlturasEspecie");
    contAlturas.addEventListener("change", (e) => {
        const el = e.target;
        const esp = el.dataset.especie;
        if (!esp) return;
        if (el.dataset.rol === "altura") {
            const v = parseFloat(el.value);
            if (!isNaN(v) && v > 0) alturasPromedioEspecie[esp] = v;
        } else if (el.dataset.rol === "funcion") {
            funcionEspecie[esp] = el.value;
            funcionElegidaManual[esp] = true;
        } else if (el.dataset.rol === "factorForma") {
            const v = parseFloat(el.value);
            if (!isNaN(v) && v > 0 && v <= 1) factorFormaEspecie[esp] = v;
        }
        procesarYActualizarTodo();
    });

    // Eventos de Importación
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", procesarArchivoSubido);

    document.getElementById("btnDescargarPlantillaExcel").addEventListener("click", (e) => { e.stopPropagation(); descargarPlantillaExcel(); });
    document.getElementById("btnDescargarPlantillaTxt").addEventListener("click", (e) => { e.stopPropagation(); descargarPlantillaTxt(); });

    // Drag & Drop
    const dropzone = document.getElementById("dropzoneContainer");
    dropzone.addEventListener("click", () => {
        if (parametrosValidados) fileInput.click();
    });
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

function leerParametrosFormulario() {
    return {
        rodalName: document.getElementById("rodalName").value.trim(),
        superficieRodal: parseFloat(document.getElementById("superficieRodal").value),
        regionCompendio: document.getElementById("regionCompendio").value,
        tipoForestal: document.getElementById("tipoForestal").value,
        estructuraRodal: document.getElementById("estructuraRodal").value,
        estadoDesarrollo: document.getElementById("estadoDesarrollo").value,
        tipoMuestreo: document.getElementById("tipoMuestreo").value,
        numParcelas: parseInt(document.getElementById("numParcelas").value, 10),
        areaParcela: parseFloat(document.getElementById("areaParcela").value),
        formaParcela: document.getElementById("formaParcela").value,
        amplitudClase: parseFloat(document.getElementById("amplitudClase").value)
    };
}

function validarGuardarParametros() {
    const p = leerParametrosFormulario();

    if (!p.rodalName || !p.superficieRodal || !p.regionCompendio || !p.tipoForestal || !p.estructuraRodal ||
        !p.estadoDesarrollo || !p.tipoMuestreo || !p.numParcelas || !p.areaParcela || !p.formaParcela || !p.amplitudClase) {
        alert("Por favor complete TODOS los parámetros obligatorios del Rodal.");
        return;
    }

    // Punto 5: no permitir que existan árboles en parcelas fuera del rango declarado
    const fueraRango = registrosIngresados.filter(r => r.parcela < 1 || r.parcela > p.numParcelas);
    if (fueraRango.length > 0) {
        const nums = [...new Set(fueraRango.map(r => r.parcela))].sort((a, b) => a - b).join(", ");
        alert(`No se puede declarar ${p.numParcelas} parcelas: hay ${fueraRango.length} árboles registrados en parcelas fuera de ese rango (N° ${nums}).\n\nCorrija el número de parcelas o elimine esos registros.`);
        return;
    }

    parametrosValidados = p;
    registrosIngresados.forEach(r => { r.rodal = p.rodalName; });

    // Recalcular funciones sugeridas para especies no elegidas manualmente (región/estado pueden cambiar)
    Object.keys(funcionEspecie).forEach(esp => { if (!funcionElegidaManual[esp]) delete funcionEspecie[esp]; });

    document.getElementById("parcelaNo").max = String(p.numParcelas);
    actualizarEstadoInterfaz(true);
    renderizarResumenParametros();
    procesarYActualizarTodo();
}

function cargarEjemploCompleto() {
    Object.entries(EJEMPLO_PARAMETROS).forEach(([k, v]) => {
        document.getElementById(k).value = v;
    });

    registrosIngresados = EJEMPLO_REGISTROS.map(r => ({ ...r, rodal: EJEMPLO_PARAMETROS.rodalName }));
    funcionEspecie = {};
    funcionElegidaManual = {};
    validarGuardarParametros();
}

function actualizarEstadoInterfaz(habilitado) {
    const statusBadge = document.getElementById("statusParametros");
    const lockWarning = document.getElementById("lockWarningCampo");
    const lockWarningAlt = document.getElementById("lockWarningAltura");
    const lockWarningImport = document.getElementById("lockWarningImport");

    const inputsCampo = ["fileInput", "parcelaNo", "especieSelect", "dapInput", "cortaSelect", "btnAgregarArbol", "btnBorrarTodo", "btnExportarExcel", "btnExportarPDF"];

    if (habilitado) {
        statusBadge.textContent = "Validado";
        statusBadge.className = "badge-status badge-success";
        lockWarning.style.display = "none";
        lockWarningAlt.style.display = "none";
        lockWarningImport.style.display = "none";
        inputsCampo.forEach(id => document.getElementById(id).removeAttribute("disabled"));
    } else {
        statusBadge.textContent = "Incompleto";
        statusBadge.className = "badge-status badge-incompleto";
        lockWarning.style.display = "block";
        lockWarningAlt.style.display = "block";
        lockWarningImport.style.display = "block";
        inputsCampo.forEach(id => document.getElementById(id).setAttribute("disabled", "true"));
    }
}

// =====================================================================
// IMPORTACIÓN DE PLANILLAS (Parcela, Especie, Dap y Corta opcional)
// =====================================================================
function procesarArchivoSubido() {
    const fileInput = document.getElementById("fileInput");
    const feedback = document.getElementById("importFeedback");
    const file = fileInput.files[0];

    if (!file) return;

    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal primero.");
        return;
    }

    const fileName = file.name.toLowerCase();
    feedback.innerHTML = `<p style="color:#006633; font-weight:bold;">⏳ Leyendo archivo: ${escapeHtml(file.name)}...</p>`;

    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.SheetNames[0];
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { defval: "", raw: true });
                importarRegistros(jsonData, file.name);
            } catch (err) {
                feedback.innerHTML = `<div class="conaf-alert alert-warning">❌ Error al leer Excel: ${escapeHtml(err.message)}</div>`;
            }
        };
        reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith(".txt") || fileName.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parseado = parsearTextoPlano(e.target.result);
                importarRegistros(parseado, file.name);
            } catch (err) {
                feedback.innerHTML = `<div class="conaf-alert alert-warning">❌ Error al leer archivo de texto: ${escapeHtml(err.message)}</div>`;
            }
        };
        reader.readAsText(file);
    } else {
        feedback.innerHTML = `<div class="conaf-alert alert-warning">⚠️ Formato no soportado. Suba un archivo .xlsx, .xls, .txt o .csv</div>`;
    }
}

function parsearTextoPlano(texto) {
    const lineas = texto.replace(/^﻿/, "").split(/\r?\n/);
    const primera = lineas.findIndex(l => l.trim().length > 0);
    if (primera === -1) return [];

    const primeraFila = lineas[primera];
    let delim = '\t';
    if (primeraFila.includes('\t')) delim = '\t';
    else if (primeraFila.includes(';')) delim = ';';
    else if (primeraFila.includes(',')) delim = ',';

    const headers = primeraFila.split(delim).map(h => h.trim());
    const result = [];

    for (let i = primera + 1; i < lineas.length; i++) {
        const cols = lineas[i].split(delim).map(c => c.trim());
        const rowObj = {};
        headers.forEach((h, idx) => { rowObj[h] = cols[idx] !== undefined ? cols[idx] : ""; });
        result.push(rowObj);
    }
    return result;
}

const COLUMNAS_IMPORTACION = {
    parcela: ["parcela", "n parcela", "num parcela", "num_parcela", "n_parcela", "nro parcela", "parcela n", "p"],
    especie: ["especie", "esp", "nombre especie", "nombre_especie", "sp"],
    dap: ["dap", "dap (cm)", "dap_cm", "dap cm", "diametro", "diametro (cm)"],
    corta: ["corta", "intervencion", "intervencion (corta)", "tratamiento", "cosecha", "marcado"]
};

function interpretarCorta(valor) {
    const v = normalizarTexto(valor);
    if (["si", "s", "1", "x", "corta", "c", "true", "verdadero", "cosecha", "raleo", "extraer"].includes(v)) return "SI";
    if (["no", "n", "0", "", "residual", "r", "false", "falso", "conservar"].includes(v)) return "NO";
    return null;
}

function interpretarNumero(valor) {
    if (typeof valor === "number") return valor;
    const s = String(valor ?? "").trim().replace(/\s/g, "").replace(",", ".");
    if (s === "" || !/^[-+]?\d*\.?\d+$/.test(s)) return NaN;
    return parseFloat(s);
}

// Punto 5: la importación es atómica. Si una sola fila es inválida (parcela fuera
// de 1..N declarado, especie desconocida, DAP inválido o Corta no reconocida),
// no se importa nada y se informa cada fila con problemas.
function importarRegistros(dataArray, nombreArchivo) {
    const feedback = document.getElementById("importFeedback");
    const nDecl = parametrosValidados.numParcelas;

    if (!dataArray || dataArray.length === 0) {
        feedback.innerHTML = `<div class="conaf-alert alert-warning">⚠️ El archivo está vacío o no contiene datos.</div>`;
        return;
    }

    const keys = Object.keys(dataArray[0]);
    const buscarCol = (tipo) => keys.find(k => COLUMNAS_IMPORTACION[tipo].includes(normalizarTexto(k)));
    const col = { parcela: buscarCol("parcela"), especie: buscarCol("especie"), dap: buscarCol("dap"), corta: buscarCol("corta") };

    const faltantes = ["parcela", "especie", "dap"].filter(t => !col[t]);
    if (faltantes.length) {
        feedback.innerHTML = `<div class="conaf-alert alert-error">❌ <strong>Archivo rechazado:</strong> faltan las columnas obligatorias <strong>${faltantes.map(f => f[0].toUpperCase() + f.slice(1)).join(", ")}</strong>.<br>
            Columnas encontradas: ${keys.map(k => `<code>${escapeHtml(k)}</code>`).join(" ") || "(ninguna)"}.<br>
            Use la plantilla: <code>Parcela</code> | <code>Especie</code> | <code>Dap</code> | <code>Corta</code> (opcional).</div>`;
        document.getElementById("fileInput").value = "";
        return;
    }

    const nuevos = [];
    const errores = [];
    dataArray.forEach((row, i) => {
        const fila = i + 2; // fila 1 = encabezados
        const vals = [row[col.parcela], row[col.especie], row[col.dap], col.corta ? row[col.corta] : ""];
        if (vals.every(v => String(v ?? "").trim() === "")) return; // fila vacía

        const problemas = [];
        const parcelaNum = interpretarNumero(row[col.parcela]);
        if (!Number.isInteger(parcelaNum)) problemas.push(`parcela "${row[col.parcela]}" no es un número entero`);
        else if (parcelaNum < 1 || parcelaNum > nDecl) problemas.push(`parcela ${parcelaNum} fuera del rango declarado (1–${nDecl})`);

        const esp = buscarEspecie(row[col.especie]);
        if (!esp) problemas.push(`especie "${String(row[col.especie]).trim() || "(vacía)"}" no reconocida`);

        const dap = interpretarNumero(row[col.dap]);
        if (isNaN(dap) || dap <= 0) problemas.push(`DAP "${row[col.dap]}" inválido`);

        let corta = "NO";
        if (col.corta) {
            corta = interpretarCorta(row[col.corta]);
            if (!corta) problemas.push(`Corta "${row[col.corta]}" no reconocida (use SI/NO)`);
        }

        if (problemas.length) {
            errores.push({ fila, problemas });
        } else {
            nuevos.push({ rodal: parametrosValidados.rodalName, parcela: parcelaNum, especie: esp.comun, dap: Math.round(dap * 100) / 100, corta });
        }
    });

    document.getElementById("fileInput").value = "";

    if (errores.length) {
        const max = 15;
        const lista = errores.slice(0, max).map(e => `<li>Fila ${e.fila}: ${escapeHtml(e.problemas.join("; "))}</li>`).join("");
        feedback.innerHTML = `<div class="conaf-alert alert-error">❌ <strong>Archivo rechazado (${escapeHtml(nombreArchivo)}):</strong> ${errores.length} fila(s) con problemas. No se importó ningún registro; corrija el archivo y vuelva a cargarlo.
            <ul class="lista-errores">${lista}</ul>${errores.length > max ? `<small>… y ${errores.length - max} fila(s) más.</small>` : ""}</div>`;
        return;
    }

    if (nuevos.length === 0) {
        feedback.innerHTML = `<div class="conaf-alert alert-warning">⚠️ El archivo no contiene filas con datos.</div>`;
        return;
    }

    registrosIngresados.push(...nuevos);
    const nCorta = nuevos.filter(r => r.corta === "SI").length;
    const parcelasArchivo = new Set(nuevos.map(r => r.parcela));
    const sinArboles = [];
    for (let p = 1; p <= nDecl; p++) if (!registrosIngresados.some(r => r.parcela === p)) sinArboles.push(p);

    feedback.innerHTML = `
        <div class="conaf-alert alert-ok">
            ✅ <strong>Importación exitosa (${escapeHtml(nombreArchivo)}):</strong>
            ${nuevos.length} árboles en ${parcelasArchivo.size} parcela(s); ${nCorta} marcados para corta${col.corta ? "" : " (el archivo no trae columna <code>Corta</code>: todos quedan como residuales; puede marcarlos en la Sección 4)"}.
            ${sinArboles.length ? `<br><small>Parcelas declaradas sin árboles registrados: ${sinArboles.join(", ")} (se consideran con 0 árboles en la estadística).</small>` : ""}
        </div>`;
    procesarYActualizarTodo();
}

const DATOS_PLANTILLA = [
    ["Parcela", "Especie", "Dap", "Corta"],
    [1, "Roble", 18.55, "NO"],
    [1, "Raulí", 22.04, "SI"],
    [1, "Coigüe", 31.40, "NO"],
    [2, "Roble", 25.80, "SI"],
    [2, "Canelo", 12.25, "NO"],
    [2, "Raulí", 29.18, "NO"],
    [3, "Roble", 34.00, "SI"],
    [3, "Ulmo", 15.22, "NO"]
];

function descargarPlantillaExcel() {
    const ws = XLSX.utils.aoa_to_sheet(DATOS_PLANTILLA);
    ws['!cols'] = [{ wch: 10 }, { wch: 26 }, { wch: 10 }, { wch: 10 }];
    for (let c = 0; c < 4; c++) {
        ws[XLSX.utils.encode_cell({ r: 0, c })].s = ESTILOS_XLSX.encabezado;
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parcelas");
    XLSX.writeFile(wb, "Plantilla_Parcelas_Parcela_Especie_DAP_Corta.xlsx");
}

function descargarPlantillaTxt() {
    const contenido = DATOS_PLANTILLA.map(f => f.join("\t")).join("\n");
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Plantilla_Parcelas_Parcela_Especie_DAP_Corta.txt";
    link.click();
}

function renderizarResumenParametros() {
    const container = document.getElementById("resumenParametrosRodal");
    if (!parametrosValidados) return;

    const p = parametrosValidados;
    const supMuestreadaHa = (p.numParcelas * p.areaParcela) / 10000;
    const intenMuestreoPct = (supMuestreadaHa / p.superficieRodal) * 100;
    const item = (t, v) => `<div><span class="resumen-label">${t}:</span><br><strong>${v}</strong></div>`;

    container.innerHTML = `
        <div class="resumen-grid">
            ${item("RODAL", `${escapeHtml(p.rodalName)} (${p.superficieRodal} ha)`)}
            ${item("REGIÓN (COMPENDIO)", escapeHtml(REGIONES_COMPENDIO[p.regionCompendio] || p.regionCompendio))}
            ${item("TIPO FORESTAL", escapeHtml(p.tipoForestal))}
            ${item("ESTRUCTURA / ESTADO", `${escapeHtml(p.estructuraRodal)} | ${escapeHtml(p.estadoDesarrollo)}`)}
            ${item("MUESTREO", `${escapeHtml(p.tipoMuestreo)} (${escapeHtml(p.formaParcela)})`)}
            ${item("PARCELAS", `${p.numParcelas} parc. de ${p.areaParcela} m²`)}
            ${item("INTENSIDAD", `${supMuestreadaHa.toFixed(3)} ha (${intenMuestreoPct.toFixed(2)}%)`)}
        </div>
    `;
}

function agregarArbol() {
    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal.");
        return;
    }

    const parcela = parseInt(document.getElementById("parcelaNo").value, 10);
    const especie = document.getElementById("especieSelect").value;
    const dapRaw = parseFloat(document.getElementById("dapInput").value);
    const corta = document.getElementById("cortaSelect").value;

    if (!Number.isInteger(parcela) || parcela < 1 || parcela > parametrosValidados.numParcelas) {
        alert(`El N° de parcela debe estar entre 1 y ${parametrosValidados.numParcelas} (número de parcelas declarado en la Sección 1).`);
        return;
    }
    if (isNaN(dapRaw) || dapRaw <= 0) {
        alert("Por favor ingrese un valor válido de DAP.");
        return;
    }

    registrosIngresados.push({
        rodal: parametrosValidados.rodalName,
        parcela,
        especie,
        dap: Math.round(dapRaw * 100) / 100,
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
    asegurarFuncionesEspecies();
    actualizarConfiguracionAlturas();
    renderizarTablaIngresos();
    const resultadoRodal = calcularTablaRodal();
    renderizarTablaRodal(resultadoRodal);
    renderizarAvisoVolumen();
    renderizarAnexoFormulas();
    renderizarEstadisticaMuestreo();
    actualizarGraficos(resultadoRodal);
}

// =====================================================================
// SELECCIÓN DE FUNCIÓN DE VOLUMEN POR ESPECIE
// =====================================================================
function funcionesParaEspecie(especie) {
    return FUNCIONES_VOLUMEN.filter(f => f.especies.includes(especie));
}

function estadoObjetivo() {
    if (!parametrosValidados) return null;
    const e = parametrosValidados.estadoDesarrollo;
    return (e.startsWith("Bosque Adulto") || e.startsWith("Bosque Degradado")) ? "Bosque Adulto" : "Renoval";
}

// Puntaje para sugerir la función más pertinente al rodal (el usuario puede cambiarla)
function puntajeFuncion(f) {
    let s = 0;
    const reg = parametrosValidados ? parametrosValidados.regionCompendio : null;
    if (reg && f.region.split("-").includes(reg)) s += 4;
    if (f.estado === estadoObjetivo()) s += 2;
    if (f.dlu === 0) s += 3;
    if (f.usaH) s += 2;
    if (f.especies.length === 1) s += 1;
    if (f.r2 !== "Sin información") s += 0.5;
    if (f.n !== "Sin información") s += 0.5;
    if (/Sin información/.test(f.rangoD) === false) s += 0.25;
    return s;
}

function funcionSugerida(especie) {
    const lista = funcionesParaEspecie(especie);
    if (!lista.length) return "FF";
    return lista.slice().sort((a, b) => puntajeFuncion(b) - puntajeFuncion(a))[0].id;
}

function asegurarFuncionesEspecies() {
    const especies = [...new Set(registrosIngresados.map(r => r.especie))];
    especies.forEach(esp => {
        if (!alturasPromedioEspecie[esp]) alturasPromedioEspecie[esp] = 15.0;
        if (!funcionEspecie[esp] || (funcionEspecie[esp] !== "FF" && !FUNCION_POR_ID[funcionEspecie[esp]])) {
            funcionEspecie[esp] = funcionSugerida(esp);
        }
        if (funcionEspecie[esp] === "FF" && !factorFormaEspecie[esp]) factorFormaEspecie[esp] = FACTOR_FORMA_DEFECTO;
    });
}

function funcionDeEspecie(especie) {
    const id = funcionEspecie[especie] || funcionSugerida(especie);
    return id === "FF" ? null : FUNCION_POR_ID[id];
}

function rangoDiametricoFuncion(f) {
    const r = String(f.rangoD).replace(/,/g, ".");
    let m = r.match(/([\d.]+)\s*(?:-|a)\s*([\d.]+)/);
    if (m) return { min: parseFloat(m[1]), max: parseFloat(m[2]), origen: "rango del estudio" };
    m = r.match(/>\s*([\d.]+)/);
    if (m) return { min: parseFloat(m[1]), max: Infinity, origen: "rango del estudio" };
    if (f.tablaD) return { min: f.tablaD[0], max: f.tablaD[1], origen: "rango de la tabla del compendio" };
    return null;
}

function areaBasal(dap) {
    return (Math.PI / 40000) * dap * dap;
}

function calcularVolumenArbol(dap, alturaM, especieNombre) {
    const f = funcionDeEspecie(especieNombre);
    if (!f) {
        const ff = factorFormaEspecie[especieNombre] || FACTOR_FORMA_DEFECTO;
        return areaBasal(dap) * alturaM * ff;
    }
    if (f.dlu > 0 && dap < f.dlu) return 0;  // árbol bajo el diámetro límite de utilización
    const v = f.fn(dap, alturaM);
    return (Number.isFinite(v) && v > 0) ? v : 0;
}

function descripcionVolumen(f) {
    if (!f) return "Volumen fustal aproximado (g · H · f)";
    const base = f.dlu > 0 ? `Volumen hasta DLU ${f.dlu} cm` : "Volumen total";
    return `${base}, ${f.corteza}`;
}

function etiquetaFuncion(f) {
    return `${f.fuente} (${f.anio}) · Región ${f.region} · ${f.estado} · ${f.dlu > 0 ? "DLU " + f.dlu + " cm" : "Vol. total"} · p. ${f.pagina}`;
}

function actualizarConfiguracionAlturas() {
    const container = document.getElementById("containerAlturasEspecie");
    container.innerHTML = "";

    if (registrosIngresados.length === 0) {
        container.innerHTML = "<p class='empty-msg'>No hay registros de campo ingresados o cargados aún.</p>";
        return;
    }

    const especiesPresentes = [...new Set(registrosIngresados.map(r => r.especie))];

    especiesPresentes.forEach(espNombre => {
        const espInfo = buscarEspecie(espNombre);
        const lista = funcionesParaEspecie(espNombre);
        const f = funcionDeEspecie(espNombre);
        const H = alturasPromedioEspecie[espNombre];
        const arboles = registrosIngresados.filter(r => r.especie === espNombre);
        const e = escapeHtml(espNombre);

        let bloqueFuncion;
        const avisos = [];
        if (f) {
            const sugerida = funcionSugerida(espNombre);
            const opciones = lista.map(fx => `<option value="${fx.id}" ${fx.id === f.id ? "selected" : ""}>${fx.id === sugerida ? "★ " : ""}${escapeHtml(etiquetaFuncion(fx))}</option>`).join("");
            const rango = rangoDiametricoFuncion(f);
            if (rango) {
                const fuera = arboles.filter(a => a.dap < rango.min || a.dap > rango.max).length;
                if (fuera) avisos.push(`${fuera} árbol(es) con DAP fuera del ${rango.origen} (${rango.min}–${rango.max === Infinity ? "∞" : rango.max} cm): la función se extrapola.`);
            }
            const ceros = arboles.filter(a => calcularVolumenArbol(a.dap, H, espNombre) === 0).length;
            if (ceros) avisos.push(`${ceros} árbol(es) con volumen 0 (DAP bajo el DLU de ${f.dlu} cm o la función entrega valor negativo).`);
            if (f.altura && /dominante/i.test(f.altura)) avisos.push("Esta función requiere ALTURA DOMINANTE, no altura promedio.");
            if (!f.usaH) avisos.push("Esta función usa solo el DAP; la altura ingresada no afecta el volumen.");

            bloqueFuncion = `
                <div class="conaf-group">
                    <label>Función de volumen (${lista.length} disponible${lista.length > 1 ? "s" : ""}; ★ = sugerida para la región y estado del rodal):</label>
                    <select data-rol="funcion" data-especie="${e}">${opciones}</select>
                </div>
                <div class="funcion-detalle">
                    <code>${escapeHtml(f.ecuacion)}</code>
                    <div><strong>Volumen:</strong> ${escapeHtml(descripcionVolumen(f))} (m³) · <strong>Altura:</strong> ${escapeHtml(f.usaH ? f.altura : "no usa")}</div>
                    <div><strong>Fuente:</strong> ${escapeHtml(f.fuente)} (${escapeHtml(f.anio)}), citado en Compendio p. ${f.pagina} · <strong>Localidad:</strong> ${escapeHtml(f.localidad)}</div>
                    <div><strong>n:</strong> ${escapeHtml(f.n)} · <strong>R²:</strong> ${escapeHtml(f.r2)} · <strong>Rango DAP:</strong> ${escapeHtml(f.rangoD)}${f.especies.length > 1 ? ` · <strong>Función grupal:</strong> ${escapeHtml(f.especies.join(", "))}` : ""}</div>
                </div>`;
        } else {
            avisos.push("El compendio no contiene una función de volumen para esta especie. Se usa V = g · H · f con el factor de forma que usted defina; justifíquelo en el plan de manejo.");
            bloqueFuncion = `
                <div class="conaf-group">
                    <label>Factor de forma f (sin función en el compendio):</label>
                    <input type="number" step="0.01" min="0.1" max="1" value="${factorFormaEspecie[espNombre] || FACTOR_FORMA_DEFECTO}" data-rol="factorForma" data-especie="${e}">
                </div>`;
        }

        const divCard = document.createElement("div");
        divCard.className = "species-card";
        divCard.innerHTML = `
            <div><strong>🌳 ${e}</strong> <em class="sci">${escapeHtml(espInfo ? espInfo.cientifico : "")}</em> <span class="badge-mini">${arboles.length} árb.</span></div>
            <div class="conaf-group">
                <label>Altura promedio H (m):</label>
                <input type="number" step="0.1" min="1" value="${H}" data-rol="altura" data-especie="${e}">
            </div>
            ${bloqueFuncion}
            ${avisos.map(a => `<div class="aviso-funcion">⚠️ ${escapeHtml(a)}</div>`).join("")}
        `;
        container.appendChild(divCard);
    });
}

function renderizarTablaIngresos() {
    const tbody = document.getElementById("tbodyIngresos");
    tbody.innerHTML = "";

    document.getElementById("totalRegistrosCount").textContent = registrosIngresados.length;
    document.getElementById("totalRegistrosBadge").textContent = registrosIngresados.length;

    const filas = registrosIngresados.map((item, index) => {
        const g = areaBasal(item.dap);
        const H = alturasPromedioEspecie[item.especie] || 15.0;
        const v = calcularVolumenArbol(item.dap, H, item.especie);
        const esCorta = item.corta === "SI";
        return `<tr class="${esCorta ? "fila-corta" : ""}">
            <td>${index + 1}</td>
            <td>${escapeHtml(item.rodal)}</td>
            <td>${item.parcela}</td>
            <td><strong>${escapeHtml(item.especie)}</strong></td>
            <td>${item.dap.toFixed(2)}</td>
            <td>${H.toFixed(1)} <small>(prom)</small></td>
            <td>${g.toFixed(4)}</td>
            <td>${v.toFixed(4)}</td>
            <td><select class="select-corta ${esCorta ? "es-corta" : "es-residual"}" data-rol="corta" data-idx="${index}">
                <option value="NO" ${esCorta ? "" : "selected"}>Residual</option>
                <option value="SI" ${esCorta ? "selected" : ""}>Corta</option>
            </select></td>
            <td><button type="button" class="btn-conaf btn-red btn-sm" data-rol="eliminar" data-idx="${index}" title="Eliminar árbol">❌</button></td>
        </tr>`;
    });
    tbody.innerHTML = filas.join("");
}

function calcularTablaRodal() {
    if (!parametrosValidados) {
        document.getElementById("factorExpansionText").textContent = "--";
        document.getElementById("arbolesEquivalentesText").textContent = "--";
        return { clases: [], especiesEspeciales: [], datos: {}, factorExpansion: 0 };
    }

    const { numParcelas, areaParcela, amplitudClase } = parametrosValidados;
    const factorExpansion = 10000 / (numParcelas * areaParcela);

    document.getElementById("factorExpansionText").textContent = `${factorExpansion.toFixed(2)} (1 ha / ${(numParcelas * areaParcela)} m² muestreados)`;
    document.getElementById("arbolesEquivalentesText").textContent = `${Math.round(factorExpansion)}`;

    if (registrosIngresados.length === 0) {
        return { clases: [], especiesEspeciales: [], datos: {}, factorExpansion };
    }

    const contexEspecies = {};
    registrosIngresados.forEach(r => {
        contexEspecies[r.especie] = (contexEspecies[r.especie] || 0) + 1;
    });

    const especiesOrdenadas = Object.keys(contexEspecies).sort((a, b) => contexEspecies[b] - contexEspecies[a]);
    const topEspecies = especiesOrdenadas.slice(0, 3);

    const daps = registrosIngresados.map(r => r.dap);
    const minDap = Math.floor(Math.min(...daps) / amplitudClase) * amplitudClase;
    const maxDap = Math.ceil(Math.max(...daps) / amplitudClase) * amplitudClase;

    const clases = [];
    for (let c = minDap; c < maxDap; c += amplitudClase) {
        clases.push({ min: c, max: c + amplitudClase, mc: c + (amplitudClase / 2) });
    }
    if (clases.length === 0) clases.push({ min: minDap, max: minDap + amplitudClase, mc: minDap + amplitudClase / 2 });

    const especiesColumnas = [...topEspecies, "Otras", "Total"];
    const celdaVacia = () => ({ nIni: 0, nRes: 0, gIni: 0, gRes: 0, vIni: 0, vRes: 0 });

    const matriz = clases.map(() => Object.fromEntries(especiesColumnas.map(esp => [esp, celdaVacia()])));
    const totalesEspecie = Object.fromEntries(especiesColumnas.map(esp => [esp, celdaVacia()]));

    const sumar = (cel, g, v, residual) => {
        cel.nIni += factorExpansion; cel.gIni += g * factorExpansion; cel.vIni += v * factorExpansion;
        if (residual) { cel.nRes += factorExpansion; cel.gRes += g * factorExpansion; cel.vRes += v * factorExpansion; }
    };

    registrosIngresados.forEach(arb => {
        const gArbol = areaBasal(arb.dap);
        const H = alturasPromedioEspecie[arb.especie] || 15.0;
        const vArbol = calcularVolumenArbol(arb.dap, H, arb.especie);

        let claseIdx = clases.findIndex(cl => arb.dap >= cl.min && arb.dap < cl.max);
        if (claseIdx === -1) claseIdx = clases.length - 1;

        const columnaEsp = topEspecies.includes(arb.especie) ? arb.especie : "Otras";
        const residual = arb.corta !== "SI";

        sumar(matriz[claseIdx][columnaEsp], gArbol, vArbol, residual);
        sumar(matriz[claseIdx]["Total"], gArbol, vArbol, residual);
        sumar(totalesEspecie[columnaEsp], gArbol, vArbol, residual);
        sumar(totalesEspecie["Total"], gArbol, vArbol, residual);
    });

    return { clases, topEspecies, especiesColumnas, matriz, totalesEspecie, factorExpansion };
}

function renderizarTablaRodal(res) {
    const thead = document.getElementById("theadRodal");
    const tbody = document.getElementById("tbodyRodal");
    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (!res.clases || res.clases.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12">No hay datos suficientes para estructurar la Tabla de Rodal. Complete los parámetros e ingrese o cargue parcelas de campo.</td></tr>`;
        return;
    }

    let h1 = `<tr><th rowspan="2" colspan="2">Rango (cm)<br>≤ Ø <</th><th rowspan="2">Mc</th>`;
    res.especiesColumnas.forEach(esp => {
        const altProm = alturasPromedioEspecie[esp] ? ` (H=${alturasPromedioEspecie[esp]}m)` : '';
        h1 += `<th colspan="6">${escapeHtml(esp)}${altProm}</th>`;
    });
    h1 += "</tr><tr>";
    res.especiesColumnas.forEach(() => {
        h1 += `<th colspan="2" class="sub-header">N (árb./ha)</th><th colspan="2" class="sub-header">G (m²/ha)</th><th colspan="2" class="sub-header">V (m³/ha)</th>`;
    });
    h1 += "</tr><tr><th>Min</th><th>Max</th><th>cm</th>";
    res.especiesColumnas.forEach(() => { h1 += `<th>Ini.</th><th>Res.</th><th>Ini.</th><th>Res.</th><th>Ini.</th><th>Res.</th>`; });
    thead.innerHTML = h1 + "</tr>";

    const filas = res.clases.map((cl, i) => {
        let tr = `<tr><td>${cl.min}</td><td>${cl.max}</td><td>${cl.mc.toFixed(1)}</td>`;
        res.especiesColumnas.forEach(esp => {
            const c = res.matriz[i][esp];
            tr += `<td>${c.nIni > 0 ? Math.round(c.nIni) : '-'}</td><td>${c.nRes > 0 ? Math.round(c.nRes) : '-'}</td>
                   <td>${c.gIni > 0 ? c.gIni.toFixed(2) : '-'}</td><td>${c.gRes > 0 ? c.gRes.toFixed(2) : '-'}</td>
                   <td>${c.vIni > 0 ? c.vIni.toFixed(2) : '-'}</td><td>${c.vRes > 0 ? c.vRes.toFixed(2) : '-'}</td>`;
        });
        return tr + "</tr>";
    });

    let trTotal = `<tr class="total-row"><td colspan="3"><strong>TOTAL RODAL</strong></td>`;
    res.especiesColumnas.forEach(esp => {
        const t = res.totalesEspecie[esp];
        trTotal += `<td><strong>${Math.round(t.nIni)}</strong></td><td><strong>${Math.round(t.nRes)}</strong></td>
                    <td><strong>${t.gIni.toFixed(2)}</strong></td><td><strong>${t.gRes.toFixed(2)}</strong></td>
                    <td><strong>${t.vIni.toFixed(2)}</strong></td><td><strong>${t.vRes.toFixed(2)}</strong></td>`;
    });
    tbody.innerHTML = filas.join("") + trTotal + "</tr>";
}

// Aviso cuando las especies usan funciones con distinta definición de volumen
function renderizarAvisoVolumen() {
    const div = document.getElementById("avisoVolumen");
    if (!div) return;
    const especies = [...new Set(registrosIngresados.map(r => r.especie))];
    const defs = new Set(especies.map(e => descripcionVolumen(funcionDeEspecie(e))));
    const sinFuncion = especies.filter(e => !funcionDeEspecie(e));
    const msgs = [];
    if (defs.size > 1) msgs.push(`Las funciones seleccionadas entregan volúmenes con distinta definición (${[...defs].map(escapeHtml).join(" / ")}). Los totales suman volúmenes no homogéneos; revise la Sección 3 o declárelo en el informe.`);
    if (sinFuncion.length) msgs.push(`Especies sin función en el compendio (volumen con factor de forma): ${sinFuncion.map(escapeHtml).join(", ")}.`);
    div.innerHTML = msgs.map(m => `<div class="conaf-alert alert-warning">⚠️ ${m}</div>`).join("");
}

// Punto 5: estadística calculada sobre exactamente las parcelas 1..N declaradas
function calcularEstadistica() {
    const { numParcelas, areaParcela } = parametrosValidados;
    const factorParcelaHa = 10000 / areaParcela;

    const parcelas = Array.from({ length: numParcelas }, () => ({ nArboles: 0, gTotal: 0 }));
    registrosIngresados.forEach(arb => {
        const p = parcelas[arb.parcela - 1];
        if (!p) return; // no debería ocurrir: la carga y la validación lo impiden
        p.nArboles += 1;
        p.gTotal += areaBasal(arb.dap);
    });

    const listaN = parcelas.map(p => p.nArboles * factorParcelaHa);
    const listaG = parcelas.map(p => p.gTotal * factorParcelaHa);
    const nNum = numParcelas;
    const tVal = obtenerTStudent(Math.max(1, nNum - 1));
    const media = a => a.reduce((x, y) => x + y, 0) / a.length;
    const varianza = (a, m) => a.length > 1 ? a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1) : NaN;

    const mediaN = media(listaN), mediaG = media(listaG);
    const varN = varianza(listaN, mediaN), varG = varianza(listaG, mediaG);
    const cv = (v, m) => (m > 0 && !isNaN(v)) ? Math.sqrt(v) / m * 100 : NaN;
    const err = (v, m) => (m > 0 && !isNaN(v)) ? tVal * Math.sqrt(v) / Math.sqrt(nNum) / m * 100 : NaN;

    return {
        nNum, tVal, mediaN, mediaG, varN, varG,
        cvN: cv(varN, mediaN), cvG: cv(varG, mediaG),
        errN: err(varN, mediaN), errG: err(varG, mediaG),
        parcelasVacias: parcelas.map((p, i) => p.nArboles === 0 ? i + 1 : null).filter(x => x !== null)
    };
}

function renderizarEstadisticaMuestreo() {
    const tbody = document.getElementById("tbodyEstadisticaMuestreo");
    const nota = document.getElementById("notaEstadistica");
    tbody.innerHTML = "";
    if (nota) nota.innerHTML = "";

    if (!parametrosValidados || registrosIngresados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="11">Complete la configuración del rodal e ingrese datos de parcelas para calcular la estadística del inventario.</td></tr>`;
        return;
    }

    const s = calcularEstadistica();
    const f = (x, d, suf = "") => isNaN(x) ? "n/c" : x.toFixed(d) + suf;
    tbody.innerHTML = `<tr>
        <td><strong>${escapeHtml(parametrosValidados.rodalName)}</strong></td>
        <td>${s.nNum}</td>
        <td>${s.tVal.toFixed(2)}</td>
        <td>${Math.round(s.mediaN)}</td>
        <td>${s.mediaG.toFixed(2)}</td>
        <td>${isNaN(s.varN) ? "n/c" : Math.round(s.varN)}</td>
        <td>${f(s.varG, 2)}</td>
        <td>${f(s.cvN, 2, "%")}</td>
        <td>${f(s.cvG, 2, "%")}</td>
        <td>${f(s.errN, 2, "%")}</td>
        <td>${f(s.errG, 2, "%")}</td>
    </tr>`;

    const notas = [`Estadística calculada sobre las ${s.nNum} parcelas declaradas en la Sección 1.`];
    if (s.parcelasVacias.length) notas.push(`Parcelas sin árboles registrados (se consideran con 0 árb/ha): ${s.parcelasVacias.join(", ")}.`);
    if (s.nNum < 2) notas.push("Con una sola parcela no es posible calcular varianza ni error de muestreo (n/c).");
    if (nota) nota.innerHTML = notas.map(escapeHtml).join("<br>");
}

function filasAnexoFunciones() {
    const especiesPresentes = [...new Set(registrosIngresados.map(r => r.especie))];
    return especiesPresentes.map(espNombre => {
        const info = buscarEspecie(espNombre);
        const f = funcionDeEspecie(espNombre);
        const H = alturasPromedioEspecie[espNombre] || 15;
        const arboles = registrosIngresados.filter(r => r.especie === espNombre);
        let fuera = 0;
        if (f) {
            const rango = rangoDiametricoFuncion(f);
            if (rango) fuera = arboles.filter(a => a.dap < rango.min || a.dap > rango.max).length;
        }
        return {
            especie: espNombre,
            cientifico: info ? info.cientifico : "",
            id: f ? f.id : "FF",
            ecuacion: f ? f.ecuacion : `V = g · H · ${fmtNum(factorFormaEspecie[espNombre] || FACTOR_FORMA_DEFECTO, 2)}`,
            volumen: descripcionVolumen(f),
            altura: f ? (f.usaH ? f.altura : "No usa altura") : "Altura promedio (m)",
            alturaUsada: H,
            region: f ? f.region : "—",
            estado: f ? f.estado : "—",
            fuente: f ? `${f.fuente} (${f.anio})` : "Sin función en el compendio: factor de forma definido por el usuario",
            n: f ? f.n : "—",
            rangoD: f ? f.rangoD : "—",
            r2: f ? f.r2 : "—",
            pagina: f ? f.pagina : "—",
            grupal: f && f.especies.length > 1 ? f.especies.join(", ") : "",
            fueraRango: fuera,
            nArboles: arboles.length
        };
    });
}

function renderizarAnexoFormulas() {
    const tbody = document.getElementById("tbodyFormulasFuentes");
    const filas = filasAnexoFunciones();

    if (filas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No hay especies registradas en el inventario.</td></tr>`;
        return;
    }

    tbody.innerHTML = filas.map(r => `
        <tr>
            <td><strong>${escapeHtml(r.especie)}</strong><br><em>(${escapeHtml(r.cientifico)})</em></td>
            <td><code>${escapeHtml(r.ecuacion)}</code>${r.grupal ? `<br><small>Función grupal: ${escapeHtml(r.grupal)}</small>` : ""}</td>
            <td>D: DAP (cm); H: ${escapeHtml(r.altura)}<br><small>${escapeHtml(r.volumen)} (m³)</small></td>
            <td>${escapeHtml(r.fuente)}${r.id !== "FF" ? `<br><small>Región ${escapeHtml(r.region)} · ${escapeHtml(r.estado)} · n: ${escapeHtml(r.n)} · R²: ${escapeHtml(r.r2)} · Rango DAP: ${escapeHtml(r.rangoD)}<br>Citado en: Drake, Emanuelli y Acuña (2003), Compendio de Funciones Dendrométricas del Bosque Nativo, p. ${r.pagina}.</small>` : ""}</td>
        </tr>`).join("");
}

function actualizarGraficos(res) {
    if (typeof Chart === "undefined") return;
    if (!res.clases || res.clases.length === 0) {
        [chartEstructura, chartVolumen, chartComparativa].forEach(c => c && c.destroy());
        chartEstructura = chartVolumen = chartComparativa = null;
        return;
    }

    const labelsClases = res.clases.map(c => `${c.min}-${c.max} cm`);
    const dataNIni = res.clases.map((_, i) => Math.round(res.matriz[i]["Total"].nIni));
    const dataNRes = res.clases.map((_, i) => Math.round(res.matriz[i]["Total"].nRes));

    if (chartEstructura) chartEstructura.destroy();
    chartEstructura = new Chart(document.getElementById("chartEstructuraDiametrica"), {
        type: 'bar',
        data: {
            labels: labelsClases,
            datasets: [
                { label: 'N° Inicial (árb./ha)', data: dataNIni, backgroundColor: '#a3d9b8' },
                { label: 'N° Residual (árb./ha)', data: dataNRes, backgroundColor: '#006633' }
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
            datasets: [{ data: dataVPorEspecie, backgroundColor: ['#006633', '#003366', '#d48806', '#4b5563'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });

    const totGlobal = res.totalesEspecie["Total"];
    if (chartComparativa) chartComparativa.destroy();
    chartComparativa = new Chart(document.getElementById("chartComparativaManejo"), {
        type: 'bar',
        data: {
            labels: ['Volumen (m³/ha)'],
            datasets: [
                { label: 'Volumen Inicial', data: [totGlobal.vIni], backgroundColor: '#80b3ff' },
                { label: 'Volumen Corta (Extraído)', data: [totGlobal.vIni - totGlobal.vRes], backgroundColor: '#ff8080' },
                { label: 'Volumen Residual', data: [totGlobal.vRes], backgroundColor: '#80e6b3' }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: { y: { beginAtZero: true, title: { display: true, text: 'Volumen m³/ha' } } }
        }
    });
}

// =====================================================================
// EXPORTACIÓN A EXCEL CON FORMATO (requiere xlsx-js-style, que sí escribe estilos)
// - Títulos de tabla en negrita, relleno gris #D6D6D6, centrados vertical/horizontal
// - Bordes finos negros en todas las celdas de las tablas
// - Celdas combinadas en encabezados, ancho de columnas automático
// - Formatos numéricos: N entero, G y V con 2 decimales, g y v individuales con 4
// =====================================================================
const BORDE_FINO = {
    top: { style: "thin", color: { rgb: "000000" } },
    bottom: { style: "thin", color: { rgb: "000000" } },
    left: { style: "thin", color: { rgb: "000000" } },
    right: { style: "thin", color: { rgb: "000000" } }
};
const FUENTE_BASE = { name: "Arial", sz: 10, color: { rgb: "000000" } };

const ESTILOS_XLSX = {
    titulo: { font: { ...FUENTE_BASE, bold: true, sz: 13 }, alignment: { horizontal: "center", vertical: "center", wrapText: true } },
    nota: { font: { ...FUENTE_BASE, italic: true, sz: 9 }, alignment: { horizontal: "left", vertical: "top", wrapText: true } },
    etiqueta: { font: { ...FUENTE_BASE, bold: true }, fill: { patternType: "solid", fgColor: { rgb: "F2F2F2" } }, alignment: { horizontal: "left", vertical: "center" }, border: BORDE_FINO },
    valor: { font: FUENTE_BASE, alignment: { horizontal: "left", vertical: "center" }, border: BORDE_FINO },
    encabezado: { font: { ...FUENTE_BASE, bold: true }, fill: { patternType: "solid", fgColor: { rgb: "D6D6D6" } }, alignment: { horizontal: "center", vertical: "center", wrapText: true }, border: BORDE_FINO },
    celda: { font: FUENTE_BASE, alignment: { horizontal: "center", vertical: "center" }, border: BORDE_FINO },
    celdaTexto: { font: FUENTE_BASE, alignment: { horizontal: "left", vertical: "center", wrapText: true }, border: BORDE_FINO },
    total: { font: { ...FUENTE_BASE, bold: true }, fill: { patternType: "solid", fgColor: { rgb: "E6E6E6" } }, alignment: { horizontal: "center", vertical: "center" }, border: BORDE_FINO }
};

function conFormato(estilo, numFmt) {
    return { ...estilo, numFmt };
}

class HojaExcel {
    constructor() {
        this.filas = [];
        this.estilos = [];
        this.merges = [];
        this.sinAncho = new Set();   // celdas que no cuentan para el ancho automático
        this.altos = {};
    }
    fila(valores, estilo) {
        const r = this.filas.length;
        this.filas.push(valores);
        this.estilos.push(Array.isArray(estilo) ? estilo : valores.map(() => estilo));
        return r;
    }
    vacia() { return this.fila([], null); }
    unir(r1, c1, r2, c2) {
        this.merges.push({ s: { r: r1, c: c1 }, e: { r: r2, c: c2 } });
        if (c2 > c1) this.sinAncho.add(`${r1},${c1}`);
    }
    alto(r, pt) { this.altos[r] = pt; }
    construir(anchoMin = 8, anchoMax = 60) {
        const ws = XLSX.utils.aoa_to_sheet(this.filas);
        let maxC = 0;
        this.filas.forEach(f => { maxC = Math.max(maxC, f.length - 1); });
        this.merges.forEach(m => { maxC = Math.max(maxC, m.e.c); });

        this.estilos.forEach((fila, r) => fila.forEach((s, c) => {
            if (!s) return;
            const a = XLSX.utils.encode_cell({ r, c });
            if (!ws[a]) ws[a] = { t: "s", v: "" };
            ws[a].s = s;
            if (s.numFmt && ws[a].t === "n") ws[a].z = s.numFmt;
        }));
        // Toda celda dentro de un rango combinado recibe el estilo de su esquina (bordes completos)
        this.merges.forEach(m => {
            const base = ws[XLSX.utils.encode_cell(m.s)];
            for (let r = m.s.r; r <= m.e.r; r++) for (let c = m.s.c; c <= m.e.c; c++) {
                const a = XLSX.utils.encode_cell({ r, c });
                if (!ws[a]) ws[a] = { t: "s", v: "" };
                if (base && base.s) ws[a].s = base.s;
            }
        });

        ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: Math.max(0, this.filas.length - 1), c: maxC } });
        ws["!merges"] = this.merges;

        const anchos = [];
        for (let c = 0; c <= maxC; c++) {
            let w = anchoMin;
            this.filas.forEach((f, r) => {
                if (this.sinAncho.has(`${r},${c}`) || f[c] === undefined || f[c] === null) return;
                const txt = typeof f[c] === "number" ? f[c].toFixed(2) : String(f[c]);
                const largo = Math.max(...txt.split("\n").map(l => l.length));
                w = Math.max(w, largo + 2);
            });
            anchos.push({ wch: Math.min(w, anchoMax) });
        }
        ws["!cols"] = anchos;
        ws["!rows"] = [];
        Object.entries(this.altos).forEach(([r, pt]) => { ws["!rows"][r] = { hpt: pt }; });
        return ws;
    }
}

function nombreArchivoSeguro(s) {
    return normalizarTexto(s).replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "rodal";
}

function exportarTablaExcel() {
    if (typeof XLSX === 'undefined' || !XLSX.utils) {
        alert("La librería de Excel no está disponible (revise su conexión a internet).");
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
    const E = ESTILOS_XLSX;
    const fmtN = conFormato(E.celda, "0");
    const fmt2 = conFormato(E.celda, "0.00");
    const fmtNg = conFormato(E.celda, '0;-0;"-"');      // tabla de rodal: cero se muestra como "-"
    const fmt2g = conFormato(E.celda, '0.00;-0.00;"-"');
    const fmt1 = conFormato(E.celda, "0.0");
    const fmt4 = conFormato(E.celda, "0.0000");
    const totN = conFormato(E.total, "0");
    const tot2 = conFormato(E.total, "0.00");

    // Bloque de parámetros: etiqueta en columnas A:C combinadas y valor en D:G combinadas
    const bloqueParametros = (h) => {
        [
            ["Identificador Rodal", p.rodalName],
            ["Superficie Rodal (ha)", Number(p.superficieRodal.toFixed(2))],
            ["Región (numeración compendio)", REGIONES_COMPENDIO[p.regionCompendio] || p.regionCompendio],
            ["Tipo Forestal (D.S. 259)", p.tipoForestal],
            ["Estructura", p.estructuraRodal],
            ["Estado de Desarrollo", p.estadoDesarrollo],
            ["Diseño de Muestreo", `${p.tipoMuestreo} (${p.formaParcela})`],
            ["N° Parcelas", p.numParcelas],
            ["Superficie Parcela (m²)", Number(p.areaParcela.toFixed(2))],
            ["Amplitud Clase (cm)", Number(p.amplitudClase.toFixed(2))],
            ["Factor de Expansión F", Number(res.factorExpansion.toFixed(2))]
        ].forEach(([lab, val]) => {
            const r = h.fila([lab, "", "", val, "", "", ""], [E.etiqueta, E.etiqueta, E.etiqueta, E.valor, E.valor, E.valor, E.valor]);
            h.unir(r, 0, r, 2);
            h.unir(r, 3, r, 6);
        });
    };

    // ---------------- HOJA 1: TABLA DE RODAL ----------------
    const h1 = new HojaExcel();
    const nCols1 = 3 + res.especiesColumnas.length * 6;
    const rT = h1.fila(["12.3.9 TABLA DE RODAL INICIAL, RESIDUAL Y VOLUMETRÍA FORESTAL"], E.titulo);
    h1.unir(rT, 0, rT, nCols1 - 1); h1.alto(rT, 22);
    h1.vacia();
    bloqueParametros(h1);
    h1.vacia();

    const hr0 = h1.fila(["Rango DAP (cm)", "", "Mc (cm)", ...res.especiesColumnas.flatMap(esp => {
        const altP = alturasPromedioEspecie[esp] ? ` (H = ${alturasPromedioEspecie[esp].toFixed(1)} m)` : "";
        return [`${esp}${altP}`, "", "", "", "", ""];
    })], E.encabezado);
    const hr1 = h1.fila(["Mín. (≥)", "Máx. (<)", "", ...res.especiesColumnas.flatMap(() => ["N (árb./ha)", "", "G (m²/ha)", "", "V (m³/ha)", ""])], E.encabezado);
    const hr2 = h1.fila(["", "", "", ...res.especiesColumnas.flatMap(() => ["Ini.", "Res.", "Ini.", "Res.", "Ini.", "Res."])], E.encabezado);
    h1.unir(hr0, 0, hr0, 1);           // Rango DAP
    h1.unir(hr0, 2, hr2, 2);           // Mc
    h1.unir(hr1, 0, hr2, 0);           // Mín
    h1.unir(hr1, 1, hr2, 1);           // Máx
    res.especiesColumnas.forEach((_, k) => {
        const c0 = 3 + k * 6;
        h1.unir(hr0, c0, hr0, c0 + 5);
        h1.unir(hr1, c0, hr1, c0 + 1);
        h1.unir(hr1, c0 + 2, hr1, c0 + 3);
        h1.unir(hr1, c0 + 4, hr1, c0 + 5);
    });

    const estilosFila = (eN, e2) => [fmt1, fmt1, fmt1, ...res.especiesColumnas.flatMap(() => [eN, eN, e2, e2, e2, e2])];
    res.clases.forEach((cl, i) => {
        const fila = [cl.min, cl.max, cl.mc];
        res.especiesColumnas.forEach(esp => {
            const c = res.matriz[i][esp];
            fila.push(Math.round(c.nIni), Math.round(c.nRes), Number(c.gIni.toFixed(2)), Number(c.gRes.toFixed(2)), Number(c.vIni.toFixed(2)), Number(c.vRes.toFixed(2)));
        });
        h1.fila(fila, estilosFila(fmtNg, fmt2g));
    });

    const filaTot = ["TOTAL RODAL", "", ""];
    res.especiesColumnas.forEach(esp => {
        const t = res.totalesEspecie[esp];
        filaTot.push(Math.round(t.nIni), Math.round(t.nRes), Number(t.gIni.toFixed(2)), Number(t.gRes.toFixed(2)), Number(t.vIni.toFixed(2)), Number(t.vRes.toFixed(2)));
    });
    const rTot = h1.fila(filaTot, [E.total, E.total, E.total, ...res.especiesColumnas.flatMap(() => [totN, totN, tot2, tot2, tot2, tot2])]);
    h1.unir(rTot, 0, rTot, 2);

    h1.vacia();
    const rN1 = h1.fila(["Volumen por árbol calculado con funciones del Compendio de Funciones Dendrométricas del Bosque Nativo (Drake, Emanuelli y Acuña, 2003). Función, fuente y tipo de volumen por especie en la Hoja 4."], E.nota);
    h1.unir(rN1, 0, rN1, nCols1 - 1); h1.alto(rN1, 28);
    const defs = new Set([...new Set(registrosIngresados.map(r => r.especie))].map(e => descripcionVolumen(funcionDeEspecie(e))));
    if (defs.size > 1) {
        const rN2 = h1.fila([`Advertencia: las funciones seleccionadas entregan volúmenes con distinta definición (${[...defs].join(" / ")}).`], E.nota);
        h1.unir(rN2, 0, rN2, nCols1 - 1); h1.alto(rN2, 28);
    }
    const ws1 = h1.construir(9, 28);

    // ---------------- HOJA 2: ESTADÍSTICA DE MUESTREO ----------------
    const s = calcularEstadistica();
    const h2 = new HojaExcel();
    const rT2 = h2.fila(["ESTADÍSTICAS DEL INVENTARIO FORESTAL POR RODAL (PRECISIÓN DEL MUESTREO)"], E.titulo);
    h2.unir(rT2, 0, rT2, 10); h2.alto(rT2, 22);
    h2.vacia();
    const e0 = h2.fila(["Rodal", "Parcelas (N°)", "t de Student (95 %)", "Media", "", "Varianza", "", "Coeficiente de Variación (%)", "", "Error de Muestreo (%)", ""], E.encabezado);
    const e1 = h2.fila(["", "", "", "Densidad (árb/ha)", "Área Basal (m²/ha)", "Densidad (árb/ha)", "Área Basal (m²/ha)", "Densidad", "Área Basal", "Densidad", "Área Basal"], E.encabezado);
    [0, 1, 2].forEach(c => h2.unir(e0, c, e1, c));
    [3, 5, 7, 9].forEach(c => h2.unir(e0, c, e0, c + 1));
    const num = (x, d) => isNaN(x) ? "n/c" : Number(x.toFixed(d));
    h2.fila([p.rodalName, s.nNum, Number(s.tVal.toFixed(3)), Math.round(s.mediaN), num(s.mediaG, 2),
        isNaN(s.varN) ? "n/c" : Math.round(s.varN), num(s.varG, 2), num(s.cvN, 2), num(s.cvG, 2), num(s.errN, 2), num(s.errG, 2)],
        [E.celdaTexto, fmtN, conFormato(E.celda, "0.000"), fmtN, fmt2, fmtN, fmt2, fmt2, fmt2, fmt2, fmt2]);
    h2.vacia();
    const notas2 = [`Calculado sobre las ${s.nNum} parcelas declaradas de ${p.areaParcela} m² (factor parcela → ha: ${fmtNum(10000 / p.areaParcela, 2)}).`];
    if (s.parcelasVacias.length) notas2.push(`Parcelas sin árboles registrados (0 árb/ha): ${s.parcelasVacias.join(", ")}.`);
    notas2.forEach(t => { const r = h2.fila([t], E.nota); h2.unir(r, 0, r, 10); });
    const wsStat = h2.construir(10, 22);

    // ---------------- HOJA 3: REGISTROS DE CAMPO ----------------
    const h3 = new HojaExcel();
    const rT3 = h3.fila(["DETALLE DE REGISTROS DE CAMPO"], E.titulo);
    h3.unir(rT3, 0, rT3, 10); h3.alto(rT3, 22);
    h3.vacia();
    bloqueParametros(h3);
    h3.vacia();
    h3.fila(["N°", "Rodal", "Parcela", "Especie", "Nombre científico", "DAP (cm)", "H (m)", "Área basal g (m²)", "Volumen v (m³)", "Intervención", "Función (ID)"], E.encabezado);
    registrosIngresados.forEach((item, i) => {
        const H = alturasPromedioEspecie[item.especie] || 15.0;
        const info = buscarEspecie(item.especie);
        const f = funcionDeEspecie(item.especie);
        h3.fila([i + 1, item.rodal, item.parcela, item.especie, info ? info.cientifico : "", Number(item.dap.toFixed(2)), Number(H.toFixed(1)),
            Number(areaBasal(item.dap).toFixed(4)), Number(calcularVolumenArbol(item.dap, H, item.especie).toFixed(4)),
            item.corta === "SI" ? "Corta" : "Residual", f ? f.id : "FF"],
            [fmtN, E.celdaTexto, fmtN, E.celdaTexto, E.celdaTexto, fmt2, fmt1, fmt4, fmt4, E.celda, E.celda]);
    });
    const ws2 = h3.construir(8, 32);

    // ---------------- HOJA 4: ANEXO DE FUNCIONES ----------------
    const h4 = new HojaExcel();
    const enc4 = ["Especie", "Nombre científico", "ID función", "Ecuación de volumen", "Tipo de volumen", "Altura requerida", "H usada (m)", "Región", "Estado", "Fuente original", "n", "Rango DAP del estudio", "R²", "Pág. compendio", "Árboles", "Árboles fuera de rango DAP"];
    const rT4 = h4.fila(["ANEXO TÉCNICO: FUNCIONES DE VOLUMEN UTILIZADAS Y FUENTES BIBLIOGRÁFICAS"], E.titulo);
    h4.unir(rT4, 0, rT4, enc4.length - 1); h4.alto(rT4, 22);
    h4.vacia();
    h4.fila(enc4, E.encabezado);
    filasAnexoFunciones().forEach(r => {
        h4.fila([r.especie, r.cientifico, r.id, r.ecuacion, r.volumen, r.altura, Number(r.alturaUsada.toFixed(1)), r.region, r.estado, r.fuente, r.n, r.rangoD, r.r2, r.pagina, r.nArboles, r.fueraRango],
            [E.celdaTexto, E.celdaTexto, E.celda, E.celdaTexto, E.celdaTexto, E.celdaTexto, fmt1, E.celda, E.celda, E.celdaTexto, E.celda, E.celda, E.celda, E.celda, fmtN, fmtN]);
    });
    h4.vacia();
    [
        `Referencia: ${REFERENCIA_COMPENDIO}`,
        "D = DAP (cm); H = altura (m); V = volumen (m³); DLU = diámetro límite de utilización. Cada función fue verificada contra la tabla de volumen impresa en su página del compendio.",
        "Las especies con ID \"FF\" no tienen función en el compendio; su volumen se estimó como g · H · f con el factor de forma indicado por el usuario."
    ].forEach(t => { const r = h4.fila([t], E.nota); h4.unir(r, 0, r, enc4.length - 1); h4.alto(r, 26); });
    const ws3 = h4.construir(8, 45);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "Hoja1_TablaRodal_Volumen");
    XLSX.utils.book_append_sheet(wb, wsStat, "Hoja2_EstadisticaMuestreo");
    XLSX.utils.book_append_sheet(wb, ws2, "Hoja3_DatosCampo");
    XLSX.utils.book_append_sheet(wb, ws3, "Hoja4_Anexo_Funciones");

    XLSX.writeFile(wb, `Tabla_Rodal_CONAF_${nombreArchivoSeguro(p.rodalName)}.xlsx`);
}

// =====================================================================
// EXPORTACIÓN A PDF EN HOJA TAMAÑO OFICIO APAISADA
// =====================================================================
async function exportarInformePDFApaisadoOficio() {
    if (!window.jspdf || !window.html2canvas) {
        alert("Las librerías de generación PDF no están disponibles.");
        return;
    }

    if (!parametrosValidados) {
        alert("Debe validar los parámetros del rodal.");
        return;
    }

    const detailsElem = document.getElementById("detailsDatosCampo");
    const wasOpen = detailsElem.hasAttribute("open");

    if (!wasOpen) detailsElem.setAttribute("open", "true");

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [215.9, 355.6]
    });

    const p = parametrosValidados;
    const pageWidth = 355.6;
    const pageHeight = 215.9;
    const margin = 10;
    const printableWidth = pageWidth - (margin * 2);

    doc.setFillColor(0, 102, 51);
    doc.rect(0, 0, pageWidth, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text("CONAF - CORPORACIÓN NACIONAL FORESTAL | INFORME DE INVENTARIO Y TABLA DE RODAL", pageWidth / 2, 11, { align: "center" });

    doc.setTextColor(33, 33, 33);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`Identificación Rodal: ${p.rodalName}`, margin, 24);

    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo Forestal: ${p.tipoForestal} | Estructura: ${p.estructuraRodal} | Estado: ${p.estadoDesarrollo} | Región: ${p.regionCompendio}`, margin, 29);
    doc.text(`Superficie: ${p.superficieRodal.toFixed(2)} ha | Muestreo: ${p.tipoMuestreo} (${p.formaParcela}) | Parcelas: ${p.numParcelas} de ${p.areaParcela.toFixed(2)} m² | Volumen: funciones del Compendio de Funciones Dendrométricas del Bosque Nativo (2003)`, margin, 34);

    const tablaElement = document.getElementById("printTablaArea");
    const canvasTabla = await html2canvas(tablaElement, { scale: 2, useCORS: true, logging: false });
    const imgDataTabla = canvasTabla.toDataURL("image/png");

    const startY = 38;
    const availableHeight = pageHeight - startY - margin;

    let imgWidth = printableWidth;
    let imgHeight = (canvasTabla.height * imgWidth) / canvasTabla.width;

    if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = (canvasTabla.width * imgHeight) / canvasTabla.height;
    }

    const xPos = margin + ((printableWidth - imgWidth) / 2);
    doc.addImage(imgDataTabla, 'PNG', xPos, startY, imgWidth, imgHeight);

    doc.addPage([215.9, 355.6], 'landscape');

    doc.setFillColor(0, 102, 51);
    doc.rect(0, 0, pageWidth, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text("CONAF - ESTADÍSTICAS DEL MUESTREO Y ANÁLISIS GRÁFICO DEL RODAL", pageWidth / 2, 11, { align: "center" });

    const statElement = document.getElementById("printEstadisticaArea");
    const canvasStat = await html2canvas(statElement, { scale: 2, useCORS: true });
    const imgStat = canvasStat.toDataURL("image/png");

    const hStat = (canvasStat.height * printableWidth) / canvasStat.width;
    doc.addImage(imgStat, 'PNG', margin, 24, printableWidth, Math.min(hStat, 40));

    const canvasC1 = await html2canvas(document.getElementById("boxChart1"), { scale: 2 });
    const canvasC2 = await html2canvas(document.getElementById("boxChart2"), { scale: 2 });
    const canvasC3 = await html2canvas(document.getElementById("boxChart3"), { scale: 2 });

    const yGraficos = 24 + Math.min(hStat, 40) + 8;
    const wChart = 100;
    doc.addImage(canvasC1.toDataURL("image/png"), 'PNG', 15, yGraficos, wChart, (canvasC1.height * wChart) / canvasC1.width);
    doc.addImage(canvasC2.toDataURL("image/png"), 'PNG', 125, yGraficos, wChart, (canvasC2.height * wChart) / canvasC2.width);

    const wChart3 = 110;
    doc.addImage(canvasC3.toDataURL("image/png"), 'PNG', 230, yGraficos, wChart3, (canvasC3.height * wChart3) / canvasC3.width);

    if (!wasOpen) detailsElem.removeAttribute("open");

    doc.save(`Tabla_Rodal_CONAF_Oficio_${nombreArchivoSeguro(p.rodalName)}.pdf`);
}
