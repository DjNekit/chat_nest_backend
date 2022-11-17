import { AuthGuard } from "@nestjs/passport";

export class SigninGuard extends AuthGuard('local') {}