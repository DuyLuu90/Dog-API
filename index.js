'use strict';

function displayResults(response) {
  let links= response.message;
  console.log(response);
  
  if (links.length === 1) $('#results').append(`<h2>Look at this dog</h2>`)
  else $('#results').append(`<h2>Look at these dogs</h2>`)

  for (let i=0; i<links.length; i++) {
    $('#results').append
      (`<img src="${links[i]}" class="results-img" alt='image'>`)
  }
}
//replaceWith() vs html() vs append()
function displayBreed(response) {
  console.log(response);
  if (response.status === 'error') {
    $('#results').html(`<p> ${response.message} </p>`)
  }
  else 
  $('#results').html(`
    <h2>Look at this dog</h2>
    <img src="${response.message}" class="results-img" alt='image'>`)
}

function getImages(num) {
  
  fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
  .then(response => response.json())
  .then(responseJson => displayResults(responseJson))
  .catch(error => alert('Something went wrong. Try again later.'));
}

function searchBreed(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
  .then(response => response.json())
  .then(responseJson => displayBreed(responseJson))
  .catch(error => alert('Something went wrong.Try again later.'));
}

function handleRandom() {
  $('.button').on('click','#getRandom', event=> {
    $('#results').empty(); 
    $('#js-form').html(`
    <label for 'userValue'>How many images would you like to display?</label>
    <input type='number' min='1' max='50' id='userValue' placeholder='eg., 3' value='3'>
    <button type='submit'>Enter</button>`)
  })
}

function handleBreed() {
  $('.button').on('click','#breed', event=> {
    $('#results').empty(); 
    $('#js-form').html(`
    <label for 'userValue'>Enter a breed name </label>
    <input type='text' id='userValue' placeholder='eg,hound'>
    <button type='submit'>Enter</button>`)
  })
}

function watchForm() {
  console.log('App loaded! Waiting for submit!');
  $('form').submit(event=> {
    $('#results').empty();
    event.preventDefault();
    const val= $('#userValue').val();
    console.log(val);
    if (isNaN(val)) searchBreed(val)
    else getImages(val);
  });
}

//https://dog.ceo/api/breed/<SOME-BREED>/images/random
function runApp(){
  handleRandom();
  handleBreed();
  watchForm();
}

$(runApp);