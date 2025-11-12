import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// 🧠 createParamDecorator: função do NestJS que permite criar decorators personalizados.
// Aqui criamos o @ParamId() para pegar o "id" que vem na URL (params.id) e converter para número.

export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {

    // 🔍 Pega o objeto da requisição HTTP atual (request)
    const request = context.switchToHttp().getRequest();

    // 🎯 Acessa o parâmetro "id" enviado na rota e converte para número.
    // Exemplo: /users/5  → request.params.id = "5"  → Number("5") = 5
    return Number(request.params.id);

});
