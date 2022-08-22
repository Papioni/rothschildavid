
var serviceMode=false;

$(document).ready(function(){

    /* This code is executed after the DOM has been completely loaded */

    var str=[];
    var perRow = 16;

    /* Generating the dot divs: */
    for(var i=0;i<192;i++)
    {
        str.push('<div class="dot" id="d-'+i+'" />');
    }

    /* Joining the array into a string and adding it to the inner html of the stage div: */
    $('#stage').html(str.join(''));

    /* Using the hover method: */
    $('#navigation li a').hover(function(e){

        /* serviceDraw is a cut-out version of the draw function, used for editing and composing shapes: */

        if(serviceMode)
            serviceDraw($(this).attr('class'));
        else
            draw($(this).attr('class'));
    }, function(e){});

    /* Caching the dot divs into a variable for performance: */
    dots = $('.dot');

    if(serviceMode)
    {
        /* If we are in service mode, show borders around the dot divs, add the export link, and listen for clicks: */

        dots.css({
            border:'1px solid black',
            width:dots.eq(0).width()-2,
            height:dots.eq(0).height()-2,
            cursor:'pointer'
        });

        $('<div/>').css({
            position:'absolute',
            bottom:-20,
            right:0
        }).html('<a href="" onclick="outputString();return false;">[Export Shape]</a>').appendTo('#stage');

        dots.click(function(){
            $(this).toggleClass('active');
        });
    }
});
var shapes={
    /* Each shape is described by an array of points. You can add your own shapes here, just don't forget to add a coma after each array, except for the last one */

    house:[22,37,38,39, .... 166,167,168,169],
    wrench:[22,23,24,25,26 .... 148,163],
    envelope:[34,35,36,37, .... 153,154,155,156],
    info:[22,23,38,39, .... 151,166,167,168]
}

var stopCounter = 0;
var dots;

function draw(shape)
{
    /* This function draws a shape from the shapes object */

    stopCounter++;
    var currentCounter = stopCounter;

    dots.removeClass('active').css('opacity',0);

    $.each(shapes[shape],function(i,j){

        setTimeout(function(){
        /* If a different shape animaton has been started during the showing of the current one, exit the function  */

        if(currentCounter!=stopCounter) return false;

        dots.eq(j).addClass('active').fadeTo('slow',0.4);

        /* The fade animation is scheduled for 10*i millisecond into the future: */
    },10*i);

});
}

function serviceDraw(shape)
{
    /* A cut out version of the draw function, used in service mode */

    dots.removeClass('active');

    $.each(shapes[shape],function(i,j){
        dots.eq(j).addClass('active');
    });
}

function outputString()
{
    /* Exports the positions of the active dot divs as a comma-separated string: */

    var str=[];
    $('.dot.active').each(function(){
        str.push(this.id.replace('d-',''));
    })

    prompt('Insert this string as an array in the shapes object',str.join(','));
}
