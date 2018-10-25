/**
 * @file
 * Action Sample
 * Refer here to make a basic action
 *
 */
export const sampleAction = () => dispatch => {
 dispatch({
  type: 'SAMPLE_ACTION',
  payload: {
    count: 1
  }
 })
}
