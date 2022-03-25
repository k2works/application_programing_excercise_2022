import {
  TodoStatus,
  InProgress,
  Completed,
  Undefined,
  NotStarted,
} from "../model/status/TodoStatus";

export enum TodoStatusType {
  UNDEFINED = 0,
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

export namespace TodoStatusTypeEnum {
  export function valueOf(value: TodoStatusType): TodoStatus {
    switch (value) {
      case TodoStatusType.NOT_STARTED:
        return new NotStarted();
      case TodoStatusType.IN_PROGRESS:
        return new InProgress();
      case TodoStatusType.COMPLETED:
        return new Completed();
      default:
        return new Undefined();
    }
  }
}
