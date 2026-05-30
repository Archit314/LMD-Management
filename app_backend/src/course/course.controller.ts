import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/user.types';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createCourseDto: CreateCourseDto) {
    const createdCourse =  await this.courseService.create(createCourseDto);
    if(createdCourse){
      return {message: "Course created successfully", data: createdCourse}
    }
    return {message: "Course creation failed"}
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const gotCourse = await this.courseService.findOne(Number(id))
    if(gotCourse){
      return {message: "Course fetched successfully", data: gotCourse}
    }
    return {message: "Course not found"}
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
