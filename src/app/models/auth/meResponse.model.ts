import { Role } from "../role/role.model"

export interface MeResponse{
        email: string
        id: string
        role: Role
        seudonimo: string
}