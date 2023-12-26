const bcrypt = require("bcryptjs");
const { User } = require("../model/user.model");
const { generateToken } = require("../utils/jwt");
const { validCreateUser, validLogIn } = require("../validation/user.validation");

exports.createUser = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        console.log("JOI");
        const validate = validCreateUser(body)
        if (validate.error)
            throw Error(validate.error);
        console.log("RDFCVGBHNMKL;,'.");
        if (await checkIfUserExsist(body.email)) {
            throw new Error("This email alredy in this system")
        }

        console.log("ATTTTTT");

        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
        const newUser = new User(body);
        newUser.id = newUser._id;
        await newUser.save()
        newUser.password="******"
        return res.status(201).send(newUser);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
}

const checkIfUserExsist = async (email) => {
    const user = await User.findOne({ email })
    if (user)
        return true;
    return false;
}


exports.login = async (req, res, next) => {
    try {
        const body = req.body;
        const validate = validLogIn(body)
        if (validate.error)
            throw Error(validate.error);
        if (!await checkIfUserExsist(body.email))
            throw new Error("This email is't in the system");
        const user = await User.findOne({ email: body.email })
        if (!await bcrypt.compare(body.password, user.password))
            throw new Error("password is incorrect");

        // res.status(200).send(user)
        const token = generateToken({email:user.email, name:user.name ,userName:user.userName });
        return res.send({ user, token })
    }
    catch (err) {
        next(err);
    }
}

