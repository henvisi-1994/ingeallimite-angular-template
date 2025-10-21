/* eslint-disable @typescript-eslint/no-explicit-any */
export class Hidratable {
  hydrate(data: any): any {
    // Obtener los valores por defecto creando una nueva instancia del mismo tipo
    const ctor = this.constructor as new () => this
    const defValues = new ctor()

    for (const key in this) {
      const value: any = this[key]

      if (value instanceof Hidratable) {
        if (data[key]) value.hydrate(data[key])
      } else if (Object.prototype.hasOwnProperty.call(data, key)) {
        this[key] = data[key]
      } else {
        this[key] = defValues[key]
      }
    }
    return this
  }

  createCopy(): any {
    const ctor = this.constructor as new () => this
    const copy = new ctor()
    copy.hydrate(this)
    return copy
  }
}
