# changellog

## [0.0.1] - 27-11-2023

### Added

- backend:
    
    - getPageData endpoint: function that scrapes the product details from the given url and returns it as a list.

## [0.0.2] - 28-11-2023

### fixed

- backend: 

    - getPageData endpoint: 
        - fixed the bug where images were not alwayws being scraped.
        - fixed issue where multipule image urls were not being scraped.

## [0.1.0] - 04-12-2023

### added

    backend:

        - handeHTML function: function that receives html, selectors to look for and variable names to store the scraped data in, then returns the scraped data as a list.

### changed

    backend:

        - getPageData endpoint: 
            - changed the way the data is scraped, now it uses the handeHTML function to scrape the data.

## [0.1.1] - 06-12-2023

### updated

    backend:

        - getPageData endpoint: 
            - added scraping support for webdomains: 
            
                - bol.com
                - dreamland.be
                - gamma.be
                - torfs.be

## [0.2.0] - 10-12-2023

### added

    -frontend:

        - form to submit url to scrape
        - list of scraped data