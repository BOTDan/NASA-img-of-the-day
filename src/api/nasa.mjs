// @ts-check

/**
 * NASA API key
 * This can be obtained at https://api.nasa.gov/#signUp
 * "DEMO_KEY" is rate-limited, but can be used for quick testing
 */
const API_KEY = "DEMO_KEY";

// Base URL of the API
const API_BASE_URL = "https://api.nasa.gov";

/**
 * Makes a request to the API
 * @param {string} method The HTTP method to use
 * @param {string} url The api url (excluding base url)
 * @param {Record<string, string>} parameters Any query parameters to append
 * @returns A fetch request to the given endpoint
 */
function makeRequest(method, url, parameters) {
  const encodedParams = new URLSearchParams(parameters);
  encodedParams.append("api_key", API_KEY);
  const finalUrl = `${API_BASE_URL}${url}?${encodedParams}`;
  return fetch(finalUrl, { method });
}

/**
 * Extracts JSON data from the response body of a request
 * @param {Promise<Response>} request The request object
 * @returns The parsed JSON data
 */
async function getJSON(request) {
  const response = await request;
  if (!response.ok) {
    throw new Error(`Response not OK (status code ${response.status})`);
  }
  const data =  await response.json();
  return data;
}

/**
 * @typedef PictureOfTheDay
 * @prop {string} title The title of the image
 * @prop {string} date Date of image
 * @prop {string} url URL to image/video
 * @prop {'image' | 'video'} media_type The type of media
 * @prop {string} explanation Explanation of the image
 * @prop {string} [copyright] Name of the copyright holder
 */

/**
 * Gets a list of pictures of the day
 * @param {number} [count=1] The amount of pictures to get 
 * @returns A list of image urls, with extra data
 */
export async function getPictureOfTheDay(count=1) {
  const data = await getJSON(makeRequest("GET", "/planetary/apod", { count: count.toString() }));
  if (Array.isArray(data)) {
    return /** @type {PictureOfTheDay[]} */ (data);
  }
  throw new Error("Data returned was not an array");
}