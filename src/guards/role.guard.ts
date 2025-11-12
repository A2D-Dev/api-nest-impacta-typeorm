import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enums";

@Injectable()
export class RoleGuard implements CanActivate {

    // ✅ O Reflector é quem lê os metadados (os decorators) do NestJS.
    // Ele permite acessar o que foi definido com @Roles() nas rotas e nas classes.
    constructor(
        private readonly reflector: Reflector
    ) {}

    // 🔒 O método canActivate é executado ANTES de entrar na rota.
    // Ele decide se o usuário pode ou não passar (true = passa, false = bloqueia).
    async canActivate(context: ExecutionContext) {

        // 🧠 Lê todas as roles (papéis) aplicadas:
        // 👉 Primeiro no método (ex: @Get)
        // 👉 Depois na classe (ex: @Controller)
        // ⚙️ Usando getAllAndMerge() — as roles são SOMADAS e não sobrescritas.
        const requerideRoles = this.reflector.getAllAndMerge<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        
        // 🟢 Se a rota não tiver nenhuma role específica (pública), libera o acesso.
        if (!requerideRoles || requerideRoles.length === 0) {
            return true;
        }

        // 📦 Captura o usuário logado a partir da requisição HTTP.
        // Esse "user" vem do AuthGuard, que decodifica o token JWT.
        const { user } = context.switchToHttp().getRequest();

        // 🧩 Filtra as roles exigidas e confere se o usuário tem uma delas.
        // Exemplo: requerideRoles = ['Admin', 'User'] e user.role = 'User' → passa.
        const rolesFilted = requerideRoles.filter(role => role === user.role);

        // 🚦 Retorna true se o usuário tiver pelo menos uma role autorizada.
        // Caso contrário, o Nest retorna 403 Forbidden automaticamente.
        return rolesFilted.length > 0;
    }
}
