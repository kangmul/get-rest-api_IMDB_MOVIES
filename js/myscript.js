function cariFilms(){
    $("#daftarfilm").html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'fcebf156',
            's': $('#textCariFilm').val(),
        },
        success: function(result){
            if (result.Response == "True"){
                let dataMovies = result.Search;
                $.each(dataMovies, function(i, data){
                    $("#daftarfilm").append(`
                    <div class="col-md-4">
                        <div class="card mb-5" style="width: 20rem;">
                            <img class="card-img-top" src="`+ data.Poster +`" alt="Card image cap">
                                <div class="card-body">
                                    <p class="card-text">`+ data.Title +`</p>
                                    <h6 class = "card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href = "#" class ="card-link show-detail" data-toggle = "modal"
                                    data-target = "#exampleModal" 
                                    data-id = "`+ data.imdbID +`"> Detail </a>
                                </div>
                        </div> 
                    </div>`);
                });
                $("#textCariFilm").val('');
            }
            else {
               $("#daftarfilm").html(`<h1 class="text-center">${result.Error}</h1>`);
            }
        }
        });
}
$("#carifilm").on('click', function() {
    cariFilms();
});

$("#textCariFilm").on('keyup', function (e) {
    if (e.keyCode === 13 ){
         cariFilms();
    }
});

$('#daftarfilm').on('click', '.show-detail', function(){
    $('#modal-body').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'fcebf156',
            'i': $(this).data('id'),
        },
        success: function(film){
            if (film.Response == "True"){
                $("#modal-body").html(`
                    <div class="row">
                        <div class="col-6">
                            <ul class="list-group">
                                <li class="list-group-item">Judul Film : `+ film.Title +`</li>
                                <li class="list-group-item">Tanggal Rilis : `+ film.Released +`</li>
                                <li class="list-group-item">Sutradara : `+ film.Director +`</li>
                                <li class="list-group-item">Genre : `+ film.Genre +`</li>
                                <li class="list-group-item">Aktor/Aktris : `+ film.Actors +`</li>
                                <li class="list-group-item">Penulis : `+ film.Writer +`</li>
                                <li class="list-group-item">Negara : `+ film.Country+`</li>
                                <li class="list-group-item">Review : <br>`+ film.Plot+`</li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <div class="card">
                                <img class="card-img-top" src="`+ film.Poster +`">        
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})
