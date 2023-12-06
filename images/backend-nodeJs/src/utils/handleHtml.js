import { load } from "cheerio";
import { log } from "console";

async function handleHTML(htmlData, dataToExtract) {
    try {
        const pageData = load(htmlData);
        const product = [];

        const tesdata = pageData(dataToExtract.selector).each((i, el) => {
            dataToExtract.childselector.forEach((child, index) => {
                let variableName = dataToExtract.variablesNames[index];
                if (child.attribute) {
                    let data = pageData(el).find(child.selector).attr(child.attribute);
                    if (data) product[variableName] = data;

                } else {
                    let data = pageData(el).find(child.selector).text().trim().replace(/\n/g, '');
                    product[variableName] = data;
                }
            });
        });

        console.log(pageData);

        return product;

    } catch (error) {
        console.log(error)
        return error
    }

}

export default handleHTML;