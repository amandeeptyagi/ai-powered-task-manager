import jwt from "jsonwebtoken";

const generateToken = (res, userId, userRole, userName) => {
    const token = jwt.sign(
        { id: userId, role: userRole, name: userName },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: strict,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

export default generateToken;
