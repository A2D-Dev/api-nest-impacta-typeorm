import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async create({email, name, password, birthAt}: CreateUserDTO) {

        // 🧩 Gerar hash seguro da senha
        const hashedPassword = await bcrypt.hash(password, 10);

       return this.prisma.user.create({
            data: {
                email,
                name,
                password:hashedPassword,
                birthAt: birthAt ? new Date(birthAt) : null, // 👈 conversão segura
                createdAt: new Date(),
                updatedAt: new Date(),

            },
        });

    }

    async list() {

        return this.prisma.user.findMany();
    }

    async show(id: number) {


        await this.exists(id);

        return this.prisma.user.findUnique ({
            where: {
                id,
            }
        });
    }

    async update(id: number, {email, name, password, birthAt, role}: UpdatePutUserDTO) {
        
        await this.exists(id);

        // 🧩 Gerar hash seguro da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        
        return this.prisma.user.update ({
            data:{email, name, password:hashedPassword, birthAt: birthAt ? new Date(birthAt) : null, role},
            where: {
                id
            }
        });
    }

    async updatePartial(id: number, {email, name, password, birthAt, role}: UpdatePatchUserDTO) {
        
        await this.exists(id);

        const data: any = {};

        if (email) {
            data.email = email;
        }

        if (name) {
            data.name = name;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            data.password = hashedPassword;
        }
        
        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (role) {
            data.role = role;
        }
        return this.prisma.user.update ({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if (!(await this.prisma.user.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException (`O usuário ${id} não existe!!!`);
        }
    }
}