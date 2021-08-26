import moment from 'moment';

const DATE_ID = "MM_DD";
const DATE_FORMAT = "MM/DD (ddd)";

export default class MenuUtil {

    static purifyMeal(dishes) {
        return dishes.reduce((list, dish) => list.concat([{
            name: dish.name,
            cook_time: dish.cook_time,
            photo: dish.photo
        }]), []);
    }

    static composeMenu(startDate, days, lunch, dinner) {
        let menu = [];
        for (let i = 0; i < days; ++i) {
            let date = moment(startDate).add(i, 'd');
            let item = {
                id: date.format(DATE_ID),
                date: date.format(DATE_FORMAT),
                lunch: this.purifyMeal(lunch[i]),
                dinner: this.purifyMeal(dinner[i])
            }
            menu.push(item);
        }
        return menu;
    }

    static extractMeals(menu, meal) {
        return menu.reduce((list, day) => list.concat([day[meal]]), []);
    }

    static extractDishes(menu) {
        let lunches = this.extractMeals(menu, "lunch").flat();
        let dinners = this.extractMeals(menu, "dinner").flat()
        return lunches.concat(dinners);
    }
}