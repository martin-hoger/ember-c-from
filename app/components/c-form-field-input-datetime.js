import Ember from 'ember';
import moment from 'moment';
import FieldMixin from './c-form-field-mixin';

export default Ember.Component.extend(FieldMixin, {
  i18n       : null,
  fieldType  : 'input-datetime',
    
  init() {
    this._super(...arguments);
    //Display setting of time.
    this.set('time', moment(this.get('model.' + this.get('field'))).format('HH:mm'));
  },

  actions: {
    //Selection from time input. 
    setTime: function() {
      this.setDatetime();
    }
  },
  
  //Set datetime
  setDatetime: function() {
    var date    = this.get('model.' + this.get('field'));
    var hours   = moment(this.get('time'), 'HH:mm').hours();
    var minutes = moment(this.get('time'), 'HH:mm').minutes();
    var value   = moment(date).startOf('day').add(hours, 'hours').add(minutes, 'minutes')._d;
    this.set('model.' + this.get('field'), value);

    // !! NOTE !!
    // Calling sendAction is deprecated, should be replace by closure action (see onChange).
    this.sendAction();

    // Send action if it is passed.
    if (this.get('onChange')) {
      this.get('onChange')(value);
    }
  },

});
