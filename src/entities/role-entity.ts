import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Privilege } from './privilege-entity';
import { User } from './user-entity';

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: string;

    @Column()
    roleDescription: string;

    @Column()
    active: boolean = true;

    @Column()
    cratedDate: Date = new Date();

    @Column()
    updateDate: Date = new Date();

    @OneToMany(type => Privilege, privilege => privilege.role)
    privilege: Privilege[];

    @OneToMany(type => User, user => user.roles)
    user: User[];

}
