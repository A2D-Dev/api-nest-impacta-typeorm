import { Injectable, BadRequestException } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

export interface UploadResult {
  success: boolean;
  message: string;
  filename: string;
  destination: string;
  mimetype: string;
  sizeKB: number;
}

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File, path: string): Promise<UploadResult> {
    try {
      if (!file || !file.buffer) {
        throw new BadRequestException('Arquivo inválido ou vazio.');
      }

      const folder = dirname(path);
      await mkdir(folder, { recursive: true });

      const buffer = Buffer.from(file.buffer);
      await writeFile(path, buffer);

      return {
        success: true,
        message: 'Arquivo salvo com sucesso!',
        filename: file.originalname,
        destination: path,
        mimetype: file.mimetype,
        sizeKB: Math.round(file.size / 1024),
      };
    } catch (e) {
      throw new BadRequestException('Erro ao salvar arquivo: ' + e.message);
    }
  }
}