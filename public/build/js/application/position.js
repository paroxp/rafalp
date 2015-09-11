var Application = Application || {};

/**
 * position.js
 *
 * Application module responsible for the JS positioning.
 */
_.extend(Application, {

  /**
   * Initialise validator module.
   */
  position: {

    /**
     * Calculate the full body height and by calculation centralise it.
     */
    centraliseBody: function() {
      var height = $body.height(true),
        windowHeight = window.innerHeight,
        margin = (windowHeight - height) / 2;

      $('header[role=banner]')
        .css('margin-top', margin + 'px');
    }

  }

});
