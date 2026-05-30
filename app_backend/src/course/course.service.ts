import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {

  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(createCourseDto: CreateCourseDto) {

    try {
      
      const createdCourse = await this.prisma.course.create({
        data: {
          name: createCourseDto.name,
          description: createCourseDto.description,
          level: createCourseDto.level,
          price: createCourseDto.price,
        }
      })
      return createdCourse;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  findAll() {
    return `This action returns all course`;
  }

  async findOne(id: number) {

    return await this.prisma.course.findUnique({
      where: {id}
    })
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
