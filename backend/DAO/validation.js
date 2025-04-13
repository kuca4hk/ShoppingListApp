function validateListInput(creator, items, title) {
    if (!creator || typeof creator !== 'string' || creator.length > 50) {
        throw new Error("Invalid creator: nesmi byt pradzny string a max 50 znaků.");
    }

    if (!title || typeof title !== 'string' || title.length > 50) {
        throw new Error("Invalid title: nesmi byt prazdny string a max 50 znaků.");
    }

    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Invalid items: musí být pole s alespoň jedním itemem.");
    }

    for (const item of items) {
        if (
            typeof item.name !== 'string' || !item.name.trim() ||
            typeof item.quantity !== 'number'
        ) {
            throw new Error("Každý item musí mít validní jméno (string) a quantity (číslo).");
        }

        if ('marker' in item && typeof item.marker !== 'boolean') {
            throw new Error("Pokud marker existuje, musí být typu boolean.");
        }
    }
}

function validateItemInput(name, quantity) {
    if (!name || !quantity ) {
        throw new Error("Name, quantity and price are required");
    }

    if (typeof quantity !== "number") {
        throw new Error("Quantity and price must be numbers");
    }
}

module.exports = {
    validateListInput,
    validateItemInput,
}