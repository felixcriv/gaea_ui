 (function() {

     var spinner = document.querySelector('paper-spinner');
     var template = document.getElementById('events');
     template.bindingDelegate = new PolymerExpressions;

     function fulfill(response) {
         return response.response.events
     }

     function processDates(data) {
         var newData = [];
         data.forEach(function(value) {
            console.log(value);
             value.ocurrido = formatDate(value.fecha + ' ' + value.hora);
             newData.push(value);
         });

         return newData;
     }

     function bindTemplate(data) {
         template.model = {
             response: data
         };
     }

     function rejected(error) {
         console.error(error);
     }

     function completed(data) {
         spinner.active = false;
     }

     function formatDate(date) {
         var eventTime = moment(date, 'DD-MM-YYYY HH:mm').add(30, 'minutes');
         return eventTime.startOf('hour').fromNow();
     }

     function polymerReady() {
         var ajax = document.querySelector('ajax-promise');
         ajax.request()
             .then(fulfill, rejected)
             .then(processDates)
             .then(bindTemplate)
             .then(completed);
     }

     document.addEventListener('polymer-ready', polymerReady);

 })();