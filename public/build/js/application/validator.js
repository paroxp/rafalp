var Application = Application || {};

/**
 * validator.js
 *
 * Application module responsible for the validator.
 */
_.extend(Application, {

  /**
   * Initialise validator module.
   */
  validator: {

    /**
     * Decide what to do with any validation errors.
     *
     * @param errors
     * @param form
     */
    validationErrors: function(errors, form) {
      var $element;

      if ($(form).find('[data-error]').length) {
        $(form)
          .find('[data-error]')
          .remove();
      }

      _.each(errors, function(error, input) {
        $element = $(form).find('[name=' + input + ']');

        $element
          .after('<small data-error>' + error + '</small>');
      });

      $(form)
        .parent()
        .addClass('animated')
        .addClass('shake');

      _.delay(function() {
        $(form)
          .parent()
          .removeClass('shake');
      }, 460);
    }

  }

});
