import {Table, Column, Model, CreatedAt, Scopes, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { User } from './User';

interface TokenAttributes {
    id: string
    createdAt: Date
}

@Scopes(() => ({
  owner: {
    include: [{
      model: User
    }]
  }
}))
// Represents an authentication token that is used to access API by a user.
@Table
export class Token extends Model<Token, TokenAttributes> {

  @Column( {primaryKey: true} )
  id?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  owner: User;

}
