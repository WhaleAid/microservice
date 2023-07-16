import { Injectable } from '@nestjs/common';
import { Social } from './stubs/social/v1alpha/social';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}

  async createMany(data: Prisma.SocialCreateInput[]) {
    return this.prisma.social.createMany({ data });
  }
  create(data: Prisma.SocialCreateInput): Promise<Social> {
    try {
      return this.prisma.social.create({
        data,
      });
    }
    catch (error) {
      throw new Error(`${data.name} name is taken`);
    }
  }
  findAll(): Promise<Social[]> {
    return this.prisma.social.findMany();
  }
  findById(id: number): Promise<Social> {
    return this.prisma.social.findUnique({
      where: { id },
    });
  }
  async find(id: string | number, name: string) {
    const social = await this.prisma.social.findFirst({
      where: { OR: [{ id: Number(id) }, { name }] },
    });

    if (!social) {
      throw new Error(`social with id ${id} or name ${name} not found`);
    }

    return social;
  }

  async update(id: number, data: Prisma.SocialUpdateInput): Promise<Social> {
    return this.prisma.social.update({
      where: { id },
      data,
    });
  }

  async delete(name: string) {
    //find social by name then delete
    const social = await this.prisma.social.findFirst({
      where: {  name: name }, 
    });
    if (!social) {
      throw new Error(`social with name ${name} not found`);
    }
    return this.prisma.social.delete({
      where: { id: social.id },
    });
  }

}