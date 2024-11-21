Click raw or download README.md file to view full details.

DESCRIPTION:
This widget fetches quote from https://finnhub.io/api/v1/quote?symbol=AAPL&token=<api_token>" endpoint via AJAX.
Steps in getting API Token could be found below;
Documentation could be found here: https://finnhub.io/docs/api/quote
Fetched quotes are displayed on card(s) and are refreshed every n seconds where n is interval_time variable in /js/script.js file.
The number of displayed quote depends upon the content of arr variable in /js/script.js file.


SET UP STEPS
*Assuming you have set up your own basic HTML structure,
1. Inside header tag, paste CDNs below:

<!-- CDN for fontawesome icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- CDN for bootstrap styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

<!-- CDN for JQUERY -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

2. Inside header tag, include styles.css in this repository to yours. Then make necessarry changes on file paths in code.
<!-- Change file path if necessary -->
<link rel="stylesheet" href="./css/styles.css"/>

3. Inside body tag, paste code snippet below
<div class="content">
    <div class="container row">
    </div>
</div>

4. Before </body> tag, include /js/script.js file in this repository to yours. Then make necessarry changes on file paths in code.
<!-- Change file path if necessary -->
<script src="./js/script.js"></script>
*Note that this repository also includes script1.js file.
    -  script1.js file is another version where in the price is being updated every second via finnhub Trades websocket.
    - Documentation may be found here: https://finnhub.io/docs/api/websocket-trades.
    - You can switch between script.js and script1.js.
    - Also note that, from time to time, finnhubs Trade websocket do not return any data and just kept on pinging.
        -> This is why script.js is chosen to be the default script to load as finnhub's quote seem to be more stable.

5. On script.js, you may be able to change values of the following variables:
arr
api_key
interval_time

6. Get API Key. See steps below.

*An example of the set up could be viewed in index.php of this repository.
*Note that page could also be manually refreshed by pressing ctrl+R on your keyboard.


GETTING API KEY
*Assuming no account is created yet
1. Go to https://finnhub.io/
2. Click "Get free Api key"
3. Complete sign up 
4. Copy generated API key and update api_key on script.js file.
