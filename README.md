# Arquitectura de Datos centrada en Databricks

## 1. Capa de Fuentes
Se mantienen las fuentes operativas existentes:
- POS  
- E-commerce  
- Inventario  
- CRM  
- Formularios web  

Todas conectadas mediante conectores estandarizados y soportando formatos como **Excel, CSV, TXT, JSON** y consumo vía **API REST**.

---

## 2. Capa de Ingesta
Se utiliza **Azure Data Factory** como orquestador de pipelines ETL:
- Automatiza la extracción desde las distintas fuentes.  
- Soporta cargas en modo **batch** (diarias y semanales).  
- Habilita cargas **near real-time** para el canal e-commerce.  
- Permite calendarizar ejecuciones según necesidades operativas.  

---

## 3. Capa de Almacenamiento
El **Data Lake** se construye sobre **Azure Data Lake Storage Gen2**, bajo el patrón **arquitectura medallón**:
- **Bronze**: datos crudos.  
- **Silver**: datos limpios y normalizados.  
- **Gold**: datos enriquecidos y listos para análisis.  

Todos persistidos en **formato Delta** para garantizar transacciones ACID y versionado.  
De forma complementaria, se incorpora **MongoDB** para gestionar información no estructurada y semiestructurada de clientes.

---

## 4. Capa de Procesamiento con Databricks
**Databricks** es el motor distribuido del ecosistema:
- Limpieza, transformación y reducción de datos con **PySpark notebooks**.  
- Entrenamiento de modelos predictivos de demanda por SKU y algoritmos de segmentación de clientes con **MLlib**.  
- Integración nativa con **Delta Lake** para eficiencia en lectura/escritura y control de versiones.  
- Notebooks colaborativos que permiten trazabilidad y escalabilidad de los flujos de datos y modelos.  

---

## 5. Capa de Consumo
**Microsoft Power BI** se conecta directamente a la capa **Gold** del Data Lake gestionada por Databricks:
- Dashboards interactivos con KPIs de inventario y comportamiento de clientes.  
- Publicación de resultados de modelos predictivos y segmentación en vistas dedicadas para áreas comercial y marketing.  

