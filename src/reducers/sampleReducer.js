/**
 * @file
 * Reducer Sample
 * Refer here to make a basic reducer
 *
 */
let initialState = {
  counter: 0,
}
export default (state = initialState, action) => {
 switch (action.type) {
  case 'SAMPLE_ACTION':
   return {
    counter: state.counter + action.payload.count
   }
  default:
   return state
 }
}
