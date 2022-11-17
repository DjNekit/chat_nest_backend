import { Length } from "class-validator";

export const PasswordLength = () => Length(8, 20);