import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login-dto";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { AuthForgetDTO } from "./dto/auth-forget-dto";
import { AuthResetDTO } from "./dto/auth-reset-dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FileService} from "src/file/file.service";
import { join } from 'path';

interface UploadResult {
  tipo: string;
  success: boolean;
  message: string;
  filename: string;
  destination: string;
  mimetype: string;
  sizeKB: number;
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ) {}

    @Post('login')
    async login(@Body() {email,password}: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async registrer(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password,token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('id') user) {
        
        return {user};
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({fileType:'image/png'}),
                new MaxFileSizeValidator({maxSize: 1024 * 17})
            ]
        })) photo: Express.Multer.File,
    ) {
    const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`);

    try {
        return await this.fileService.upload(photo, path);
        } catch (e) {
        throw new BadRequestException(e);
        }
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(
        @User() user,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo',
        maxCount: 1
     }, {
        name: 'documents',
        maxCount: 10
    }]))
    
    
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(
        @User() user,
        @UploadedFiles() files: { photo?: Express.Multer.File[]; documents?: Express.Multer.File[] }
    ) {

    // ✅ Coloque AQUI logo no início do método
    if (!files || (!files.photo && !files.documents)) {
        throw new BadRequestException('Nenhum arquivo foi enviado ou campo incorreto.');
    }

        console.log('📦 \x1b[36mArquivos recebidos:\x1b[0m', files);
        const results: UploadResult[] = [];

    // 📸 Salva foto (se enviada)
    if (files.photo && files.photo[0]) {
        const photo = files.photo[0];
        const path = `E:/Impacta/DevUploads/photo/${user.id}-${photo.originalname}`;
        const saved = await this.fileService.upload(photo, path);
        results.push({ tipo: 'foto', ...saved });
    }

    // 📄 Salva documentos (se enviados)
    if (files.documents) {
        for (const doc of files.documents) {
        const path = `E:/Impacta/DevUploads/documents/${user.id}-${doc.originalname}`;
        const saved = await this.fileService.upload(doc, path);
        results.push({ tipo: 'documento', ...saved });
        }
    }

    return results;
    }
}