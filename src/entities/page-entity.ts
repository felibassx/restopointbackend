import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pageTitle: string;

    @Column()
    pageUrl: string;

    @Column()
    active: boolean = true;

    @Column()
    cratedDate: Date = new Date();

    @Column()
    updateDate: Date = new Date();
}
