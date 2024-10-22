const person = {
    fullName: function(){
        console.log(`${this.firstName} ${this.lastName}`);
    },
    greet: function(age, punctuation){
        console.log(`I am ${age} old${punctuation}`)
    }
}

const person2 = {
    firstName: 'Alex',
    lastName: 'Verdes'
}



// person.fullName.call(person2)
// person.greet.call(person2, 24, '.')
// person.greet.apply(person2, [24, '.'])


const bound = person.greet.bind(person2, 24)

bound('.')
// console.log(bound)