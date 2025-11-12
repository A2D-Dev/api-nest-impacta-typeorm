import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      // janela global: 60s, limite global: 10 req
      throttlers: [
        { ttl: 60 * 1000, limit: 10 },
      ],
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'cristian.hoeger77@ethereal.email',
          pass: 'E8bSzEfymeeXFAst8u'
        }
      },
      defaults: {
        from: '"api-Anderson" <cristian.hoeger77@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ✅ Guard global: aplica o rate limiting em tudo
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  exports: [AppService],
})
export class AppModule {}
