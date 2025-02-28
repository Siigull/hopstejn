export function removeDiacritics(input: string, lowercase: boolean = false): string {
    const diacriticsMap: { [key: string]: string } = {
        'Á': 'A', 'Ä': 'A', 'Č': 'C', 'Ç': 'C', 'Ď': 'D', 'É': 'E', 'Ě': 'E', 'Ë': 'E', 'Í': 'I',
        'Ň': 'N', 'Ó': 'O', 'Ö': 'O', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ú': 'U', 'Ů': 'U', 'Ü': 'U',
        'Ý': 'Y', 'Ž': 'Z', 'á': 'a', 'ä': 'a', 'č': 'c', 'ç': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e',
        'ë': 'e', 'í': 'i', 'ň': 'n', 'ó': 'o', 'ö': 'o', 'ř': 'r', 'š': 's', 'ť': 't', 'ú': 'u',
        'ů': 'u', 'ü': 'u', 'ý': 'y', 'ž': 'z'
    };

    if(lowercase) {
        return input.split('').map(char => diacriticsMap[char] || char).join('').toLowerCase();
    } else {
        return input.split('').map(char => diacriticsMap[char] || char).join('');
    }
}

export function parseParameters(parameters: any){
    if (parameters.special)
        return parameters.special + " "
    else 
        return parameters.x + " m x " + parameters.y + " m"
}
