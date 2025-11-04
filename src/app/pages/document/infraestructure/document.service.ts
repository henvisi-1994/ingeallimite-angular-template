import { Injectable } from '@angular/core';
import { Document } from '../domain/Document';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from '../../../shared/infraestructure/base.repository';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends BaseRepository<Document> {
  protected override endpoint: string ='products';

 constructor(protected override http: HttpClient) {
    super(http);
  }
  getData(): Document[] {
    return [
      {
        id: 1,
        nombre: 'informe_financiero_2025.pdf',
        titulo: 'Informe Financiero Anual 2025',
        descripcion:
          'Resumen detallado del desempeño financiero durante el año fiscal 2025.',
        created_at: '2025-01-10T10:00:00Z',
        updated_at: '2025-01-10T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 2,
        nombre: 'manual_usuario_sistema.docx',
        titulo: 'Manual del Usuario del Sistema',
        descripcion:
          'Guía completa para el uso de las funcionalidades del sistema interno.',
        created_at: '2025-02-11T10:00:00Z',
        updated_at: '2025-02-11T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 3,
        nombre: 'contrato_servicios_tecnologicos.pdf',
        titulo: 'Contrato de Servicios Tecnológicos',
        descripcion:
          'Acuerdo legal para la prestación de servicios de soporte y mantenimiento.',
        created_at: '2025-03-12T10:00:00Z',
        updated_at: '2025-03-12T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 4,
        nombre: 'presentacion_proyecto_vision2026.pptx',
        titulo: 'Presentación Proyecto Visión 2026',
        descripcion:
          'Diapositivas de presentación del nuevo proyecto estratégico de la empresa.',
        created_at: '2025-04-13T10:00:00Z',
        updated_at: '2025-04-13T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 5,
        nombre: 'plan_marketing_2025.xlsx',
        titulo: 'Plan de Marketing 2025',
        descripcion: 'Estrategias y objetivos de marketing para el año 2025.',
        created_at: '2025-05-14T10:00:00Z',
        updated_at: '2025-05-14T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 6,
        nombre: 'reporte_innovacion.pdf',
        titulo: 'Reporte de Innovación y Tecnología',
        descripcion:
          'Informe sobre las iniciativas tecnológicas implementadas durante el trimestre.',
        created_at: '2025-06-15T10:00:00Z',
        updated_at: '2025-06-15T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 7,
        nombre: 'acta_reunion_abril.docx',
        titulo: 'Acta de Reunión - Abril',
        descripcion:
          'Resumen de temas tratados y acuerdos alcanzados en la reunión de abril.',
        created_at: '2025-07-16T10:00:00Z',
        updated_at: '2025-07-16T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 8,
        nombre: 'evaluacion_riesgos_2025.pdf',
        titulo: 'Evaluación de Riesgos 2025',
        descripcion:
          'Análisis de los principales riesgos operativos y financieros para el año 2025.',
        created_at: '2025-08-17T10:00:00Z',
        updated_at: '2025-08-17T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 9,
        nombre: 'politicas_seguridad_informacion.pdf',
        titulo: 'Políticas de Seguridad de la Información',
        descripcion:
          'Documento que establece las normas de seguridad para la información corporativa.',
        created_at: '2025-09-18T10:00:00Z',
        updated_at: '2025-09-18T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 10,
        nombre: 'memoria_sostenibilidad_2024.pdf',
        titulo: 'Memoria de Sostenibilidad 2024',
        descripcion:
          'Informe anual sobre las acciones sostenibles implementadas en 2024.',
        created_at: '2025-10-19T10:00:00Z',
        updated_at: '2025-10-19T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 11,
        nombre: 'guia_incorporacion_personal.docx',
        titulo: 'Guía de Incorporación de Personal',
        descripcion:
          'Documento con el proceso de bienvenida y adaptación de nuevos empleados.',
        created_at: '2025-01-20T10:00:00Z',
        updated_at: '2025-01-20T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 12,
        nombre: 'reporte_inventario_q1_2025.xlsx',
        titulo: 'Reporte de Inventario Q1 2025',
        descripcion:
          'Detalle del estado de inventarios del primer trimestre del año 2025.',
        created_at: '2025-02-21T10:00:00Z',
        updated_at: '2025-02-21T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 13,
        nombre: 'politica_privacidad_usuarios.pdf',
        titulo: 'Política de Privacidad de Usuarios',
        descripcion:
          'Documento legal sobre la recolección y uso de datos personales.',
        created_at: '2025-03-22T10:00:00Z',
        updated_at: '2025-03-22T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 14,
        nombre: 'manual_procedimientos_operativos.docx',
        titulo: 'Manual de Procedimientos Operativos',
        descripcion:
          'Instrucciones detalladas sobre los procedimientos internos de las áreas.',
        created_at: '2025-04-23T10:00:00Z',
        updated_at: '2025-04-23T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 15,
        nombre: 'propuesta_mejora_servicio_cliente.pdf',
        titulo: 'Propuesta de Mejora del Servicio al Cliente',
        descripcion:
          'Estrategias propuestas para optimizar la atención al cliente.',
        created_at: '2025-05-24T10:00:00Z',
        updated_at: '2025-05-24T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 16,
        nombre: 'resumen_ejecucion_presupuestaria_2024.xlsx',
        titulo: 'Resumen de Ejecución Presupuestaria 2024',
        descripcion:
          'Comparativo entre el presupuesto asignado y ejecutado en 2024.',
        created_at: '2025-06-25T10:00:00Z',
        updated_at: '2025-06-25T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 17,
        nombre: 'plan_capacitacion_empleados_2025.docx',
        titulo: 'Plan de Capacitación de Empleados 2025',
        descripcion:
          'Programa anual de formación y desarrollo profesional del personal.',
        created_at: '2025-07-26T10:00:00Z',
        updated_at: '2025-07-26T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 18,
        nombre: 'acta_reunion_direccion_julio.pdf',
        titulo: 'Acta de Reunión de Dirección - Julio',
        descripcion:
          'Registro de los puntos tratados en la reunión de dirección de julio.',
        created_at: '2025-08-27T10:00:00Z',
        updated_at: '2025-08-27T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 19,
        nombre: 'analisis_satisfaccion_clientes_2024.pdf',
        titulo: 'Análisis de Satisfacción de Clientes 2024',
        descripcion:
          'Resultados del estudio de satisfacción realizado en 2024.',
        created_at: '2025-09-28T10:00:00Z',
        updated_at: '2025-09-28T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
      {
        id: 20,
        nombre: 'memorando_interno_enero_2025.docx',
        titulo: 'Memorando Interno - Enero 2025',
        descripcion:
          'Comunicado interno con las directrices del inicio del año 2025.',
        created_at: '2025-10-29T10:00:00Z',
        updated_at: '2025-10-29T12:00:00Z',
        hydrate: function (data: any) {
          Object.assign(this, data);
          return this;
        },
        createCopy: function () {
          return JSON.parse(JSON.stringify(this));
        },
      },
    ];
  }
}
