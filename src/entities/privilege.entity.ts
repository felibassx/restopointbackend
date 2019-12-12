import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Menu } from './menu.entity';
import { Role } from './role.entity';

@Entity()
export class Privilege {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    privilegeName: string;

    @Column()
    privilegeDescription: string;

    @Column()
    active: boolean = true;

    @Column()
    cratedDate: Date = new Date();

    @Column()
    updateDate: Date = new Date();

    @ManyToMany(type => Menu)
    @JoinTable()
    menus: Menu[];

    @ManyToOne(type => Role, role => role.privilege)
    role: Role;

}
