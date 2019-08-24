import SimpleTimePicker from 'react-simple-time-picker'

var time = React.createClass({

  getInitialState: function(e){
    return {date: ''};
  },

  onDateChange: function(date){
    /* date is a js Date object */

    //this.setState({date: close_date});
    console.log(date);
  }
});