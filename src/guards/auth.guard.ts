import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    // ✅ Injeção de dependências:
    // - AuthService: valida e decodifica o token JWT.
    // - UserService: consulta o usuário no banco.
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    // 🔒 Método principal do guard.
    // O NestJS executa este método antes de entrar em qualquer rota protegida.
    async canActivate(context: ExecutionContext) {

        // 🔍 Obtém o objeto da requisição HTTP.
        // (O ExecutionContext dá acesso à request, response, etc.)
        const request = context.switchToHttp().getRequest();

        // 🧠 Extrai o cabeçalho Authorization (Bearer TOKEN)
        const { authorization } = request.headers;

        try {
            // 🔑 Separa o prefixo "Bearer" e pega apenas o token.
            // Exemplo: "Bearer abc123" → pega "abc123".
            const token = (authorization ?? '').split(' ')[1];

            // 🧾 Usa o AuthService para validar e decodificar o token JWT.
            // Se o token for inválido ou expirado, gera erro e cai no catch.
            const data = this.authService.checkToken(token);
            
            // 💾 Guarda o conteúdo decodificado do token (payload) dentro da requisição.
            // Assim ele fica disponível para outros guards ou decorators (ex: @User()).
            request.tokenPayload = data;

            // 👤 Busca o usuário completo no banco (via ID do token).
            // Isso garante que a requisição sempre tenha um "user" real e atualizado.
            request.user = await this.userService.show(data.id);

            // ✅ Tudo certo: token válido e usuário encontrado → rota liberada.
            return true;

        } catch (e) {
            // ❌ Token ausente, inválido ou expirado → acesso negado.
            // O NestJS retorna automaticamente HTTP 403 Forbidden.
            return false;
        } 
    }
}
