
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
// import './styles.css';
// =============================Using AJAX===============================
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    $('#location').val("");
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=17f942b36dbf1b721d715a5be22ac009`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        $('.showTemp').text(`The temperature in Celcius is ${(response.main.temp -273.15).toFixed(1)}`);
      },
      error: function() {
        $('.errors').text("There was an error processing your request. Please try again.");
      }
    });
  });

  // =============================Using XMLHttpRequest===============================

  $('#weatherLocation2').click(function() {
    const city = $('#location2').val();
    $('#location2').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

   const getElements = function(response) {
      $('.showHumidity2').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp2').text(`The temperature in Celcius is ${(response.main.temp -273.15).toFixed(1)} degrees.`);
    }
  });

// =============================Using Promises===============================

  $('#weatherLocation3').click(function() {
    let city = $('#location3').val();
    $('#location3').val("");
    $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`).then(function(response) {
      $('.showHumidity3').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp3').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }).fail(function(error) {
      $('.showErrors3').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });
  });

// =============================Using ES6 Promises===============================

  $('#weatherLocation4').click(function() {
    let city = $('#location4').val();
    $('#location4').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      $('.showHumidity4').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp4').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors4').text(`There was an error processing your request: ${error.message}`);
    });
  });

});

// =============================Using ES6 Promises With Separation Of Logic===============================

//weather-service.js

// export class WeatherService {
//   getWeatherByCity(city) {
//     return new Promise(function(resolve, reject) {
//       let request = new XMLHttpRequest();
//       let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=[API-KEY-GOES-HERE]`;
//       request.onload = function() {
//         if (this.status === 200) {
//           resolve(request.response);
//         } else {
//           reject(Error(request.statusText));
//         }
//       }
//       request.open("GET", url, true);
//       request.send();
//     });
//   }
// }

// weather-interface.js

// import {WeatherService} from "./weather-service"
// $(document).ready(function() {
//   $('#weatherLocation').click(function() {
//     let city = $('#location').val();
//     $('#location').val("");
//
//
//     let weatherService = new WeatherService();  // create instance of WeatherService class
//     let promise = weatherService.getWeatherByCity(city);  // call the instance method and pass in user input
//
//     promise.then(function(response) {
//       body = JSON.parse(response);
//       $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
//       $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
//     }, function(error) {
//       $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//     });
//   });
//
// });
