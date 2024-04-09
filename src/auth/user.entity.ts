import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enum/userRole.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: Role;
}