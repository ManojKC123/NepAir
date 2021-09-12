<footer>
    <center>
        Copyright All Right Reserved ! Nees Web Services
    </center>
</footer>
</div>


<script src='./apps/jquery.js'></script>
<script src='./apps/app.js'></script>
<script>
$(document).ready(function() {
    const checkonlinestatus = async () => {
        try {
            const online = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            return online.status >= 200 && online.status < 300;
        } catch (err) {
            return false;
        }
    }
    setInterval(async () => {
        const result = await checkonlinestatus();
        const statusdisplay = document.getElementById('status');
        statusdisplay.textContent = result ? "online" : "offline";
    }, 3000);

    // checking online status ends here


    $(window).scroll(function() {
        var windowTop = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height();
        const scrolltotop = $('.scrolltotop');
        const pause = $('#stopautoscroll');
        var widthproperty = (windowTop / (documentHeight - windowHeight)) * 100;
        $('#scrolled').css('width', (widthproperty) + '%');

        if (windowTop > 150) {
            scrolltotop.css('display', 'block');
            scrolltotop.css('display', 'grid');
            pause.css('display', 'block');
            pause.css('display', 'grid');
        } else {
            scrolltotop.css('display', 'none');
            pause.css('display', 'none');
        }

        scrolltotop.on('click', () => {
            $(window).scrollTop(0);
        })
    });


    let scroll = 0;

    let documentwidth = $('.innerbox').innerWidth().toFixed(0);
    let innerboxwidth = $('.innerbox').innerWidth();
    let innerboxtotalwidth = $('.innerbox').innerWidth() + 2000;
    let currentscrollbar = $('.innerbox').scrollLeft();

    function autoscrollleft() {
        let entity = Math.floor((Math.random() * 10) + 1);
        scroll += 300 * entity;
        $('.innerbox').scrollLeft(scroll);
        if (scroll > innerboxtotalwidth) {
            scroll = 0;
            $('.innerbox').scrollLeft(scroll);
        }
    }
    autoscroll = setInterval(autoscrollleft, 10000);


    $(document).on('click', '#pause', () => {
        $('#pause').css('display', 'none');
        $('#play').css('display', 'block');
        clearInterval(autoscroll);
    })

    $(document).on('click', '#play', () => {
        $('#play').css('display', 'none');
        $('#pause').css('display', 'block');
        autoscroll = setInterval(autoscrollleft, 10000);
    })

    $(document).on('click', '#left-scroll', () => {
        scroll = 0;
        let v = $('.innerbox').innerWidth() + 500;
        $('.innerbox').scrollLeft(v);
    })

    $(document).on('click', '#right-scroll', () => {
        scroll = 0;
        $('.innerbox').scrollLeft(0);
    })






})
</script>
</body>

</html>