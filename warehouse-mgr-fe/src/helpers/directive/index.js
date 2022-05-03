import { isAdmin } from '@/helpers/character';
import { isMember } from '@/helpers/character';

export const regDirectives = (app) => {
  app.directive('only-admin', {
    mounted(el, { value = true }) {
      const res = isAdmin();

      if (!res && value) {
        el.style.display = 'none';
      };
    },
  });

  app.directive('only-member', {
    mounted(el, { value = true }) {
      const res = isMember();

      if (!res && value) {
        el.style.display = 'none';
      };
    },
  });
};
