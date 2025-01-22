export const Translanter = (text: string): string => {
    switch (text) {
        case 'mon':
            return 'Lunes';
        case 'tue':
            return 'Martes';
        case 'wed':
            return 'Miércoles';

        case 'thu':
            return 'Jueves';
        case 'fri':
            return 'Viernes';
        case 'sat':
            return 'Sábado';
        case 'sun':
            return 'Domingo';
        default:
            return text;
    }

    return '';
}
export const TranslateMonth = (month: string): string => {
    switch (month) {
        case 'Jan':
            return 'Enero';
        case 'Feb':
            return 'Febrero';
        case 'Mar':
            return 'Marzo';
        case 'Apr':
            return 'Abril';
        case 'May':
            return 'Mayo';
        case 'Jun':
            return 'Junio';
        case 'Jul':
            return 'Julio';
        case 'Aug':
            return 'Agosto';
        case 'Sep':
            return 'Septiembre';
        case 'Oct':
            return 'Octubre';
        case 'Nov':
            return 'Noviembre';
        case 'Dec':
            return 'Diciembre';
        default:
            return month;
    }
};