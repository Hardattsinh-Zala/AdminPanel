const {z} = require("zod");

const signupSchema = z.object({
    username: z
    .string({required_error: "Username is required."})
    .trim()
    .min(3, {message: "username must be of atleast 3 characters."}),
    email: z
    .string({required_error: "Email is required."})
    .email({message: "Invalid email"})
    .trim()
    .min(8, {message: "email must be of 8 characters"}),
    phone: z
    .string({required_error: "Phone is required."})
    .trim()
    .min(10, {message: "Phone number must be equal to 10"})
    .max(10, {message: "Phone number must be equal to 10"}),
    password: z
    .string({required_error: "Password is required."})
    .min(6, {message: "Password should be atleast of 6 characters."})
    .max(20, {message: "Password can't be longer than 20 characters."})
});

const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required."})
    .email({message: "Invalid email"})
    .trim()
    .min(8, {message: "Email must be 8 characters long."}),
    password: z
    .string({required_error: "Password is required."})
    .trim()
    .min(6, {message: "Password must be 6 characters long."})
    .max(20, {message: "Password can't be longer than 20 characters."})
})

const contactSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .email({message: "Invalid email"})
    .trim()
    .min(8, {message: "Email must be 8 characters long."}),
    message: z
    .string({required_error: "Fill the form first."})
    .trim()
    .min(3, {message: "Form must be 3 characters long."})
})

module.exports = {signupSchema, loginSchema, contactSchema};