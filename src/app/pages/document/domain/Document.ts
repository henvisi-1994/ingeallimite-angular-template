import { ModelBase } from '../../../shared/domain/modelBase';

export class Document extends ModelBase {
  nombre: string | null;
  titulo: string | null;
  descripcion: string | null;
  constructor() {
    super();
    this.nombre = null;
    this.titulo = null;
    this.descripcion = null;
  }
}
