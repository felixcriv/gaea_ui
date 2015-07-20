 (function() {

     var spinner = document.querySelector('paper-spinner');
     var template = document.getElementById('events');
     template.bindingDelegate = new PolymerExpressions();

     function fulfill(response) {
         return response.response;
     }

     function processDates(data) {
         var newData = [];
         data.forEach(function(value) {
             value.ago = formatDate(value.date + ' ' + value.hour);
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
         trackJs.track(error);
     }

     function completed() {
         spinner.active = false;

         $('body').on('click', 'paper-button', function() {

             var element = $(this).parent().next('div');
             element.backgroundDraggable();
             element.slideToggle('slow');
         });
     }

     function formatDate(date) {
         var eventTime = moment(date, 'MM-DD-YYYY hh:mm A');
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

     //all content is loaded
     if ('addEventListener' in document) {
         
         document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('polymer-ready', polymerReady);
            FastClick.attach(document.body);
         }, false);
     }

 })();