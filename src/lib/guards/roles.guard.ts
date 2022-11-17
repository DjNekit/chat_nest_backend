import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const { user } = req;

    if (!roles) return true;
    if (!user) return false;

    return this.matchRoles(user.roles, roles);
  }

  private matchRoles(userRoles: string[], controllerRoles: string[]): boolean {
    const isUserHasAccess = userRoles.some(role => controllerRoles.includes(role));
    return isUserHasAccess;
  }
}