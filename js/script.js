/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {
// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.wrlc_primary_islandora_solr_simple_search_text = {
  attach: function(context, settings) {
    $('#islandora-solr-simple-search-form input.form-text', context).once('wrlc_primary_islandora_solr_simple_search_text', function() {
      // Set an initial default value for the search box
      if ($(this).val() == '') $(this).val(Drupal.t('Search Content...'));
      // Add focusin handler to clear the search box.
      $(this).focusin(function() {
        if ($(this).val() == Drupal.t('Search Content...')) {
          $(this).val('');
        }
      });
      // Return search box default if it is empty.
      $(this).focusout(function() {
        if ($(this).val() == '') {
          $(this).val(Drupal.t('Search Content...'));
        }
      });
      }
    );
    // Sticky footer
    function positionFooter() {
      scaleSiteNameAndSlogan();
      var mFoo = $(".content-page-bottom");
      if ((($(document.body).height() + mFoo.outerHeight()) < $(window).height() && mFoo.css("position") == "fixed") || ($(document.body).height() < ($(window).height() - 100) && mFoo.css("position") != "fixed")) {
        mFoo.css({
          'position': "fixed",
          'bottom': "0px",
          'width': $('#header').width(),
          'max-width': $('#main').width(),
        });
      }
      else {
        mFoo.css({
          'position': "static",
          'width': $('#header').width(),
          'max-width': $('#main').width(),
        });
      }
    }

    // Special use case, when exiting full screen mode
    // of the IR Bookreader. Because of other .js in 
    // the bookreader, calling 'positionFooter()' at
    // this point cant be trusted, so set the correct 
    // css values manually.
    if ($('.BRicon.full').length > 0) {
      $(".BRicon.full").mouseup(function() {
        $(".content-page-bottom").css({
          'position': "static",
          'width': $('#header').width(),
          'max-width': $('#main').width(),
        });
        // Fix for IABookreader when exiting full screen.
        $('#book-viewer').css({
          'top': '0px',
        });
      });
    }

    function scaleSiteNameAndSlogan() {
      $("#site-name").fitText(1, {maxFontSize: '25px'});
      $("#site-slogan").fitText(1, {maxFontSize: '20px'});
      
      var lng = $('.header__site-link>span').text().length;
      if (lng > 31) {
        // Longer text needs more agressive formatting to fit.
        $(".header__site-link").fitText(1.7, {maxFontSize: '20px'});
      }
    }

    // Fix the footer position on AJAX callbacks.
    positionFooter();

    // Fix footer position on window events.
    $(window).scroll(positionFooter);
    $(window).resize(positionFooter);
    $(window).load(positionFooter);
  }
};
})(jQuery, Drupal, this, this.document);
