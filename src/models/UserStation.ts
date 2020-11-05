import {Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { User } from './User';
import { Station } from './Station';

// Represents an association table
@Table
export class UserStation extends Model<UserStation> {

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Station)
  @Column
  stationId: string;

}
