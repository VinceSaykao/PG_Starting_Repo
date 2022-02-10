$(document).ready(onReady);

function onReady() {
    getSongs();
    $('#add').on('click', postSong);
    $('#songsTableBody').on('click', '.btn-delete', deleteSong);
    $('#songsTableBody').on('click','.btn-vote', voteSong);
};

function voteSong() {
    // call ajax for PUT
    // need id and direction
    let id = $(this).closest('tr').data().id
    let direction = $(this).text().toLowerCase();
    console.log(id, direction);

$.ajax({
    method: 'PUT',
    url: `/songs/${id}`,
    data: {
        direction: direction
    }
}).then(function(response) {
    getSongs();
}).catch(function(err){
    console.log(err);
})
}; //end of function


//brute force
// get artist data from the server
function getSongs() {
    $("#songsTableBody").empty();
    // let songId = 90;
    $.ajax({
        type: 'GET',
        // url: `/songs/${songId}`
        url: `/songs`
    }).then(function (response) {
        console.log("GET /songs response", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#songsTableBody').append(`
                <tr data-id=${response[i].id}>
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}
                    <button class="btn-vote">Up</button>
                    <button class="btn-vote">Down</button>
                    </td>
                    <td>${response[i].published}</td>
                    <td>
                    <button class="btn-delete" data-id=${response[i].id}>DELETE</button>
                    </td>
                    
                </tr>
            `);
        }
    });
}

function postSong() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    $.ajax({
        type: 'POST',
        url: '/songs',
        data: payloadObject
    }).then( function (response) {
        $('#artist').val(''),
        $('#track').val(''),
        $('#rank').val(''),
        $('#published').val('')
        getSongs();
    });
}

// delete is a http method
// use input parameters if not hard coded in server and if youre using in that instance on page load
function deleteSong() {
    let songId = $(this).data().id; // grabs the this id and parse it into our url
    $.ajax({
        type: 'DELETE', // type or method same thing
        url: `/songs/${songId}`
    })
    .then(function(response) {
        console.log('Deleted it!', response);
        getSongs();
    })
    .catch(function(error) {
        console.log('Error DELETEing', error);
    })
} // end of function




