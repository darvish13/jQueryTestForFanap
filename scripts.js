$(document).ready(function () {

    $.ajax({
        url: 'https://service-play.pod.land/srv/game/get',
        data: {
            size: 15,
            offset: 0
        }
    }).done(function (response) {
        var gameCards = []

        response.Result.forEach(game => {
            
            var gameCardHtml =
                '<div class="col-sm-2 m-2">\
                            <article class="card card-size-limit text-right bg-dark text-white game-card" \
                            data-name='+ game.Name + '\
                            data-banner="'+ game.Banner + '"\
                            data-preview="'+ game.preview + '"\
                            data-category="'+ game.Lobby.Name + '"\
                            data-description="'+ game.description + '"\
                            data-log="'+ game.Changelog + '"\
                            >\
                            <div class="card-header"></div>\
                                <img src="'+ game.preview + '"\
                                    alt="" class="card-img-top">\
                                <div class="card-body">\
                                    <div class="card-title category-color d-inline-block text-dark p-1 rounded">'+ game.Lobby.Name + '</div>\
                                    <div class="card-subtitle">'+ game.Name + '</div>\
                                    <p class="card-text">play.pod</p>\
                                </div>\
                            </article>\
                        </div>'

            gameCards.push(gameCardHtml)
        })

        // Append game cards
        $('#games-row').append(gameCards)

        // Game card click handler
        $('.game-card').click(function () {
            var name = $(this).data('name')
            var banner = $(this).data('banner')
            var preview = $(this).data('preview')
            var category = $(this).data('category')
            var description = $(this).data('description').slice(0,200)
            var log = $(this).data('log')
            

            var modalHtml = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="game-modal" aria-hidden="true" id="game-modal">\
                                <div class="modal-dialog modal-xl">\
                                    <div class="modal-content bg-dark">\
                                        <img src="'+ banner +'" style="width: 100%" class="rounded">\
                                        <article class="card">\
                                            <div class="card-body bg-dark">\
                                                <div class="row">\
                                                    <div class="col-sm-2 text-center p-3 p-4" style="background: #4a0c95">\
                                                        <img src="'+ preview + '" style="width: 75%" class="shadow-lg">\
                                                    </div>\
                                                    <div class="col-sm text-right text-white p-4" style="background: #4a0c95">\
                                                        <h6>'+ name + '</h6>\
                                                        <div class="category-color d-inline-block text-dark p-1 rounded">'+ category +'</div>\
                                                        <p class-" mt-3">'+ description +'</p>\
                                                        <span >تغییرات:</span>\
                                                        <p>'+ log +'</p>\
                                                    </div>\
                                                    <div class="col-sm-2 text-right text-white p-4" style="background: #9545dc">\
                                                        <button class="btn form-control shadow text-white" style="background: #239f00">بازی</Button>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </article>\
                                    </div>\
                                </div>\
                            </div>'

            $('body').append(modalHtml);

            $('#game-modal').modal('toggle')

            $('#game-modal').on('hidden.bs.modal', function () {
                $(this).remove()
            })
        })

        

        /** Live Search */
        $('.live-search-box').on('keyup', function () {
            var searchTerm = $(this).val().toLowerCase()

            $('.game-card').each(function () {
                if ($(this).filter('[data-name *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                    $(this).show()
                } else {
                    $(this).hide()
                }
            })
        })

    })
})