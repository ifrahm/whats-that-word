"use strict";

/*
 * Name: Ifrah Mohamed
 * Date: 10/31/19
 * Section: CSE 154 AL
 * This is the js file for index.html. Using the dictionary api it finds definitions and using the
 * movie db, it finds movie titles, based on the user input.
 */
(function() {

  window.addEventListener("load", init);
  const URL_DEF = "https://dictionaryapi.com/api/v3/references/collegiate/json/";
  const URL_DEF_KEY = "d4c6e131-182b-4095-b7e5-33061d677aa7";
  const URL_MOVIE = "http://api.themoviedb.org/3/search/movie";
  const URL_MOVIE_KEY = "74d39d9356dd43d617106dd73d189757";

  /**
   * This is the init function which initiaties the buttons on the page to respond to a click or
   * change.
   */
  function init() {
    id("enter-btn").addEventListener("click", enterFunctions);
    id("text-box").addEventListener("change", enterFunctions);
  }

  /**
   * This function is in response to the enter button being clicked it checks if Definition or
   * movie was selected. Then calls the correct fetch function
   */
  function enterFunctions() {
    if (id("select").value === "Definition") {
      fetchDefinition(this.value);
    } else {
      fetchMovie(this.value);
    }
  }

  /**
   * This function is a fetch call, it uses the url, api key, and the user input to fetch the
   * infromation from the movie db api
   * @param {Object} input this is text input
   *
   */
  function fetchMovie(input) {
    fetch(URL_MOVIE + "?api_key=" + URL_MOVIE_KEY + "&query=" + input)
      .then(checkStatus)
      .then(response => response.json())
      .then(processMovie)
      .catch(handleError);
  }

  /**
   * This function processes the data from the movie db api, record only the movie titles, and
   * adds them on the page as a list item.
   * @param {Object} data this is the data from the movie api
   */
  function processMovie(data) {
    let results = id("results");
    results.innerHTML = "";
    let output = data["results"];
    for (let i = 0; i < 10; i++) {
      let movieT = output[i]["original_title"];
      let titleElement = gen("li");
      titleElement.textContent = movieT;
      results.appendChild(titleElement);
    }
  }

  /**
   * This function is the fetch call, it uses the url, api key, and the user input to fetch the
   * infromation from the dictionary api
   * @param {String} input this is text input from the user
   */
  function fetchDefinition(input) {
    fetch(URL_DEF + input + "?key=" + URL_DEF_KEY)
      .then(checkStatus)
      .then(response => response.json())
      .then(processDefinition)
      .catch(handleError);
  }

  /**
   * This function process the data from the dictionary api, gets a short definition and adds it
   * on the page as a p element
   * @param {Object} data the data from the dictionary api
   */
  function processDefinition(data) {
    let results = id("results");
    results.innerHTML = "";
    let output = data[0]["shortdef"];
    let titleElement = gen("p");
    titleElement.textContent = output;
    results.appendChild(titleElement);
  }

  /**
   * Checks the status of the http status of the page
   * @param {response} response the response from the api
   * @returns {response} response from API
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /**
   * This is the function that handles the errors if the text imput dosent exist as a title or
   * definition
   * @param {response} err the error resonpnse
   */
  function handleError(err) {
    let error = gen("p");
    let results = id("results");
    error.textContent = "Sorry, we are unable to find what you asked for :( ";
    error.textContent += err;
    results.appendChild(error);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Creates and returns a new DOM object.
   * @param {String} elType - The type of the element.
   * @returns {object} The new DOM object created.
   */
  function gen(elType) {
    return document.createElement(elType);
  }
})();
