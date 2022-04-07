import { ArgumentMetadata } from "@nestjs/common";
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOption = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOption.indexOf(status);
        return index !== -1;
    }
}