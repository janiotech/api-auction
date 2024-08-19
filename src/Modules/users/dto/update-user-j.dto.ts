import { PartialType } from '@nestjs/mapped-types';
import { CreateUserjDto } from './create-user-j.dto';

export class UpdateUserJDto extends PartialType(CreateUserjDto) {}
