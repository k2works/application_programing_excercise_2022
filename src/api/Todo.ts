/**
 * やること
 */
 export class Todo {
   private title: Title;
   private completed: boolean;

   get Title(): string {
     return this.title.Value;
   }

   get Completed(): boolean {
     return this.completed;
   }

   constructor(title: string) {
     this.title = new Title(title);
     this.completed = false;
   }

   public complete(): void {
     this.completed = true;
   }

   public equals(other: Todo): boolean {
     return (
       this.title.equals(other.title) && this.completed === other.completed
     );
   }
 }

 /**
  * タイトル
  */
 class Title {
   private value: string;

   get Value(): string {
     return this.value;
   }

   constructor(value: string) {
     this.value = value;
   }

   public equals(other: Title): boolean {
     return this.Value === other.Value;
   }
 }