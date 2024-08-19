import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService {
  static uploadOptions = {
    storage: diskStorage({
      destination: '../../img', // Diretório onde as imagens serão salvas
      filename: (req, file, callback) => {
        const fileExtName = path.extname(file.originalname); // Extensão do arquivo
        const fileName = `${uuidv4()}${fileExtName}`; // Nome do arquivo único
        callback(null, fileName);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        console.log(file.originalname);
        return callback(new BadRequestException('Invalid file type'), false);
      }
      callback(null, true);
    },
  };
}
