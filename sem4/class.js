const person = {
    name: "Alex",
    greet: function(){
        console.log(`Hello, my name is ${this.name}.`);
    }
}

function User(mail, name){
    this.email=mail;
    this.name=name;
}

User.prototype.login = function(){
    this.online=true;
    console.log(`User ${this.name} has logged in`);
}

const user = new User('mail@mail.com', 'Name');

console.log(person);