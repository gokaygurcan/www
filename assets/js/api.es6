---
---

'use strict';

// Scrolls to the specified offset, and calls the specified callback (optional)
const scroll_to = (offset, callback) => {
    $('html, body').animate({scrollTop: offset}, 250, 'swing', callback);
}

$(() => {
    const $api = $('.api-sections');

    // Wrap each command with a div (used for styling)
    $('h2', $api).each((_, command_header) => {
        const $header = $(command_header);
        const $wrapper = $("<article class='api-command'></article>");
        /* All the content between this command header and the next command
           header should be wrapped */
        $header.nextUntil("h2").andSelf().wrapAll($wrapper);
        // Get the unique ID for this command from the link to the command article
        const command = $('a', $header).attr('href').split('/').filter((el) => el.length > 0 ).slice(-1)[0];
        // Inject an anchor before the header
        $(`<a class='api-anchor' name='${command}'></a>`).insertBefore($(command_header));
    });

    // Scroll animation when you click on an anchor link (currently used on API index pages)
    $('.api-nav.anchor-links .commands a').click((event) => {
        event.preventDefault();
        $('.commands a').removeClass('active');
        $(event.currentTarget).addClass('active');

        // Find the element we're supposed to scroll to and start scrolling
        const hash = $(event.currentTarget).attr('href').slice(1);
        const scrolltop_offset = $("a.api-anchor[name='#{hash}']").offset().top;
        scroll_to(scrolltop_offset, ()=> window.location.hash = hash);
    });

    const $back_to_top = $('p.back-to-top');
    const $back_to_top_sticky = new Waypoint.Sticky({element: $back_to_top});
    $back_to_top.on('click', (e) => {
        e.preventDefault();
        scroll_to(0);
    });
});