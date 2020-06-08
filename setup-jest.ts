import 'jest-preset-angular';
import * as $ from 'jquery';
Object.defineProperty(window, '$', { value: $ });
Object.defineProperty(global, '$', { value: $ });
Object.defineProperty(global, 'jQuery', { value: $ });

// Código necessário para testar componentes que utilizam o elemento canvas
// https://github.com/thymikee/jest-preset-angular/issues/122
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: prop => {
            return '';
        },
    }),
});
