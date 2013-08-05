Meteor.subscribe('calendar');

Meteor.startup(function () {
    Session.set('calendarTemplateRendered', false);
});

Deps.autorun(function () {
    if (Session.equals('calendarTemplateRendered', false))
        return;
    var entries = Calendar.find().fetch(),
        $calendar = $('#calendar');

    $calendar.html('');
    $calendar.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: false,
        events: entries
    });
});

Template.calendar.rendered = function () {
    Session.set('calendarTemplateRendered', true);
}

Template.calendar.events({
    'click td.fc-day' : function (event) {
        var target = event.target.localName === 'td' ? event.target : $(event.target).parent().parent().parent(), 
            $modal = $('#new-event-modal'),
            date = $(target).attr('data-date');

        $modal.modal('toggle');
        $modal.find('input[name=date]').val(date);
    }
});

Template.calendar_modal.events({
    'click input[type=radio]' : function (event) {
        if (event.target.value === 'has-time') {
            $('#time-input').show();
        } else {
            $('#time-input').hide();
        }
    }
})