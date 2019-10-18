export class Usuario {
    constructor(
        public ID?: number,
        public id_num_sap?: number,
        public id_carId?: number,
        public per_fecha_ingreso?: string,
        public per_login?: string,
        public per_lugar_trabajo?: string,
        public per_nombre?: string,
        public rol?: Rol[]
    ) {}

}

export class Periodo {
    constructor(
        public peri_descripcion?: string,
        public peri_fecha_anyo?: number
    ) {}

}

export class Rol {
    constructor(
        public rol_grupo_adc?: string,
        public rol_tipo?: string,
        public id_num_sap?: number
    ) {}

}