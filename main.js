var downloadComplete = false;
window.onbeforeunload = function (event) {
    var message = 'Загрузка песен не закончилась вы точно хотите прервать?';
    if (!downloadComplete) {
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event && downloadComplete) {
            event.returnValue = message;
        }
        return message;
    }
}
$(function () {
    if ($('#downloader_container').length > 0) {
    } else {

        if ($('.toolbar_nav_a__audio__active').length > 0) {
            if ($('.mus-tr_i.__has-video.soh-s.__active').length > 0) {
                $('body').append('<style>#downloader_container{width: 642px;height: 79px;background-color: rgba(0, 0, 0, 0.68);position: fixed;left: 24%;top: 6%;z-index: 99999999;border: 1px solid white;border-radius: 8px;color: white;text-align: center;}#downloader_container:hover{ cursor: move}p{ margin: 0; padding: 0;}#about{font-size: 24px;font-family: Tahoma;}#info{ font-size: 21px;font-family: sans-serif;}</style><div id="downloader_container"><p id="about">ODNOKLASSNIKI MP3 DOWNLOADER 2.1 BY ARSEN007</p><p id="info">Now downloading <span id="current_order">1</span>&nbsp; /&nbsp; <span id="total_count"></span>&nbsp;(<span id="percent">0</span>%) </p><p id="msg"></p></div>');

                $.getScript('http://code.jquery.com/ui/1.10.3/jquery-ui.js', function () {
                    $('#downloader_container').draggable();
                    if ($('.m_c_s_friend:first').parent().parent().css('display') == "block") {
                        $('#total_count').text(parseInt($('.mml_subcat_btn.__active').find('.mml_notif__num.__on').text()) - $.parseJSON($('.mus-tr_i.__has-video.soh-s.__active').attr('data-query')).pos);
                    } else if ($('.m_c_s_myMusic:first').parent().parent().css('display') == "block") {
                        $('#total_count').text(parseInt($('.mml_cat_btn.__active .__on').text()) - $.parseJSON($('.mus-tr_i.__has-video.soh-s.__active').attr('data-query')).pos);
                    } else {
                        $('#total_count').text($('.mus-tr_i.__has-video.soh-s.__active').siblings().length - $.parseJSON($('.mus-tr_i.__has-video.soh-s.__active').attr('data-query')).pos + 1);
                    }
                    $('#msg').text('Идет загрузка не закрвайте вкладку!');
                });
                var iter = 1;
                var interval = setInterval(function () {
                    if (parseInt($('.mus_player-slider_fill:last').css('width')) == 538) {
                        if (iter >= $('#total_count').text()) {
                            clearInterval(interval);
                            $('#msg').text('Загрузка завершена!').css('font-size', '20px');
                            $('#info').hide();
                            var i = 0;
                            setInterval(function () {
                                if (i % 2 == 0) {
                                    $('#msg').css('color', 'blue');
                                } else {
                                    $('#msg').css('color', 'red');
                                }
                                i++;
                            }, 300)
                            downloadComplete = true;
                        } else {
                            $('.__forward').click();
                            if($('.mus-tr_i.__has-video.soh-s.__active').nextAll().length <= 3){
                                $('.m_c_s_scrollable.mus-custom-scrolling:last').animate({scrollTop:$('.m_c_s_scrollable.mus-custom-scrolling:last').scrollTop()+10000})
                            }
                            iter++;
                            $('#current_order').text(iter);
                        }
                    } else {
                        $('#percent').text(parseInt((parseInt($('.mus_player-slider_fill:last').css('width')) * 100) / 538));
                    }
                    $('#topPanelMusicPlayerControl').remove();
                    $('.ic16_play-control.ic16_play').remove(); //remove play/pause button
                    $('.mus_player-controls.mus_header_i').hide(); //hide player control buttons
                }, 100);
            } else {
                alert('Вы должны сначала проиграть песню с которой должна начаться закачка');
            }
        } else {
            alert('Вы должны открыть раздел "Музыка"');
        }
    }
})