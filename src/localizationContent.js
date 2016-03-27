'use strict';
const locale = require('locale');

const defaultLocale = 'pl';
module.exports.defaultLocale = defaultLocale;
const resources = {
    pl: {
        app: {
            appName: 'Corpo food',
            uniqueValueProposition: ' orderuj food bez fakapu'
        },
        dashboard: {
            noOrdersYet: 'Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy',
            addOrder: 'DODAJ ORDER'
        },
        orderTile: {
            deadline: 'Deadlajn:',
            author: 'Fokusuje się:',
            alreadyOrdered: 'os. już zamówiły'
        },
        newOrderForm: {
            restaurant: 'Lokal',
            orderingAt: 'Zamawiam o',
            deliveryAt: 'Zamawiam na',
            menu: 'Menu',
            description: 'Opis',
            password: 'Hasło administracyjne',
            passwordAgain: 'Powtórz hasło',
            author: 'Autor',
            currency: 'zł',
            deliveryCost: 'Koszt dowozu',
            extraCostPerMeal: 'Do każdego zamówienia',
            save: 'Dodaj order',
            validationMessages: {
                required: 'To pole jest wymagane',
                provideRestaurant: 'Prosze podać lokal',
                provideValidHour: 'Podaj poprawną godzinę',
                provideMenuLink: 'Proszę podać odnośnik do menu',
                passwordTooShort: 'Minimalna długość hasła wynosi 6 znaków',
                passwordsDontMatch: 'Hasła nie są takie same',
                provideAuthor: 'Proszę podać autora zamówienia',
                provideValidDeliveryCost: 'Podaj poprawny koszt dostawy',
                provideValidExtraCostPerMeal: 'Podaj poprawny koszt do każdego zamówienia'
            }
        },
        schemaValidation: {
            order: {
                deadline: {
                    required: 'Nie zapomnij o deadljnie!',
                    min: 'Dedlajn nie może być w przeszłości'
                },
                deliveryTime: {
                    required: 'Czas dostawy jest wymagany!',
                    min: 'Czas dostawy nie może być w przeszłości'
                },
                restaurant: {
                    required: 'Nazwa lokalu jest wymagana!'
                },
                menu: {
                    required: 'Menu jest wymagane! Wrzuć linka do menu.'
                },
                password: {
                    required: 'Podaj hasło do edycji.'
                },
                author: {
                    required: 'Podaj imię!'
                }
            }
        }
    },
    en: {
        app: {
            appName: 'Corpo food',
            uniqueValueProposition: ' order food without fuckups'
        },
        dashboard: {
            noOrdersYet: 'Nobody is on the task yet - be first',
            addOrder: 'ADD ORDER'
        },
        orderTile: {
            deadline: 'Deadline:',
            author: 'On the task:',
            alreadyOrdered: 'have already ordered'
        },
        newOrderForm: {
            restaurant: 'Restaurant',
            orderingAt: 'Calling at',
            deliveryAt: 'I want food at',
            menu: 'Menu',
            description: 'Description',
            password: 'Password',
            passwordAgain: 'Repeat password',
            author: 'Author',
            deliveryCost: 'Delivery cost',
            currency: 'Ł',
            extraCostPerMeal: 'Extra cost per meal',
            save: 'Save order',
            validationMessages: {
                required: 'This field is required',
                provideRestaurant: 'Provide restaurant name',
                provideValidHour: 'Provide valid hour',
                provideMenuLink: 'Provide menu link',
                passwordTooShort: 'Password must be at least 6 characters short',
                passwordsDontMatch: 'Passwords are not the same',
                provideAuthor: 'Provide author',
                provideValidDeliveryCost: 'Provide valid delivery cost',
                provideValidExtraCostPerMeal: 'Provide valid extra cost per meal'
            }
        },
        schemaValidation: {
            order: {
                deadline: {
                    required: 'Dont forget the deadline!',
                    min: 'Deadline must not be in the past'
                },
                deliveryTime: {
                    required: 'Delivery time is required!',
                    min: 'Delivery time must not be in the past'
                },
                restaurant: {
                    required: 'Provide name for the restaurant'
                },
                menu: {
                    required: 'Add menu link to make our lives easier'
                },
                password: {
                    required: 'Editing your order must be password protected'
                },
                author: {
                    required: 'Who are you?'
                }
            }
        }
    }
};
module.exports.resources = resources;

const _getSupportedLocales = () => {
    const localesInContent = [];
    for (let localeInContent in resources) {
        if (resources.hasOwnProperty(localeInContent)) {
            localesInContent.push(localeInContent);
        }
    }

    return new locale.Locales(localesInContent);
};

const getBestMatchingLocale = request => {
    locale.Locale.default = defaultLocale;

    const acceptableLocales = new locale.Locales(request.headers['accept-language']);

    return acceptableLocales.best(_getSupportedLocales());
};

module.exports.getBestMatchingLocale = getBestMatchingLocale;

module.exports.getBestMatchingResources = request => {
    return resources[getBestMatchingLocale(request)];
};
