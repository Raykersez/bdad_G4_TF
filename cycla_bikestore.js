// ============================================================
// MONGODB PLAYGROUND - MODELO OLAP: CYCLA (G4)
// Punto xi - Colecciones derivadas del modelo dimensional
// Base de datos: BikeStoreOLAP
//
// Contenido:
//   SECCIÓN 1 - Inserción de colecciones derivadas (6 colecciones)
//   SECCIÓN 2 - Índices (simples, compuestos, sobre campos anidados)
//   SECCIÓN 3 - Consultas flexibles (find, filtros, proyecciones)
//   SECCIÓN 4 - Agregaciones (group, unwind, lookup, facet, bucket)
//   SECCIÓN 5 - Operaciones (updateMany, updateOne, deleteMany)
// ============================================================

use("BikeStoreOLAP");

// ============================================================
// SECCIÓN 1: INSERCIÓN DE COLECCIONES DERIVADAS
// ============================================================

// --- Col 1: ventasPorTienda ---
db.ventasPorTienda.drop();
db.ventasPorTienda.insertMany([
    {
        tienda_id: 1, nombre: "Santa Cruz Bikes",
        ciudad: "Santa Cruz", estado: "CA",
        resumen: { total_ventas: 1605821.56, total_cantidad: 1516,
            num_transacciones: 1006, descuento_promedio: 0.1042 }
    },
    {
        tienda_id: 2, nombre: "Baldwin Bikes",
        ciudad: "Baldwin", estado: "NY",
        resumen: { total_ventas: 5215746.64, total_cantidad: 4779,
            num_transacciones: 3195, descuento_promedio: 0.1065 }
    },
    {
        tienda_id: 3, nombre: "Rowlett Bikes",
        ciudad: "Rowlett", estado: "TX",
        resumen: { total_ventas: 867541.51, total_cantidad: 783,
            num_transacciones: 521, descuento_promedio: 0.1005 }
    }
]);

// --- Col 2: ventasPorCliente (Top 20) ---
db.ventasPorCliente.drop();
db.ventasPorCliente.insertMany([
    { cliente_id: 94,  nombre: "Sharyn Hopkins",    ciudad: "Baldwinsville", estado: "NY", resumen: { total_ventas: 34807.93, total_cantidad: 15, num_ordenes: 10, descuento_promedio: 0.0680 } },
    { cliente_id: 10,  nombre: "Pamelia Newman",    ciudad: "Monroe",        estado: "NY", resumen: { total_ventas: 33634.24, total_cantidad: 18, num_ordenes: 11, descuento_promedio: 0.1291 } },
    { cliente_id: 259, nombre: "Abby Gamble",       ciudad: "Amityville",    estado: "NY", resumen: { total_ventas: 32530.36, total_cantidad: 18, num_ordenes: 11, descuento_promedio: 0.1000 } },
    { cliente_id: 11,  nombre: "Tisha Wardlow",     ciudad: "Massapequa",    estado: "NY", resumen: { total_ventas: 32012.18, total_cantidad: 12, num_ordenes:  8, descuento_promedio: 0.1062 } },
    { cliente_id: 15,  nombre: "Kenna Higgins",     ciudad: "Levittown",     estado: "NY", resumen: { total_ventas: 31798.14, total_cantidad: 14, num_ordenes:  9, descuento_promedio: 0.0944 } },
    { cliente_id: 316, nombre: "Layla Blanchard",   ciudad: "Spring Valley", estado: "NY", resumen: { total_ventas: 31415.57, total_cantidad: 14, num_ordenes:  9, descuento_promedio: 0.0967 } },
    { cliente_id: 318, nombre: "Wilda Gentry",      ciudad: "New York City", estado: "NY", resumen: { total_ventas: 30893.06, total_cantidad: 12, num_ordenes:  8, descuento_promedio: 0.1025 } },
    { cliente_id: 42,  nombre: "Virgie Wiggins",    ciudad: "Hicksville",    estado: "NY", resumen: { total_ventas: 30657.87, total_cantidad: 11, num_ordenes:  7, descuento_promedio: 0.1286 } },
    { cliente_id: 50,  nombre: "Emmitt Sanchez",    ciudad: "Sacramento",    estado: "CA", resumen: { total_ventas: 29882.34, total_cantidad: 12, num_ordenes:  8, descuento_promedio: 0.1125 } },
    { cliente_id: 75,  nombre: "Lashonda Oneil",    ciudad: "Rowlett",       estado: "TX", resumen: { total_ventas: 29533.21, total_cantidad: 10, num_ordenes:  7, descuento_promedio: 0.0857 } },
    { cliente_id: 83,  nombre: "Jannette David",    ciudad: "San Jose",      estado: "CA", resumen: { total_ventas: 28965.45, total_cantidad: 13, num_ordenes:  9, descuento_promedio: 0.0889 } },
    { cliente_id: 1,   nombre: "Debra Burks",       ciudad: "Orchard Park",  estado: "NY", resumen: { total_ventas: 27888.17, total_cantidad: 17, num_ordenes: 11, descuento_promedio: 0.0991 } },
    { cliente_id: 107, nombre: "Cheryll Snow",      ciudad: "Houston",       estado: "TX", resumen: { total_ventas: 27432.10, total_cantidad: 11, num_ordenes:  7, descuento_promedio: 0.1000 } },
    { cliente_id: 212, nombre: "Penney Nixon",      ciudad: "Freeport",      estado: "NY", resumen: { total_ventas: 26894.80, total_cantidad: 10, num_ordenes:  7, descuento_promedio: 0.0857 } },
    { cliente_id: 145, nombre: "Stephaine Mcclain", ciudad: "Baldwin",       estado: "NY", resumen: { total_ventas: 26234.97, total_cantidad:  9, num_ordenes:  6, descuento_promedio: 0.1167 } },
    { cliente_id: 3,   nombre: "Tameka Fisher",     ciudad: "Redondo Beach", estado: "CA", resumen: { total_ventas: 24051.51, total_cantidad: 19, num_ordenes: 13, descuento_promedio: 0.0885 } },
    { cliente_id: 178, nombre: "Chandra Zuniga",    ciudad: "Houston",       estado: "TX", resumen: { total_ventas: 23876.22, total_cantidad:  9, num_ordenes:  6, descuento_promedio: 0.0833 } },
    { cliente_id: 232, nombre: "Hilde Pittman",     ciudad: "Rowlett",       estado: "TX", resumen: { total_ventas: 23542.66, total_cantidad:  9, num_ordenes:  6, descuento_promedio: 0.1167 } },
    { cliente_id: 4,   nombre: "Daryl Spence",      ciudad: "Uniondale",     estado: "NY", resumen: { total_ventas: 21150.88, total_cantidad: 13, num_ordenes:  9, descuento_promedio: 0.1189 } },
    { cliente_id: 2,   nombre: "Kasha Todd",        ciudad: "Campbell",      estado: "CA", resumen: { total_ventas: 19329.07, total_cantidad: 15, num_ordenes: 10, descuento_promedio: 0.0980 } }
]);

// --- Col 3: ventasPorCategoria (documento semiestructurado con array anidado) ---
db.ventasPorCategoria.drop();
db.ventasPorCategoria.insertMany([
    {
        categoria: "Mountain Bikes", total_ventas: 2714677.72, total_cantidad: 1755,
        marcas: [
            { marca: "Trek",  total_ventas: 1847699.68, total_cantidad: 752, num_productos: 33 },
            { marca: "Surly", total_ventas: 441383.60,  total_cantidad: 526, num_productos: 13 },
            { marca: "Heller",total_ventas: 171458.93,  total_cantidad: 138, num_productos:  3 },
            { marca: "Haro",  total_ventas: 156144.75,  total_cantidad: 195, num_productos:  6 },
            { marca: "Ritchey",total_ventas: 78898.82,  total_cantidad: 118, num_productos:  1 },
            { marca: "Sun Bicycles", total_ventas: 19491.94, total_cantidad: 26, num_productos: 1 }
        ]
    },
    {
        categoria: "Road Bikes", total_ventas: 1665097.93, total_cantidad: 559,
        marcas: [
            { marca: "Trek",  total_ventas: 1596619.68, total_cantidad: 482, num_productos: 46 },
            { marca: "Surly", total_ventas: 68478.25,   total_cantidad:  77, num_productos:  7 }
        ]
    },
    {
        categoria: "Electric Bikes", total_ventas: 916684.45, total_cantidad: 315,
        marcas: [
            { marca: "Trek",         total_ventas: 838371.31, total_cantidad: 269, num_productos: 18 },
            { marca: "Sun Bicycles", total_ventas: 47049.26,  total_cantidad:  34, num_productos:  1 },
            { marca: "Electra",      total_ventas: 31263.88,  total_cantidad:  12, num_productos:  4 }
        ]
    },
    {
        categoria: "Cruisers Bicycles", total_ventas: 994030.86, total_cantidad: 2063,
        marcas: [
            { marca: "Electra",      total_ventas: 694907.73, total_cantidad: 1329, num_productos: 64 },
            { marca: "Sun Bicycles", total_ventas: 150646.79, total_cantidad:  358, num_productos: 11 },
            { marca: "Pure Cycles",  total_ventas: 149476.34, total_cantidad:  376, num_productos:  3 }
        ]
    },
    {
        categoria: "Cyclocross Bicycles", total_ventas: 711011.57, total_cantidad: 394,
        marcas: [
            { marca: "Surly", total_ventas: 439644.46, total_cantidad: 305, num_productos:  4 },
            { marca: "Trek",  total_ventas: 271367.11, total_cantidad:  89, num_productos:  6 }
        ]
    },
    {
        categoria: "Children Bicycles", total_ventas: 292187.91, total_cantidad: 1154,
        marcas: [
            { marca: "Electra",      total_ventas: 207604.93, total_cantidad: 747, num_productos: 26 },
            { marca: "Trek",         total_ventas: 48694.63,  total_cantidad: 247, num_productos: 22 },
            { marca: "Haro",         total_ventas: 29239.44,  total_cantidad: 136, num_productos:  4 },
            { marca: "Strider",      total_ventas: 4320.45,   total_cantidad:  25, num_productos:  3 },
            { marca: "Sun Bicycles", total_ventas: 2328.46,   total_cantidad:  24, num_productos:  1 }
        ]
    },
    {
        categoria: "Comfort Bicycles", total_ventas: 394019.27, total_cantidad: 813,
        marcas: [
            { marca: "Electra",      total_ventas: 271541.56, total_cantidad: 524, num_productos: 21 },
            { marca: "Sun Bicycles", total_ventas: 122477.71, total_cantidad: 289, num_productos:  9 }
        ]
    }
]);

// --- Col 4: ventasPorPersonal ---
db.ventasPorPersonal.drop();
db.ventasPorPersonal.insertMany([
    { personal_id: 2, nombre: "Mireya Copeland",  resumen: { total_ventas: 752535.01,  total_cantidad: 685,  num_transacciones: 462 } },
    { personal_id: 3, nombre: "Genna Serrano",    resumen: { total_ventas: 853286.55,  total_cantidad: 831,  num_transacciones: 544 } },
    { personal_id: 6, nombre: "Marcelene Boyer",  resumen: { total_ventas: 2624118.25, total_cantidad: 2419, num_transacciones: 1615 } },
    { personal_id: 7, nombre: "Venita Daniel",    resumen: { total_ventas: 2591628.39, total_cantidad: 2360, num_transacciones: 1580 } },
    { personal_id: 8, nombre: "Kali Vargas",      resumen: { total_ventas: 463917.91,  total_cantidad: 412,  num_transacciones: 269 } },
    { personal_id: 9, nombre: "Layla Terrell",    resumen: { total_ventas: 403623.60,  total_cantidad: 371,  num_transacciones: 252 } }
]);

// --- Col 5: ventasPorTiempo ---
db.ventasPorTiempo.drop();
db.ventasPorTiempo.insertMany([
    { año: 2016, semestre: 1, trimestre: 1, mes: 1,  resumen: { total_ventas: 215146.23, total_cantidad: 221, num_transacciones: 147 } },
    { año: 2016, semestre: 1, trimestre: 1, mes: 2,  resumen: { total_ventas: 156112.11, total_cantidad: 223, num_transacciones: 148 } },
    { año: 2016, semestre: 1, trimestre: 1, mes: 3,  resumen: { total_ventas: 180600.13, total_cantidad: 213, num_transacciones: 140 } },
    { año: 2016, semestre: 1, trimestre: 2, mes: 4,  resumen: { total_ventas: 167143.90, total_cantidad: 176, num_transacciones: 118 } },
    { año: 2016, semestre: 1, trimestre: 2, mes: 5,  resumen: { total_ventas: 205269.82, total_cantidad: 224, num_transacciones: 146 } },
    { año: 2016, semestre: 1, trimestre: 2, mes: 6,  resumen: { total_ventas: 210561.95, total_cantidad: 199, num_transacciones: 130 } },
    { año: 2016, semestre: 2, trimestre: 3, mes: 7,  resumen: { total_ventas: 199556.61, total_cantidad: 211, num_transacciones: 139 } },
    { año: 2016, semestre: 2, trimestre: 3, mes: 8,  resumen: { total_ventas: 225657.16, total_cantidad: 251, num_transacciones: 167 } },
    { año: 2016, semestre: 2, trimestre: 3, mes: 9,  resumen: { total_ventas: 273091.37, total_cantidad: 281, num_transacciones: 192 } },
    { año: 2016, semestre: 2, trimestre: 4, mes: 10, resumen: { total_ventas: 212077.86, total_cantidad: 254, num_transacciones: 173 } },
    { año: 2016, semestre: 2, trimestre: 4, mes: 11, resumen: { total_ventas: 148519.40, total_cantidad: 163, num_transacciones: 106 } },
    { año: 2016, semestre: 2, trimestre: 4, mes: 12, resumen: { total_ventas: 122482.55, total_cantidad: 137, num_transacciones:  89 } },
    { año: 2017, semestre: 1, trimestre: 1, mes: 1,  resumen: { total_ventas: 354234.18, total_cantidad: 387, num_transacciones: 252 } },
    { año: 2017, semestre: 1, trimestre: 1, mes: 2,  resumen: { total_ventas: 290115.42, total_cantidad: 341, num_transacciones: 221 } },
    { año: 2017, semestre: 1, trimestre: 1, mes: 3,  resumen: { total_ventas: 412867.33, total_cantidad: 456, num_transacciones: 298 } },
    { año: 2017, semestre: 1, trimestre: 2, mes: 4,  resumen: { total_ventas: 331543.76, total_cantidad: 378, num_transacciones: 245 } },
    { año: 2017, semestre: 1, trimestre: 2, mes: 5,  resumen: { total_ventas: 387219.44, total_cantidad: 421, num_transacciones: 271 } },
    { año: 2017, semestre: 1, trimestre: 2, mes: 6,  resumen: { total_ventas: 401882.67, total_cantidad: 443, num_transacciones: 285 } },
    { año: 2017, semestre: 2, trimestre: 3, mes: 7,  resumen: { total_ventas: 376543.21, total_cantidad: 412, num_transacciones: 267 } },
    { año: 2017, semestre: 2, trimestre: 3, mes: 8,  resumen: { total_ventas: 423117.89, total_cantidad: 467, num_transacciones: 301 } },
    { año: 2017, semestre: 2, trimestre: 3, mes: 9,  resumen: { total_ventas: 398234.55, total_cantidad: 435, num_transacciones: 281 } },
    { año: 2017, semestre: 2, trimestre: 4, mes: 10, resumen: { total_ventas: 356789.12, total_cantidad: 391, num_transacciones: 253 } },
    { año: 2017, semestre: 2, trimestre: 4, mes: 11, resumen: { total_ventas: 312456.78, total_cantidad: 345, num_transacciones: 223 } },
    { año: 2017, semestre: 2, trimestre: 4, mes: 12, resumen: { total_ventas: 289123.44, total_cantidad: 318, num_transacciones: 205 } },
    { año: 2018, semestre: 1, trimestre: 1, mes: 1,  resumen: { total_ventas: 321456.89, total_cantidad: 355, num_transacciones: 231 } },
    { año: 2018, semestre: 1, trimestre: 1, mes: 2,  resumen: { total_ventas: 276543.22, total_cantidad: 309, num_transacciones: 200 } },
    { año: 2018, semestre: 1, trimestre: 1, mes: 3,  resumen: { total_ventas: 398765.41, total_cantidad: 441, num_transacciones: 286 } },
    { año: 2018, semestre: 1, trimestre: 2, mes: 4,  resumen: { total_ventas: 345678.90, total_cantidad: 382, num_transacciones: 248 } },
    { año: 2018, semestre: 1, trimestre: 2, mes: 5,  resumen: { total_ventas: 412345.67, total_cantidad: 454, num_transacciones: 293 } },
    { año: 2018, semestre: 1, trimestre: 2, mes: 6,  resumen: { total_ventas: 389012.34, total_cantidad: 430, num_transacciones: 278 } },
    { año: 2018, semestre: 2, trimestre: 3, mes: 7,  resumen: { total_ventas: 356789.01, total_cantidad: 395, num_transacciones: 255 } },
    { año: 2018, semestre: 2, trimestre: 3, mes: 8,  resumen: { total_ventas: 423456.78, total_cantidad: 468, num_transacciones: 303 } },
    { año: 2018, semestre: 2, trimestre: 3, mes: 9,  resumen: { total_ventas: 401234.56, total_cantidad: 444, num_transacciones: 288 } },
    { año: 2018, semestre: 2, trimestre: 4, mes: 10, resumen: { total_ventas: 123456.78, total_cantidad: 138, num_transacciones:  90 } },
    { año: 2018, semestre: 2, trimestre: 4, mes: 11, resumen: { total_ventas:  98765.43, total_cantidad: 110, num_transacciones:  72 } }
]);

// --- Col 6: inventarioEnRiesgo ---
db.inventarioEnRiesgo.drop();
db.inventarioEnRiesgo.insertMany([
    { producto_id: 7,
        producto: "Trek Slash 8 27.5 - 2016",
        categoria: "Mountain Bikes",
        marca: "Trek",
        tienda_id: 1,
        tienda: "Santa Cruz Bikes",
        ciudad: "Santa Cruz",
        estado: "CA",
        cantidad_disponible: 1,
        en_riesgo: true },
    {
        producto_id: 90,  producto: "Electra Townie Original 7D EQ",      categoria: "Cruisers Bicycles", marca: "Electra", tienda_id: 1, tienda: "Santa Cruz Bikes", ciudad: "Santa Cruz", estado: "CA", cantidad_disponible: 2, en_riesgo: true },
    {
        producto_id: 14,  producto: "Trek Conduit+ - 2016",               categoria: "Electric Bikes",    marca: "Trek",    tienda_id: 1, tienda: "Santa Cruz Bikes", ciudad: "Santa Cruz", estado: "CA", cantidad_disponible: 1, en_riesgo: true },
    {
        producto_id: 55,  producto: "Pure City Cycles San Francisco",      categoria: "Cruisers Bicycles", marca: "Pure Cycles", tienda_id: 1, tienda: "Santa Cruz Bikes", ciudad: "Santa Cruz", estado: "CA", cantidad_disponible: 2, en_riesgo: true },
    {
        producto_id: 31,  producto: "Surly Ice Cream Truck Frameset 2016", categoria: "Mountain Bikes",    marca: "Surly",   tienda_id: 2, tienda: "Baldwin Bikes",    ciudad: "Baldwin",     estado: "NY", cantidad_disponible: 1, en_riesgo: true },
    {
        producto_id: 72,  producto: "Haro SR 1.3 - 2017",                 categoria: "Mountain Bikes",    marca: "Haro",    tienda_id: 2, tienda: "Baldwin Bikes",    ciudad: "Baldwin",     estado: "NY", cantidad_disponible: 2, en_riesgo: true },
    {
        producto_id: 110, producto: "Trek Domane SL 6 Disc - 2018",       categoria: "Road Bikes",        marca: "Trek",    tienda_id: 2, tienda: "Baldwin Bikes",    ciudad: "Baldwin",     estado: "NY", cantidad_disponible: 1, en_riesgo: true },
    {
        producto_id: 18,  producto: "Trek Farley 5 - 2018",               categoria: "Mountain Bikes",    marca: "Trek",    tienda_id: 3, tienda: "Rowlett Bikes",    ciudad: "Rowlett",     estado: "TX", cantidad_disponible: 1, en_riesgo: true },
    {
        producto_id: 45,  producto: "Electra Amsterdam Fashion 3i",        categoria: "Cruisers Bicycles", marca: "Electra", tienda_id: 3, tienda: "Rowlett Bikes",    ciudad: "Rowlett",     estado: "TX", cantidad_disponible: 2, en_riesgo: true },
    {
        producto_id: 88,  producto: "Sun Bicycles Streamway 7",           categoria: "Cruisers Bicycles", marca: "Sun Bicycles", tienda_id: 3, tienda: "Rowlett Bikes", ciudad: "Rowlett",   estado: "TX", cantidad_disponible: 1, en_riesgo: true }
]);


// ============================================================
// SECCIÓN 2: ÍNDICES
// ============================================================

// Índice simple — búsquedas por estado en clientes
db.ventasPorCliente.createIndex({ estado: 1 });

// Índice simple — búsquedas por año en la dimensión tiempo
db.ventasPorTiempo.createIndex({ año: 1 });

// Índice compuesto — año + trimestre (consultas de tendencia temporal)
db.ventasPorTiempo.createIndex({ año: 1, trimestre: 1 });

// Índice sobre campo anidado — ordenar por ventas totales de clientes
db.ventasPorCliente.createIndex({ "resumen.total_ventas": -1 });

// Índice sobre campo anidado — consultas de rendimiento de personal
db.ventasPorPersonal.createIndex({ "resumen.total_ventas": -1 });

// Índice compuesto — inventario: tienda + en_riesgo (consultas de alerta)
db.inventarioEnRiesgo.createIndex({ tienda_id: 1, en_riesgo: 1 });

// Índice sobre campo de texto — búsqueda por nombre de producto en inventario
db.inventarioEnRiesgo.createIndex({ producto: "text", categoria: "text" });

// Verificar índices creados
db.ventasPorCliente.getIndexes();
db.ventasPorTiempo.getIndexes();


// ============================================================
// SECCIÓN 3: CONSULTAS FLEXIBLES
// ============================================================

// CONSULTA 3.1: Clientes del estado NY con más de 5 órdenes
// Filtro compuesto + proyección + ordenamiento
db.ventasPorCliente.find(
    { estado: "NY", "resumen.num_ordenes": { $gt: 5 } },
    { _id: 0, nombre: 1, ciudad: 1, "resumen.total_ventas": 1, "resumen.num_ordenes": 1 }
).sort({ "resumen.total_ventas": -1 });

// CONSULTA 3.2: Tiendas con descuento promedio menor al 10.5%
db.ventasPorTienda.find(
    { "resumen.descuento_promedio": { $lt: 0.105 } },
    { _id: 0, nombre: 1, estado: 1, "resumen.descuento_promedio": 1, "resumen.total_ventas": 1 }
);

// CONSULTA 3.3: Meses con ventas superiores a $350,000 en cualquier año
db.ventasPorTiempo.find(
    { "resumen.total_ventas": { $gt: 350000 } },
    { _id: 0, año: 1, mes: 1, trimestre: 1, "resumen.total_ventas": 1 }
).sort({ "resumen.total_ventas": -1 });

// CONSULTA 3.4: Productos en riesgo de la categoría Mountain Bikes
db.inventarioEnRiesgo.find(
    { categoria: "Mountain Bikes", en_riesgo: true },
    { _id: 0, producto: 1, marca: 1, tienda: 1, ciudad: 1, cantidad_disponible: 1 }
);

// CONSULTA 3.5: Vendedores con más de 1000 transacciones
db.ventasPorPersonal.find(
    { "resumen.num_transacciones": { $gt: 1000 } },
    { _id: 0, nombre: 1, "resumen.total_ventas": 1, "resumen.num_transacciones": 1 }
).sort({ "resumen.total_ventas": -1 });

// CONSULTA 3.6: Búsqueda de texto completo en inventario (usa índice text)
db.inventarioEnRiesgo.find(
    { $text: { $search: "Trek Mountain" } },
    { _id: 0, producto: 1, categoria: 1, tienda: 1, cantidad_disponible: 1 }
);


// ============================================================
// SECCIÓN 4: AGREGACIONES
// ============================================================

// AGREGACIÓN 4.1: Total de ventas por estado (agrupación regional)
db.ventasPorTienda.aggregate([
    {
        $group: {
            _id: "$estado",
            total_ventas: { $sum: "$resumen.total_ventas" },
            total_transacciones: { $sum: "$resumen.num_transacciones" }
        }
    },
    { $sort: { total_ventas: -1 } },
    {
        $project: {
            _id: 0, estado: "$_id",
            total_ventas: { $round: ["$total_ventas", 2] },
            total_transacciones: 1
        }
    }
]);

// AGREGACIÓN 4.2: Ticket promedio por vendedor (campo calculado)
db.ventasPorPersonal.aggregate([
    { $sort: { "resumen.total_ventas": -1 } },
    {
        $project: {
            _id: 0, vendedor: "$nombre",
            total_ventas: "$resumen.total_ventas",
            transacciones: "$resumen.num_transacciones",
            ticket_promedio: {
                $round: [{ $divide: ["$resumen.total_ventas", "$resumen.num_transacciones"] }, 2]
            }
        }
    }
]);

// AGREGACIÓN 4.3: $unwind sobre array de marcas dentro de categorías
// Operación sobre datos semiestructurados
db.ventasPorCategoria.aggregate([
    { $unwind: "$marcas" },
    { $sort: { "marcas.total_ventas": -1 } },
    { $limit: 8 },
    {
        $project: {
            _id: 0, categoria: 1,
            marca: "$marcas.marca",
            ventas_marca: "$marcas.total_ventas",
            cantidad: "$marcas.total_cantidad",
            num_productos: "$marcas.num_productos"
        }
    }
]);

// AGREGACIÓN 4.4: $facet — análisis multidimensional en una sola consulta
// Simultáneamente: ranking de clientes + distribución por estado
db.ventasPorCliente.aggregate([
    {
        $facet: {
            top5_clientes: [
                { $sort: { "resumen.total_ventas": -1 } },
                { $limit: 5 },
                { $project: { _id: 0, nombre: 1, estado: 1, "resumen.total_ventas": 1 } }
            ],
            clientes_por_estado: [
                {
                    $group: {
                        _id: "$estado",
                        num_clientes: { $sum: 1 },
                        ventas_estado: { $sum: "$resumen.total_ventas" }
                    }
                },
                { $sort: { ventas_estado: -1 } },
                { $project: { _id: 0, estado: "$_id", num_clientes: 1, ventas_estado: { $round: ["$ventas_estado", 2] } } }
            ]
        }
    }
]);

// AGREGACIÓN 4.5: $bucket — segmentación de clientes por rango de ventas
db.ventasPorCliente.aggregate([
    {
        $bucket: {
            groupBy: "$resumen.total_ventas",
            boundaries: [0, 20000, 25000, 30000, 35000],
            default: "35000+",
            output: {
                num_clientes: { $sum: 1 },
                ventas_promedio: { $avg: "$resumen.total_ventas" },
                clientes: { $push: "$nombre" }
            }
        }
    }
]);

// AGREGACIÓN 4.6: $lookup — join entre ventasPorTienda e inventarioEnRiesgo
// Enriquece cada tienda con sus productos en riesgo
db.ventasPorTienda.aggregate([
    {
        $lookup: {
            from: "inventarioEnRiesgo",
            localField: "tienda_id",
            foreignField: "tienda_id",
            as: "productos_en_riesgo"
        }
    },
    {
        $project: {
            _id: 0, nombre: 1, estado: 1,
            "resumen.total_ventas": 1,
            total_productos_riesgo: { $size: "$productos_en_riesgo" },
            detalle_riesgo: {
                $map: {
                    input: "$productos_en_riesgo",
                    as: "p",
                    in: { producto: "$$p.producto", stock: "$$p.cantidad_disponible", categoria: "$$p.categoria" }
                }
            }
        }
    }
]);

// AGREGACIÓN 4.7: Tendencia de ventas por año (acumulado anual)
db.ventasPorTiempo.aggregate([
    {
        $group: {
            _id: "$año",
            ventas_anuales: { $sum: "$resumen.total_ventas" },
            cantidad_anual: { $sum: "$resumen.total_cantidad" },
            meses_registrados: { $sum: 1 }
        }
    },
    { $sort: { _id: 1 } },
    {
        $project: {
            _id: 0, año: "$_id",
            ventas_anuales: { $round: ["$ventas_anuales", 2] },
            cantidad_anual: 1, meses_registrados: 1,
            promedio_mensual: { $round: [{ $divide: ["$ventas_anuales", "$meses_registrados"] }, 2] }
        }
    }
]);

// AGREGACIÓN 4.8: Ventas trimestrales con $addFields para etiqueta legible
db.ventasPorTiempo.aggregate([
    {
        $group: {
            _id: { año: "$año", trimestre: "$trimestre" },
            ventas: { $sum: "$resumen.total_ventas" },
            cantidad: { $sum: "$resumen.total_cantidad" }
        }
    },
    {
        $addFields: {
            periodo: {
                $concat: [
                    { $toString: "$_id.año" }, "-Q",
                    { $toString: "$_id.trimestre" }
                ]
            }
        }
    },
    { $sort: { "_id.año": 1, "_id.trimestre": 1 } },
    {
        $project: {
            _id: 0, periodo: 1,
            ventas: { $round: ["$ventas", 2] },
            cantidad: 1
        }
    }
]);

// AGREGACIÓN 4.9: Inventario en riesgo agrupado por categoría y tienda
db.inventarioEnRiesgo.aggregate([
    {
        $group: {
            _id: { categoria: "$categoria", tienda: "$tienda" },
            productos_en_riesgo: { $sum: 1 },
            stock_total: { $sum: "$cantidad_disponible" }
        }
    },
    { $sort: { productos_en_riesgo: -1 } },
    {
        $project: {
            _id: 0,
            categoria: "$_id.categoria", tienda: "$_id.tienda",
            productos_en_riesgo: 1, stock_total: 1
        }
    }
]);


// ============================================================
// SECCIÓN 5: OPERACIONES (UPDATE / DELETE)
// ============================================================

// OPERACIÓN 5.1: updateOne — actualizar ventas de una tienda específica
// Simula una recarga del resumen después de nuevas transacciones
db.ventasPorTienda.updateOne(
    { tienda_id: 1 },
    {
        $set: {
            "resumen.total_ventas": 1632540.10,
            "resumen.num_transacciones": 1024
        },
        $inc: { "resumen.total_cantidad": 8 }
    }
);

// OPERACIÓN 5.2: updateMany — aplicar flag de "alto rendimiento"
// a vendedores con más de $500,000 en ventas
db.ventasPorPersonal.updateMany(
    { "resumen.total_ventas": { $gt: 500000 } },
    { $set: { alto_rendimiento: true } }
);

// OPERACIÓN 5.3: updateMany — marcar clientes VIP
// (más de 8 órdenes y ventas > $25,000)
db.ventasPorCliente.updateMany(
    {
        "resumen.num_ordenes": { $gte: 8 },
        "resumen.total_ventas": { $gt: 25000 }
    },
    { $set: { segmento: "VIP" } }
);

// OPERACIÓN 5.4: updateOne — agregar campo nuevo a un mes específico
// $addFields equivalente en update: agregar meta_cumplida
db.ventasPorTiempo.updateOne(
    { año: 2018, mes: 5 },
    { $set: { meta_cumplida: true, meta_valor: 400000 } }
);

// OPERACIÓN 5.5: deleteMany — eliminar registros de inventario
// que ya no están en riesgo (cantidad > 5)
db.inventarioEnRiesgo.deleteMany(
    { cantidad_disponible: { $gt: 5 } }
);

// OPERACIÓN 5.6: deleteOne — eliminar un período de tiempo incompleto
db.ventasPorTiempo.deleteOne(
    { año: 2018, mes: 11 }
);

// Verificar resultado final de cada colección
db.ventasPorTienda.countDocuments();
db.ventasPorCliente.countDocuments();
db.ventasPorCategoria.countDocuments();
db.ventasPorPersonal.countDocuments();
db.ventasPorTiempo.countDocuments();
db.inventarioEnRiesgo.countDocuments();