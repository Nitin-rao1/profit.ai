import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
// import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '@env';
import {Application_ID, BASE_URL, REST_API_Key, API_URL} from '../../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {date} from 'yup';

console.log(API_URL);

export const verifyMobile = async data => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'post',
      url: `${API_URL}/user_profile/backend/check_phone_numeber/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        // console.log('nnnnnnnnnnnn', JSON.stringify(response));

        if (response.status === 200) {
          // if (response.data.success === 'user created' && response.data.otp) {
          // showMessage({
          //   message: 'Verification Successful',
          //   description: `Mobile number verified successfully. OTP: ${response.data.otp}`,
          //   type: 'success',
          // });
          resolve(response.data);
          // } else {
          //   reject(new Error('Invalid response format'));
          // }
        } else {
          showMessage({
            message: 'Verification Failed',
            description:
              'An error occurred while processing your request. Please try again later.',
            type: 'danger',
          });
          reject(new Error(`HTTP error: ${response.status}`));
        }
      })
      .catch(error => {
        console.error('Error Response:', error.response?.data);
        console.error('Error Status:', error.response?.status);
        console.error('Error Headers:', error.response?.headers);

        reject(error);

        if (error.response) {
          if (error.response.status === 404) {
            showMessage({
              message: 'Verification Failed',
              description: 'Invalid phone number. Please try again.',
              type: 'danger',
            });
          } else {
            showMessage({
              message: 'Verification Failed',
              description:
                'An error occurred while processing your request. Please try again later.',
              type: 'danger',
            });
          }
        } else {
          showMessage({
            message: 'Network Error',
            description:
              'An error occurred. Please check your network connection and try again.',
            type: 'danger',
          });
        }
      });
  });
};

export const CheckOtp = async ({userMobileNumber, otpInput}) => {
  return new Promise((resolve, reject) => {
    const data = {
      phone_number: userMobileNumber,
      otp: otpInput,
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/login/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log('response', response);
        const serverResponse = response.data;

        console.log('Server Response:', serverResponse);

        if (response.status === 200) {
          if (serverResponse.status === 'error') {
            // Show error message for incorrect OTP
            showMessage({
              message: 'Invalid OTP',
              description: 'Please enter a valid OTP.',
              type: 'danger',
            });
            reject('Invalid OTP');
          } else {
            // Show success message for correct OTP
            showMessage({
              message: 'OTP Verified',
              description: 'Your OTP has been verified successfully.',
              type: 'success',
            });
            resolve(serverResponse);
          }
        } else {
          showMessage({
            message: 'Request Failed',
            description: `Request failed with status: ${response.status}`,
            type: 'danger',
          });
          reject('Request failed with status: ' + response.status);
        }
      })
      .catch(function (error) {
        console.log('error====!!!!!!!!!!', error);
        // Handle errors and show Flash Message
        showMessage({
          message: 'Error',
          description: error.message,
          type: 'danger',
        });
        reject('Error: ' + error.message);
      });
  });
};

export const Findaddress = async ({Zipcode}) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/api/zipcode/${Zipcode}`,
      headers: {
        // 'Authorization': 'accessToken',
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log('resp', response.data);
        const responseData = response.data;

        if (response.status === 200) {
          if (responseData.status === 'Error') {
            showMessage({
              message: 'Invalid ZIP code',
              description: 'Please input a valid 6-digit ZIP code.',
              type: 'danger',
            });
            resolve({
              status: 'error',
              data: null,
            });
          } else if (responseData.status === 'success') {
            showMessage({
              message: 'Address Found',
              description: 'The ZIP code has been successfully validated.',
              type: 'success',
            });
            resolve({
              status: 'success',
              data: responseData,
            });
          }
        } else {
          showMessage({
            message: 'Request Failed',
            description: `Request failed with status: ${response.status}`,
            type: 'danger',
          });
          resolve({
            status: 'error',
            data: null,
          });
        }
      })
      .catch(error => {
        showMessage({
          message: 'An Error Occurred',
          description: 'Failed to make the request',
          type: 'danger',
        });
        reject(error);
      });
  });
};

export const BussinessProfile = async (token, data) => {
  console.log('datapiBussinessProfile', data);
  return new Promise((resolve, reject) => {
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/business-profile/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('BussinessProfile====>', config, data);
    console.log('BussinessProfile====>', config, data);
    axios
      .request(config)
      .then(response => {
        console.log('BussinessProfileresponse====>', response.data);
        resolve(response.data);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
};

export const GetIndustryType = async token => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/master_menu/api/industry/create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('config');
    axios
      .request(config)
      .then(response => {
        console.log('Response:', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
};

export const GetBusinessType = async token => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/master_menu/api/businesstype/list_create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log('Response:', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
};

export const getUserDetails = async token => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/userupdate`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config, 'BussinessProfile====>');
    axios
      .request(config)
      .then(response => {
        resolve(response.data);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
};

export const userGetInventory = async token => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'get',
      url: `${API_URL}/master_menu/api/ProductType/create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const userPostInventory = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/inventory/api/product/listcreate`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('usercheckdasta', config);

    axios
      .request(config)
      .then(response => {
        console.log('nnnnnnnn', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const userCreateList = async token => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API_URL}/inventory/api/product/listcreate`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(error => {
        console.error('Response Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
        console.log(error);

        reject(error);
      });
  });
};

export const userDeleteProductList = async (token, id) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_URL}/inventory/api/product/all/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const userUpdateList = async (token, data, id) => {
  console.log('rrrrrrrrrrrrrrr', data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API_URL}/inventory/api/product/all/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    // console.log('ssssssssssssssss', config);
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        console.error('Response Error:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
        reject(error);
      });
  });
};

export const userAllDataList = async (token, page) => {
  console.log('page', page);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/inventory/api/product/listcreate?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(page, 'page,token', config);
    axios
      .request(config)
      .then(response => {
        console.log('aa===========aaaaaaaaaa============', response.data);
        if (response.data.data.length > 0) {
          resolve(response.data);
        } else {
          resolve({data: []});
          //   resolve(response.data);
          // })
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const userSearchProduct = async (token, searchQuery) => {
  console.log('yyyyyyyyyyyyyyyyyy', token);
  console.log('ooooooooooooooooooooo', searchQuery);
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${API_URL}/inventory/api/product/search?search=${searchQuery}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      console.log('config', config);
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const userSortFilter = async (token, data, page) => {
  console.log('Request Data:', data);
  console.log('Authorization Token:', token);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      url: `${API_URL}/inventory/api/product/sort_filter?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('configggggggggggggg', config);
    axios
      .request(config)
      .then(response => {
        // console.log('Response Dataxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:', response.data);
        if (response?.data?.data.length > 0) {
          resolve({data: response.data.data});
        } else {
          resolve({data: []});
        }
      })
      .catch(error => {
        console.log('Axios Error:', error);
        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Response Status:', error.response.status);
          console.error('Response Headers:', error.response.headers);
        }
        reject(error);
      });
  });
};

export const Searchingdata = async (token, searchQuery) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/costomer/search?search=${searchQuery}&type=local`, //local
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data : data
    };
    console.log('configconfigconfigconfig', config);
    await axios
      .request(config)
      .then(response => {
        const {status, message, customers} = response.data;

        if (status === 'success') {
          resolve({status, message, customers: customers || []});
        } else {
          reject({status, message});
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const FindCustomer = async (token, data) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/customer/favourite/frequent`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        const responseData = response.data;
        console.log('response', responseData);

        if (responseData.status === 'success') {
          resolve(responseData);
        } else {
          reject({status: responseData.status, message: responseData.message});
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const CustomerLedgerBook = async (token, page) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/user_profile/backend/costomer/?page=${page}`,
      // url: `${API_URL}/user_profile/backend/costomer/?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data: data,
    };
    console.log(page, 'data===', config);
    await axios
      .request(config)
      .then(response => {
        // console.log('CustomerCreate response', response);
        // console.log(JSON.stringify(response));
        // if (response.status === 200 && response.data.status === 'success') {
        // showMessage({
        //   message: (response.data.message),
        //   type: 'success',
        // });
        if (response?.data?.data?.length > 0) {
          resolve({data: response?.data?.data});
        } else {
          resolve({data: []});
        }
        // resolve(response.data);
        // } else {
        //   showMessage({
        //     message: 'Failed to create customer. Please try again.',
        //     type: 'danger',
        //   });
        //   reject(response.data);
        // }
      })
      .catch(error => {
        // console.log(error);
        // Handle network errors or unexpected issues
        // showError('Failed to create customer. Please try again.');
        reject(error);
        // console.log(error.response?.data);
        // console.log(error.response?.status);
        // console.log(error.response?.headers);
      });
  });
};

export const CustomerCreate = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/costomer/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('configconfigconfigconfig', config);
    axios
      .request(config)
      .then(response => {
        // console.log('CustomerCreate response', response);
        // console.log(JSON.stringify(response));
        if (response.status === 200 && response.data.status === 'success') {
          showMessage({
            message: response.data.message,
            type: 'success',
          });
          resolve(response.data);
        } else {
          showMessage({
            message: 'Failed to create customer. Please try again.',
            type: 'danger',
          });
          reject(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        // Handle network errors or unexpected issues
        showError('Failed to create customer. Please try again.');
        reject(error);
      });
  });
};

export const FavouriteCustomer = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'PATCH',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/costomer/favourite/add`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        console.log('response', response);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        // Handle network errors or unexpected issues
        showError('Failed to create customer. Please try again.');
        reject(error);
      });
  });
};

export const AddProduct = async token => {
  console.log('data,token', token);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_URL}/inventory/api/product/listcreate`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then(response => {
        console.log('nnnnnn', JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const InvoiceOrder = (token, data) => {
  console.log('data????', data);
  // return
  return new Promise((resolve, reject) => {
    const config = {
      method: 'POST',
      url: `${API_URL}/invoice/api/order/create/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('config================================', config);

    axios(config)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
          console.log('ggggggg', response);
        } else {
          reject(response.statusText);
        }
      })
      .catch(error => {
        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error.response?.headers);
        // Handle specific error messages
        if (error.response?.status === 500) {
          showMessage({
            message: 'Internal server error. Please try again later.',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'An error occurred. Please try again.", "error',
            type: 'danger',
          });
        }

        reject(error);
      });
  });
};

export const InvoiceUpdate = (token, InvoiceID, data) => {
  console.log('data????', data);
  // return
  return new Promise((resolve, reject) => {
    const config = {
      method: 'PUT',
      url: `${API_URL}/invoice/api/invoice/details/${InvoiceID}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('config================================', config);

    axios(config)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
          console.log('ggggggg', response);
        } else {
          reject(response.statusText);
        }
      })
      .catch(error => {
        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error.response?.headers);
        // Handle specific error messages
        if (error.response?.status === 500) {
          showMessage({
            message: 'Internal server error. Please try again later.',
            type: 'danger',
          });
        } else {
          showMessage({
            message: 'An error occurred. Please try again.", "error',
            type: 'danger',
          });
        }

        reject(error);
      });
  });
};

export const ledgerBookFilter = async (token, data, page) => {
  console.log('Request Data:', data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'POST',
      url: `${API_URL}/user_profile/backend/costomer/filter?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('configconfigconfig:', config);
    axios
      .request(config)
      .then(response => {
        console.log('Response Data:', response.data);
        if (response?.data?.data?.length > 0) {
          resolve({data: response?.data?.data});
        } else {
          resolve({data: []});
        }
      })
      .catch(error => {
        console.error('Axios Error:', error);
        // if (error.response) {
        //   console.error('Response Data:', error.response.data);
        //   console.error('Response Status:', error.response.status);
        //   console.error('Response Headers:', error.response.headers);
        // }
        reject(error);
      });
  });
};

export const ledgerBookSort = async (token, data, page) => {
  console.log('Request Data:', data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'POST',
      url: `${API_URL}/user_profile/backend/costomer/sort?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('configconfigconfig:', config);
    axios
      .request(config)
      .then(response => {
        console.log('Response Data:', response.data);
        if (response?.data?.data?.length > 0) {
          resolve({data: response?.data?.data});
        } else {
          resolve({data: []});
        }
      })
      .catch(error => {
        console.error('Axios Error:', error);
        // if (error.response) {
        //   console.error('Response Data:', error.response.data);
        //   console.error('Response Status:', error.response.status);
        //   console.error('Response Headers:', error.response.headers);
        // }
        reject(error);
      });
  });
};

export const customerLedgerBookInvoice = async (token, customerId, page) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/invoice/api/invoice/customer/list?customer_id=${customerId}&type=all`,
      // url: `${API_URL}/invoice/api/invoice/customer/list?customer_id=${customerId}&page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data: data,
    };
    console.log('configconfigconfig', config);
    await axios
      .request(config)
      .then(response => {
        // console.log('CustomerCreate response', response);
        // console.log(JSON.stringify(response));
        // if (response.status === 200 && response.data.status === 'success') {
        // showMessage({
        //   message: (response.data.message),
        //   type: 'success',
        // });
        resolve(response.data);
        // } else {
        //   showMessage({
        //     message: 'Failed to create customer. Please try again.',
        //     type: 'danger',
        //   });
        //   reject(response.data);
        // }
      })
      .catch(error => {
        console.log(error);
        // Handle network errors or unexpected issues
        // showError('Failed to create customer. Please try again.');
        reject(error);
      });
  });
};

export const customerInvoiceDetails = async (token, invoiceId) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/invoice/api/invoice/details/${invoiceId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data: data,
    };
    console.log('configconfigconfig', config);
    await axios
      .request(config)
      .then(response => {
        // console.log('CustomerCreate response', response);
        // console.log(JSON.stringify(response));
        // if (response.status === 200 && response.data.status === 'success') {
        // showMessage({
        //   message: (response.data.message),
        //   type: 'success',
        // });
        resolve(response.data);
        // } else {
        //   showMessage({
        //     message: 'Failed to create customer. Please try again.',
        //     type: 'danger',
        //   });
        //   reject(response.data);
        // }
      })
      .catch(error => {
        console.log(error);
        // Handle network errors or unexpected issues
        // showError('Failed to create customer. Please try again.');
        reject(error);
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      });
  });
};

export const getTransactionsHistory = async (token, page) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/invoice/api/invoice/listcreate?page=${page}`,
      // url: `${API_URL}/user_profile/backend/costomer/?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data: data,
    };
    console.log(page, 'data===', config);
    await axios
      .request(config)
      .then(response => {
        // console.log('CustomerCreate response', response);
        // console.log(JSON.stringify(response));
        // if (response.status === 200 && response.data.status === 'success') {
        // showMessage({
        //   message: (response.data.message),
        //   type: 'success',
        // });
        if (response?.data?.data?.length > 0) {
          resolve({data: response?.data?.data});
        } else {
          resolve({data: []});
        }
        // resolve(response.data);
        // } else {
        //   showMessage({
        //     message: 'Failed to create customer. Please try again.',
        //     type: 'danger',
        //   });
        //   reject(response.data);
        // }
      })
      .catch(error => {
        // console.log(error);
        // Handle network errors or unexpected issues
        // showError('Failed to create customer. Please try again.');
        reject(error);
        // console.log(error.response?.data);
        // console.log(error.response?.status);
        // console.log(error.response?.headers);
      });
  });
};

export const saleBookSort = async (token, data, page) => {
  console.log('Request Data:', data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'POST',
      url: `${API_URL}/invoice/api/invoice/sort/?page=${page}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('configconfigconfig:', config);
    axios
      .request(config)
      .then(response => {
        console.log('Response Data:', response);
        if (response?.data?.invoice?.length > 0) {
          resolve({data: response?.data?.invoice});
        } else {
          resolve({data: []});
        }
      })
      .catch(error => {
        console.error('Axios Error:', error);
        // if (error.response) {
        //   console.error('Response Data:', error.response.data);
        //   console.error('Response Status:', error.response.status);
        //   console.error('Response Headers:', error.response.headers);
        // }
        reject(error);
      });
  });
};

export const saleBookSearch = async (token, search, page) => {
  console.log('Request Data:', search);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      url: `${API_URL}/invoice/api/invoice/search?search=${search}&type=all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data: data,
    };
    console.log('configconfigconfig:', config);
    axios
      .request(config)
      .then(response => {
        console.log('Response Data:', response.data);
        if (response?.data?.invoice?.length > 0) {
          resolve({data: response?.data?.invoice});
        } else {
          resolve({data: []});
        }
      })
      .catch(error => {
        console.error('Axios Error:', error);
        // if (error.response) {
        //   console.error('Response Data:', error.response.data);
        //   console.error('Response Status:', error.response.status);
        //   console.error('Response Headers:', error.response.headers);
        // }
        reject(error);
      });
  });
};

export const userCalendar = async (token, data) => {
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url: `${API_URL}/invoice/api/invoice/filter`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const productQuantity = async (token, productId, quantity) => {
  console.log('token', token);
  // console.log('data', data);
  return new Promise(async (resolve, reject) => {
    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      // url: `${API_URL}/inventory/api/product/quantity/check?product_id=3&quantity=1`,
      url: `${API_URL}/inventory/api/product/quantity/check?product_id=${productId}&quantity=${quantity}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // data: data,
    };
    console.log('config', config);
    axios
      .request(config)
      .then(response => {
        console.log('aaaaaaaaaaa', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const BussinessUpdateProfile = async (token, data) => {
  console.log('datapiBussinessProfile', data);
  return new Promise((resolve, reject) => {
    let config = {
      method: 'PUT',
      maxBodyLength: Infinity,
      url: `${API_URL}/user_profile/backend/business-all/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log('BussinessProfile====>', config, data);
    console.log('BussinessProfile====>', config, data);
    axios
      .request(config)
      .then(response => {
        console.log('BussinessProfileresponse====>', response.data);
        resolve(response.data);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
};

export const savePhoto = (token, data) => {
  console.log(data, 'token, data', token);
  // return
  return new Promise(async (resolve, reject) => {
    const config = {
      method: 'PUT',
      url: `${API_URL}/user_profile/backend/userupdate/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    console.log(data, 'token, data', config);
    await axios(config)
      .then(response => {
        resolve(response.data);
        console.log('ggggggg', response.data);
      })
      .catch(error => {
        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error.response?.headers);
        reject(error);
      });
  });
};
