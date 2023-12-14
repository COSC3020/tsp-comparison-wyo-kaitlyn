// local search
function tsp_ls(distance_matrix) {
    let bestRoute = true;
  
    let route = Object.keys(distance_matrix);
    route = shuffle(route);
  
    // repeats until no improvement is made
    while (bestRoute) {
      bestRoute = false;
  
      for (let i = 0; i < distance_matrix.length - 1; i++) {
          for (let k = i + 1; k < distance_matrix.length; k++) {
              let newRoute = twoOptSwap(route, i , k);
              let newDist = routeLength(distance_matrix, newRoute);
              let dist = routeLength(distance_matrix, route);
  
              if (newDist < dist) {
                // saves the better route to loop through again
                route = newRoute;
                bestRoute = true;
              }
          }
      }
    }
  
    return routeLength(distance_matrix, route); 
  }
  
  // calculates the length of the route
  function routeLength(distance_matrix, route) {
    let total = 0;
  
    for (let i = 0; i < distance_matrix.length - 1; i++) {
      total += distance_matrix[route[i]][route[i+1]];
    }
  
    return total;
  }
    
  
  // swaps cities i to k
  function twoOptSwap(route, i, k) {
    let firstPart = [];
    let reversed = [];
    let lastPart = [];
  
    for (let j = 0; j < route.length; j++) {
      // cities 1 to i-1 stay in the order they are
      if (j <= i - 1 && j > 0) {
        firstPart.push(route[j]);
      }
      // cities k + 1 to n stay in the order they are
      else if (j >= k+1) {
        lastPart.push(route[j]);
      }
      // cities i to k are reversed
      else {
        reversed.push(route[j]);
      }
    }
  
    // reverses the middle part
    let newRoute = reversed.reverse();
    // combines all arrays together
    newRoute = firstPart.concat(newRoute, lastPart);
  
    return newRoute;
  }
  
  // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle (arr) {
    let index = arr.length;
  
    while (index > 0) {
      randomIndex = Math.floor(Math.random() * index);
      index--;
  
      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    }
  
    return arr;
  }


  // held-karp
  function tsp_hk(distance_matrix) {
    if (distance_matrix.length <= 1) {
      return 0;
    }
  
    // cache is reset every time the function is called 
    let cache = [];
  
    // cities not yet visited
    let cities = Object.keys(distance_matrix);
  
    let temp = 0;
    let min  = Infinity;
  
    // loops through the matrix to find the shortest path, compares
    // to previous shortest path to get the best one
    for (i = 0; i < cities.length; i++) {
      temp = heldKarp(distance_matrix, i, cities, cache);
      if (temp < min) {
        min = temp;
      }
    }
  
    return min;
  }
  
  
  function heldKarp(dm, start, cities, cache) {
    let key = JSON.stringify(cities) + start  
    // check if already in the cache
    if (cache[key] != undefined) {
      return cache[key];
    }
  
    if (cities.length == 2) {
      // length of tour that starts at start, goes directly to other city in cities
      cache[key] = dm[cities[0]][cities[1]];
      return cache[key];
    }
    else {
      let minimum = Infinity;
  
      for (let city = 0; city < cities.length; city++) {
        // for each city in cities, unless the city is start
        if(cities[city] != start) {
          // reduce the set of cities that are unvisited by one (the old start)
          let newCities = cities.filter(city => city != start);
          // add on the distance from old start to new start
          let newMin = heldKarp(dm, cities[city], newCities, cache) + dm[start][cities[city]];
  
          // check if shorter
          if (newMin < minimum) {
            minimum = newMin;
          }
        }
      }
  
      cache[key] = minimum;
      return minimum;
    }
  }