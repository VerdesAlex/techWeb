const getUsers = async() =>{
    try{
        const response = await fetch('https://127.0.0.1:3000/users');
        const data = await response.json();
        
        console.log(data);
    }
    catch(error){
            throw new Error("Course error!");
    }
    
}