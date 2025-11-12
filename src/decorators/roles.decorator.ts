import { SetMetadata } from "@nestjs/common";
import { Role } from "src/enums/role.enums";

// 🧱 Chave usada para identificar o metadado que guardará as roles
// Pense nisso como o "rótulo" onde as permissões ficarão armazenadas
export const ROLES_KEY = "roles";

// 🧠 Decorator personalizado @Roles()
// Ele serve para marcar uma rota ou classe com as roles (papéis) necessários
// Exemplo de uso: @Roles(Role.Admin) ou @Roles(Role.Admin, Role.User)
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);