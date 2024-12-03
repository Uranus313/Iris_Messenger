export const getAllUsers = async (req,res) => {
    try {
        const users = await readUsers();
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const getUserByID = async (req,res) => {
    try {
        const user = await readUsers(req.params.id);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userEdit = async (req,res) => {
    try {
        const user = await createUser(req.user.id,req.body);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userSignUp = async (req,res) => {
    try {
        const user = await createUser(req.body);
        const token = jwt.sign({id : user.id},process.env.JWTSECRET);
        res.set("auth-token",token);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userDelete = async (req,res) => {
    try {
        const user = await deleteUser(req.user.id);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userLogIn = async(req,res)=>{
    try {
        const users = await readUsers({username: req.body.username});
        if(users.length ==0){
        res.status(404).send({message:"user not found"});
        return;
        }
        if(users[0].password != req.body.password){
        res.status(401).send({message:"wrong password"});
        return;
        }
        const token = jwt.sign({id : users[0].id},process.env.JWTSECRET);
        res.set("auth-token",token);
        res.send(users[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const checkToken = async (req,res) =>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}