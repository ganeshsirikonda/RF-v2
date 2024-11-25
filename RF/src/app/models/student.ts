export class Student {
   
  
    constructor(
        public id:string,
        public name: string,
        public email: string,
        public gender: string,
        public Subjects: {
            maths: boolean;
            physics: boolean;
            chemistry: boolean;
        },
        public selections:string[]
    ) {}
}


