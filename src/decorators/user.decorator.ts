import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

// 🧠 createParamDecorator: função do NestJS que permite criar um decorator personalizado.
// Vamos criar o @User() para pegar o usuário logado da requisição.

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {

    // 🔍 Pega o objeto da requisição (HTTP Request)
    const request = context.switchToHttp().getRequest();

    // 👤 O AuthGuard insere o usuário no request.user quando o token JWT é válido.
    // Aqui verificamos se ele realmente está lá.
    if (request.user) {

        // 🧩 Se o decorator for usado como @User('email'), por exemplo,
        // ele retorna apenas a propriedade pedida (ex: request.user.email)
        if (filter) {
            return request.user[filter];
        } 
        // 🔁 Caso contrário, retorna o objeto completo do usuário.
        else {
            return request.user;
        }

    } else {

        // ❌ Se o AuthGuard não foi usado antes e o user não existe na requisição,
        // lançamos uma exceção amigável explicando o que está faltando.
        throw new NotFoundException("Usuário não encontrado no Request. Use o AuthGuard para obter o usuário");

    }
});
