import { ArrayDataType } from 'sequelize';
import { Column, Model, Table, Default } from 'sequelize-typescript';

@Table
export class Role extends Model {
  @Column
  name: string;

  @Default(null)
  @Column
  permissions: String;
}
