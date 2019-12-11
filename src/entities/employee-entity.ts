import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    celPhone: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    birthDate: Date;

    @Column()
    active: boolean = true;

    @Column()
    cratedDate: Date = new Date();

    @Column()
    updateDate: Date = new Date();

}
