import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY =
  'LEILOESMAICO09872DIANTEDA123297MEIA200183ASDIN978JM';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
