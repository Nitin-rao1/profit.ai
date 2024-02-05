import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
// import { Application_ID, API_URL, REST_API_Key } from '@env';
import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '../../../env';

export const generateOTP = async data => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/SendOTPTest`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(function (response) {
        console.log('resppp',response.data.result);
        if (response.status === 200) {
          // Resolve the promise with the response data
          resolve(response);
        } else {
          // Reject the promise with an error message
          reject('Request failed with status: ' + response.status);
        }
      })
      .catch(function (error) {
        // Handle errors and reject the promise with an error message
        reject('Error: ' + error.message);
      });
  });
};

export const SubmitOTP = async data => {
    console.log('data',data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/VerifyOtpTest`,
      headers: {
        'X-Parse-Application-Id': Application_ID,
        'X-Parse-REST-API-Key': REST_API_Key,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(function (response) {
        console.log('resppp',response.data.result);
        if (response.status === 200) {
          // Resolve the promise with the response data
          resolve(response);
        } else {
          // Reject the promise with an error message
          reject('Request failed with status: ' + response.status);
        }
      })
      .catch(function (error) {
        // Handle errors and reject the promise with an error message
        reject('Error: ' + error.message);
      });
  });
};

