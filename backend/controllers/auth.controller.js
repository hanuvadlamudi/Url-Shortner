export const register = async(req,res) => {

    const {name,email,password} = req.body;
    const user = registerUserService(name,email,password);

    res.status(201).send(user);
}

export const login = (req,res) => {
    res.send("login");
}