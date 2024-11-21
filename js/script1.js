/* Array to contain symbols.
* Just add/delete symbols from the array to include/exclude them.
* Make sure to enter correct symbol and add/remove comma.
*/
const arr = [
    'GOOG', //Google
    'TSLA', //Tesla
    'AAPL' // Apple; add/remove comma if symbols below are to be added/removed
    // 'MSFT',
    // 'EXCOF',
    // 'TSPH',
    // 'PEMSF'
];

const api_key = '<api_token>';//API Key; Getting API key is in README.

const interval_time = 60;//Set refresh time (sec); Currently set in 60 seconds.

const socket = new WebSocket('wss://ws.finnhub.io?token='+api_key);

var card_width = Math.floor(12/arr.length);//For even distribution of card width; DO NOT CHANGE.
if(card_width < 3) card_width = 2;// Set minimum card width; DO NOT CHANGE.

$( document ).ready(function() {
    construct();
});

/* Function to construct initial card.
* Constructs initial card content.
* loading
*/
function construct() {
    for(var i=0;i<arr.length;i++) {

        var hold = 
        '<div class="card-container col-'+card_width+'">'+
            '<div class="card rounded" id="card-'+arr[i]+'">'+
                '<div class="card-body" id="card-body-'+arr[i]+'"><img class="loader" src="./images/loading-gif.gif"/></div>'
            '</div>'+
        '</div>';

        $(".container").append(hold);

        getPrice(arr[i]);
    }
}

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    for(var i=0;i<arr.length;i++) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': arr[i]}))
    }
});

// Listen for messages
socket.addEventListener('message', function (event) {
    
    var hold_json = JSON.parse(event.data);
    var data = hold_json.data;

    if(data) {
        for(var i=0;i<data.length;i++) {
            var temp = data[i];
            var price = temp.p.toFixed(2);
            var symbol = temp.s;

            $("#price-"+symbol).html('<p class="price" id="price-'+symbol+'">'+price+' <span class="currency" id="currency-'+symbol+'">USD</span></p>');
        }
    } else {
        var hold = '<img class="loader" src="./images/loading-gif.gif"/></div>';

        $("#card-"+symbol).html(hold);
    }
});

function getPrice(symbol) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            var response = JSON.parse(this.responseText);

            if(response.toString().trim() != '') {

                var opening_price = response.o.toFixed(2);
                var current_price = response.c.toFixed(2);
                var change = response.d.toFixed(2);
                var high = response.h.toFixed(2);
                var low = response.l.toFixed(2);

                if(change >= 0) {
                    color = "green";
                    arrow = '<i class="fa-solid fa-arrow-up"></i>';
                } else {
                    color = "red";
                    arrow = '<i class="fa-solid fa-arrow-down"></i>';
                }

                var hold = 
                '<div class="alert rounded hidden" id="alert-'+symbol+'"><p>New Data</br>Just Came In</p></div>'+
                '<div class="card-header" id="card-header-'+symbol+'">'+
                    '<div class="row rounded card-header-content">'+
                        '<div class="symbol">'+ symbol + '</div>'+
                        '<div class="diff rounded" id="diff-'+symbol+'">'+
                            '<span style="color: ' + color + '">'+ change + ' ' + arrow + '  today</span>'+
                        '</div>' +
                    '</div>'+
                '</div>'+
                '<div class="card-body" id="card-body-'+symbol+'">'+
                    '<p class="price" id="price-'+symbol+'">'+current_price+' <span class="currency" id="currency-'+symbol+'">USD</span></p>'+
                    '<table class="stats">'+
                        '<tr>'+
                        '<td class="t-left">Opening</td><td class="t-right price-today" id="price-today-'+symbol+'">'+opening_price+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td class="t-left">High</td><td class="t-right high" id="high-'+symbol+'">'+high+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td class="t-left">Low</td><td class="t-right low" id="low-'+symbol+'">'+low+'</td>'+
                        '</tr>'+
                    '</table>'+
                '</div>';

                $("#card-"+symbol).html(hold);

                //Setting different layout when card is too small.
                if(card_width < 3) {
                    $(".card-header-content").css('display', 'block');
                    $(".symbol").css('margin', '0 auto');
                    $(".symbol").css('text-align', 'center');
                    $(".symbol").css('padding', '0 0 5px 0');
                    $(".diff").css('width', '100%');
                }

                //Showing of alert per card.
                setTimeout(function(){
                    $("#alert-"+symbol).removeClass('hidden');
                    $("#alert-"+symbol).addClass('visible');
                    $("#card-header-"+symbol).css('opacity', '0.2');
                },150);

                //Hiding of alert per card.
                setTimeout(function(){
                    $("#alert-"+symbol).addClass('hidden');
                    $("#alert-"+symbol).removeClass('visible');
                        $("#card-header-"+symbol).css('opacity', '1');
                },1750);

            } else {//Show loading gif if no data is fetched.
                var hold = 
                '<img class="loader" src="./images/loading-gif.gif"/></div>';

                $("#card-"+symbol).html(hold);
            }

        }
    };
    xhttp.open("GET", "https://finnhub.io/api/v1/quote?symbol="+symbol+"&token="+api_key, true);
    xhttp.send();
}



