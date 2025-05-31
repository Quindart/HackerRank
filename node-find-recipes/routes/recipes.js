var recipes = require('../recipes.json');
var router = require('express').Router();
var recipes = require('../recipes.json');
const RECIPES_STEP = Object.freeze({
  INDEX: '/step',
  ID: "/step/:id"
})

//TODO: Explaining
//! When & where: to the route /recipes/step/:id?elapsedTime
//? How it work:
//  1. find id of recipes
//  2. loop timers to find out the  elapsedTime  = sum(timers[i], timers[j],...) 
//? 3: returns the index of the current step of the recipe based on the elapsed time

//? Validation:  
// - id not valid number => status code 404 with mess NOT_FOUND
// - elapsed time should be as a Number, if no elapsed time => the default value  = 0 

const getRecipesFound = async (request, response) => {

  const { id } = request.params
  let { elapsedTime = '' } = request.query
  let sum = 0
  let result = { index: 0 }

  //TODO: Validation
  const curr_recipe = recipes[+id - 1]

  if (!curr_recipe) {
    return response.status(400).send("NOT_FOUND")
  }
  elapsedTime = +elapsedTime
  if (isNaN(elapsedTime)) {
    elapsedTime = 0
  }

  try {
    const curr_timers = curr_recipe.timers
    curr_timers.forEach((time, i) => {
      sum = sum + time
      if (sum >= elapsedTime) {
        result.index = i
        return response.json(result)
      }
    })
  } catch (error) {
    console.log("💲💲💲 ~ getRecipesFound ~ error:", error)
    response.status(500)
  }
}

router.get(RECIPES_STEP.ID, getRecipesFound)

module.exports = router;

