import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import { AuctionItemsService } from './auction_items.service';
import { CreateAuctionItemDto } from './dto/create-auction_item.dto';
import { UpdateAuctionItemDto } from './dto/update-auction_item.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import multer, { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

@Controller('auction-items')
export class AuctionItemsController {
  constructor(private readonly auctionItemsService: AuctionItemsService) {}

  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photo_1', maxCount: 1 },
        { name: 'photo_2', maxCount: 1 },
        { name: 'photo_3', maxCount: 1 },
        { name: 'photo_4', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './src/uploads', // Caminho onde os arquivos serão salvos
          filename: (req, file, cb) => {
            // Criar um nome único para o arquivo
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        limits: { fileSize: 4 * 1024 * 1024 }, // Limite de 2MB
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
          }
          cb(null, true);
        },
      },
    ),
  )
  create(
    // @Request() req: any,
    @Body() createAuctionItemDto: CreateAuctionItemDto,
    @UploadedFiles()
    files: {
      photo_1?: Express.Multer.File[];
      photo_2?: Express.Multer.File[];
      photo_3?: Express.Multer.File[];
      photo_4?: Express.Multer.File[];
    },
  ) {
    return this.auctionItemsService.create(createAuctionItemDto, files);
  }

  @Public()
  @Get()
  findAll() {
    return this.auctionItemsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuctionItemDto: UpdateAuctionItemDto,
  ) {
    return this.auctionItemsService.update(+id, updateAuctionItemDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionItemsService.remove(+id);
  }
}
