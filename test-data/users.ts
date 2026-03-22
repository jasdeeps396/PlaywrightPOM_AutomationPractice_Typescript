

type User = 
{
    username: string;
    password: string;
}
type RegisterUser =
{
name:string;
username:string;
password:string;

}

export const users: { validUser1: User, invalidUser1: User} = {
    validUser1: 
    {

        username: "jasdeeps426@yopmail.com",
        password: "Test@1234"
    },
    invalidUser1:
    {
        username: "jasdeeps@yopmail.com",
        password: "Test@1"
    }
    
}


export const registerUser: { User1: RegisterUser } = {
    User1: 
    {
        name:"jasdeep",
        username: "jasdeeps426@yopmail.com",
        password: "Test@1234"
    },
}