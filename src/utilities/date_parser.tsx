function dateParser(stringDate: string): string {
    const date = new Date(stringDate)
    return date.toLocaleDateString('es-ES', {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

export { dateParser };

