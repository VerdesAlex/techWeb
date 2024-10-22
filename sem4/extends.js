class Student{
    constructor(name,age,grade){
        this.name = name;
        this.age = age;
        this.grade = grade;
    }

    greet(){
        console.log(`Hi, my name is ${this.name}.`);
    }
}

class Teacher extends Student{
    constructor(name,age,grade,subject){
        super(name, age, grade);
        this.subject=subject;
    }
    teach(){
        console.log(`I theach ${this.subject}.`);
    }
}

const student = new Student('Alex', 21, 15);
const teach = new Teacher('Nigga',12,23,'niggardly');

console.log(student);
console.log(teach);