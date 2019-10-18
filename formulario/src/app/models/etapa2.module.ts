export class Etapa2 {
    constructor(
        public id_peri: number,
        public id_num_sap: number,
        public infoGeneral: InfoGeneral,
        public infoEspecifica: InfoEspecifica[]
    ) {}

}

export class InfoGeneral {
    constructor(
        public ID?: number,
        public id_periId?: number,
        public id_num_sapId?: string,
        public infg_area_desarrollo?: string,
        public infg_area_desarrollo_ajuste_comp?: string,
        public infg_busqueda_desafio?: string,
        public infg_busqueda_desafio_ajuste_com?: string
    ) {}

}

export class InfoEspecifica {
    constructor(
        public ID?: number,
        public id_carId?: number,
        public id_periId?: number,
        public id_num_sapId?: number,
        public infe_req_form?: string,
        public infe_req_form_ajus?: string,
        public infe_req_esp?: string,
        public infe_req_cono?: string,
        public infe_req_exp_general?: string,
        public infe_req_exp_esp?: string,
        public infe_req_esp_ajus?: string,
        public infe_req_exp_lider?: string,
        public infe_req_otro?: string,
        public infe_req_cono_ajus?: string,
        public infe_req_exp_general_ajus?: string,
        public infe_req_exp_esp_ajus?: string,
        public infe_req_exp_esp_anyo?: string,
        public infe_req_exp_lider_ajus?: string,
        public infe_req_otro_ajus?: string,
        public infe_req_exp_general_anyo?: string,
        public infe_req_exp_lider_anyo?: string,
        public infe_comp_1?: string,
        public infe_comp_2?: string,
        public infe_comp_3?: string,
        public infe_comp_4?: string,
        public infe_comp_5?: string,
        public infe_comp_6?: string,
        public infe_comp_1_ajus?: string,
        public infe_comp_2_ajus?: string,
        public infe_comp_3_ajus?: string,
        public infe_comp_4_ajus?: string,
        public infe_comp_5_ajus?: string,
        public infe_comp_6_ajus?: string,
        public infe_cond_jornada?: string,
        public infe_cond_otro?: string,
        public infe_cond_jornada_ajus?: string,
        public infe_cond_otro_ajus?: string,
        public infe_mova_1?: string,
        public infe_mova_2?: string,
        public infe_mova_3?: string,
        public infe_mova_4?: string,
        public infe_mova_5?: string,
        public infe_mova_1_ajus?: string,
        public infe_mova_2_ajus?: string,
        public infe_mova_3_ajus?: string,
        public infe_mova_4_ajus?: string,
        public infe_mova_5_ajus?: string,
        public infe_direccion?: string,
        public infe_rotacion?: string,
        public infe_gerencia?: string,
        public infe_mision?: string

    ) {}

}

export class Cargo {
    constructor(
        public ID?: number,
        public car_nombre?: string,
        public car_direccion?: string,
        public car_mision?: string,
        public car_req_cono?: string,
        public car_req_esp?: string,
        public car_req_exp_esp?: string,
        public car_req_exp_general?: string,
        public car_req_exp_lider?: string,
        public car_req_form?: string,
        public car_rotacion?: string
    ) {}

}

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