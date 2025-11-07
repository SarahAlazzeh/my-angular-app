import { CanActivateChildFn } from '@angular/router';

export const userGuard: CanActivateChildFn = (childRoute, state) => {
    // if(){}
  return true;
};
