import {Table, Column, Model, UpdatedAt, CreatedAt, BeforeCreate, Scopes} from 'sequelize-typescript';
import {IsUUID, Length, ForeignKey, IsIP} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';

interface SessionAttributes {
  id?: string,
  userAgent: string,
  ipAddress: string,
  generatedName: string,
  createdAt: Date,
  updatedAt: Date
}

@Scopes(() => ({
  members: {
    include: [{
      model: User
    }]
  }
}))

// Represents an active session, which user can use to log in faster.
@Table
export class Session extends Model<Session, SessionAttributes> {

  @IsUUID(4)
  @Column( {primaryKey: true} )
  id?: string;

  @Length( {max: 4096} )
  @Column
  userAgent!: string;

  @Length( {min: 4, max: 46} )
  @IsIP
  @Column
  ipAddress!: string;

  @Length( {min: 4, max: 128} )
  @Column
  generatedName!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => User)
  owner: User;

  @BeforeCreate
  static beforeCreateSession(session: any) {
    session.id = uuidv4();
  }

}
