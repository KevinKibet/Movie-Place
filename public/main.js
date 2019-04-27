$(document).ready(() => {
  $('.delete-movie').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-movie-id');
    $.ajax({
      type:'DELETE',
      url: '/movies/delete/'+id,
      data:{
       _csrf: $target.attr('data-csrf')
      },
      success: (response) => {
        alert('Deleting Movie');
        window.location.href='/movies';
      },
      error: (error) => {
        alert(error);
        console.log(error);
      }
    });
  });
});
