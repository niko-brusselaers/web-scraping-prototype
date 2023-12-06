import { load } from "cheerio";
import { log } from "console";

async function handleHTML(htmlData, dataToExtract) {
    try {
        const pageData = load(htmlData);
        const product = [];

        pageData(dataToExtract.selector).each((i, el) => {
            const item = {}; // Create an object for each iteration

            dataToExtract.childselector.forEach((child, index) => {
                let variableName = dataToExtract.variablesNames[index];

                if (child.attribute) {
                    let data = pageData(el).find(child.selector).attr(child.attribute);
                    if (data) item[variableName] = data;
                } else {
                    let data = pageData(el).find(child.selector).text().trim().replace(/\n/g, '');
                    item[variableName] = data;
                }
            });

            product.push(item); // Push the object into the array
        });

        return product;

    } catch (error) {
        console.log(error)
        return error
    }

}

export default handleHTML;