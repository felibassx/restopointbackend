import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    active: boolean = true;

    @Column()
    cratedDate: Date = new Date();

    @Column()
    updateDate: Date = new Date();
}
