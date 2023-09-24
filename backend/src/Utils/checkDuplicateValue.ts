
export function checkDuplicateValue(value: string, categories: string[]) {
	const lvalue = value.toLowerCase();

	for (let i = 0; i < categories.length; i++) {
        
        const lcategory = categories[i].toLowerCase();

		// console.log(lvalue, "===", lcategory, " : ",  lvalue === lcategory )

        if (lvalue === lcategory) {
			return true;
		}
	}
}
