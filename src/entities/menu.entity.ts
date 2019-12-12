import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Option } from './option.entity';
import { Page } from './page.entity';

@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    idMenu: number;

    @Column()
    menuName: string;

    @Column()
    menuUrl: string;

    @Column()
    menuPadreId: number;

    @Column()
    menuDescription: string;

    @Column()
    active: boolean = true;

    @Column()
    cratedDate: Date = new Date();

    @Column()
    updateDate: Date = new Date();

    @ManyToMany(type => Option)
    @JoinTable()
    options: Option[];

    @ManyToMany(type => Page)
    @JoinTable()
    pages: Page[];
}
