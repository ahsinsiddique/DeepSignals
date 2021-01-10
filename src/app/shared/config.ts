import { environment } from 'src/environments/environment';

export const apiUrl = getBaseUrl();


function getBaseUrl() {
  if (environment.production) {
    return   'https://deeper-signals.com/api'; // random domain for production
  }
//  return 'http://localhost:4200/';
  return 'https://ds-test-api.herokuapp.com/';
}
