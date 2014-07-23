CalEvents = new Meteor.Collection('calevents');
Session.setDefault("editing_caleventlevent", null);
Session.setDefault("showEditEvent", false);
Session.setDefault("lastMod", null);

// Meteor.Router.add({
//     "/": "homepage",
//     "calendar": "calendar"
// })

Router.configure({
    layoutTemplate: 'layout'
});

Router.map( function () {
  this.route('homepage', {path: '/'});
  this.route('calendar', {path: '/calendar'});
});

Template.calendar.lastMod = function() {
    return Session.get('lastMod');
}

Template.calendar.rendered = function() {
  Deps.autorun(function(){
    $('#calendar').fullCalendar({
        dayClick: function(date, jsEvent, view) {
            CalEvents.insert({title: 'New Event', start: date, end: date});
            Session.set('lastMod', new Date());
        },
        eventClick: function(calEvent, jsEvent, view) {

        },
        events: function(start, end, callback) {
            var events = [];
            calEvents = CalEvents.find();
            calEvents.forEach(function(evt) {
                console.log(evt);
                events.push({
                    id: evt._id,
                    title: evt.title,
                    start: evt.start,
                    end: evt.end
                });
            })
            callback(events);
        }
    });
  });
}



