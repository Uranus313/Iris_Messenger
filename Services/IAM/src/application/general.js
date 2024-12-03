
export const checkToken = async (req,res) =>{
    try {
        res.status(200).send(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}