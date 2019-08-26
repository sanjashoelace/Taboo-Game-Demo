$(document).ready(() => {
    $('.wrapper').hide();
    $('.pickTeam').hide();
    $('.winner').hide();

    let teamNameOne;
    let teamNameTwo;

    $('.start').on('click', () => {
        teamNameOne = $('#teamOneName').val()
        teamNameTwo = $('#teamTwoName').val()
        $(".scoreTeam1").text(`Score Team ${teamNameOne}: `);
        $(".scoreTeam2").text(`Score Team ${teamNameTwo}: `);
        $('.team1').text(`Team ${teamNameOne}`)
        $('.team2').text(`Team ${teamNameTwo}`)
        $('.wrapper').show();
        $('.starter').hide();
        teamNumber = 1;
        $('.scoredisplay1').css('border', "2px solid teal");
        score1 = 0;
        score2 = 0;
        $('.team1, .team2').hide();
        time = 30;
        $('.progress-bar').css('background-color', 'purple');
        $('h3').css("color", "black").css("text-shadow", "none");
        timeLeft();
        $('.pause').show();
    })

    $('.tabooCard').hide();

    let cardNumber = 1;
    let teamNumber = 1;
    let score1 = 0;
    let score2 = 0;
    let time = 30;

    $('.pause').hide();

    $('.timer').text(time);

    $(`div.taboo${cardNumber}`).show();

    $('.team1').on('click', () => {
        teamNumber = 1;
        $('.scoredisplay2').css('border', "none");
        $('.scoredisplay1').css('border', "2px solid teal");
        $('.team1, .team2').hide();
        time = 31;
        $('.progress-bar').css('background-color', 'purple');
        $('h3').css("color", "black").css("text-shadow", "none");
        timeLeft();
        $('.pause').show();
    });

    $('.team2').on('click', () => {
        teamNumber = 2;
        $('.scoredisplay1').css('border', "none");
        $('.scoredisplay2').css('border', "2px solid teal");
        $('.team1, .team2').hide();
        time = 31;
        $('.progress-bar').css('background-color', 'purple');
        $('h3').css("color", "purple").css("text-shadow", "none");
        timeLeft();
        $('.pause').show();
    });

    $('.correct').on('click', () => {
        if (teamNumber === 1) {
            score1 = score1 + 1;
            $('.score1').text(score1)
        } else {
            score2 = score2 + 1;
            $('.score2').text(score2)
        }
        $(`div.taboo${cardNumber}`).hide()
        cardNumber = cardNumber + 1;
        $(`div.taboo${cardNumber}`).show();
    });

    $('.skip').on('click', () => {
        if (teamNumber === 1) {
            score1 = score1 - 1;
            $('.score1').text(score1)
        } else {
            score2 = score2 - 1;
            $('.score2').text(score2)
        }
        $(`div.taboo${cardNumber}`).hide()
        cardNumber = cardNumber + 1;
        $(`div.taboo${cardNumber}`).show();
    });

    $('.taboo').on('click', () => {
        $('#mysoundclip')[0].play();
        if (teamNumber === 1) {
            score1 = score1 - 1;
            $('.score1').text(score1)
        } else {
            score2 = score2 - 1;
            $('.score2').text(score2)
        }
        $(`div.taboo${cardNumber}`).hide()
        cardNumber = cardNumber + 1;
        $(`div.taboo${cardNumber}`).show();
    });
    
    let isPaused = false;
    let timeCountdown;

    function timeLeft() {
        timeCountdown = setInterval(() => {
        if (!isPaused) {
                time = time - 1;
                $('.timer').text(time);
                $('.progress-bar').css('width', `${time * 3.32}%`)
                $('.percOfDang').text(`${time}`);
            }
            if (time <= 10) {
                $('.progress-bar').css('background-color', 'red');
                $('h3').css("color", "red").css("text-shadow", "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000");
            }
            if (cardNumber > 131) {
                $('.skip, .correct, .taboo').hide();
                $('.taboo132').show();
            }
            if (time < 10 && cardNumber > 131) {
                $('.wrapper').hide();
                $('.winner').show();
                    if (score1 > score2) {
                        $('.winWinWin').text(`${teamNameOne}`)
                    }
                    if (score2 > score1) {
                        $('.winWinWin').text(`${teamNameTwo}`)
                    }
                    if (score1 === score2) {
                        $('h2.winWin').text('The game is tied, now fight to the death!');
                    }
            } else if (time === 0) {
                clearInterval(timeCountdown);
                $('.pause').hide();
                $('.wrapper').hide();
                $('.starter').hide();
                $('.pickTeam').show();
                if (teamNumber === 1) {
                    $(".team2").css("border", "4px solid yellow")
                    $(".team1").css("border", "none")
                } else {
                    $(".team1").css("border", "4px solid yellow")
                    $(".team2").css("border", "none")
                }
                $('.team1, .team2').show().on('click', () => {
                    $('.pickTeam').hide();
                    $('.wrapper').show();
                })
            }
        }, 1000);
    }

    $('.resume').hide();

    $('.pause').on('click', (e) => {
        e.preventDefault();
        isPaused = true;
        $('.wrapper').hide();
        $('body').addClass('overlay2');
        $('.resume').show();
    })

    $('.resume').on('click', (e) => {
        e.preventDefault();
        isPaused = false;
        $('body').removeClass('overlay2');
        $('.wrapper').show();
        $('.resume').hide();
    })

    $(".playAgain").on("click", () => {
        location.reload();
    })

});
