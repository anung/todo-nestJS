import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import Todo from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = await this.todoRepository.create(createTodoDto);
    await this.todoRepository.save(newTodo);

    return newTodo;
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (todo) {
      return todo;
    }
    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
    const updatedTodo = await this.todoRepository.findOneBy({ id: id });
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<void> {
    const deletedTodo = await this.todoRepository.softDelete({ id: id, deleted_at: IsNull() });
    if (!deletedTodo.affected) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('success deleted todo', HttpStatus.OK);
  }
}
