export const localeSeason = (season) => {
    const seasons = {
        spring: 'Весна',
        summer: 'Лето',
        autumn: 'Осень',
        winter: 'Зима',
        all: 'Мультисезонный'
    }

    return seasons[season] ?? seasons['all']
}

export const localeSize = (size) => {
    const sizes = {
        small: 'Маленький',
        medium: 'Средний',
        large: 'Большой'
    }

    return sizes[size] ?? sizes['large']
}

export const localeStyle = (style) => {
    const styles = {
        romantic: 'Романтик',
        elegant:  'Элегантный',
        classic: "Классический",
        minimalist: "Минималистичный",
        tropical: "Тропический",
        natural: "Натуральный",
        winter: "Зимний",
        rustic: "Деревенский",
    }

    return styles[style] ?? styles['romantic'];
}