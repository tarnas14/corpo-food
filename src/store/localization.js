import {resources, defaultLocale} from '../localizationContent.js';

const localization = (state, action) => {
    switch (action.type) {
    case 'CHANGE_LOCALE':
        if (action.locale === state.currentLocale) {
            return state;
        }

        if (!resources.hasOwnProperty(action.locale)) {
            throw 'no such locale as ' + action.locale;
        }

        return {
            currentLocale: action.locale,
            resources: {...resources[action.locale]}
        };
    default:
        if (!state) {
            return {
                currentLocale: defaultLocale,
                resources: {...resources[defaultLocale]}
            };
        }

        return state;
    }
};

export default localization;
