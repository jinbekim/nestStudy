import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
  } from "@nestjs/common";
import { BoardStatus } from "./boards-status.enum";
  import { BoardsService } from "./boards.service";
  import { CreateBoardDto } from "./dto/create-board.dto";
  import { Board } from "./entity/board.entity";
import { BoardStatusValidationPipe } from "./pipe/board-status-validation.pipe";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/:id")
  getBoardById(@Param("id") id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }
  @Get()
  getAllTask(): Promise<Board[]> {
      return this.boardsService.getAllBoards();
  }
  // @Get("/")
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Get("/:id")
  // getBoardById(@Param("id") id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // /* 파이프 레벨 3단계 어플리케이션 단계, 핸들러 단계, 파라미터 단계*/
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  @Delete("/:id")
  deleteBoard(@Param("id", ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }
  // @Delete("/:id")
  // deleteBoard(@Param("id") id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }

  @Patch('/:id/status')
  updateBoardStatus(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
      return this.boardsService.updateBoardStatus(id, status);
  }

  // @Patch("/:id/status")
  // updateBoardStatus(
  //   @Param("id") id: string,
  //   @Body("status", BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}