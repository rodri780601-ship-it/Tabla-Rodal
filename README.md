# Tabla de Rodal – Plan de Manejo Forestal de Bosque Nativo

Aplicación web (HTML + CSS + JS, sin servidor) para construir la tabla de rodal inicial y residual, la estadística de muestreo y los gráficos de un rodal de bosque nativo.

## Funciones de volumen

El volumen por árbol se calcula con las funciones del **Compendio de Funciones Dendrométricas del Bosque Nativo** (Drake, F.; Emanuelli, P.; Acuña, E., 2003; CONAF – GTZ).

- Se incluyen 171 funciones de árboles individuales para 30 especies. Cada una se verificó contra la tabla de volumen impresa en su página del compendio.
- Se excluyeron las funciones que usan altura de comienzo de copa, altura comercial o altura no informada, y las que no reproducen su propia tabla.
- En la Sección 3 se elige la función de cada especie. La marcada con ★ es la sugerida según la región (numeración del compendio) y el estado de desarrollo del rodal.
- Las especies sin función en el compendio usan V = g · H · f, con un factor de forma que el usuario debe definir y justificar.
- La Sección 6 y la Hoja 4 del Excel documentan función, fuente original, año, región, tipo de volumen (DLU, corteza) y página del compendio.

## Importación de parcelas

Columnas: `Parcela`, `Especie`, `Dap` y `Corta` (opcional, SI/NO). El N° de parcela debe estar entre 1 y el número declarado. Si alguna fila tiene errores (parcela fuera de rango, especie no reconocida, DAP o Corta inválidos), el archivo completo se rechaza y se listan las filas a corregir.

## Exportación

Excel con formato (bordes, encabezados grises, celdas combinadas) usando `xlsx-js-style`, y PDF tamaño oficio apaisado.
