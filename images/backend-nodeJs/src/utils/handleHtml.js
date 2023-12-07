import { load } from "cheerio";
import { log } from "console";

async function handleHTML(htmlData, dataToExtract) {
    try {
        const pageData = load(htmlData); //load html data
        const product = []; // create empty array that will store objects with data

        //loop through each element that matches provided main selector
        pageData(dataToExtract.selector).each((i, el) => {
            const item = {}; // create empty object that will store data with provided variable names

            //loop through each child selector and store data in object with provided variable names
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
        //write error in console
        console.log(error)
        // return error
        throw new Error(error)
    }

}

export default handleHTML;